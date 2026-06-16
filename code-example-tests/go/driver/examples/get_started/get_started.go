//		:replace-start: {
//		  "terms": {
//	     	"utils.GetConnectionString()": "os.Getenv(\"MONGODB_URI\")",
//			"package get_started": "package main"
//		  }
//		}
//
// :snippet-start: example
package get_started

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	//:uncomment-start:
	//"os"
	//:uncomment-end:
	"driver-examples/utils" //:remove:

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// :uncomment-start:
// func main() {
// :uncomment-end:
func GetStarted() []bson.M { //:remove:
	uri := utils.GetConnectionString()
	docs := "www.mongodb.com/docs/drivers/go/current/"
	if uri == "" {
		log.Fatal("Set your 'MONGODB_URI' environment variable. " +
			"See: " + docs +
			"usage-examples/#environment-variable")
	}
	client, err := mongo.Connect(options.Client().
		ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	coll := client.Database("sample_mflix").Collection("movies")
	title := "Back to the Future"

	var result bson.M
	err = coll.FindOne(context.TODO(), bson.M{"title": title}).
		Decode(&result)
	if err == mongo.ErrNoDocuments {
		fmt.Printf("No document was found with the title %s\n", title)
		return []bson.M{} // :remove:
		// :uncomment-start:
		// return
		// :uncomment-end:
	}
	if err != nil {
		panic(err)
	}

	jsonData, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", jsonData)
	return []bson.M{result} // :remove:
}

// :snippet-end:
// :replace-end:
