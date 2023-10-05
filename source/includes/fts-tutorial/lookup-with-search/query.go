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
  collection := client.Database("sample_analytics").Collection("customers")
  // define pipeline
  lookupStage := bson.D{{"$lookup", bson.D{
	{"from", "accounts"},
	{"localField", "accounts"},
	{"foreignField", "account_id"},
	{"as", "purchases"},
	{"pipeline", bson.A{
	  bson.D{
		{"$search", bson.D{
		  {"index", "lookup-with-search-tutorial"},
		  {"compound", bson.D{
			{"must", bson.A{
			  bson.D{{"queryString", bson.D{
				{"defaultPath", "products"},
				{"query", "products: (CurrencyService AND InvestmentStock)"},
			  }}},
			}},
			{"should", bson.A{
			  bson.D{{"range", bson.D{
				{"path", "limit"},
				{"gte", 5000},
				{"lte", 10000},
			  }}},
			}},
		  }},
		}},
	  },
	  bson.D{{"$project", bson.D{
		{"_id", 0},
		{"address", 0},
        {"birthdate", 0},
	    {"username", 0},
	    {"tier_and_details", 0},
	  }}},
	}},
  }}}
  limitStage := bson.D{{"$limit", 5}}
  projectStage := bson.D{{"$project", bson.D{
    {"name", 1},
	{"email", 1},
	{"active", 1},
	{"accounts", 1},
	{"purchases", 1},
  }}}
  // specify the amount of time the operation can run on the server
  opts := options.Aggregate().SetMaxTime(5 * time.Second)
  // run pipeline
  cursor, err := collection.Aggregate(ctx, mongo.Pipeline{lookupStage, limitStage, projectStage}, opts)
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
