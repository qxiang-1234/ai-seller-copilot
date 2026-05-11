import type { PricingResult, SellerAgentInput } from "@/types/listing";

/**
 * Estimate a second-hand price range.
 *
 * Current mock logic:
 * - If original price exists, suggest 40% to 60% of original price.
 * - If original price is missing, return low confidence.
 *
 * Later, this can be upgraded to:
 * - Search similar listings
 * - Use market data
 * - Adjust based on condition, category, and location
 */
export function estimatePrice(input: SellerAgentInput): PricingResult {
  const originalPrice = Number(input.originalPrice);

  // If user does not provide a valid original price, we cannot estimate reliably.
  if (!input.originalPrice || Number.isNaN(originalPrice)) {
    return {
      suggestedRange: "Need more information",
      reasoning:
        "The original price is missing, so the agent cannot estimate a reliable resale price yet.",
      confidence: "low",
    };
  }

  // Simple resale estimate: 40% to 60% of original price.
  const low = Math.round(originalPrice * 0.4);
  const high = Math.round(originalPrice * 0.6);

  return {
    suggestedRange: `$${low} - $${high}`,
    reasoning:
      "For a used item in good condition, a common starting point is around 40% to 60% of the original price.",
    confidence: "medium",
  };
}
