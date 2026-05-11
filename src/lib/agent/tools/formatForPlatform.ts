import type { Platform, PlatformListing } from "@/types/listing";

/**
 * Customize the base listing for a specific marketplace platform.
 *
 * Different platforms have different writing styles:
 * - Facebook Marketplace: casual and practical
 * - Xiaohongshu: more lifestyle-oriented Chinese copy
 * - Xianyu: concise Chinese second-hand marketplace style
 * - eBay: more transaction/detail oriented
 */
export function formatForPlatform(
  baseListing: PlatformListing,
  platform: Platform,
): PlatformListing {
  switch (platform) {
    case "facebook":
      return {
        title: baseListing.title,
        description: `${baseListing.description}\n\nPickup only. Message me if interested.`,
      };

    case "xiaohongshu":
      return {
        title: `二手好物｜${baseListing.title}`,
        description: `${baseListing.description}\n\n适合自用/搬家出闲置，可私信了解详情。`,
      };

    case "xianyu":
      return {
        title: `闲置｜${baseListing.title}`,
        description: `${baseListing.description}\n\n诚心出，感兴趣可以聊。`,
      };

    case "ebay":
      return {
        title: baseListing.title,
        description: `${baseListing.description}\n\nPlease review all details before purchasing.`,
      };

    default:
      return baseListing;
  }
}
