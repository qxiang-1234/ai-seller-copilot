"use client";

import { useState } from "react";
import styles from "./ListingForm.module.css";
import type { Platform, SellerAgentInput } from "@/types/listing";

type ListingFormProps = {
  /**
   * Parent component passes this function in.
   * When the user submits the form, we send the cleaned form data back to page.tsx.
   */
  onSubmit: (input: SellerAgentInput) => void;
  isLoading: boolean;
};

type FormErrors = {
  itemName?: string;
  condition?: string;
  targetPlatforms?: string;
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

  // Store field-level validation errors.
  const [errors, setErrors] = useState<FormErrors>({});

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

    const nextErrors = validateForm({
      itemName,
      condition,
      targetPlatforms,
    });

    setErrors(nextErrors);

    // If there are validation errors, stop here and do not call the API.
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      itemName: itemName.trim(),
      condition: condition.trim(),
      features: features.trim(),
      originalPrice: originalPrice.trim(),
      targetPlatforms,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="itemName">
          Item name
        </label>

        <input
          className={styles.input}
          id="itemName"
          value={itemName}
          onChange={(event) => setItemName(event.target.value)}
          placeholder="Floor lamp"
        />

        {errors.itemName && <p className={styles.error}>{errors.itemName}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="condition">
          Condition
        </label>

        <input
          className={styles.input}
          id="condition"
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
          placeholder="Good"
        />

        {errors.condition && <p className={styles.error}>{errors.condition}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="features">
          Features
        </label>

        <textarea
          className={styles.textarea}
          id="features"
          value={features}
          onChange={(event) => setFeatures(event.target.value)}
          placeholder="3 brightness levels, adjustable angle"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="originalPrice">
          Original price
        </label>

        <input
          className={styles.input}
          id="originalPrice"
          value={originalPrice}
          onChange={(event) => setOriginalPrice(event.target.value)}
          placeholder="75"
        />
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Target platforms</legend>

        {PLATFORM_OPTIONS.map((platform) => (
          <label className={styles.checkboxLabel} key={platform.value}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={targetPlatforms.includes(platform.value)}
              onChange={() => handlePlatformChange(platform.value)}
            />
            {platform.label}
          </label>
        ))}

        {errors.targetPlatforms && (
          <p className={styles.error}>{errors.targetPlatforms}</p>
        )}
      </fieldset>

      <button className={styles.button} type="submit" disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate listing"}
      </button>
    </form>
  );
}

/**
 * Validate required form fields before calling the API.
 *
 * This gives users immediate feedback and avoids unnecessary API requests.
 */
function validateForm(input: {
  itemName: string;
  condition: string;
  targetPlatforms: Platform[];
}): FormErrors {
  const errors: FormErrors = {};

  if (!input.itemName.trim()) {
    errors.itemName = "Item name is required.";
  }

  if (!input.condition.trim()) {
    errors.condition = "Condition is required.";
  }

  if (input.targetPlatforms.length === 0) {
    errors.targetPlatforms = "Please select at least one platform.";
  }

  return errors;
}
