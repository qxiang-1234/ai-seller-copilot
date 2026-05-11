import { CopyButton } from "@/components/CopyButton";
import { PlatformBadge } from "@/components/PlatformBadge";
import styles from "./ListingResult.module.css";
import type { SellerAgentResult } from "@/types/listing";

type ListingResultProps = {
  /**
   * The structured result returned by our seller agent.
   * If result is null, this component should not render anything.
   */
  result: SellerAgentResult | null;
};

export function ListingResult({ result }: ListingResultProps) {
  if (!result) {
    return null;
  }

  return (
    <section className={styles.result}>
      <h2 className={styles.title}>Generated Result</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Item Attributes</h3>

        <p className={styles.field}>
          <strong>Category:</strong> {result.itemAttributes.category}
        </p>

        <p className={styles.field}>
          <strong>Item:</strong> {result.itemAttributes.itemName}
        </p>

        <p className={styles.field}>
          <strong>Condition:</strong> {result.itemAttributes.condition}
        </p>

        <strong>Features:</strong>
        {result.itemAttributes.features.length > 0 ? (
          <ul className={styles.list}>
            {result.itemAttributes.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>No features provided.</p>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Missing Information</h3>

        {result.missingInfo.length > 0 ? (
          <ul className={styles.list}>
            {result.missingInfo.map((info) => (
              <li key={info}>{info}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>No major missing information detected.</p>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Pricing</h3>

        <p className={styles.field}>
          <strong>Suggested range:</strong> {result.pricing.suggestedRange}
        </p>

        <p className={styles.field}>
          <strong>Confidence:</strong> {result.pricing.confidence}
        </p>

        <p className={styles.description}>{result.pricing.reasoning}</p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Platform Listings</h3>

        <div className={styles.platformList}>
          {Object.entries(result.platformListings).map(
            ([platform, listing]) => {
              if (!listing) {
                return null;
              }

              return (
                <article className={styles.platformCard} key={platform}>
                  <div className={styles.platformHeader}>
                    <h4 className={styles.platformTitle}>
                      <PlatformBadge platform={platform} />
                    </h4>

                    <CopyButton
                      text={`Title: ${listing.title}\n\n${listing.description}`}
                    />
                  </div>

                  <p className={styles.field}>
                    <strong>Title:</strong> {listing.title}
                  </p>

                  <p className={styles.field}>
                    <strong>Description:</strong>
                  </p>

                  <p className={styles.description}>{listing.description}</p>
                </article>
              );
            },
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Review</h3>

        <strong>Warnings:</strong>
        {result.review.warnings.length > 0 ? (
          <ul className={`${styles.list} ${styles.warningList}`}>
            {result.review.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>No warnings.</p>
        )}

        <strong>Suggestions:</strong>
        {result.review.suggestions.length > 0 ? (
          <ul className={`${styles.list} ${styles.suggestionList}`}>
            {result.review.suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>No suggestions.</p>
        )}
      </section>
    </section>
  );
}
