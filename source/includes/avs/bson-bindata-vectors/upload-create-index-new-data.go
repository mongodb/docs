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
	dbName              = "<DATABASE-NAME>"
	collectionName      = "<COLLECTION-NAME>"
	indexName           = "<INDEX-NAME>"
	numberOfDimensions  = 1024
	embeddingFields     = []string{"embeddings_float32", "embeddings_int8", "embeddings_int1"}
	embeddingSimilarity = []string{"dotProduct", "dotProduct", "euclidean"}
)

func main() {
	clientOpts := options.Client().ApplyURI(mongodbURI)
	client, err := mongo.Connect(clientOpts)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Fatalf("Failed to disconnect MongoDB client: %v", err)
		}
	}()

	storeEmbeddings(client)
	setupVectorSearchIndex(client)
}

// Reads JSON data, stores it in MongoDB
func storeEmbeddings(client *mongo.Client) {
	database := client.Database(dbName)
	collection := database.Collection(collectionName)

	data, err := ioutil.ReadFile("embeddings.json")
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}

	var documents []bson.M
	if err := bson.UnmarshalExtJSON(data, false, &documents); err != nil {
		log.Fatalf("Failed to unmarshal JSON data: %v", err)
	}

	if _, err := collection.InsertMany(context.TODO(), documents); err != nil {
		log.Fatalf("Failed to insert documents: %v", err)
	}

	fmt.Println("Inserted documents into MongoDB")
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
	fmt.Println(fields)

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
