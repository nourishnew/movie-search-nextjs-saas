import * as z from "zod";

export const formSchema = z.object({
	keyword: z.string().min(1, { message: "Movie keyword is required" }),
});
