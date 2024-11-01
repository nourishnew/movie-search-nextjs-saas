import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { checkSubscription } from "@/lib/subscription";

export async function GET() {
	try {
		const { userId } = auth();
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const res = await checkSubscription();
		return NextResponse.json({
			status: 200,
			accountStatus: res ? "Premium" : "Free",
		});
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ message: (err as Error).message },
			{ status: 500 }
		);
	}
}
