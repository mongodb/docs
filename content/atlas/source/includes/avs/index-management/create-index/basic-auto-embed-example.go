package main

import (
        "context"
        "fmt"
        "log"
        "time"

        "go.mongodb.org/mongo-driver/v2/bson"
        "go.mongodb.org/mongo-driver/v2/mongo"
        "go.mongodb.org/mongo-driver/v2/mongo/options"
)

const (
        indexName = "vector_index"
)

// autoEmbedField represents the auto-embedding index field definition.
type autoEmbedField struct {
        Type     string `bson:"type"`     
        Modality string `bson:"modality"` 
        Path     string `bson:"path"`     
        Model    string `bson:"model"`  
}

// autoEmbedIndexDefinition is the top-level index definition.
type autoEmbedIndexDefinition struct {
        Fields []any `bson:"fields"`
}

func main() {
        // Replace with your MongoDB connection string.
        uri := "<connection-string>"

        // Create a context with a timeout for index creation and polling.
        ctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)
        defer cancel()

        // Connect to your deployment.
        client, err := mongo.Connect(options.Client().ApplyURI(uri))
        if err != nil {
                log.Fatalf("Failed to connect to MongoDB: %v", err)
        }
        defer func() {
                if err := client.Disconnect(context.Background()); err != nil {
                        log.Printf("Error disconnecting client: %v", err)
                }
        }()

        // Access your database and collection.
        db := client.Database("sample_mflix")
        coll := db.Collection("movies")

        // 1. Create the auto-embedding vectorSearch index.
        if err := createAutoEmbeddingIndex(ctx, coll); err != nil {
                log.Fatalf("Failed to create auto-embedding index: %v", err)
        }
        fmt.Println("New search index named", indexName, "is building.")

        // 2. Wait until the index is queryable (initial sync complete).
        fmt.Println("Polling to check if the index is ready. This may take up to a minute.")
        if err := waitForIndexQueryable(ctx, coll, indexName); err != nil {
                log.Fatalf("Error while waiting for index to become queryable: %v", err)
        }
        fmt.Println(indexName, "is ready for querying.")
}

func createAutoEmbeddingIndex(ctx context.Context, coll *mongo.Collection) error {
        // Define the index fields.
        definition := autoEmbedIndexDefinition{
                Fields: []any{
                        autoEmbedField{
                                Type:     "autoEmbed",
                                Modality: "text",
                                Path:     "fullplot",
                                Model:    "voyage-4",
                        },
                },
        }

        // Set index name and type "vectorSearch".
        opts := options.SearchIndexes().
                SetName(indexName).
                SetType("vectorSearch")

        model := mongo.SearchIndexModel{
                Definition: definition,
                Options:    opts,
        }

        _, err := coll.SearchIndexes().CreateOne(ctx, model)
        return err
}

func waitForIndexQueryable(ctx context.Context, coll *mongo.Collection, name string) error {
        for {
                // List just this index by name.
                opts := options.SearchIndexes().SetName(name)
                cursor, err := coll.SearchIndexes().List(ctx, opts)
                if err != nil {
                        return fmt.Errorf("list search indexes: %w", err)
                }

                var results []bson.M
                if err := cursor.All(ctx, &results); err != nil {
                        return fmt.Errorf("decode search index list: %w", err)
                }

                if len(results) > 0 {
                        index := results[0]
                        queryable, qOk := index["queryable"].(bool)
                        status, sOk := index["status"].(string)
                        
                        fmt.Printf("Index status: queryable=%v (ok=%v), status=%q (ok=%v)\n", 
                                queryable, qOk, status, sOk)
                        
                        if sOk && status == "READY" {
                                fmt.Println("Index is ready for querying.")
                                return nil
                        }
                }

                select {
                case <-ctx.Done():
                        return ctx.Err()
                case <-time.After(5 * time.Second):
                        // Continue polling.
                }
        }
}