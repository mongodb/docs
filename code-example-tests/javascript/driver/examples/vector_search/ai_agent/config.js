// :replace-start: {
//    "terms": {
//       "CONNECTION_STRING": "MONGODB_URI",
//       "export let openAIClient": "export const openAIClient"
//    }
// }
// :snippet-start: config
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import OpenAI from 'openai';

// Load environment variables from .env file
dotenv.config();

// MongoDB cluster configuration
export const MONGODB_URI = process.env.CONNECTION_STRING;
export const mongoClient = new MongoClient(MONGODB_URI);
export const agentDb = mongoClient.db('ai_agent_db');
export const vectorCollection = agentDb.collection('embeddings');
export const memoryCollection = agentDb.collection('chat_history');

// Model Configuration
export const OPENAI_MODEL = 'gpt-4o';
export const VOYAGE_MODEL = 'voyage-4-large';
export const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;

// Initialize OpenAI Client
export let openAIClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// :remove-start:
// Tests route OpenAI calls through the Grove AI gateway, which authenticates
// with an api-key header instead of a bearer token. This override is stripped
// from the published snippet so readers see the standard vendor client above.
openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
  defaultHeaders: { 'api-key': process.env.OPENAI_API_KEY },
});
// :remove-end:
// :snippet-end:
// :replace-end:
