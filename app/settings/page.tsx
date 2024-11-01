import { SettingsNavbar } from "@/components/settings-navbar";
import { SubscriptionButton } from "@/components/subscription-button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
	const isPro = await checkSubscription();

	return (
		<div className="flex flex-col">
			<SettingsNavbar />
			<Card className="w-1/2 m-auto mt-5 ">
				<CardHeader className="text-sm sm:text-lg md:text-xl lg:text-2xl text-zinc-500 p-5">
					<CardTitle>Settings</CardTitle>
					<CardDescription>Modify your plan here</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="lg:px-8 space-y-4 bg-[#111826] text-white p-2 rounded-lg">
						<div className="text-muted-foreground text-sm ">
							{isPro ? "You are on a pro plan." : "You are on a free plan."}
						</div>
					</div>
					<SubscriptionButton isPro={isPro} />
				</CardContent>
			</Card>
		</div>
	);
};

export default SettingsPage;
