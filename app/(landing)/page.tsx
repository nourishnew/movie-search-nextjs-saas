import { LandingBanner } from "@/components/landing-banner";
import { LandingNavbar } from "../../components/landing-nav-bar";

const LandingPage = () => {
	return (
		<div className="h-full">
			<LandingNavbar />
			<LandingBanner />
		</div>
	);
};

export default LandingPage;
