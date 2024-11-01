"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

interface SubscriptionButtonProps {
	isPro?: boolean;
}
export const SubscriptionButton = ({
	isPro = false,
}: SubscriptionButtonProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const onClick = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("/api/stripe");
			window.location.href = response.data.url;
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			className="mt-2"
			disabled={isLoading}
			variant={isPro ? "outline" : "premium"}
			onClick={onClick}>
			{isPro ? "Manage subscription" : "Upgrade to Premium"}
		</Button>
	);
};
