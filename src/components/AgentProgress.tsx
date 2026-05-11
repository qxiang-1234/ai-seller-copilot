type AgentProgressStatus = "idle" | "running" | "completed";

type AgentProgressProps = {
  /**
   * Controls how the workflow steps should be displayed.
   *
   * idle: user has not generated anything yet
   * running: agent is currently generating
   * completed: agent has finished successfully
   */
  status: AgentProgressStatus;
};

const AGENT_STEPS = [
  "Analyze item information",
  "Detect missing details",
  "Estimate resale price",
  "Generate base listing",
  "Format for selected platforms",
  "Review for missing or exaggerated claims",
];

export function AgentProgress({ status }: AgentProgressProps) {
  return (
    <section>
      <h3>Agent Workflow</h3>

      <ol>
        {AGENT_STEPS.map((step, index) => (
          <li key={step}>
            <span>{getStepIcon(status)}</span>
            <span>
              Step {index + 1}: {step}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Return the icon we want to show for each agent status.
 *
 * For now, all steps share the same status.
 * Later, we can make each individual step update separately.
 */
function getStepIcon(status: AgentProgressStatus) {
  if (status === "running") {
    return "⏳";
  }

  if (status === "completed") {
    return "✅";
  }

  return "○";
}
