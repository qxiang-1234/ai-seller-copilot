"use client";

import { useState } from "react";

type CopyButtonProps = {
  /**
   * The text that should be copied to the user's clipboard.
   */
  text: string;
};

export function CopyButton({ text }: CopyButtonProps) {
  // Track whether the copy action succeeded, so we can show user feedback.
  const [hasCopied, setHasCopied] = useState(false);

  async function handleCopy() {
    try {
      /**
       * navigator.clipboard writes text into the system clipboard.
       * This works in modern browsers on secure origins like localhost or HTTPS.
       */
      await navigator.clipboard.writeText(text);

      setHasCopied(true);

      // Reset the button label after a short delay.
      window.setTimeout(() => {
        setHasCopied(false);
      }, 1500);
    } catch {
      /**
       * In a real product, we may show a toast or fallback copy method here.
       * For now, we keep the UI simple.
       */
      setHasCopied(false);
    }
  }

  return (
    <button type="button" onClick={handleCopy}>
      {hasCopied ? "Copied!" : "Copy"}
    </button>
  );
}
