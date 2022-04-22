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
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb+srv://kanchana:passW0rd@sbx.vlfczaf.mongodb-dev.net/myFirstDatabase?retryWrites=true&w=majority"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)
	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")
  // define pipeline
	searchStage := bson.D{{"$search", bson.M{
		"compound": bson.M{
			 "should": bson.A{
				 bson.M{
					"autocomplete": bson.M{
						"path": "title","query": "ball","score": bson.M{
							"boost": bson.D{{"value", 3}},
						},
					},
		     },
				 bson.M{
					 "text": bson.M{
 						 "path": "title","query": "ball","fuzzy": bson.D{{"maxEdits", 1}},
 					 },
				 },
			 },
		},
  }}}
	limitStage := bson.D{{"$limit", 15}}
	projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"_id", 0}, {"score", bson.D{{"$meta", "searchScore"}}}}}}
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
