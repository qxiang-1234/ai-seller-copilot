export type Platform = "facebook" | "xiaohongshu" | "xianyu" | "ebay";

export type SellerAgentInput = {
  itemName: string;
  condition: string;
  features: string;
  originalPrice?: string;
  targetPlatforms: Platform[];
};

export type ItemAttributes = {
  category: string;
  itemName: string;
  condition: string;
  features: string[];
};

export type PricingResult = {
  suggestedRange: string;
  reasoning: string;
  confidence: "low" | "medium" | "high";
};

export type PlatformListing = {
  title: string;
  description: string;
};

export type ReviewResult = {
  warnings: string[];
  suggestions: string[];
};

export type SellerAgentResult = {
  itemAttributes: ItemAttributes;
  missingInfo: string[];
  pricing: PricingResult;
  platformListings: Partial<Record<Platform, PlatformListing>>;
  review: ReviewResult;
};
