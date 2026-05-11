import type {
  Platform,
  SellerAgentInput,
  SellerAgentResult,
} from "@/types/listing";
import { analyzeItemInfo } from "./tools/analyzeItemInfo";
import { detectMissingInfo } from "./tools/detectMissingInfo";
import { estimatePrice } from "./tools/estimatePrice";
import { formatForPlatform } from "./tools/formatForPlatform";
import { generateListing } from "./tools/generateListing";
import { reviewListing } from "./tools/reviewListing";

/**
 * Main agent orchestrator.
 *
 * This function controls the full seller agent workflow:
 * 1. Analyze item information
 * 2. Detect missing information
 * 3. Estimate price
 * 4. Generate a base listing
 * 5. Format listing for selected platforms
 * 6. Review the final result
 *
 * Right now each step is rule-based.
 * Later, we can replace one or more steps with OpenAI API calls.
 */
export async function runSellerAgent(
  input: SellerAgentInput,
): Promise<SellerAgentResult> {
  // Step 1: Convert raw user input into structured product attributes.
  const itemAttributes = analyzeItemInfo(input);

  // Step 2: Check what important listing information is missing.
  const missingInfo = detectMissingInfo(input, itemAttributes);

  // Step 3: Estimate a resale price range.
  const pricing = estimatePrice(input);

  // Step 4: Generate one generic listing before platform-specific formatting.
  const baseListing = generateListing(itemAttributes, pricing);

  /**
   * Step 5: Generate platform-specific versions.
   *
   * Example:
   * If user selected ["facebook", "xiaohongshu"],
   * we only generate listings for those two platforms.
   */
  const platformListings = input.targetPlatforms.reduce<
    SellerAgentResult["platformListings"]
  >((acc, platform: Platform) => {
    acc[platform] = formatForPlatform(baseListing, platform);
    return acc;
  }, {});

  // Step 6: Review the result and provide warnings/suggestions.
  const review = reviewListing(input);

  return {
    itemAttributes,
    missingInfo,
    pricing,
    platformListings,
    review,
  };
}
