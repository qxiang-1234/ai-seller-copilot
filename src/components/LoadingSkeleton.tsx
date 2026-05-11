/**
 * A simple loading skeleton.
 *
 * Skeleton UI makes the product feel more polished than plain "Loading..." text.
 * Later we can style these bars to look animated.
 */
export function LoadingSkeleton() {
  return (
    <section>
      <h3>Generating...</h3>

      <div aria-hidden="true">
        <div style={skeletonLineStyle} />
        <div style={{ ...skeletonLineStyle, width: "80%" }} />
        <div style={{ ...skeletonLineStyle, width: "60%" }} />
      </div>

      <p>Agent is working through the listing workflow.</p>
    </section>
  );
}

const skeletonLineStyle: React.CSSProperties = {
  height: "14px",
  width: "100%",
  borderRadius: "999px",
  background: "#e5e7eb",
  marginBottom: "12px",
};
