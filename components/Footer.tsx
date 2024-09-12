import { LogOut } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type }: FooterProps) => {
	const router = useRouter();
	const handleLogout = async () => {
		const loggedOut = await LogOut();
	};
	return (
		<footer className="footer">
			<div
				className={
					type === "desktop" ? "footer_name" : "footer_name-mobile"
				}
			>
				<p className="text-xl text-gray-700 font-bold">
					{`${user?.firstName[0]}`}
				</p>
			</div>
			<div
				className={type === "desktop" ? "email" : "footer_email-mobile"}
			>
				<h1 className="text-14 truncate font-semibold text-gray-700">
					{`${user.firstName} ${user.lastName}`}
				</h1>
				<p className="text-14 truncate font-normal text-gray-600">
					{user?.email}
				</p>
			</div>
			<div className="footer_image" onClick={handleLogout}>
				<Image src="/icons/logout.svg" fill alt="logout" />
			</div>
		</footer>
	);
};

export default Footer;
