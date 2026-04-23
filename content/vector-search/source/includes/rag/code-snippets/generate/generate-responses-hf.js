import { getQueryResults } from './retrieve-documents.js';
import { HfInference } from '@huggingface/inference'

async function run() {
    try {
        // Specify search query and retrieve relevant documents
        const question = "In a few sentences, what are MongoDB's latest AI announcements?";
        const documents = await getQueryResults(question);

        // Build a string representation of the retrieved documents to use in the prompt
        let textDocuments = "";
        documents.forEach(doc => {
            textDocuments += doc.document.pageContent;
        });

        // Create a prompt consisting of the question and context to pass to the LLM
        const prompt = `Answer the following question based on the given context.
            Question: {${question}}
            Context: {${textDocuments}}
        `;

        // Prompt the LLM to generate a response based on the context
        const client = new InferenceClient(process.env.HUGGING_FACE_ACCESS_TOKEN);
        const chatCompletion = await client.chatCompletion({
            provider: "fireworks-ai",
            model: "mistralai/Mixtral-8x22B-Instruct-v0.1",
            messages: [
                {
                    role: "user",
                    content: prompt
                },
            ],
        });

        // Output the LLM's response as text.
        console.log(chatCompletion.choices[0].message.content);
    } catch (err) {
        console.log(err.stack);
    }
}
run().catch(console.dir);
