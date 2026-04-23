import { memoryCollection } from './config.js';

/**
 * Store a chat message in the memory collection.
 * @param {string} sessionId - unique identifier for the chat session
 * @param {string} role - role of the sender (user or system)
 * @param {string} content - content of the message
 */
export async function storeChatMessage(sessionId, role, content) {
    const message = {
        session_id: sessionId,
        role,
        content,
        timestamp: new Date(), // use JS date for timestamp
    };
    await memoryCollection.insertOne(message);
}

/**
 * Retrieve the chat history for a session.
 * @param {string} sessionId - unique identifier for the chat session
 * @returns {Promise<Array<{role: string, content: string}>>}
 */
export async function retrieveSessionHistory(sessionId) {
    const cursor = memoryCollection
        .find({ session_id: sessionId })
        .sort({ timestamp: 1 });

    const messages = [];
    await cursor.forEach(msg => {
        messages.push({ role: msg.role, content: msg.content });
    });
    return messages;
}