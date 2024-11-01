"use client";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./constants";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { MovieCard } from "@/components/movie-card";

interface Movie {
	Poster: string;
	Title: string;
	Year: string;
	Type: string;
	imdbID: string;
}
interface FavMovie {
	id: string;
	movieId: string;
	userId: string;
}

const DashboardPage = () => {
	const [isMounted, setIsMounted] = useState(false);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [favMovies, setFavMovies] = useState<FavMovie[]>([]);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			keyword: "",
		},
	});
	const isLoading = form.formState.isSubmitting;
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userQuery = values.keyword;

			const response = await axios.post("/api/fetchMovies", {
				keyword: userQuery,
			});
			setMovies(response.data);
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	useEffect(() => {
		const fetchFavoriteMovies = async () => {
			const response = await axios.get("/api/fetchFavorites");
			setFavMovies(response.data);
		};
		fetchFavoriteMovies();
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<div>
			<DashboardNavbar />
			<div className="w-full flex flex-row m-4">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full rounded-l border-w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-4 items-center">
						<div className="col-span-10">
							<FormField
								name="keyword"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className="p-2 w-full"
												placeholder=" Avengers"
												disabled={isLoading}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Button
							variant="outline"
							className="col-span-2 p-2"
							disabled={isLoading}>
							{" "}
							Search
						</Button>
					</form>
				</Form>
			</div>
			<div className="w-full flex justify-center m-4">
				<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
					{movies.map((movie, id) => (
						<MovieCard
							key={id}
							id={movie.imdbID}
							title={movie.Title}
							year={movie.Year}
							imageUrl={movie.Poster}
							isFavorite={favMovies.some(
								(favMovie) => favMovie.movieId === movie.imdbID
							)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
