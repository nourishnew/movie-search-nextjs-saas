"use client";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from "@/components/movie-card";
import { Skeleton } from "@/components/ui/skeleton";

interface FavMovie {
	id: string;
	movieId: string;
	userId: string;
}

const FavoritesPage = () => {
	const [isMounted, setIsMounted] = useState(false);
	const [favMovies, setFavMovies] = useState<FavMovie[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [fetched, setFetched] = useState(false);
	const [error, setError] = useState("");
	useEffect(() => {
		if (fetched) {
			return;
		}
		setError("");
		const fetchFavoriteMovies = async () => {
			const response = await axios.get("/api/fetchFavorites");
			setFavMovies(response.data);
			setFetched(true);
		};
		try {
			setIsLoading(true);
			fetchFavoriteMovies();
		} catch (err) {
			setError((err as Error).message);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
		setIsMounted(true);
	}, [fetched]);

	if (!isMounted) {
		return null;
	}

	return (
		<div>
			<DashboardNavbar />
			{isLoading ? (
				<Skeleton className="w-[100px] h-[10px] rounded-full" />
			) : (
				<div className="w-full flex justify-center m-4">
					<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
						{favMovies.map((movie: FavMovie, id) => (
							<MovieCard
								key={id}
								id={movie.movieId}
								title={""}
								year={""}
								imageUrl=""
								isFavorite={true}
							/>
						))}
					</div>
				</div>
			)}
			{error.length > 0 && <div>{error}</div>}
		</div>
	);
};

export default FavoritesPage;
