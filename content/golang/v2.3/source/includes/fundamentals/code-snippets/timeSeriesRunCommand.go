package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	db := client.Database("myDB")

	// Creates a command to list collections
	command := bson.D{{"listCollections", 1}}
	var result bson.M

	// Runs the command on the database
	commandErr := db.RunCommand(context.TODO(), command).Decode(&result)
	if commandErr != nil {
		panic(commandErr)
	}

	// Prints the command results
	output, outputErr := json.MarshalIndent(result, "", "    ")
	if outputErr != nil {
		panic(outputErr)
	}
	fmt.Printf("%s\n", output)
}
