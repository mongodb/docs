package main  
  
import (  
	"context"  
	"fmt"  
	"log"  
  
	"go.mongodb.org/mongo-driver/v2/mongo"  
	"go.mongodb.org/mongo-driver/v2/mongo/options"  
)  
  
func main() {  
	ctx := context.Background()  
  
	// Replace the placeholder with your connection string  
	const uri = "<connection-string>"  
  
	// Connect to your cluster  
	clientOptions := options.Client().ApplyURI(uri)  
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {  
		log.Fatalf("failed to connect to the server: %v", err)  
	}  
	defer func() { _ = client.Disconnect(ctx) }()  
  
	// Set the namespace  
	coll := client.Database("<database-name>").Collection("<collection-name>")  
	indexName := "<index-name>"  
  
	type autoEmbedField struct {  
		Type             string `bson:"type"`  
		Modality         string `bson:"modality"`  
		Path             string `bson:"path"`  
		Model            string `bson:"model"`
		Similarity       string `bson:"similarity"`  
		IndexingMethod   string `bson:"indexingMethod"`  
		HnswOptions      struct {  
			MaxEdges         int `bson:"maxEdges"`  
			NumEdgeCandidates int `bson:"numEdgeCandidates"`  
		} `bson:"hnswOptions"`  
		Quantization string `bson:"quantization"`  
		NumDimensions  int    `bson:"numDimensions"`  
	}  
  
	type filterField struct {  
		Type string `bson:"type"`  
		Path string `bson:"path"`  
	}  
  
	type indexDefinition struct {  
		Fields []interface{} `bson:"fields"`  
	}  
  
	definition := indexDefinition{  
		Fields: []interface{}{  
			autoEmbedField{  
				Type:     "autoEmbed",  
				Modality: "text",  
				Path:     "<indexed-field>",  
				Model:    "<embedding-model>", 
				Similarity:       "<similarity-metric>",  
				IndexingMethod:   "<indexing-method>",  
				HnswOptions:      struct {  
					MaxEdges         int `bson:"maxEdges"`  
					NumEdgeCandidates int `bson:"numEdgeCandidates"`  
				} {  
					MaxEdges:         <max-edges>,  
					NumEdgeCandidates: <num-edge-candidates>,  
				},  
				Quantization: "<quantization-type>",  
				NumDimensions:  <num-dimensions>,  
			},  
			filterField{  
				Type: "filter",
				Path: "<field-to-index>",  
			},  
		},  
	}  
  
	err = coll.SearchIndexes().UpdateOne(ctx, <index-name>, definition)  
  
	if err != nil {  
		log.Fatalf("failed to update the index: %v", err)  
	}  
  
	fmt.Println("Successfully updated the search index")  
}  