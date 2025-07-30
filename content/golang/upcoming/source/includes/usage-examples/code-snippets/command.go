// Runs a database command by using the Go driver
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	{
		// begin runCommand
		db := client.Database("sample_restaurants")

		// Retrieves statistics about the specified database
		command := bson.D{{"dbStats", 1}}

		var result bson.M
		// Runs the command and prints the database statistics
		err := db.RunCommand(context.TODO(), command).Decode(&result)

		// Prints a message if any errors occur during the command execution
		if err != nil {
			panic(err)
		}
		// end runCommand

		/* When you run this file, it should print something similar to the following:
		{
			"avgObjSize": 548.4101901854896,
			"collections": 2,
			"dataSize": 14014074,
			"db": "sample_restaurants",
			"fileSize": 0,
			"indexSize": 286720,
			"indexes": 2,
			"nsSizeMB": 0,
			"numExtents": 0,
			"objects": 25554,
			"ok": 1,
			"storageSize": 8257536,
			"totalFreeStorageSize": 0,
			"views": 0
		}
		*/

		output, err := json.MarshalIndent(result, "", "    ")
		if err != nil {
			panic(err)
		}
		fmt.Printf("%s\n", output)
	}
}
