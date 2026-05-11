import { NextResponse } from "next/server";
import { runSellerAgent } from "@/lib/agent/runSellerAgent";
import type { Platform, SellerAgentInput } from "@/types/listing";

/**
 * This API route receives item information from the frontend,
 * runs the seller agent workflow, and returns the structured result.
 *
 * Endpoint:
 * POST /api/agent
 */
export async function POST(request: Request) {
  try {
    /**
     * Read the JSON body from the frontend request.
     *
     * Expected body example:
     * {
     *   "itemName": "Floor lamp",
     *   "condition": "Good",
     *   "features": "3 brightness levels, adjustable angle",
     *   "originalPrice": "75",
     *   "targetPlatforms": ["facebook", "xiaohongshu"]
     * }
     */
    const body = await request.json();

    /**
     * Validate and normalize the request body.
     *
     * Right now this is simple manual validation.
     * Later, we can replace it with Zod schema validation.
     */
    const input = parseSellerAgentInput(body);

    /**
     * Run the agent orchestrator.
     *
     * For now, this uses our mock rule-based tools.
     * Later, the internal tools can call OpenAI.
     */
    const result = await runSellerAgent(input);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    /**
     * If anything goes wrong, return a clean error response.
     *
     * This makes frontend error handling easier.
     */
    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 400 },
    );
  }
}

/**
 * Convert unknown request data into a valid SellerAgentInput.
 *
 * This function protects our agent from invalid frontend input.
 */
function parseSellerAgentInput(body: unknown): SellerAgentInput {
  if (!isRecord(body)) {
    throw new Error("Invalid request body.");
  }

  const itemName = String(body.itemName || "").trim();
  const condition = String(body.condition || "").trim();
  const features = String(body.features || "").trim();
  const originalPrice = body.originalPrice
    ? String(body.originalPrice).trim()
    : undefined;

  const targetPlatforms = parseTargetPlatforms(body.targetPlatforms);

  /**
   * Basic required field validation.
   *
   * We require:
   * - item name
   * - condition
   * - at least one target platform
   */
  if (!itemName) {
    throw new Error("Item name is required.");
  }

  if (!condition) {
    throw new Error("Condition is required.");
  }

  if (!targetPlatforms.length) {
    throw new Error("Please select at least one platform.");
  }

  return {
    itemName,
    condition,
    features,
    originalPrice,
    targetPlatforms,
  };
}

/**
 * Validate the selected platforms.
 *
 * This prevents random strings from being passed into the agent.
 */
function parseTargetPlatforms(value: unknown): Platform[] {
  const validPlatforms: Platform[] = [
    "facebook",
    "xiaohongshu",
    "xianyu",
    "ebay",
  ];

  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((platform): platform is Platform =>
    validPlatforms.includes(platform),
  );
}

/**
 * Type guard for checking whether a value is a plain object.
 *
 * This helps TypeScript understand that we can safely access keys on it.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
