package archive

import (
	"context"
	"fmt"
	"time"

	"atlas-sdk-examples/internal/clusterutils"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Candidate represents a collection eligible for archiving
type Candidate struct {
	DatabaseName    string
	CollectionName  string
	DateField       string
	DateFormat      string
	RetentionDays   int
	PartitionFields []string
}

// Options defines configuration settings for archive operations
type Options struct {
	// Default data retention period multiplier
	DefaultRetentionMultiplier int
	// Minimum retention days required before archiving
	MinimumRetentionDays int
	// Whether to enable data expiration
	EnableDataExpiration bool
	// Schedule for archive operations
	ArchiveSchedule string
}

// DefaultOptions returns a zero-value Options instance. Callers should explicitly
// set any desired values at the call site rather than relying on package defaults.
func DefaultOptions() Options {
	return Options{}
}

// ValidateCandidate demonstrates how to pre-validate the archiving candidate to
// ensure that it meets the designated minimum requirements, if any.
// NOTE: Customize criteria as needed to pre-validate candidates before attempting
// to configure an online archive.
func ValidateCandidate(candidate Candidate, opts Options) error {
	if candidate.DatabaseName == "" || candidate.CollectionName == "" {
		return fmt.Errorf("database name and collection name are required")
	}

	if candidate.RetentionDays < opts.MinimumRetentionDays {
		return fmt.Errorf("retention days must be at least %d", opts.MinimumRetentionDays)
	}

	if len(candidate.PartitionFields) == 0 {
		return fmt.Errorf("at least one partition field is required")
	}

	// For date-based archiving, validate date field settings
	if candidate.DateField != "" {
		validFormats := map[string]bool{
			"DATE":              true,
			"EPOCH_SECONDS":     true,
			"EPOCH_MILLIS":      true,
			"EPOCH_NANOSECONDS": true,
			"OBJECTID":          true,
		}
		if !validFormats[candidate.DateFormat] {
			return fmt.Errorf("invalid date format: %s", candidate.DateFormat)
		}

		// Check if date field is included in partition fields
		dateFieldIncluded := false
		for _, field := range candidate.PartitionFields {
			if field == candidate.DateField {
				dateFieldIncluded = true
				break
			}
		}
		if !dateFieldIncluded {
			return fmt.Errorf("date field %s must be included in partition fields", candidate.DateField)
		}
	}

	return nil
}

// CollectionStat represents basic statistics about a collection.
type CollectionStat struct {
	DatabaseName   string
	CollectionName string
	EstimatedCount int64
}

// ListCollectionsWithCounts connects to the cluster with the MongoDB Go Driver and returns a flat list of collections
// with their estimated document counts.
// NOTE: This function intentionally applies no filtering or demo criteria to decide what qualifies as a candidate.
func ListCollectionsWithCounts(ctx context.Context, sdk *admin.APIClient, projectID, clusterName string) []CollectionStat {
	stats := make([]CollectionStat, 0)

	// Get the SRV connection string for the cluster
	srv, err := clusterutils.GetClusterSRVConnectionString(ctx, sdk, projectID, clusterName)
	if err != nil || srv == "" {
		return stats
	}

	ctxConn, cancel := context.WithTimeout(ctx, 2*time.Second)
	defer cancel()
	clientOpts := options.Client().ApplyURI(srv).
		SetServerSelectionTimeout(2 * time.Second).
		SetConnectTimeout(2 * time.Second)

	// Connect to the cluster using the official MongoDB Go Driver
	client, err := mongo.Connect(ctxConn, clientOpts)
	if err != nil {
		return stats
	}
	defer func() { _ = client.Disconnect(context.Background()) }()

	_ = client.Ping(ctxConn, nil)

	dbNames, err := client.ListDatabaseNames(ctx, bson.D{})
	if err != nil {
		return stats
	}

	for _, dbName := range dbNames {
		collNames, err := client.Database(dbName).ListCollectionNames(ctx, bson.D{})
		if err != nil {
			continue
		}
		for _, collName := range collNames {
			coll := client.Database(dbName).Collection(collName)
			// Use EstimatedDocumentCount for speed
			count, err := coll.EstimatedDocumentCount(ctx)
			if err != nil {
				continue
			}
			stats = append(stats, CollectionStat{
				DatabaseName:   dbName,
				CollectionName: collName,
				EstimatedCount: count,
			})
		}
	}
	return stats
}
