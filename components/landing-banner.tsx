"use client";
import TypewriterComponent from "typewriter-effect";

export const LandingBanner = () => {
	return (
		<div className="text-white font-bold py-36 text-center space-y-5">
			<div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
				<h1> Discover new movies.</h1>
				<h1> Best movie search and review tool</h1>
				<div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
					<TypewriterComponent
						options={{
							strings: ["Best movie search engine"],

							autoStart: true,
							loop: true,
						}}
					/>
				</div>
			</div>
		</div>
	);
};
