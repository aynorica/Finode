import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { CustomInputProps } from "@/types/interfaces/custom-input.interface";

const CustomInput = ({
	control,
	label,
	name,
	placeholder,
	type,
}: CustomInputProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className="form-item">
					<FormLabel className="form-label">{label}</FormLabel>
					<div className="flex flex-col w-full">
						<FormControl>
							<Input
								placeholder={placeholder}
								className="input-class"
								{...field}
								type={type || "text"}
							/>
						</FormControl>
						<FormMessage className="form-message mt-2" />
					</div>
				</div>
			)}
		/>
	);
};

export default CustomInput;
