const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full bg-[#111826] overflow-auto">
			<div className="mx-auto max-w-screen-xl h-full">{children}</div>
		</div>
	);
};

export default LandingLayout;
