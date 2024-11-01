import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BookmarkPlus } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Movie {
	id: string;
	title: string;
	year: string;
	imageUrl: string;
	isFavorite?: boolean;
}
export const MovieCard = ({ id, title, year, imageUrl, isFavorite }: Movie) => {
	const [movie, setMovie] = useState<Movie>();
	const [isBookmarked, setIsBookmarked] = useState(false);

	console.log(isFavorite);
	console.log(title);

	useEffect(() => {
		const fetchMovie = async (id: string) => {
			const response = await axios.post("/api/fetchMovie", {
				movieId: id,
			});
			setMovie({
				id: id,
				title: response.data.Title,
				year: response.data.Year,
				imageUrl: response.data.Poster,
				isFavorite: isFavorite,
			});
		};
		if (imageUrl === "") {
			fetchMovie(id);
		} else {
			setMovie({ id: id, title: title, year: year, imageUrl: imageUrl });
		}
		if (isFavorite) {
			setIsBookmarked(true);
		}
	}, []);
	const handleAddToFavorite = async () => {
		if (!isBookmarked) {
			if (movie) {
				await axios.post("/api/addFavorite", {
					id: movie.id,
				});
			} else {
				await axios.post("/api/addFavorite", {
					id: id,
				});
			}
			setIsBookmarked(!isBookmarked);
		} else {
			if (movie) {
				await axios.post("/api/removeFavorite", {
					id: movie.id,
				});
			} else {
				await axios.post("/api/removeFavorite", {
					id: id,
				});
			}
			setIsBookmarked(!isBookmarked);
		}
	};

	return (
		<div>
			{movie ? (
				<Card className="shadow-lg rounded-lg max-w-64 p-5 flex flex-col h-full ">
					<CardHeader className="p-0">
						<Image
							src={movie.imageUrl}
							alt={title + id}
							width={300}
							height={1800}
							className="w-full  h-64 object-cover "
							placeholder="blur"
							blurDataURL={"./logo.png"}
						/>
					</CardHeader>
					<CardContent>
						<CardTitle>{movie.title}</CardTitle>
						<p>{movie.year}</p>
					</CardContent>
					<div className="flex mt-auto cursor-pointer">
						<BookmarkPlus
							className={
								isBookmarked
									? "bg-[#111826] text-zinc-200 ml-auto rounded-lg p-1"
									: "text-[#111826] ml-auto rouded-lg p-1"
							}
							onClick={handleAddToFavorite}></BookmarkPlus>
					</div>
				</Card>
			) : (
				<Skeleton className="w-[100px] h-[20px] rounded-full" />
			)}
		</div>
	);
};
