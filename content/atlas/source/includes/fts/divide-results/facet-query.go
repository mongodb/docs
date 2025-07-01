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
  title   string    `bson:"Title,omitempty"`
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
	"index":     "pagination-tutorial",
	"text":    bson.D{{"path", "cast"}, {"query", "tom hanks"}},
  }}}
  projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"cast", 1}, {"_id", 0}}}}
  setStage1 := bson.D{{"$set", bson.D{{"score", bson.D{{"$meta", "searchScore"}}}}}}
  facetStage := bson.D{{"$facet", bson.D{
	{"rows", bson.A{bson.D{{"$skip", 10}}, bson.D{{"$limit", 10}}}},
	{"totalRows",  bson.A{bson.D{{"$replaceWith", "$$SEARCH_META"}}, bson.D{{"$limit", 1}}}},
  }}}
  setStage2 := bson.D{{"$set", bson.D{{"totalRows", bson.D{
	{"$arrayElemAt", bson.A{"$totalRows", 0}},
  }}}}}
  // specify the amount of time the operation can run on the server
  opts := options.Aggregate().SetMaxTime(5 * time.Second)
  // run pipeline
  cursor, err := collection.Aggregate(ctx, mongo.Pipeline{searchStage, projectStage, setStage1, facetStage, setStage2}, opts)
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
