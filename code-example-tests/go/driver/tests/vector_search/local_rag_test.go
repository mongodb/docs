package vector_search

import (
	"context"
	"net"
	"os"
	"strings"
	"testing"
	"time"

	"driver-examples/examples/vector_search/local_rag"
	"driver-examples/utils"
	"driver-examples/utils/compare"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

const (
	databaseName   = "sample_airbnb"
	collectionName = "listingsAndReviews"
)

// queryResult mirrors the fields the tutorial prints for each matching
// document, so schema validation can check the shape of the search results.
type queryResult struct {
	Summary    string  `bson:"summary"`
	ListingURL string  `bson:"listing_url"`
	Score      float32 `bson:"score"`
}

// requiresOllama skips the test when a local Ollama server is unreachable. The
// examples generate embeddings with nomic-embed-text and answers with mistral,
// both served by Ollama on the host in OLLAMA_HOST (or localhost:11434).
func requiresOllama(t *testing.T) {
	t.Helper()
	utils.EnsureEnvLoaded()

	address := os.Getenv("OLLAMA_HOST")
	if address == "" {
		address = "localhost:11434"
	}
	address = strings.TrimPrefix(strings.TrimPrefix(address, "http://"), "https://")
	address = strings.TrimSuffix(address, "/")

	conn, err := net.DialTimeout("tcp", address, 5*time.Second)
	if err != nil {
		t.Skipf("skipping: no Ollama server reachable at %s: %v", address, err)
	}
	_ = conn.Close()
}

// setupTestDB connects to the deployment and returns a cleanup function that
// reverts every change the examples make to the sample data. The sample
// database itself is never dropped.
func setupTestDB(t *testing.T) (*mongo.Client, func()) {
	t.Helper()
	ctx := context.Background()

	uri := utils.GetConnectionString()
	if uri == "" {
		t.Fatal("set your 'CONNECTION_STRING' environment variable")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		t.Fatalf("failed to connect to the server: %v", err)
	}

	cleanup := func() {
		coll := client.Database(databaseName).Collection(collectionName)

		unset := bson.D{{Key: "$unset", Value: bson.D{
			{Key: local_rag.EmbeddingsField, Value: ""},
			{Key: "pageContent", Value: ""},
			{Key: "metadata", Value: ""},
		}}}
		filter := bson.D{{Key: local_rag.EmbeddingsField, Value: bson.D{{Key: "$exists", Value: true}}}}
		if _, err := coll.UpdateMany(ctx, filter, unset); err != nil {
			t.Logf("failed to remove embeddings: %v", err)
		}

		if err := coll.SearchIndexes().DropOne(ctx, local_rag.VectorIndexName); err != nil {
			t.Logf("failed to drop search index: %v", err)
		}

		if err := client.Disconnect(ctx); err != nil {
			t.Logf("failed to disconnect client: %v", err)
		}
	}

	return client, cleanup
}

// TestLocalRag runs the local RAG tutorial end to end. The steps are ordered
// subtests of a single test because each step depends on the previous one: the
// index needs embeddings, and retrieval needs a queryable index.
func TestLocalRag(t *testing.T) {
	utils.RequiresSampleDataWithCollections(t, map[string][]string{
		databaseName: {collectionName},
	})
	requiresOllama(t)

	client, cleanup := setupTestDB(t)
	defer cleanup()

	t.Run("GenerateEmbeddings", func(t *testing.T) {
		result := local_rag.GenerateEmbeddings()
		compare.ExpectThat(t, result).
			ShouldMatch("examples/vector_search/local_rag/generate-embeddings-output.txt")
	})

	t.Run("EmbeddingsHave768Dimensions", func(t *testing.T) {
		coll := client.Database(databaseName).Collection(collectionName)
		filter := bson.D{{Key: local_rag.EmbeddingsField, Value: bson.D{{Key: "$exists", Value: true}}}}

		var listing local_rag.Listing
		if err := coll.FindOne(context.Background(), filter).Decode(&listing); err != nil {
			t.Fatalf("failed to find a document with embeddings: %v", err)
		}

		actual := []bson.D{{{Key: "dimensions", Value: len(listing.Embeddings)}}}
		expected := []bson.D{{{Key: "dimensions", Value: 768}}}
		compare.ExpectThat(t, actual).ShouldMatch(expected)
	})

	t.Run("CreateVectorIndex", func(t *testing.T) {
		indexName := local_rag.CreateVectorIndex()

		actual := []bson.D{{{Key: "name", Value: indexName}}}
		expected := []bson.D{{{Key: "name", Value: local_rag.VectorIndexName}}}
		compare.ExpectThat(t, actual).ShouldMatch(expected)
	})

	t.Run("RetrieveDocuments", func(t *testing.T) {
		documents := local_rag.RetrieveDocuments("beach house")

		results := make([]queryResult, len(documents))
		for i, document := range documents {
			listingURL, ok := document.Metadata["listing_url"].(string)
			if !ok {
				t.Fatalf("expected a string listing_url in the metadata of document %d", i)
			}
			results[i] = queryResult{
				Summary:    document.PageContent,
				ListingURL: listingURL,
				Score:      document.Score,
			}
		}

		// Vector search scores and result order vary across deployments, so
		// validate the shape of the results rather than exact values.
		compare.ExpectThat(t, results).
			ShouldResemble("examples/vector_search/local_rag/retrieve-documents-output.txt").
			WithSchema(compare.Schema{
				Count:          5,
				RequiredFields: []string{"summary", "listing_url", "score"},
			})
	})

	t.Run("TestQueryBuildsContext", func(t *testing.T) {
		queryContext := local_rag.RunTestQuery()

		actual := []bson.D{{
			{Key: "context", Value: queryContext},
			{Key: "is_empty", Value: strings.TrimSpace(queryContext) == ""},
		}}
		compare.ExpectThat(t, actual).ShouldMatch(`[{"context": "...", "is_empty": false}]`)
	})

	t.Run("AnswerQuestion", func(t *testing.T) {
		answer := local_rag.AnswerQuestion()

		// The LLM response text varies on every run, so assert only that the
		// generation step produced text.
		actual := []bson.D{{
			{Key: "answer", Value: answer},
			{Key: "is_empty", Value: strings.TrimSpace(answer) == ""},
		}}
		compare.ExpectThat(t, actual).ShouldMatch(`[{"answer": "...", "is_empty": false}]`)
	})
}
