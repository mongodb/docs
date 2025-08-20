import { vectorSearchTool, calculatorTool } from './tools.js';
import { storeChatMessage, retrieveSessionHistory } from './memory.js';
import { openAIClient, OPENAI_MODEL } from './config.js';

// OpenAI chat completion helper
export async function openAIChatCompletion(messages) {
    try {
        const completion = await openAIClient.chat.completions.create({
            model: OPENAI_MODEL,
            messages,
            max_tokens: 1024,
        });

        return completion.choices[0].message.content;
    
    } catch (error) {
        console.error("Error in openAIChatCompletion:", error);
        throw error;
    }
}


// Tool selector function to determine which tool to use based on user input and session history
export async function toolSelector(userInput, sessionHistory = []) {
    const systemPrompt = `
Select the appropriate tool from the options below. Consider the full context of the conversation before deciding.

Tools available:
- vector_search_tool: Retrieve specific context about recent MongoDB earnings and announcements
- calculator_tool: For mathematical operations
- none: For general questions without additional context

Process for making your decision:
1. Analyze if the current question relates to or follows up on a previous vector search query
2. For follow-up questions, incorporate context from previous exchanges to create a comprehensive search query
3. Only use calculator_tool for explicit mathematical operations
4. Default to none only when certain the other tools won't help

When continuing a conversation:
- Identify the specific topic being discussed
- Include relevant details from previous exchanges
- Formulate a query that stands alone but preserves conversation context

Return a JSON object only: {"tool": "selected_tool", "input": "your_query"}
    `.trim();

    const messages = [
        { role: "system", content: systemPrompt },
        ...sessionHistory,
        { role: "user", content: userInput }
    ];

    try {
        const response = await openAIChatCompletion(messages); 
        let toolCall;
        try {
            toolCall = JSON.parse(response);
        } catch {
            try {
                toolCall = eval(`(${response})`);
            } catch {
                return { tool: "none", input: userInput };
            }
        }
        return {
            tool: toolCall.tool || "none",
            input: toolCall.input || userInput
        };
    } catch (err) {
        console.error("Error in toolSelector:", err);
        return { tool: "none", input: userInput };
    }
}

// Function to get LLM response based on messages and system message content
async function getLlmResponse(messages, systemMessageContent) {
    const systemMessage = { role: "system", content: systemMessageContent };
    let fullMessages;
    if (messages.some(msg => msg.role === "system")) {
        fullMessages = [...messages, systemMessage];
    } else {
        fullMessages = [systemMessage, ...messages];
    }
    const response = await openAIChatCompletion(fullMessages);
    return response;
}


// Function to generate response based on user input
export async function generateResponse(sessionId, userInput) {
    await storeChatMessage(sessionId, "user", userInput);

    const sessionHistory = await retrieveSessionHistory(sessionId);
    const llmInput = [...sessionHistory, { role: "user", content: userInput }];

    const { tool, input: toolInput } = await toolSelector(userInput, sessionHistory);
    console.log("Tool selected:", tool);

    let response;
    if (tool === "vector_search_tool") {
        const contextResults = await vectorSearchTool(toolInput);
        const context = contextResults.map(doc => doc.document?.pageContent || JSON.stringify(doc)).join('\n---\n');
        const systemMessageContent = `
Answer the user's question based on the retrieved context and conversation history.
1. First, understand what specific information the user is requesting
2. Then, locate the most relevant details in the context provided
3. Finally, provide a clear, accurate response that directly addresses the question

If the current question builds on previous exchanges, maintain continuity in your answer.
Only state facts clearly supported by the provided context. If information is not available, say 'I DON'T KNOW'.

Context:
${context}
        `.trim();
        response = await getLlmResponse(llmInput, systemMessageContent);    

    } else if (tool === "calculator_tool") {
        response = calculatorTool(toolInput);
    } else {
        const systemMessageContent = "You are a helpful assistant. Respond to the user's prompt as best as you can based on the conversation history.";
        response = await getLlmResponse(llmInput, systemMessageContent);
    }

    await storeChatMessage(sessionId, "system", response);
    return response;
}