package main

import (
	"context"
	"encoding/json"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("<your uri>"))

	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	client.Database("tea").Collection("vendors").Drop(context.TODO())

	fmt.Println("Clustered Index:")
	{
		// begin create ci coll
		db := client.Database("tea")
		cio := bson.D{{"key", bson.D{{"_id", 1}}}, {"unique", true}}
		opts := options.CreateCollection().SetClusteredIndex(cio)

		db.CreateCollection(context.TODO(), "vendors", opts)
		// end create ci coll

		// begin check ci coll
		command := bson.D{{"listCollections", 1}}
		var result bson.M
		err := db.RunCommand(context.TODO(), command).Decode(&result)
		if err != nil {
			panic(err)
		}

		output, outputErr := json.MarshalIndent(result, "", "    ")
		if outputErr != nil {
			panic(outputErr)
		}
		fmt.Printf("%s\n", output)
		// end check ci coll
	}

	fmt.Println("Single Field Index:")
	{
		db := client.Database("sample_mflix")
		coll := db.Collection("movies")

		// begin single field index
		indexModel := mongo.IndexModel{Keys: bson.D{{"title", 1}}}
		name, err := coll.Indexes().CreateOne(context.TODO(), indexModel)
		if err != nil {
			panic(err)
		}

		fmt.Println("Name of Index Created: " + name)
		// end single field index

		// begin remove index
		res, err := coll.Indexes().DropOne(context.TODO(), "title_1")
		if err != nil {
			panic(err)
		}
		fmt.Println(res)
		// end remove index
	}

	fmt.Println("Compound Index:")
	{
		db := client.Database("sample_mflix")
		coll := db.Collection("movies")

		// begin compound index
		indexModel := mongo.IndexModel{Keys: bson.D{{"fullplot", -1}, {"title", 1}}}
		name, err := coll.Indexes().CreateOne(context.TODO(), indexModel)
		if err != nil {
			panic(err)
		}

		fmt.Println("Name of Index Created: " + name)
		// end compound index

		res, err := coll.Indexes().DropOne(context.TODO(), "fullplot_-1_title_1")
		if err != nil {
			panic(err)
		}
		fmt.Println(res)
	}

	fmt.Println("Multi-Key Index:")
	{
		db := client.Database("sample_mflix")
		coll := db.Collection("movies")

		// begin multi key index
		indexModel := mongo.IndexModel{Keys: bson.D{{"cast", -1}}}
		name, err := coll.Indexes().CreateOne(context.TODO(), indexModel)
		if err != nil {
			panic(err)
		}

		fmt.Println("Name of Index Created: " + name)
		// end multi key index

		res, err := coll.Indexes().DropOne(context.TODO(), "cast_-1")
		if err != nil {
			panic(err)
		}
		fmt.Println(res)
	}

	fmt.Println("Text Index:")
	{
		db := client.Database("sample_mflix")
		coll := db.Collection("movies")

		//begin text index
		indexModel := mongo.IndexModel{
			Keys: bson.D{{"plot", "text"}}, 
			Options: options.Index().SetDefaultLanguage("italian")
		}
		name, err := coll.Indexes().CreateOne(context.TODO(), indexModel)
		if err != nil {
			panic(err)
		}

		fmt.Println("Name of Index Created: " + name)
		//end text index

		res, err := coll.Indexes().DropOne(context.TODO(), "plot_text")
		if err != nil {
			panic(err)
		}
		fmt.Println(res)
	}

	fmt.Println("Geospatial Index:")
	{
		db := client.Database("sample_mflix")
		coll := db.Collection("theaters")

		// begin geo index
		indexModel := mongo.IndexModel{Keys: bson.D{{"location.geo", "2dsphere"}}}
		name, err := coll.Indexes().CreateOne(context.TODO(), indexModel)
		if err != nil {
			panic(err)
		}

		fmt.Println("Name of Index Created: " + name)
		// end geo index

		res, err := coll.Indexes().DropOne(context.TODO(), "location.geo_2dsphere")
		if err != nil {
			panic(err)
		}
		fmt.Println(res)
	}

	fmt.Println("Unique Index:")
	{
		db := client.Database("sample_mflix")
		coll := db.Collection("theaters")

		// begin unique index
		indexModel := mongo.IndexModel{
			Keys: bson.D{{"theaterId", -1}}, 
			Options: options.Index().SetUnique(true),
		}
		name, err := coll.Indexes().CreateOne(context.TODO(), indexModel)
		if err != nil {
			panic(err)
		}

		fmt.Println("Name of Index Created: " + name)
		// end unique index

		res, err := coll.Indexes().DropOne(context.TODO(), "theaterId_-1")
		if err != nil {
			panic(err)
		}
		fmt.Println(res)
	}
}
