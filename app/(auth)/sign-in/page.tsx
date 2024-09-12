import AuthForm from "@/components/AuthForm";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const SignIn = async () => {
	const loggedIn = await getLoggedInUser();
	if (loggedIn) redirect("/");
	return (
		<section className="flex-center size-full max-sm:px-6 relative">
			<div className="absolute  bg-black-1/90 left-0 top-10 rounded-e-md p-4 shadow-md shadow-slate-900 animate-pulse repeat-1">
				<h1 className="font-extrabold text-xl text-white">
					Test Credentials
				</h1>
				<p className="font-normal text-sm text-white mt-4">
					Email: amirdeilamizadeh1996@gmail.com
				</p>
				<p className="font-normal text-sm text-white mt-1">
					Password: Test1234
				</p>
			</div>
			<AuthForm type={"sign-in"} />
		</section>
	);
};

export default SignIn;
