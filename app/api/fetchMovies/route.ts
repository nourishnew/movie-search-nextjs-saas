import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";

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
			return new NextResponse("Missing API key", { status: 500 });
		}
		if (!keyword) {
			return new NextResponse("Missing keyword", { status: 500 });
		}

		const response = await axios.get(
			`https://www.omdbapi.com/?apikey=${apikey}&s=${keyword}`
		);
		console.log(response);
		return NextResponse.json(response.data.Search);
	} catch (er) {
		return new NextResponse("Error" + er, { status: 500 });
	}
}
