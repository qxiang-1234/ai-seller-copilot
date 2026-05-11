"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { AgentProgress } from "@/components/AgentProgress";
import { ListingForm } from "@/components/ListingForm";
import { ListingResult } from "@/components/ListingResult";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import type { SellerAgentInput, SellerAgentResult } from "@/types/listing";

type AgentApiResponse =
  | {
      success: true;
      data: SellerAgentResult;
    }
  | {
      success: false;
      error: string;
    };

export default function Home() {
  // Store the latest agent result returned from /api/agent.
  const [result, setResult] = useState<SellerAgentResult | null>(null);

  // Track loading state so we can disable the button and show progress UI.
  const [isLoading, setIsLoading] = useState(false);

  // Store user-friendly error message if the API call fails.
  const [error, setError] = useState("");

  async function handleGenerateListing(input: SellerAgentInput) {
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      /**
       * Send the form data to our Next.js API route.
       * The API route will run runSellerAgent() and return structured JSON.
       */
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const responseBody = (await response.json()) as AgentApiResponse;

      if (!responseBody.success) {
        throw new Error(responseBody.error);
      }

      setResult(responseBody.data);
    } catch (error) {
      /**
       * Convert unknown errors into a readable message.
       * This helps avoid showing ugly technical errors directly in the UI.
       */
      const message =
        error instanceof Error ? error.message : "Failed to generate listing.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>AI Seller Copilot</h1>
        <p>
          Generate second-hand marketplace listings with a simple agent
          workflow.
        </p>
      </section>

      <section className={styles.layout}>
        <div className={styles.card}>
          <h2>Item Details</h2>

          <ListingForm onSubmit={handleGenerateListing} isLoading={isLoading} />

          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.card}>
          <AgentProgress isLoading={isLoading} />

          {isLoading ? <LoadingSkeleton /> : <ListingResult result={result} />}
        </div>
      </section>
    </main>
  );
}
