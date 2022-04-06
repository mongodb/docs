import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	uri := "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority"

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// database and colletion code goes here
	db := client.Database("sample_guides")
	coll := db.Collection("comets")

	// insert code goes here
	docs := []interface{}{
		bson.D{{"Name", "Halley's Comet"}, {"OfficialName", "1P/Halley"}, {"OrbitalPeriod", 75}, {"Radius", 3.4175}, {"Mass", 2.2e14}},
		bson.D{{"Name", "Wild2"}, {"OfficialName", "81P/Wild"}, {"OrbitalPeriod", 6.41}, {"Radius", 1.5534}, {"Mass", 2.3e13}},
		bson.D{{"Name", "Comet Hyakutake"}, {"OfficialName", "C/1996 B2"}, {"OrbitalPeriod", 17000}, {"Radius", 0.77671}, {"Mass", 8.8e12}},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	if err != nil {
		panic(err)
	}
            
	// display insert ids code goes here
	for _, id := range result.InsertedIDs {
		fmt.Printf("\t%s\n", id)
	}
}

