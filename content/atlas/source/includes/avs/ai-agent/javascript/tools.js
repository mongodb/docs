import { getEmbedding } from './ingest-data.js';
import { vectorCollection } from './config.js'; 
import { evaluate } from 'mathjs'; 

// Vector search tool
export async function vectorSearchTool(userInput) {
    const queryEmbedding = await getEmbedding(userInput, "query"); 

    const pipeline = [
        {
            $vectorSearch: {
                index: "vector_index",
                queryVector: queryEmbedding,
                path: "embedding",
                exact: true, 
                limit: 5
            }
        },
        {
            $project: {
                _id: 0,
                "document.pageContent": 1
            }
        }
    ];

    const cursor = vectorCollection.aggregate(pipeline);
    const results = await cursor.toArray();
    return results;
}

// Simple calculator tool
export function calculatorTool(userInput) {
    try {
        const result = evaluate(userInput);
        return String(result);
    } catch (e) {
        return `Error: ${e.message}`;
    }
}