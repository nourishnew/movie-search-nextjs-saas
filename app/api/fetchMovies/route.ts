import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const apikey = process.env.OMDB_API_KEY;

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { keyword } = body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (!apikey) {
			return new NextResponse("Missing OpenAI API Key", { status: 500 });
		}
		if (!keyword) {
			return new NextResponse("No keyword provided", { status: 400 });
		}
		const freeTrial = await checkApiLimit();

		if (!freeTrial) {
			return new NextResponse("Free trial has expired", {
				status: 403,
			});
		}

		const response = await axios.get(
			`https://www.omdbapi.com/?s=${keyword}&apikey=${apikey}`
		);

		await increaseApiLimit();

		console.log("response tada");
		console.log(response.data.Search);
		return NextResponse.json(response.data.Search);
	} catch (err) {
		return NextResponse.json(
			{ message: (err as Error).message },
			{ status: 500 }
		);
	}
}
