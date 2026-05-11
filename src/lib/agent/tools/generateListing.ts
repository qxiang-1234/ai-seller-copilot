import type {
  ItemAttributes,
  PlatformListing,
  PricingResult,
} from "@/types/listing";

/**
 * Generate a base listing before adapting it to each platform.
 *
 * This base listing is platform-neutral.
 * Later, formatForPlatform() will customize it for Facebook, Xiaohongshu, Xianyu, or eBay.
 */
export function generateListing(
  attributes: ItemAttributes,
  pricing: PricingResult,
): PlatformListing {
  /**
   * If the user provides features, use them in the listing.
   * Otherwise, use a safe generic phrase.
   *
   * Important:
   * We avoid making up specific features that the user did not provide.
   */
  const featureText = attributes.features.length
    ? attributes.features.join(", ")
    : "useful everyday features";

  return {
    title: `${attributes.itemName} - ${attributes.condition} Condition`,
    description: `Selling a ${attributes.itemName} in ${attributes.condition.toLowerCase()} condition. Features include ${featureText}. Suggested price range: ${pricing.suggestedRange}.`,
  };
}
