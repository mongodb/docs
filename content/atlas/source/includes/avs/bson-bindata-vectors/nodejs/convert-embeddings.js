import fs from "fs/promises"; 
import { BSON } from "mongodb"; 
const { Binary } = BSON; 
  
async function main() {  
  try {  
    // Read the contents of the original 'embeddings.json' file  
    const fileContent = await fs.readFile("embeddings.json", "utf8");  
    const embeddingsData = JSON.parse(fileContent); // Parse JSON into a JavaScript object  
  
    // Validate the structure of the original input data  
    if (!Array.isArray(embeddingsData)) {  
      throw new Error("'embeddings.json' must contain an array of objects.");  
    }  
  
    // Convert embeddings to BSON-compatible format  
    const convertEmbeddingsData = embeddingsData.map(({ text, embeddings }) => {  
      // Field validation to ensure all required embeddings are present  
      if (  
        !embeddings ||  
        !Array.isArray(embeddings.float) ||  
        !Array.isArray(embeddings.int8) ||  
        !Array.isArray(embeddings.ubinary)  
      ) {  
        throw new Error(`Embeddings are missing or invalid for text: "${text}"`);  
      }  
  
      // Convert embeddings to BSON-compatible binary format  
      const bsonFloat32 = Binary.fromFloat32Array(new Float32Array(embeddings.float));  
      const bsonInt8 = Binary.fromInt8Array(new Int8Array(embeddings.int8));  
      const bsonPackedBits = Binary.fromPackedBits(new Uint8Array(embeddings.ubinary));  
  
      // Return the updated object structure  
      return {  
        text,  
        embeddings: {  // Original embeddings
          float: embeddings.float, 
          int8: embeddings.int8,  
          ubinary: embeddings.ubinary,  
        },  
        bsonEmbeddings: {  // BSON embeddings
          float32: bsonFloat32, 
          int8: bsonInt8,
          packedBits: bsonPackedBits, 
        },  
      };  
    });  
  
    // Serialize the updated data to BSON-compatible JSON using EJSON  
    const ejsonSerializedData = BSON.EJSON.stringify(convertEmbeddingsData, null, 2, { relaxed: false });  
  
    // Write the updated BSON-converted data back to the same 'embeddings.json' file  
    await fs.writeFile("embeddings.json", ejsonSerializedData);  
  
    console.log("Embeddings with BSON vectors have been saved to embeddings.json");  
  } catch (error) {  
    // Print detailed error information  
    console.error("Error processing embeddings:", error);  
  }  
}  
  
// Execute the conversion process  
main();  
