import { getQueryResults } from './retrieve-documents.js';

async function run() {
    try {
        const query = "beach house";

        const documents = await getQueryResults(query);
        documents.forEach(doc => {
            console.log(doc);
        });
    } catch (err) {
        console.log(err.stack);
    }
}
run().catch(console.dir);
