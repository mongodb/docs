package main
import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

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
  collection := client.Database("sample_training").Collection("companies")
  // define pipeline
  searchStage := bson.D{{"$search", bson.D{
	{"text", bson.D{
	  {"query", "Mobile"}, {"path", "name"},
	}},
  }}}
  projectStage := bson.D{{"$project", bson.D{
    {"score", bson.D{{"$meta", "searchScore"}}},
    {"_id", 0},
    {"number_of_employees", 1},
    {"founded_year", 1},
    {"name", 1},
  }}}
  setStage := bson.D{{"$set", bson.D{{"source", "companies"}}}}
  limitStage := bson.D{{"$limit", 5}}
  uinionWithStage := bson.D{{"$unionWith", bson.D{
	{"coll", "inspections"},
	{"pipeline", bson.A{
	  bson.D{{"$search", bson.D{
		{"text", bson.D{
		  {"query", "Mobile"}, {"path", "business_name"},
		}},
	  }}},
	  bson.D{{"$set", bson.D{{"source", "inspections"}}}},
	  bson.D{{"$project", bson.D{
		{"score", bson.D{{"$meta", "searchScore"}}},
		{"source", 1},
		{"_id", 0},
		{"business_name", 1},
		{"address", 1},
	  }}},
	  bson.D{{"$limit", 3}},
	  bson.D{{"$sort", bson.D{{"score", -1}}}},
	}},
  }}}
  // specify the amount of time the operation can run on the server
  opts := options.Aggregate().SetMaxTime(5 * time.Second)
  // run pipeline
  cursor, err := collection.Aggregate(ctx, mongo.Pipeline{searchStage, projectStage, setStage, limitStage, uinionWithStage}, opts)
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
