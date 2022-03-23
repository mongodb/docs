package main

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
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
	}

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	client.Database("marvel").Collection("movies").Drop(context.TODO())

	// begin insert docs
	coll := client.Database("marvel").Collection("movies")
	docs := []interface{}{
		bson.D{{"title", "Captain America: Civil War"}, {"year", 2016}},
		bson.D{{"title", "The Avengers"}, {"year", 2012}},
		bson.D{{"title", "Captain America: The Winter Soldier"}, {"year", 2014}},
		bson.D{{"title", "Avengers: Infinity War"}, {"year", 2018}},
		bson.D{{"title", "Captain America: The First Avenger"}, {"year", 2011}},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))
	//end insert docs

	//begin text index
	model := mongo.IndexModel{Keys: bson.D{{"title", "text"}}}
	name, err := coll.Indexes().CreateOne(context.TODO(), model)
	if err != nil {
		panic(err)
	}

	fmt.Println("Name of Index Created: " + name)
	//end text index

	fmt.Println("Term Search:")
	{
		//begin term search
		filter := bson.D{{"$text", bson.D{{"$search", "War"}}}}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
		//end term search
	}

	fmt.Println("Phrase Search:")
	{
		//begin phrase search
		filter := bson.D{{"$text", bson.D{{"$search", "\"Infinity War\""}}}}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
		//end phrase search
	}

	fmt.Println("Excluded Term Search:")
	{
		//begin exclude term search
		filter := bson.D{{"$text", bson.D{{"$search", "Avenger -\"Captain America\""}}}}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
		//end exclude term search
	}

	fmt.Println("Sort By Relevance:")
	{
		//begin text score
		filter := bson.D{{"$text", bson.D{{"$search", "Avenger"}}}}
		sort := bson.D{{"score", bson.D{{"$meta", "textScore"}}}}
		projection := bson.D{{"title", 1}, {"score", bson.D{{"$meta", "textScore"}}}, {"_id", 0}}
		opts := options.Find().SetSort(sort).SetProjection(projection)

		cursor, err := coll.Find(context.TODO(), filter, opts)
		if err != nil {
			panic(err)
		}

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
		//end text score
	}

	fmt.Println("Aggregation Text Score:")
	{
		// begin aggregate text score
		matchStage := bson.D{{"$match", bson.D{{"$text", bson.D{{"$search", "Avenger"}}}}}}
		sortStage := bson.D{{"$sort", bson.D{{"score", bson.D{{ "$meta", "textScore" }}}}}}
		projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"score", bson.D{{ "$meta", "textScore" }}}, {"_id", 0}}}}

		cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage, sortStage, projectStage})
		if err != nil {
			panic(err)
		}

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
		// end aggregate text score
	}

	fmt.Println("Aggregation Text Search:")
	{
		// begin aggregate text search
		matchStage := bson.D{{"$match", bson.D{{"$text", bson.D{{"$search", "Winter"}}}}}}

		cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage})
		if err != nil {
			panic(err)
		}

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
		// end aggregate text search
	}
}
