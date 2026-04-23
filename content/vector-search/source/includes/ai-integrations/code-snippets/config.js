import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import OpenAI from "openai";
        
// Load environment variables from .env file
dotenv.config();

// MongoDB cluster configuration
export const MONGODB_URI = process.env.MONGODB_URI;
export const mongoClient = new MongoClient(MONGODB_URI);
export const agentDb = mongoClient.db("ai_agent_db");
export const vectorCollection = agentDb.collection("embeddings");
export const memoryCollection = agentDb.collection("chat_history");

// Model Configuration
export const OPENAI_MODEL = "gpt-4o";
export const VOYAGE_MODEL = "voyage-3-large";
export const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;

// Initialize OpenAI Client
export const openAIClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY,});