package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.mongodb.org/mongo-driver/v2/mongo/readpref"
)

func main() {
	// Create a context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Connect to MongoDB
	uri := "<connection-string>"
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			log.Fatal(err)
		}
	}()

	// Check the connection
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	// Get the sample_mflix database
	database := client.Database("local_school_district")

	// Create the schools collection
	err = database.CreateCollection(ctx, "schools")
	if err != nil {
		// Collection may already exist, which is fine
		fmt.Printf("Note: %v\n", err)
	}

	// Get the collection
	collection := database.Collection("schools")

	// Create and insert the first document - Springfield High
	doc1 := bson.D{
		{"_id", 0},
		{"name", "Springfield High"},
		{"mascot", "Pumas"},
		{"teachers", bson.A{
			bson.D{
				{"first", "Jane"},
				{"last", "Smith"},
				{"classes", bson.A{
					bson.D{{"subject", "art of science"}, {"grade", "12th"}},
					bson.D{{"subject", "applied science and practical science"}, {"grade", "9th"}},
					bson.D{{"subject", "remedial math"}, {"grade", "12th"}},
					bson.D{{"subject", "science"}, {"grade", "10th"}},
				}},
			},
			bson.D{
				{"first", "Bob"},
				{"last", "Green"},
				{"classes", bson.A{
					bson.D{{"subject", "science of art"}, {"grade", "11th"}},
					bson.D{{"subject", "art art art"}, {"grade", "10th"}},
				}},
			},
		}},
		{"clubs", bson.D{
			{"stem", bson.A{
				bson.D{
					{"club_name", "chess"},
					{"description", "provides students opportunity to play the board game of chess informally and competitively in tournaments."},
				},
				bson.D{
					{"club_name", "kaboom chemistry"},
					{"description", "provides students opportunity to experiment with chemistry that fizzes and explodes."},
				},
			}},
			{"arts", bson.A{
				bson.D{
					{"club_name", "anime"},
					{"description", "provides students an opportunity to discuss, show, and collaborate on anime and broaden their Japanese cultural understanding."},
				},
				bson.D{
					{"club_name", "visual arts"},
					{"description", "provides students an opportunity to train, experiment, and prepare for internships and jobs as photographers, illustrators, graphic designers, and more."},
				},
			}},
		}},
	}

	_, err = collection.InsertOne(ctx, doc1)
	if err != nil {
		log.Fatal(err)
	}

	// Create and insert the second document - Evergreen High
	doc2 := bson.D{
		{"_id", 1},
		{"name", "Evergreen High"},
		{"mascot", "Jaguars"},
		{"teachers", bson.A{
			bson.D{
				{"first", "Jane"},
				{"last", "Earwhacker"},
				{"classes", bson.A{
					bson.D{{"subject", "art"}, {"grade", "9th"}},
					bson.D{{"subject", "science"}, {"grade", "12th"}},
				}},
			},
			bson.D{
				{"first", "John"},
				{"last", "Smith"},
				{"classes", bson.A{
					bson.D{{"subject", "math"}, {"grade", "12th"}},
					bson.D{{"subject", "art"}, {"grade", "10th"}},
				}},
			},
		}},
		{"clubs", bson.D{
			{"sports", bson.A{
				bson.D{
					{"club_name", "archery"},
					{"description", "provides students an opportunity to practice and hone the skill of using a bow to shoot arrows in a fun and safe environment."},
				},
				bson.D{
					{"club_name", "ultimate frisbee"},
					{"description", "provides students an opportunity to play frisbee and learn the basics of holding the disc and complete passes."},
				},
			}},
			{"stem", bson.A{
				bson.D{
					{"club_name", "zapped"},
					{"description", "provides students an opportunity to make exciting gadgets and explore electricity."},
				},
				bson.D{
					{"club_name", "loose in the chem lab"},
					{"description", "provides students an opportunity to put the scientific method to the test and get elbow deep in chemistry."},
				},
			}},
		}},
	}

	_, err = collection.InsertOne(ctx, doc2)
	if err != nil {
		log.Fatal(err)
	}

	// Create and insert the third document - Lincoln High
	doc3 := bson.D{
		{"_id", 2},
		{"name", "Lincoln High"},
		{"mascot", "Sharks"},
		{"teachers", bson.A{
			bson.D{
				{"first", "Jane"},
				{"last", "Smith"},
				{"classes", bson.A{
					bson.D{{"subject", "science"}, {"grade", "9th"}},
					bson.D{{"subject", "math"}, {"grade", "12th"}},
				}},
			},
			bson.D{
				{"first", "John"},
				{"last", "Redman"},
				{"classes", bson.A{
					bson.D{{"subject", "art"}, {"grade", "12th"}},
				}},
			},
		}},
		{"clubs", bson.D{
			{"arts", bson.A{
				bson.D{
					{"club_name", "ceramics"},
					{"description", "provides students an opportunity to acquire knowledge of form, volume, and space relationships by constructing hand-built and wheel-thrown forms of clay."},
				},
				bson.D{
					{"club_name", "digital art"},
					{"description", "provides students an opportunity to learn about design for entertainment, 3D animation, technical art, or 3D modeling."},
				},
			}},
			{"sports", bson.A{
				bson.D{
					{"club_name", "dodgeball"},
					{"description", "provides students an opportunity to play dodgeball by throwing balls to eliminate the members of the opposing team while avoiding being hit themselves."},
				},
				bson.D{
					{"club_name", "martial arts"},
					{"description", "provides students an opportunity to learn self-defense or combat that utilize physical skill and coordination without weapons."},
				},
			}},
		}},
	}

	_, err = collection.InsertOne(ctx, doc3)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Schools collection successfully created and populated.")
}