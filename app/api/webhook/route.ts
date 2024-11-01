import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = headers().get("Stripe-Signature") as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (error) {
		return new Response(`Webhook Error ${error}`, { status: 400 });
	}
	const session = event.data.object as Stripe.Checkout.Session;

	if (event.type === "checkout.session.completed") {
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string
		);
		if (!session?.metadata?.userId) {
			return new Response("Unauthorized", { status: 401 });
		}

		await prismadb.userSubscription.create({
			data: {
				userId: session?.metadata?.userId,
				stripeCustomerId: subscription.customer as string,
				stripeSubscriptionId: subscription.id,
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(
					subscription.current_period_end * 1000
				),
			},
		});
	}

	if (event.type === "invoice.payment_succeeded") {
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string
		);

		await prismadb.userSubscription.update({
			where: {
				stripeSubscriptionId: subscription.id,
			},
			data: {
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(
					subscription.current_period_end * 1000
				),
			},
		});
	}

	return new NextResponse(null, { status: 200 });
}
