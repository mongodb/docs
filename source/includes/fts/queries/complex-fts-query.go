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
  plot    []string    `bson:"Plot,omitempty"`
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
	"compound": bson.M{
	  "must": bson.A{
		bson.M{
		  "text": bson.D{
			{"path", "plot"},{"query", []string{"Hawaii", "Alaska"}},
		  },
		},
		bson.M{
		  "regex": bson.M{
		  "path": "plot","query": "([0-9]{4})","allowAnalyzedField": true,
		  },
		},
	  },
	  "mustNot": bson.A{
		bson.D{
		  {"text", bson.M{
			 "path": "genres","query": []string{"Comedy", "Romance"},
		  }},
		  {"text", bson.M{
			"path": "title","query": []string{"Beach", "Snow"},
		  }},
		},
	  },
	},
  }}}
  projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"plot", 1}, {"genres", 1}, {"_id", 0}}}}
  // specify the amount of time the operation can run on the server
  opts := options.Aggregate().SetMaxTime(5 * time.Second)
  // run pipeline
  cursor, err := collection.Aggregate(ctx, mongo.Pipeline{searchStage, projectStage}, opts)
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
