package main

import (
    "context"
    "fmt"
    "time"
    "log"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go.mongodb.org/mongo-driver/bson/primitive"
)

// define structure of movies collection
type MovieCollection struct {
    title string `bson:"Title,omitempty"`
    plot  string `bson:"Plot,omitempty"`
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
    // define variable 
    var objectIDFromHex = func(hex string) primitive.ObjectID {
        objectID, err := primitive.ObjectIDFromHex(hex)
        if err != nil {
            log.Fatal(err)
        }
        return objectID
    }
    // define pipeline
    searchStage := bson.D{{"$search", bson.D{
        {"index", "compound-query-custom-score-tutorial"},
		{"compound", bson.D{
            {"should", bson.A{
                bson.D{{"compound", bson.D{
                    {"must", bson.A{
                        bson.D{{"text", bson.D{
                            {"query", "ghost"},
                            {"path", bson.A{ "plot", "title" }},
                        }}},
                    }},
                    {"mustNot", bson.A{
                        bson.D{{"in", bson.D{
                            {"value", bson.A{objectIDFromHex("573a13cdf29313caabd83c08"), objectIDFromHex("573a13cef29313caabd873a2") }},
                            {"path", "_id"},
                        }}},
                    }},
                }}},
                bson.D{{"compound", bson.D{
                    {"must", bson.A{
                        bson.D{{"text", bson.D{
                            {"query", "ghost"},
                            {"path", bson.A{ "plot", "title" }},
                         }}},
                    }},
                    {"filter", bson.A{
                        bson.D{{"in", bson.D{
                            {"value", bson.A{ objectIDFromHex("573a13cdf29313caabd83c08"), objectIDFromHex("573a13cef29313caabd873a2")}},
                            {"path", "_id"},
                        }}},
                    }},
                    {"score", bson.D{{"boost", bson.D{{"value", 0.5}}}}},
                 }}},
             }},
        }},
    }}}

    limitStage := bson.D{{"$limit", 10}}
    projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"plot", 1}, {"_id", 0}, {"score", bson.D{{"$meta", "searchScore"}}}}}}
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