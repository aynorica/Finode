import { Control } from "react-hook-form";

export interface CustomInputProps {
	control: Control<any>;
	label: string;
	name: string;
	type?: HTMLFormElement["type"];
	placeholder?: string;
}
