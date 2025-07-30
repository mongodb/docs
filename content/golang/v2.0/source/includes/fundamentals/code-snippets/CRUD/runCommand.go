// Runs a database command by using the Go driver
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

	// start-runcommand
	db := client.Database("db")

	// Creates commands to count documents in a collection and explain
	// how the count command runs
	countCommand := bson.D{{"count", "flowers"}}
	explainCommand := bson.D{{"explain", countCommand}, {"verbosity", "queryPlanner"}}

	// Retrieves results of the explain command
	var result bson.M
	err = db.RunCommand(context.TODO(), explainCommand).Decode(&result)
	// end-runcommand

	if err != nil {
		panic(err)
	}

	// Prints the results of the explain command
	output, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", output)
}
