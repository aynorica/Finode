import Link from "next/link";
import React from "react";
import Image from "next/image";

const logo = () => {
	return (
		<Link href="/" className="mb-12 cursor-pointer items-center gap-2 flex">
			<Image
				src="/icons/logo.svg"
				width={34}
				height={34}
				alt="Finode Logo"
				className="size-[24px] max-lg:size-14"
			/>
			<h1 className="sidebar-logo">Finode</h1>
		</Link>
	);
};

export default logo;
