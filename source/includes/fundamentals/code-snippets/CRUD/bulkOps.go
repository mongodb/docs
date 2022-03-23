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

	client.Database("tea").Collection("ratings").Drop(context.TODO())

	// begin insert docs
	coll := client.Database("tea").Collection("ratings")
	docs := []interface{}{
		bson.D{{"type", "Masala"}, {"rating", 10}},
		bson.D{{"type", "Earl Grey"}, {"rating", 5}},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))
	// end insert docs

	fmt.Println("InsertOneModel:")
	{
		// begin bulk insert model
		models := []mongo.WriteModel{
			mongo.NewInsertOneModel().SetDocument(bson.D{{"type", "Oolong"}, {"rating", 9}}),
			mongo.NewInsertOneModel().SetDocument(bson.D{{"type", "Assam"}, {"rating", 6}}),
		}
		// end bulk insert model

		results, err := coll.BulkWrite(context.TODO(), models)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents inserted: %d\n", results.InsertedCount)
	}

	fmt.Println("Documents After Insert:")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		defer cursor.Close(context.TODO())

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
	}

	fmt.Println("ReplaceOneModel:")
	{
		// begin bulk replace model
		models := []mongo.WriteModel{
			mongo.NewReplaceOneModel().SetFilter(bson.D{{"type", "Earl Grey"}}).
				SetReplacement(bson.D{{"type", "Matcha"}, {"rating", 8}}),
		}
		// end bulk replace model
		
		results, err := coll.BulkWrite(context.TODO(), models)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents replaced: %d\n", results.ModifiedCount)
	}

	fmt.Println("Documents After Replace:")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		defer cursor.Close(context.TODO())

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
	}
	
	fmt.Println("UpdateOneModel:")
	{
		// begin bulk update model
		models := []mongo.WriteModel{
			mongo.NewUpdateOneModel().SetFilter(bson.D{{"type", "Masala"}}).
				SetUpdate(bson.D{{"$inc", bson.D{{"rating", -2}}}}),
		}
		// end bulk update model
		
		results, err := coll.BulkWrite(context.TODO(), models)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents updated: %d\n", results.ModifiedCount)
	}

	fmt.Println("Documents After Update:")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		defer cursor.Close(context.TODO())

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
	}

	fmt.Println("DeleteManyModel:")
	{
		// begin bulk delete model
		models := []mongo.WriteModel{
			mongo.NewDeleteManyModel().SetFilter(bson.D{{"rating", bson.D{{"$gt", 7}}}}),
		}
		// end bulk delete model
		
		results, err := coll.BulkWrite(context.TODO(), models)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents deleted: %d\n", results.DeletedCount)
	}

	fmt.Println("Documents After Delete:")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		defer cursor.Close(context.TODO())

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
	}

	{
		client.Database("tea").Collection("ratings").Drop(context.TODO())

		// begin insert docs
		coll := client.Database("tea").Collection("ratings")
		docs := []interface{}{
			bson.D{{"type", "Masala"}, {"rating", 10}},
			bson.D{{"type", "Earl Grey"}, {"rating", 5}},
		}

		result, err := coll.InsertMany(context.TODO(), docs)
		if err != nil {
			panic(err)
		}
		fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))
		// end insert docs
	}

	fmt.Println("BulkOperation Example:")
	{
		// begin unordered
		models := []mongo.WriteModel{
			mongo.NewInsertOneModel().SetDocument(bson.D{{"type", "Oolong"}, {"rating", 9}}),
			mongo.NewInsertOneModel().SetDocument(bson.D{{"type", "Assam"}, {"rating", 6}}),
			mongo.NewReplaceOneModel().SetFilter(bson.D{{"type", "Earl Grey"}}).
				SetReplacement(bson.D{{"type", "Matcha"}, {"rating", 4}}),
			mongo.NewUpdateManyModel().SetFilter(bson.D{{"rating", bson.D{{"$lt", 7}}}}).
				SetUpdate(bson.D{{"$inc", bson.D{{"rating", 3}}}}),
			mongo.NewDeleteManyModel().SetFilter(bson.D{{"rating", 9}}),
		}
		opts := options.BulkWrite().SetOrdered(false)

		results, err := coll.BulkWrite(context.TODO(), models, opts)
		if err != nil {
			panic(err)
		}
		
		fmt.Printf("Number of documents inserted: %d\n", results.InsertedCount)
		fmt.Printf("Number of documents replaced or updated: %d\n", results.ModifiedCount)
		fmt.Printf("Number of documents deleted: %d\n", results.DeletedCount)
		// end unordered
	}

	fmt.Println("Documents After Bulk Operation:")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		defer cursor.Close(context.TODO())

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
	}
}
