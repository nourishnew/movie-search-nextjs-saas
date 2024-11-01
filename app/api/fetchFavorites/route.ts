import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { fetchFavorites } from "@/lib/favorite";

const apikey = process.env.OMDB_API_KEY;

export async function GET() {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (!apikey) {
			return new NextResponse("Missing OpenAI API Key", { status: 500 });
		}

		const response = await fetchFavorites();

		console.log("response tada");
		console.log(response);
		return NextResponse.json(response);
	} catch (err) {
		return NextResponse.json(
			{ message: (err as Error).message },
			{ status: 500 }
		);
	}
}
