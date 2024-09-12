"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const Sidebar = ({ user }: SiderbarProps) => {
	const pathName = usePathname();
	return (
		<section className="sidebar">
			<nav className="flex flex-col gap-4">
				<Logo />
				{sidebarLinks.map((link) => {
					const { imgURL, label, route } = link;
					const isActive =
						pathName === route || pathName.startsWith(`${route}/`);
					return (
						<Link
							href={route}
							key={label}
							className={cn(
								"sidebar-link",
								isActive && "bg-bankGradient",
							)}
						>
							<div className="relative size-6">
								<Image
									src={imgURL}
									alt={label}
									fill
									className={
										isActive
											? "brightness-[3] invert-0"
											: ""
									}
								/>
							</div>
							<p
								className={cn(
									"sidebar-label",
									isActive && "!text-white",
								)}
							>
								{label}
							</p>
						</Link>
					);
				})}
				<PlaidLink user={user} />
			</nav>
			<Footer user={user} type="desktop" />
		</section>
	);
};

export default Sidebar;
