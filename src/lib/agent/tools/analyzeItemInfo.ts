import type { ItemAttributes, SellerAgentInput } from "@/types/listing";

/**
 * Analyze the raw user input and convert it into structured item attributes.
 *
 * In the real AI version, this step can be handled by an LLM.
 * For now, we use simple rule-based logic so we can build and test the workflow first.
 */
export function analyzeItemInfo(input: SellerAgentInput): ItemAttributes {
  /**
   * Convert the user's comma-separated feature string into an array.
   *
   * Example:
   * "3 brightness levels, adjustable angle"
   * becomes:
   * ["3 brightness levels", "adjustable angle"]
   */
  const features = input.features
    .split(",")
    .map((feature) => feature.trim())
    .filter(Boolean);

  return {
    category: guessCategory(input.itemName),
    itemName: input.itemName,
    condition: input.condition,
    features,
  };
}

/**
 * Guess the product category based on the item name.
 *
 * This is only a simple mock version.
 * Later, we can replace this with AI-based category detection.
 */
function guessCategory(itemName: string): string {
  const normalizedName = itemName.toLowerCase();

  if (
    normalizedName.includes("lamp") ||
    normalizedName.includes("chair") ||
    normalizedName.includes("table") ||
    normalizedName.includes("sofa")
  ) {
    return "Home & Furniture";
  }

  if (
    normalizedName.includes("tv") ||
    normalizedName.includes("monitor") ||
    normalizedName.includes("speaker") ||
    normalizedName.includes("camera")
  ) {
    return "Electronics";
  }

  if (
    normalizedName.includes("shoe") ||
    normalizedName.includes("bag") ||
    normalizedName.includes("jacket")
  ) {
    return "Fashion";
  }

  return "General";
}
