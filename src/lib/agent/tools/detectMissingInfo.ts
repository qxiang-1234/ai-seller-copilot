import type { ItemAttributes, SellerAgentInput } from "@/types/listing";

/**
 * Detect important missing information based on the item category and user input.
 *
 * This helps the seller improve the listing before publishing.
 * For example:
 * - Furniture usually needs dimensions and pickup location.
 * - Electronics usually need model number and accessories.
 */
export function detectMissingInfo(
  input: SellerAgentInput,
  attributes: ItemAttributes,
): string[] {
  const missingInfo: string[] = [];

  // Original price helps us estimate a more reasonable second-hand price.
  if (!input.originalPrice) {
    missingInfo.push("Original price");
  }

  // Features make the listing more specific and attractive.
  if (!attributes.features.length) {
    missingInfo.push("Key features");
  }

  // Furniture buyers usually care about size and pickup logistics.
  if (attributes.category === "Home & Furniture") {
    missingInfo.push("Dimensions");
    missingInfo.push("Pickup location");
  }

  // Electronics buyers usually care about exact model and included items.
  if (attributes.category === "Electronics") {
    missingInfo.push("Model number");
    missingInfo.push("Included accessories");
  }

  return missingInfo;
}
