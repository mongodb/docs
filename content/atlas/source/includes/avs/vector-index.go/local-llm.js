import { loadModel, createCompletionStream } from "gpt4all";
import { getQueryResults } from './retrieve-documents.js';

async function run() {
    try {
        const query = "beach house";

        const documents = await getQueryResults(query);

        let textDocuments = "";
        documents.forEach(doc => {
            const summary = doc.summary;
            const link = doc.listing_url;
            const string = `Summary: ${summary} Link: ${link}. \n`
            textDocuments += string;
        });

        const model = await loadModel(
            "mistral-7b-openorca.gguf2.Q4_0.gguf", {
                verbose: true,
                allowDownload: false,
                modelConfigFile: "./models3.json"
            }
        );

        const question = "Can you recommend me a few AirBnBs that are beach houses? Include a link to the listings.";
        
        const prompt = `Use the following pieces of context to answer the question at the end.
            {${textDocuments}}
            Question: {${question}}`;

        process.stdout.write("Output: ");
        const stream = createCompletionStream(model, prompt);
        stream.tokens.on("data", (data) => {
            process.stdout.write(data);
        });
        //wait till stream finishes.
        await stream.result;
        process.stdout.write("\n");
        model.dispose();
        console.log("\n Source documents: \n");
        console.log(textDocuments);
    } catch (err) {
        console.log(err.stack);
    }
}
run().catch(console.dir);
