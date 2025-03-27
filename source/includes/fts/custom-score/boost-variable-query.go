package main
import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)
// define structure of movies collection
type MovieCollection struct {
	title   string      `bson:"Title,omitempty"`
}
func main() {
	var err error
    // connect to the Atlas cluster
	ctx := context.Background()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)
	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")
    // define pipeline
	searchStage := bson.D{{"$search", bson.M{
		"index": "compound-query-custom-score-tutorial",
		"compound": bson.M{
			 "must": bson.D{
					 {"text", bson.M{
						  "path": "title","query": "snow","score": bson.M{
								"function": bson.M{
                  "path": bson.D{
                    {"value", "awards.wins"},{"undefined", 2},
                  },
                },
							},
					 }},
				 },
      "should": bson.M{
        "range": bson.M{
          "path": "year","gte": 2013,"lte": 2015,
        },
      },
		},
    }}}
	limitStage := bson.D{{"$limit", 10}}
	projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"year", 1}, {"awards", 1}, {"_id", 0}, {"score", bson.D{{"$meta", "searchScore"}}}}}}
	// specify the amount of time the operation can run on the server
    opts := options.Aggregate().SetMaxTime(5 * time.Second)
	// run pipeline
	cursor, err := collection.Aggregate(ctx, mongo.Pipeline{searchStage, limitStage, projectStage}, opts)
	if err != nil {
	  panic(err)
    }
    // print results
	var results []bson.D
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}
	for _, result := range results {
		fmt.Println(result)
	}
}
