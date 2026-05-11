import type { ReviewResult, SellerAgentInput } from "@/types/listing";

/**
 * Review the generated listing for possible issues.
 *
 * This mock reviewer focuses on:
 * - Avoiding exaggerated claims
 * - Suggesting missing useful details
 *
 * Later, this can become a real "reviewer agent" powered by an LLM.
 */
export function reviewListing(input: SellerAgentInput): ReviewResult {
  const warnings: string[] = [];
  const suggestions: string[] = [];

  const condition = input.condition.toLowerCase();

  /**
   * If the user did not explicitly say the item is new or like new,
   * we warn the system not to describe it as "like new".
   *
   * This helps reduce hallucination.
   */
  if (!condition.includes("new") && !condition.includes("like new")) {
    warnings.push(
      "Avoid saying the item is 'like new' unless the user explicitly confirms it.",
    );
  }

  // Original price would make the pricing recommendation more meaningful.
  if (!input.originalPrice) {
    suggestions.push(
      "Add the original price to make the price recommendation more useful.",
    );
  }

  // General suggestion that helps almost all second-hand listings.
  suggestions.push(
    "Add clear photos and mention any visible scratches or defects.",
  );

  return {
    warnings,
    suggestions,
  };
}
