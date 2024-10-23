"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { Montserrat } from "next/font/google";

const font = Montserrat({ weight: "600", subsets: ["latin"] });
export const DashboardNavbar = () => {
	return (
		<nav className="p-4 bg-[#111826] flex items-center justify-between w-full">
			<Link href="/" className="flex items-center">
				<div className="relative h-8 w-8 mr-4">
					<Image fill alt="logo" src="/logo.png" />
				</div>
				<h1 className={cn("text-xl font-bold text-white", font.className)}>
					{" "}
					Moveeee
				</h1>
			</Link>
			<div className="flex items-center gap-x-2">
				<UserButton />
			</div>
		</nav>
	);
};
