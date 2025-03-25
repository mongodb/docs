const fs = require('fs/promises');
const { BSON } = require('mongodb');
const { Binary } = BSON;

async function main() {
  try {
    // Read and parse the contents of 'embeddings.json' file
    const fileContent = await fs.readFile('embeddings.json', 'utf8');
    const embeddingsData = JSON.parse(fileContent);

    // Map the embeddings data to add BSON binary representations with subtype 9
    const convertEmbeddingsData = embeddingsData.map(({ text, embeddings }) => {
      // Create Binary for Float32Array with manual subtype 9
      const bsonFloat32 = Binary.fromFloat32Array(new Float32Array(embeddings.float));

      // Create Binary for Int8Array with subtype 9
      const bsonInt8 = Binary.fromInt8Array(new Int8Array(embeddings.int8));

      // Create Binary for PackedBits (Uint8Array) with subtype 9
      const bsonPackedBits = Binary.fromPackedBits(new Uint8Array(embeddings.ubinary));

      return {
        text,
        embeddings: {
          float: embeddings.float, // Original float data
          int8: embeddings.int8, // Original int8 data
          ubinary: embeddings.ubinary, // Original packed bits data
        },
        bsonEmbeddings: {
          float32: bsonFloat32,
          int8: bsonInt8,
          packedBits: bsonPackedBits,
        },
      };
    });

    // Serialize the updated data to EJSON for BSON compatibility
    const ejsonSerializedData = BSON.EJSON.stringify(convertEmbeddingsData, null, null, { relaxed: false });

    // Write the serialized data to 'embeddings.json'
    await fs.writeFile('embeddings.json', ejsonSerializedData);
    console.log('Embeddings with BSON vectors have been saved to embeddings.json');
  } catch (error) {
    console.error('Error processing embeddings:', error);
  }
}

main();
