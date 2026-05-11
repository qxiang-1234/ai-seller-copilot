"use client";

import { useState } from "react";
import type { Platform, SellerAgentInput } from "@/types/listing";

type ListingFormProps = {
  /**
   * Parent component passes this function in.
   * When the user submits the form, we send the cleaned form data back to page.tsx.
   */
  onSubmit: (input: SellerAgentInput) => void;
  isLoading: boolean;
};

const PLATFORM_OPTIONS: { label: string; value: Platform }[] = [
  { label: "Facebook Marketplace", value: "facebook" },
  { label: "Xiaohongshu", value: "xiaohongshu" },
  { label: "Xianyu", value: "xianyu" },
  { label: "eBay", value: "ebay" },
];

export function ListingForm({ onSubmit, isLoading }: ListingFormProps) {
  // Store all form field values in React state.
  const [itemName, setItemName] = useState("");
  const [condition, setCondition] = useState("");
  const [features, setFeatures] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [targetPlatforms, setTargetPlatforms] = useState<Platform[]>([
    "facebook",
  ]);

  function handlePlatformChange(platform: Platform) {
    /**
     * If the platform is already selected, remove it.
     * Otherwise, add it to the selected platform list.
     */
    setTargetPlatforms((currentPlatforms) => {
      if (currentPlatforms.includes(platform)) {
        return currentPlatforms.filter((item) => item !== platform);
      }

      return [...currentPlatforms, platform];
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from refreshing the page when the form submits.
    event.preventDefault();

    onSubmit({
      itemName,
      condition,
      features,
      originalPrice,
      targetPlatforms,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="itemName">Item name</label>
        <input
          id="itemName"
          value={itemName}
          onChange={(event) => setItemName(event.target.value)}
          placeholder="Floor lamp"
        />
      </div>

      <div>
        <label htmlFor="condition">Condition</label>
        <input
          id="condition"
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
          placeholder="Good"
        />
      </div>

      <div>
        <label htmlFor="features">Features</label>
        <textarea
          id="features"
          value={features}
          onChange={(event) => setFeatures(event.target.value)}
          placeholder="3 brightness levels, adjustable angle"
        />
      </div>

      <div>
        <label htmlFor="originalPrice">Original price</label>
        <input
          id="originalPrice"
          value={originalPrice}
          onChange={(event) => setOriginalPrice(event.target.value)}
          placeholder="75"
        />
      </div>

      <fieldset>
        <legend>Target platforms</legend>

        {PLATFORM_OPTIONS.map((platform) => (
          <label key={platform.value}>
            <input
              type="checkbox"
              checked={targetPlatforms.includes(platform.value)}
              onChange={() => handlePlatformChange(platform.value)}
            />
            {platform.label}
          </label>
        ))}
      </fieldset>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate listing"}
      </button>
    </form>
  );
}
