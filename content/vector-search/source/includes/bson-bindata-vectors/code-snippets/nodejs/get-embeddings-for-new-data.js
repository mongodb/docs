import { writeFile } from "fs/promises"; // For saving JSON files  
  
// Retrieve API key from environment or use placeholder value  
const apiKey = process.env.VOYAGE_API_KEY || "<VOYAGE-API-KEY>";  
  
if (!apiKey || apiKey === "<VOYAGE-API-KEY>") {  
  throw new Error("API key not found. Please set VOYAGE_API_KEY in your environment.");  
}  
  
// Define the Voyage AI REST API endpoint  
const apiEndpoint = "https://ai.mongodb.com/v1/embeddings";  
  
/**  
 * Fetch embeddings using Voyage AI REST API for a specific data type (output_dtype)  
 */  
async function fetchEmbeddings(data, model, outputDtype, dimension) {  
  const response = await fetch(apiEndpoint, {  
    method: "POST",  
    headers: {  
      "Content-Type": "application/json",  
      Authorization: `Bearer ${apiKey}`,  
    },  
    body: JSON.stringify({  
      input: data,  
      model,  
      input_type: "document",  
      output_dtype: outputDtype,  
      output_dimension: dimension,  
    }),  
  });  
  
  // Check for non-success status codes  
  if (!response.ok) {  
    const errorResponse = await response.text();  
    throw new Error(`API request failed with status ${response.status}: ${errorResponse}`);  
  }  
  
  const responseData = await response.json();  
  
  // Ensure the response contains valid data  
  if (!responseData.data || !Array.isArray(responseData.data)) {  
    throw new Error(`Invalid API response for dtype "${outputDtype}": 'data' array is missing.`);  
  }  
  
  // Extract embeddings from the response  
  const embeddings = responseData.data.map((item) => item.embedding);  
  
  // Validate embeddings  
  if (!Array.isArray(embeddings) || embeddings.length !== data.length) {  
    throw new Error(`Invalid embeddings received for dtype "${outputDtype}".`);  
  }  
  
  return embeddings; // Return embeddings for the requested dtype  
}  
  
/**  
 * Generate embeddings for predefined texts and save them to a JSON file  
 */  
async function generateEmbeddings() {  
  const data = [  
    "The Great Wall of China is visible from space.",  
    "The Eiffel Tower was completed in Paris in 1889.",  
    "Mount Everest is the highest peak on Earth at 8,848m.",  
    "Shakespeare wrote 37 plays and 154 sonnets during his lifetime.",  
    "The Mona Lisa was painted by Leonardo da Vinci.",  
  ];  
  
  const model = "voyage-3-large";  
  const dimension = 1024; // Output embedding dimension  
  
  try {  
    // Fetch embeddings for different output types  
    const floatEmbeddings = await fetchEmbeddings(data, model, "float", dimension);  
    const int8Embeddings = await fetchEmbeddings(data, model, "int8", dimension); // Use "int8" dtype  
    const ubinaryEmbeddings = await fetchEmbeddings(data, model, "ubinary", dimension); // Use "ubinary" dtype  
  
    // Map embeddings to their corresponding texts  
    const embeddingsData = data.map((text, index) => ({  
      text,  
      embeddings: {  
        float: floatEmbeddings[index], // Store float embeddings  
        int8: int8Embeddings[index], // Store int8 embeddings  
        ubinary: ubinaryEmbeddings[index], // Store ubinary embeddings  
      },  
    }));  
  
    // Save embeddings to a JSON file  
    const fileName = "embeddings.json";  
    await writeFile(fileName, JSON.stringify(embeddingsData, null, 2));  
    console.log(`Embeddings saved to ${fileName}`);  
  } catch (error) {  
    console.error("Error during embedding generation:", error.message);  
    throw error; // Optionally rethrow to halt execution if desired  
  }  
}  
  
// Main process  
(async function main() {  
  try {  
    await generateEmbeddings(); // Execute embedding generation  
  } catch (error) {  
    console.error("Error in main process:", error.message);  
  }  
})();  
