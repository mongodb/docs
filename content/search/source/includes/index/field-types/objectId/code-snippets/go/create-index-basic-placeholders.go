package main

import (
	"context"
	"fmt"
	"log"
	
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// Set client options
	clientOptions := options.Client().ApplyURI("mongodb+srv://<username>:<password>@<cluster-url>")
	
	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.TODO())
	
	// Get a handle for your database
	database := client.Database("<databaseName>")
	
	// Create a MongoDB Search index on the objectId field
	indexDefinition := bson.D{
		{"createSearchIndexes", "<collectionName>"},
		{"indexes", bson.A{
			bson.D{
				{"name", "<indexName>"},
				{"definition", bson.D{
					{"mappings", bson.D{
						{"dynamic", true | false},
						{"fields", bson.D{
							{"<fieldName>", bson.D{
								{"type", "objectId"},
							}},
						}},
					}},
				}},
			},
		}},
	}
	
	result := database.RunCommand(context.TODO(), indexDefinition)
	if result.Err() != nil {
		log.Fatal(result.Err())
	}
	
	var resultDoc bson.M
	if err := result.Decode(&resultDoc); err != nil {
		log.Fatal(err)
	}
	
	fmt.Println("Successfully created Atlas Search index:", resultDoc)
}
