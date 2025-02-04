import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { Montserrat } from "next/font/google";
import { Button } from "./ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import axios from "axios";
import { useEffect, useState } from "react";

const font = Montserrat({ weight: "600", subsets: ["latin"] });
export const DashboardNavbar = () => {
	// Your implementation here
	const [isPro, setIsPro] = useState(false);
	const proModal = useProModal();
	useEffect(() => {
		const checkIsPro = async () => {
			const res = await axios.get("/api/checkSubscription");
			if (res.data.accountStatus === "Premium") {
				setIsPro(true);
			}
		};

		checkIsPro();
	});
	return (
		<nav className="p-4 bg-[#111826] flex items-center justify-between w-full">
			<Link href="/dashboard" className="flex items-center">
				<div className="relative h-8 w-8 mr-4">
					<Image fill alt="logo" src="/logo.png" />
				</div>
				<h1 className={cn("text-xl font-bold text-white", font.className)}>
					{" "}
					Moveeee
				</h1>
			</Link>
			<div className="flex items-center gap-x-2">
				{!isPro && (
					<Button variant="premium" onClick={() => proModal.onOpen()}>
						Upgrade
					</Button>
				)}

				<Link href="/favorites">
					<Button variant="outline">Favorites</Button>
				</Link>
				<Link href="/settings">
					<Button variant="outline">Settings</Button>
				</Link>
				<UserButton />
			</div>
		</nav>
	);
};
