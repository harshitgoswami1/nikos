import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import dotenv from 'dotenv';
dotenv.config();

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export function getAgentModel() {
    const provider = openrouter;
    const modelId = process.env.OPENROUTER_DEFAULT_MODEL
    return provider(modelId);
}