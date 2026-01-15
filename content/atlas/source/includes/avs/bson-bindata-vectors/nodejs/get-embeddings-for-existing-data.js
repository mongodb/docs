import { readFile, writeFile } from "fs/promises"; 
import dotenv from "dotenv"; 
import fetch from "node-fetch"; 
  
// Load environment variables from `.env` file  
dotenv.config();  
  
// Set up API key from environment or fallback to hardcoded value 
const apiKey = process.env.VOYAGE_API_KEY || "<VOYAGE-API-KEY>";  
  
if (!apiKey || apiKey === "<VOYAGE-API-KEY>") {  
  throw new Error("API key not found. Please set VOYAGE_API_KEY in your environment.");  
}  
  
// Define the Voyage AI REST API endpoint  
const apiEndpoint = "https://ai.mongodb.com/v1/embeddings";  
  
/**  
 * Fetch embeddings using Voyage AI REST API for a specific output data type  
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
 * Main function to read input data, fetch embeddings, and save them to JSON  
 */  
async function main() {  
  try {  
    // Read and parse the contents of `subset.json`  
    const subsetData = await readFile("subset.json", "utf-8");  
    const documents = JSON.parse(subsetData);  
  
    // Extract the `summary` fields and keep only non-empty strings  
    const data = documents  
      .map((doc) => doc.summary)  
      .filter((summary) => typeof summary === "string" && summary.trim().length > 0);  
  
    // If no valid data is found, throw an error  
    if (data.length === 0) {  
      throw new Error("No valid summary texts available in the input file.");  
    }  
  
    // Configuration for embeddings  
    const model = "voyage-3-large";   
    const dimension = 1024;          
  
    // Fetch embeddings for different output types (float, int8, ubinary)  
    const floatEmbeddings = await fetchEmbeddings(data, model, "float", dimension);  
    const int8Embeddings = await fetchEmbeddings(data, model, "int8", dimension);  
    const ubinaryEmbeddings = await fetchEmbeddings(data, model, "ubinary", dimension);  
  
    // Map embeddings to their corresponding texts  
    const embeddingsData = data.map((text, index) => ({  
      text,  
      embeddings: {  
        float: floatEmbeddings[index],
        int8: int8Embeddings[index],   
        ubinary: ubinaryEmbeddings[index], 
      },  
    }));  
  
    // Save embeddings to a JSON file  
    const fileName = "embeddings.json";  
    await writeFile(fileName, JSON.stringify(embeddingsData, null, 2));  
    console.log(`Embeddings saved to ${fileName}`);  
  } catch (error) {  
    console.error("Error during embedding generation:", error.message);  
  }  
}  
  
// Execute the main function  
main();  
