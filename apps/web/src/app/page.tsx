"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [embeddingDetails, setEmbeddingDetails] = useState<string | null>(null);

	const handleGetRecommendation = useCallback(async () => {
		const prompt =
			"I'm planning on going to the beach today, I need you to recommend me an outfit based on the items I have and the weather conditions";

		try {
			setIsLoading(true);
			setError(null);
			setEmbeddingDetails(null);

			const response = await fetch("/api/recommendation", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt }),
			});

			if (!response.ok) {
				const payload = await response.json().catch(() => ({}));
				throw new Error(payload.error || "Failed to get recommendation.");
			}

			const data = await response.json();
			const dimensions = data.dimensions ?? data.embedding?.length ?? 0;

			setEmbeddingDetails(`Embedding generated (${dimensions} dimensions).`);
			console.log("this is the embedding", data.embedding);
		} catch (fetchError) {
			const message =
				fetchError instanceof Error
					? fetchError.message
					: "Unexpected error getting recommendation.";
			setError(message);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return (
		<div className="container mx-auto max-w-3xl px-4 py-2">
			<pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
			<div className="grid gap-6">
				<section className="rounded-lg border p-4">
					<h2 className="mb-2 font-medium">API Status</h2>
					{embeddingDetails && (
						<p className="text-sm text-green-600">{embeddingDetails}</p>
					)}
					{error && <p className="text-sm text-red-600">{error}</p>}
					{!embeddingDetails && !error && (
						<p className="text-sm text-muted-foreground">
							Awaiting embedding request.
						</p>
					)}
				</section>
				<section className="rounded-lg border p-4">
					<Button onClick={handleGetRecommendation} disabled={isLoading}>
						{isLoading ? "Generating..." : "Get Recommendation"}
					</Button>
				</section>
			</div>
		</div>
	);
}
