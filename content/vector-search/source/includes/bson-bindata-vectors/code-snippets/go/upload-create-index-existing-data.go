package main  
  
import (  
	"context"  
	"fmt"  
	"io/ioutil"  
	"log"  
    "time"
	"os"  
  
	"go.mongodb.org/mongo-driver/v2/bson"  
	"go.mongodb.org/mongo-driver/v2/mongo"  
	"go.mongodb.org/mongo-driver/v2/mongo/options"  
)  
  
var (  
	mongodbURI          = os.Getenv("MONGODB_URI")  
	dbName              = "sample_airbnb"  
	collectionName      = "listingsAndReviews"  
	indexName           = "<INDEX-NAME>"  
	numberOfDimensions  = 1024  
	embeddingFields     = []string{"embeddings_float32", "embeddings_int8", "embeddings_int1"}  
	embeddingSimilarity = []string{"dotProduct", "dotProduct", "euclidean"}  
)  
  
func main() {  
	if mongodbURI == "" {  
		log.Fatal("MONGODB_URI environment variable not set")  
	}  
  
	clientOptions := options.Client().ApplyURI(mongodbURI)  
	client, err := mongo.Connect(clientOptions)  
	if err != nil {  
		log.Fatalf("Error connecting to MongoDB: %v", err)  
	}  
	defer func() {  
		if err = client.Disconnect(context.TODO()); err != nil {  
			log.Fatal(err)  
		}  
	}()  
  
	if err := uploadEmbeddingsData(client); err != nil {  
		log.Fatalf("Error uploading embeddings data: %v", err)  
	}  
  
	setupVectorSearchIndex(client)  
}  
  
func uploadEmbeddingsData(client *mongo.Client) error {  
	collection := client.Database(dbName).Collection(collectionName)  
  
	// Load embeddings.json file  
	fileContent, err := ioutil.ReadFile("embeddings.json")  
	if err != nil {  
		return fmt.Errorf("error reading file: %w", err)  
	}  
  
	// Convert JSON file content to BSON compatible format using UnmarshalExtJSON  
	var documents []bson.M  
	if err := bson.UnmarshalExtJSON(fileContent, false, &documents); err != nil {  
		return fmt.Errorf("failed to unmarshal JSON data: %w", err)  
	}  
  
	// Update documents in MongoDB  
	for _, doc := range documents {  
		summary, exists := doc["text"].(string)  
		if !exists {  
			return fmt.Errorf("missing 'text' field in document")  
		}  
  
		// Using bson.Binary ensures binary data is correctly interpreted  
		if float32Bin, ok := doc["embeddings_float32"].(bson.Binary); ok {  
			doc["embeddings_float32"] = float32Bin  
		}  
		if int8Bin, ok := doc["embeddings_int8"].(bson.Binary); ok {  
			doc["embeddings_int8"] = int8Bin  
		}  
		if int1Bin, ok := doc["embeddings_int1"].(bson.Binary); ok {  
			doc["embeddings_int1"] = int1Bin  
		}  
  
		filter := bson.M{"summary": summary}  
		update := bson.M{  
			"$set": doc,  
		}  
  
		// Set the upsert option  
		opts := options.UpdateMany().SetUpsert(true)  
  
		_, err = collection.UpdateMany(context.TODO(), filter, update, opts)  
		if err != nil {  
			return fmt.Errorf("failed to update documents: %w", err)  
		}  
	}  
  
	return nil  
}  
  
// Sets up vector search index in MongoDB  
func setupVectorSearchIndex(client *mongo.Client) {  
	database := client.Database(dbName)  
	collection := database.Collection(collectionName)  
  
	ctx := context.TODO()  
  
	type vectorDefinitionField struct {  
		Type          string `bson:"type"`  
		Path          string `bson:"path"`  
		NumDimensions int    `bson:"numDimensions"`  
		Similarity    string `bson:"similarity"`  
	}  
  
	type vectorDefinition struct {  
		Fields []vectorDefinitionField `bson:"fields"`  
	}  
  
	fields := make([]vectorDefinitionField, len(embeddingFields))  
	for i, field := range embeddingFields {  
		fields[i] = vectorDefinitionField{  
			Type:          "vector",  
			Path:          field,  
			NumDimensions: numberOfDimensions,  
			Similarity:    embeddingSimilarity[i],  
		}  
	}  
  
	opts := options.SearchIndexes().SetName(indexName).SetType("vectorSearch")  
  
	indexModel := mongo.SearchIndexModel{  
		Definition: vectorDefinition{  
			Fields: fields,  
		},  
		Options: opts,  
	}  
  
	// Create the index  
	log.Println("Creating the index.")  
	searchIndexName, err := collection.SearchIndexes().CreateOne(ctx, indexModel)  
	if err != nil {  
		log.Fatalf("Failed to create the search index: %v", err)  
	}  
  
	// Polling to confirm successful index creation  
	log.Println("Polling to confirm successful index creation.")  
	log.Println("NOTE: This may take up to a minute.")  
	searchIndexes := collection.SearchIndexes()  
	var doc bson.Raw  
  
	for doc == nil {  
		cursor, err := searchIndexes.List(ctx, options.SearchIndexes().SetName(searchIndexName))  
		if err != nil {  
			log.Fatalf("failed to list search indexes: %v", err)  
		}  
  
		if !cursor.Next(ctx) {  
			break  
		}  
  
		name := cursor.Current.Lookup("name").StringValue()  
		queryable := cursor.Current.Lookup("queryable").Boolean()  
		if name == searchIndexName && queryable {  
			doc = cursor.Current  
		} else {  
			time.Sleep(5 * time.Second)  
		}  
	}  
  
	log.Println("Name of Index Created: " + searchIndexName)  
}  