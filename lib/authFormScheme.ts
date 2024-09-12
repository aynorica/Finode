import { date, z } from "zod";

const authFormScheme = (type: "sign-in" | "sign-up") => {
	switch (type) {
		case "sign-in":
			return z.object({
				email: z.string().email({
					message: "Please enter a valid email address",
				}),
				password: z.string().min(8, {
					message: "Password must be at least 8 characters",
				}),
			});
		case "sign-up":
			return z.object({
				email: z.string().email({
					message: "Please enter a valid email address",
				}),
				password: z.string().min(8, {
					message: "Password must be at least 8 characters",
				}),
				firstName: z.string().min(2),
				city: z.string().min(2),
				lastName: z.string().min(2),
				address1: z.string().min(2),
				state: z.string().min(2),
				postalCode: z.string().min(2),
				dateOfBirth: z.string(),
				ssn: z.string().min(2),
			});
	}
};

export default authFormScheme;
