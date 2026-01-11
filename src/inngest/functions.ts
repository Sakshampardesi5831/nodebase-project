import { prisma } from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();
const openAi = createOpenAI();
const anthropic = createAnthropic();
export const execute = inngest.createFunction(
  { id: "execute" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend", "5s");

    const { steps: geminiStep } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        system: "You are helpful assistant",
        prompt: "what is 2+2?",
        model: google("gemini-2.5-flash"),
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );

    const { steps: openAiStep } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        system: "You are helpful assistant",
        prompt: "what is 2+2?",
        model: openAi("gpt-4"),
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );
    const { steps: anthropicStep } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        system: "You are helpful assistant",
        prompt: "what is 2+2?",
        model: anthropic("claude-sonnet-4-5"),
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );

    const stepOutput = {
      geminiStep: geminiStep,
      openAiStep: openAiStep,
      anthropicStep: anthropicStep,
    };

    return stepOutput;
  },
);
