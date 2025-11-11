"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { vectorizeDB } from "../functions/vectorizeDB";

export default function Dashboard({
	customerState,
	session,
}: {
	customerState: ReturnType<typeof authClient.customer.state>;
	session: typeof authClient.$Infer.Session;
}) {
	const hasProSubscription = customerState?.activeSubscriptions?.length! > 0;
	console.log("Active subscriptions:", customerState?.activeSubscriptions);


	const handleVectorizeDB = async () => {
		const datababaseOutput = await vectorizeDB();
		console.log(datababaseOutput);
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			{/* <div>
				<div><p>Plan: {hasProSubscription ? "Pro" : "Free"}</p>
					{hasProSubscription ? (
						<Button onClick={async () => await authClient.customer.portal()}>
							Manage Subscription
						</Button>
					) : (
						<Button
							onClick={async () => await authClient.checkout({ slug: "pro" })}
						>
							Upgrade to Pro
						</Button>
					)}</div>
				<div>test </div>
			</div> */}
			testing ...
			<Button onClick={handleVectorizeDB}>Click me</Button>
		</div>
	);
}
