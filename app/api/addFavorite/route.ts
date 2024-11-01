import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { addFavorite } from "@/lib/favorite";

const apikey = process.env.OMDB_API_KEY;

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { id } = body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (!apikey) {
			return new NextResponse("Missing OpenAI API Key", { status: 500 });
		}
		if (!id) {
			return new NextResponse("No keyword provided", { status: 400 });
		}
		console.log("favorite ");
		console.log(id);
		await addFavorite(id);

		return NextResponse.json({
			status: 200,
			message: "Movie added to favorites",
		});
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ message: (err as Error).message },
			{ status: 500 }
		);
	}
}
