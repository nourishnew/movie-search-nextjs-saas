import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";

const apikey = process.env.OMDB_API_KEY;

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { movieId } = body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (!apikey) {
			return new NextResponse("Missing OMDB api key API Key", { status: 500 });
		}
		if (!movieId) {
			return new NextResponse("No movieId provided", { status: 400 });
		}
		console.log("calling omdb");
		console.log(movieId);
		const response = await axios.get(
			`https://www.omdbapi.com/?i=${movieId}&apikey=${apikey}`
		);

		return NextResponse.json(response.data);
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ message: (err as Error).message },
			{ status: 500 }
		);
	}
}
