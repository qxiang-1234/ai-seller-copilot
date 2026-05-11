type AgentProgressProps = {
  /**
   * Whether the agent is currently running.
   * If true, we show the steps as active/in progress.
   */
  isLoading: boolean;
};

const AGENT_STEPS = [
  "Analyze item information",
  "Detect missing details",
  "Estimate resale price",
  "Generate base listing",
  "Format for selected platforms",
  "Review for missing or exaggerated claims",
];

export function AgentProgress({ isLoading }: AgentProgressProps) {
  return (
    <section>
      <h3>Agent Workflow</h3>

      <ol>
        {AGENT_STEPS.map((step, index) => (
          <li key={step}>
            {/* 
              This is a simple visual indicator.
              Later we can make each step update in real time.
            */}
            <span>{isLoading ? "⏳" : "✅"}</span>
            <span>
              Step {index + 1}: {step}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
