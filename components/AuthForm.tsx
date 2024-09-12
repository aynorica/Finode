"use client";

import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";
import Logo from "./logo";
import authFormScheme from "@/lib/authFormScheme";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
	const router = useRouter();
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const formSchema = authFormScheme(type);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setLoading(true);
		try {
			if (type === "sign-in") {
				const response = await signIn(data);
				if (response) setUser(response);
			} else {
				const response = await signUp(data as any);
				if (response) setUser(response);
			}
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};
	return (
		<section className="auth-form">
			<header className="flex flex-col gap-5 md:gap-8">
				<Logo />
				<div className="flex flex-col gap-1 md:gap-3">
					<h1 className="text-24 lg:text-36 font-semibold text-gray-900">
						{user
							? "Link Account"
							: type === "sign-up"
							? "Sign Up"
							: "Sign In"}
					</h1>
					<p className="text-16 font-normal text-gray-600">
						{user
							? "Link your account to continue"
							: "Please enter your credentials"}
					</p>
				</div>
			</header>
			{user ? (
				<div className="flex flex-col gap-4">
					<PlaidLink user={user} variant="primary" />
				</div>
			) : (
				<>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							{type === "sign-up" && (
								<>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											label="First Name"
											name="firstName"
											placeholder="Enter your first name"
										/>
										<CustomInput
											control={form.control}
											label="Last Name"
											name="lastName"
											placeholder="Enter your last name"
										/>
									</div>
									<CustomInput
										control={form.control}
										label="Address"
										name="address1"
										placeholder="Enter your address"
									/>
									<CustomInput
										control={form.control}
										label="City"
										name="city"
										placeholder="Enter your City name"
									/>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											label="State"
											name="state"
											placeholder="example: NY"
										/>
										<CustomInput
											control={form.control}
											label="Postal Code"
											name="postalCode"
											placeholder="example: 12345"
										/>
									</div>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											label="Date of Birth"
											name="dateOfBirth"
											placeholder="YYYY-MM-DD"
										/>
										<CustomInput
											control={form.control}
											label="SSN"
											name="ssn"
											placeholder="example: 12345"
										/>
									</div>
								</>
							)}
							<CustomInput
								control={form.control}
								label="Email"
								name="email"
								placeholder="Enter your email"
								type={"email"}
							/>
							<CustomInput
								control={form.control}
								label="Password"
								name="password"
								placeholder="Enter your password"
								type="password"
							/>
							<div className="flex flex-col gap-4">
								<Button
									type="submit"
									className="form-btn"
									disabled={loading}
								>
									{loading ? (
										<>
											<Loader2
												size={20}
												className="animate-spin"
											/>
											&nbsp;Loading...
										</>
									) : (
										"Submit"
									)}
								</Button>
							</div>
						</form>
					</Form>
					<AuthFormFooter type={type} />
				</>
			)}
		</section>
	);
};

const AuthFormFooter = ({ type }: { type: "sign-in" | "sign-up" }) => {
	return (
		<footer className="flex justify-center gap-1">
			{type === "sign-up" ? (
				<p className="text-14 text-gray-600">
					Already have an account?&nbsp;
					<Link
						href="/sign-in"
						className="text-blue-600 hover:underline font-bold"
					>
						Sign In
					</Link>
				</p>
			) : (
				<p className="text-14 text-gray-600">
					Don't have an account?&nbsp;
					<Link
						href="/sign-up"
						className="text-blue-600 hover:underline font-bold"
					>
						Sign Up
					</Link>
				</p>
			)}
		</footer>
	);
};

export default AuthForm;
