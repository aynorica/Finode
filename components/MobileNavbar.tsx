"use client";
import React from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import Logo from "./logo";
import Footer from "./Footer";

const MobileNavbar = ({ user }: MobileNavProps) => {
	const pathName = usePathname();
	return (
		<section className="w-full max-w-[264px]">
			<Sheet>
				<SheetTrigger>
					<Image
						src="/icons/hamburger.svg"
						alt="menu"
						width={30}
						height={30}
						className="cursor-pointer"
					/>
				</SheetTrigger>
				<SheetContent side={"left"} className="border-none bg-white">
					<Logo />
					<div className="mobilenav-sheet">
						<SheetClose asChild>
							<nav className="flex flex-col h-full gap-6 pt-16 text-white">
								{sidebarLinks.map((link) => {
									const { imgURL, label, route } = link;
									const isActive =
										pathName === route ||
										pathName.startsWith(`${route}/`);
									return (
										<SheetClose asChild key={route}>
											<Link
												href={route}
												key={label}
												className={cn(
													"mobilenav-sheet_close w-full",
													isActive &&
														"bg-bankGradient",
												)}
											>
												<Image
													src={imgURL}
													alt={label}
													width={20}
													height={20}
													className={
														isActive
															? "brightness-[3] invert-0"
															: ""
													}
												/>
												<p
													className={cn(
														"text-16 font-bold text-black-2",
														isActive &&
															"text-white",
													)}
												>
													{label}
												</p>
											</Link>
										</SheetClose>
									);
								})}
								USER
							</nav>
						</SheetClose>
						<Footer user={user} type="mobile" />
					</div>
				</SheetContent>
			</Sheet>
		</section>
	);
};

export default MobileNavbar;
