import readline from 'readline';
import { mongoClient } from './config.js';
import { ingestData, createVectorIndex } from './ingest-data.js';
import { generateResponse } from './planning.js';

// Prompt for user input
async function prompt(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => rl.question(question, answer => {
        rl.close();
        resolve(answer);
    }));
}

async function main() {
    try {
        await mongoClient.connect();

        const runIngest = await prompt("Ingest sample data? (y/n): ");
        if (runIngest.trim().toLowerCase() === 'y') {
            await ingestData();
            console.log("\nAttempting to create/verify Vector Search Index...");
            await createVectorIndex(); 
        } else {
            await createVectorIndex(); // ensure index exists even if not ingesting data
        }
        
        const sessionId = await prompt("Enter a session ID: ");

        while (true) {
            const userQuery = await prompt("\nEnter your query (or type 'quit' to exit): ");
            if (userQuery.trim().toLowerCase() === 'quit') break;

            if (!userQuery.trim()) {
                console.log("Query cannot be empty. Please try again.");
                continue;
            }

            const answer = await generateResponse(sessionId, userQuery);
            console.log("\nAnswer:");
            console.log(answer);
        }
    } finally {
        await mongoClient.close();
    }
}

main();
