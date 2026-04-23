import { BSON } from "mongodb"; 
import { writeFile } from "fs/promises"; 
import dotenv from "dotenv";  
  
// Load environment variables  
dotenv.config();  
  
const { Binary, EJSON } = BSON; // Import BSON utilities  
  
// Set your API key from environment or fallback to hardcoded value (not recommended for production)  
const apiKey = process.env.VOYAGE_API_KEY || "<VOYAGEAI-API-KEY>";  
const QUERY_TEXT = <QUERY-TEXT>;
  
if (!apiKey || apiKey === "<VOYAGEAI-API-KEY>") {  
  throw new Error("API key not found. Provide the VOYAGEAI_API_KEY in environment variables.");  
}  
  
// Define the Voyage AI REST API endpoint  
const apiEndpoint = "https://ai.mongodb.com/v1/embeddings";  
  
/**  
 * Fetch embeddings using Voyage AI REST API  
 */  
async function fetchEmbeddings(data, model, inputType, outputDtype, outputDimension) {  
  try {  
    const response = await fetch(apiEndpoint, {  
      method: "POST",  
      headers: {  
        "Content-Type": "application/json",  
        Authorization: `Bearer ${apiKey}`,  
      },  
      body: JSON.stringify({  
        input: data,  
        model,  
        input_type: inputType,  
        output_dtype: outputDtype,  
        output_dimension: outputDimension,  
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
      console.error("Full API Response:", responseData);  
      throw new Error("Embeddings are not present or not returned in array format.");  
    }  
  
    return responseData.data.map((item) => item.embedding); // Extract embeddings  
  } catch (error) {  
    console.error(`Error fetching embeddings for output_dtype "${outputDtype}":`, error);  
    throw error;  
  }  
}  
  
/**  
 * Create BSON Binary objects using VECTOR_TYPE for all embedding types  
 */  
function convertEmbeddingsToBSON(data, float, int8, ubinary) {  
  return data.map((text, index) => ({  
    text,  
    bsonEmbeddings: {  
      float32: Binary.fromFloat32Array(new Float32Array(float[index])),  
      int8: Binary.fromInt8Array(new Int8Array(int8[index])),  
      int1: Binary.fromPackedBits(new Uint8Array(ubinary[index])),  
    },  
  }));  
}  
  
/**  
 * Serialize BSON embeddings and save to JSON file  
 */  
async function saveBSONEmbeddingsToFile(bsonEmbeddingsData, outputFileName) {  
  try {  
    // Serialize BSON data to JSON format using EJSON  
    const ejsonSerializedData = EJSON.stringify(bsonEmbeddingsData, null, 2, {  
      relaxed: true, // Store binary as raw binary data without base64 encoding  
    });  
  
    // Write serialized data to a file  
    await writeFile(outputFileName, ejsonSerializedData);  
    console.log(`Embeddings with BSON vectors have been saved to ${outputFileName}`);  
  } catch (error) {  
    console.error(`Error saving BSON embeddings to file "${outputFileName}":`, error);  
    throw error;  
  }  
}  
  
/**  
 * Process query text, fetch embeddings, convert to BSON, and write to JSON  
 */  
async function main(queryText) {  
  try {  
    if (!queryText || typeof queryText !== "string" || queryText.trim() === "") {  
      throw new Error("Invalid query text. It must be a non-empty string.");  
    }  
  
    const data = [queryText];  
    const model = "voyage-3-large";  
    const inputType = "query";  
    const dimension = 1024;  
  
    // Fetch embeddings for different data types  
    const floatEmbeddings = await fetchEmbeddings(data, model, inputType, "float", dimension);  
    const int8Embeddings = await fetchEmbeddings(data, model, inputType, "int8", dimension);  
    const packedBitsEmbeddings = await fetchEmbeddings(data, model, inputType, "ubinary", dimension);  
  
    // Convert embeddings into BSON-compatible format  
    const bsonEmbeddingsData = convertEmbeddingsToBSON(  
      data,  
      floatEmbeddings,  
      int8Embeddings,  
      packedBitsEmbeddings  
    );  
  
    // Save BSON embeddings to JSON file  
    const outputFileName = "query-embeddings.json";  
    await saveBSONEmbeddingsToFile(bsonEmbeddingsData, outputFileName);  
  } catch (error) {  
    console.error("Error processing query text:", error);  
  }  
}  
  
// Main function invocation  
(async () => {  
  const queryText = QUERY-TEXT; 
  await main(queryText);  
})();  
