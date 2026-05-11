import { PlatformBadge } from "@/components/PlatformBadge";
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
    <section>
      <h2>Generated Result</h2>

      <div>
        <h3>Item Attributes</h3>

        <p>
          <strong>Category:</strong> {result.itemAttributes.category}
        </p>

        <p>
          <strong>Item:</strong> {result.itemAttributes.itemName}
        </p>

        <p>
          <strong>Condition:</strong> {result.itemAttributes.condition}
        </p>

        <strong>Features:</strong>
        {result.itemAttributes.features.length > 0 ? (
          <ul>
            {result.itemAttributes.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p>No features provided.</p>
        )}
      </div>

      <div>
        <h3>Missing Information</h3>

        {result.missingInfo.length > 0 ? (
          <ul>
            {result.missingInfo.map((info) => (
              <li key={info}>{info}</li>
            ))}
          </ul>
        ) : (
          <p>No major missing information detected.</p>
        )}
      </div>

      <div>
        <h3>Pricing</h3>

        <p>
          <strong>Suggested range:</strong> {result.pricing.suggestedRange}
        </p>

        <p>
          <strong>Confidence:</strong> {result.pricing.confidence}
        </p>

        <p>{result.pricing.reasoning}</p>
      </div>

      <div>
        <h3>Platform Listings</h3>

        {Object.entries(result.platformListings).map(([platform, listing]) => {
          if (!listing) {
            return null;
          }

          return (
            <article key={platform}>
              <h4>
                <PlatformBadge platform={platform} />
              </h4>

              <p>
                <strong>Title:</strong> {listing.title}
              </p>

              <p>
                <strong>Description:</strong>
              </p>

              <p>{listing.description}</p>
            </article>
          );
        })}
      </div>

      <div>
        <h3>Review</h3>

        <strong>Warnings:</strong>
        {result.review.warnings.length > 0 ? (
          <ul>
            {result.review.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        ) : (
          <p>No warnings.</p>
        )}

        <strong>Suggestions:</strong>
        {result.review.suggestions.length > 0 ? (
          <ul>
            {result.review.suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p>No suggestions.</p>
        )}
      </div>
    </section>
  );
}
