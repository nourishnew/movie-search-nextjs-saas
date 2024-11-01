import { auth } from "@clerk/nextjs/server";
import prismadb from "./prismadb";

export const addFavorite = async (movieId: string) => {
	const { userId } = auth();

	if (!userId) {
		return false;
	}
	await prismadb.favorites.create({
		data: {
			userId,
			movieId,
		},
	});
};
export const removeFavorite = async (movieId: string) => {
	const { userId } = auth();
	if (!userId) {
		return false;
	}
	await prismadb.favorites.deleteMany({
		where: {
			userId,
			movieId,
		},
	});
};

export const fetchFavorites = async () => {
	const { userId } = auth();
	if (!userId) {
		return [];
	}
	const favorites = await prismadb.favorites.findMany({
		where: {
			userId,
		},
	});
	return favorites;
};
