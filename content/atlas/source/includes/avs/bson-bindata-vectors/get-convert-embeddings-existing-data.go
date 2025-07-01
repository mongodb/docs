package main  
  
import (  
	"context"  
	"encoding/json"  
	"fmt"  
	"log"  
	"os"  
  
	cohere "github.com/cohere-ai/cohere-go/v2"  
	cohereclient "github.com/cohere-ai/cohere-go/v2/client"  
	"go.mongodb.org/mongo-driver/v2/bson"  
	"go.mongodb.org/mongo-driver/v2/mongo"  
	"go.mongodb.org/mongo-driver/v2/mongo/options"  
)  
  
const (  
	batchSize  = 96  
	dbName     = "sample_airbnb"  
	collName   = "listingsAndReviews"  
	embedModel = "embed-english-v3.0"  
)  
  
func main() {  
	apiKey := os.Getenv("COHERE_API_KEY")  
	mongodbURI := os.Getenv("MONGODB_URI")  
  
	if apiKey == "" || mongodbURI == "" {  
		log.Fatal("Ensure COHERE_API_KEY and MONGODB_URI are set.")  
	}  
  
	summaries, err := fetchSummariesFromMongoDB(mongodbURI)  
	if err != nil {  
		log.Fatalf("Error fetching summaries: %v", err)  
	}  
  
	client := cohereclient.NewClient(cohereclient.WithToken(apiKey))  
  
	for start := 0; start < len(summaries); start += batchSize {  
		end := start + batchSize  
		if end > len(summaries) {  
			end = len(summaries)  
		}  
  
		embeddingsData, err := fetchEmbeddingsFromCohere(client, summaries[start:end])  
		if err != nil {  
			log.Fatalf("Error fetching embeddings: %v", err)  
		}  
  
		if embeddingsData.Embeddings == nil {  
			continue  
		}  
  
		documents := convertCohereResponseToStructs(summaries[start:end], embeddingsData)  
  
		err = writeJSONToFile("embeddings.json", documents)  
		if err != nil {  
			log.Fatalf("Error writing embeddings to JSON: %v", err)  
		}  
	}  
  
	fmt.Println("Embeddings successfully saved to embeddings.json")  
}  
  
func fetchSummariesFromMongoDB(uri string) ([]string, error) {  
	ctx := context.TODO()  
	clientOpts := options.Client().ApplyURI(uri)  
  
	client, err := mongo.Connect(clientOpts)  
	if err != nil {  
		return nil, fmt.Errorf("failed to connect to MongoDB: %w", err)  
	}  
	defer func() {  
		if err := client.Disconnect(ctx); err != nil {  
			log.Fatalf("Failed to disconnect MongoDB client: %v", err)  
		}  
	}()  
  
	collection := client.Database(dbName).Collection(collName)  
	filter := bson.M{"summary": bson.M{"$nin": []interface{}{nil, ""}}}  
  
	cursor, err := collection.Find(ctx, filter, options.Find().SetLimit(50))  
	if err != nil {  
		return nil, fmt.Errorf("error finding documents: %w", err)  
	}  
	defer cursor.Close(ctx)  
  
	var summaries []string  
	for cursor.Next(ctx) {  
		var result struct {  
			Summary string  
		}  
		if err := cursor.Decode(&result); err != nil {  
			return nil, fmt.Errorf("error decoding document: %w", err)  
		}  
		if summary := result.Summary; summary != "" {  
			summaries = append(summaries, summary)  
		}  
	}  
  
	if err := cursor.Err(); err != nil {  
		return nil, fmt.Errorf("cursor error: %w", err)  
	}  
  
	return summaries, nil  
}  
  
func fetchEmbeddingsFromCohere(client *cohereclient.Client, batchData []string) (*cohere.EmbedByTypeResponse, error) {  
	response, err := client.V2.Embed(context.TODO(), &cohere.V2EmbedRequest{  
		Texts:       batchData,  
		Model:       embedModel,  
		InputType:   cohere.EmbedInputTypeSearchDocument,  
		EmbeddingTypes: []cohere.EmbeddingType{  
			cohere.EmbeddingTypeFloat,  
			cohere.EmbeddingTypeInt8,  
			cohere.EmbeddingTypeUbinary,  
		},  
	})  
	if err != nil {  
		return nil, fmt.Errorf("failed to fetch embeddings: %w", err)  
	}  
  
	return response, nil  
}  
  
func convertCohereResponseToStructs(summaries []string, embeddings *cohere.EmbedByTypeResponse) []bson.M {  
	var documents []bson.M  
  
	for i, summary := range summaries {  
		float32Emb := convertFloat64ToFloat32(embeddings.Embeddings.Float[i])  
		int8Emb := convertIntToInt8(embeddings.Embeddings.Int8[i])  
		ubinaryEmb := convertIntToBytes(embeddings.Embeddings.Ubinary[i])  
  
		floatVector := bson.NewVector(float32Emb)  
		int8Vector := bson.NewVector(int8Emb)  
		ubinaryVector, err := bson.NewPackedBitVector(ubinaryEmb, 0)  
		if err != nil {  
			log.Fatalf("Error creating PackedBitVector: %v", err)  
		}  
  
		document := bson.M{  
			"text":                summary,  
			"embeddings_float32":  floatVector.Binary(),  
			"embeddings_int8":     int8Vector.Binary(),  
			"embeddings_int1":     ubinaryVector.Binary(),  
		}  
  
		documents = append(documents, document)  
	}  
  
	return documents  
}  
  
func writeJSONToFile(filename string, docs []bson.M) error {  
	file, err := os.Create(filename)  
	if err != nil {  
		return fmt.Errorf("failed to create file: %w", err)  
	}  
	defer file.Close()  
  
	var jsonDocuments []json.RawMessage  
	for _, document := range docs {  
		jsonBytes, err := bson.MarshalExtJSON(document, false, false)  
		if err != nil {  
			log.Fatalf("Error: %v", err)  
		}  
		jsonDocuments = append(jsonDocuments, jsonBytes)  
	}  
  
	jsonData, err := json.MarshalIndent(jsonDocuments, "", "  ")  
	if err != nil {  
		return fmt.Errorf("failed to marshal JSON: %w", err)  
	}  
  
	_, err = file.Write(jsonData)  
	if err != nil {  
		return fmt.Errorf("failed to write JSON to file: %w", err)  
	}  
  
	return nil  
}  
  
func convertFloat64ToFloat32(f64s []float64) []float32 {  
	f32s := make([]float32, len(f64s))  
	for i, v := range f64s {  
		f32s[i] = float32(v)  
	}  
	return f32s  
}  
  
func convertIntToInt8(ints []int) []int8 {  
	ints8 := make([]int8, len(ints))  
	for i, val := range ints {  
		ints8[i] = int8(val)  
	}  
	return ints8  
}  
  
func convertIntToBytes(ints []int) []byte {  
	bytes := make([]byte, len(ints))  
	for i, val := range ints {  
		bytes[i] = byte(val)  
	}  
	return bytes  
}  
