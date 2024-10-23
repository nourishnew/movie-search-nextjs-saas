import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Movie {
	id: string;
	title: string;
	year: string;
	imageUrl: string;
}
export const MovieCard = ({ id, title, year, imageUrl }: Movie) => {
	return (
		<Card className="shadow-lg rounded-lg max-w-64">
			<CardHeader className="p-0">
				<Image
					src={imageUrl}
					alt={title + id}
					width={300}
					height={1800}
					className="w-full  h-64 object-cover "
					placeholder="blur"
					blurDataURL={"./logo.png"}
				/>
			</CardHeader>
			<CardContent>
				<CardTitle>{title}</CardTitle>
				<p>{year}</p>
			</CardContent>
		</Card>
	);
};
