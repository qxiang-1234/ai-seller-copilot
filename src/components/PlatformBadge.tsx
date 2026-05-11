import type { Platform } from "@/types/listing";

type PlatformBadgeProps = {
  /**
   * The platform key from our Platform type.
   * Example: "facebook", "xiaohongshu", "xianyu", "ebay"
   */
  platform: Platform | string;
};

const PLATFORM_LABELS: Record<string, string> = {
  facebook: "Facebook Marketplace",
  xiaohongshu: "Xiaohongshu",
  xianyu: "Xianyu",
  ebay: "eBay",
};

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  /**
   * Convert internal platform key into a user-friendly label.
   * If the platform is unknown, we fall back to the raw value.
   */
  const label = PLATFORM_LABELS[platform] ?? platform;

  return <span>{label}</span>;
}
