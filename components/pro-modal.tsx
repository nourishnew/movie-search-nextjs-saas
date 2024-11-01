import { Badge } from "./ui/badge";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";

import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "./ui/button";
import axios from "axios";
export const ProModal = () => {
	const proModal = useProModal();

	const onSubscribe = async () => {
		try {
			const response = await axios.get("/api/stripe");
			window.location.href = response.data.url;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
						<div className="flex items-center"> Upgrade to Premium</div>
						<Badge variant="premium" className="uppercase text-sm py-1">
							Premium
						</Badge>
					</DialogTitle>
				</DialogHeader>
				<DialogFooter>
					<Button
						size="lg"
						variant="premium"
						className="w-full"
						onClick={onSubscribe}>
						Upgrade to Premium
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
