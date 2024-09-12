"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { DateInputProps } from "@/types/interfaces/date-input.interface";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { CustomInputProps } from "@/types/interfaces/custom-input.interface";

export function DateInput({
	control,
	label,
	name,
	placeholder,
}: CustomInputProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>{label}</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant={"outline"}
									className={cn(
										"w-[240px] pl-3 text-left font-normal",
										!field.value && "text-muted-foreground",
									)}
								>
									{field.value ? (
										format(field.value, "yyyy-MM-dd")
									) : (
										<span>
											{placeholder || "Pick a date"}
										</span>
									)}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent
							className="w-auto p-0 bg-white"
							align="start"
						>
							<Calendar
								showOutsideDays
								mode="single"
								selected={field.value}
								onSelect={field.onChange}
								disabled={(date) =>
									date > new Date() ||
									date < new Date("1900-01-01")
								}
								initialFocus
								today={new Date()}
								pagedNavigation
							/>
						</PopoverContent>
					</Popover>
					<FormMessage className="form-message mt-2" />
				</FormItem>
			)}
		/>
	);
}
