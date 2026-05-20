// See entire project at https://github.com/mongodb/atlas-architecture-go-sdk
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"atlas-sdk-examples/internal/archive"
	"atlas-sdk-examples/internal/auth"
	"atlas-sdk-examples/internal/config"

	"github.com/joho/godotenv"
)

func main() {
	envFile := ".env.production"
	if err := godotenv.Load(envFile); err != nil {
		log.Printf("Warning: could not load %s file: %v", envFile, err)
	}

	secrets, cfg, err := config.LoadAllFromEnv()
	if err != nil {
		log.Fatalf("Failed to load configuration %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Minute)
	defer cancel()
	client, err := auth.NewClient(ctx, cfg, secrets)
	if err != nil {
		log.Fatalf("Failed to initialize authentication client: %v", err)
	}

	projectID := cfg.ProjectID
	if projectID == "" {
		log.Fatal("Failed to find Project ID in configuration")
	}

	fmt.Printf("Starting archive analysis for project: %s\n", projectID)

	// Get all clusters in the project
	clusters, _, err := client.ClustersApi.ListClusters(ctx, projectID).Execute()
	if err != nil {
		log.Fatalf("Failed to list clusters: %v", err)
	}

	fmt.Printf("\nFound %d clusters to analyze\n", len(clusters.GetResults()))

	failedArchives := 0
	skippedCandidates := 0
	totalCandidates := 0

	// Create archive options with custom settings
	opts := archive.DefaultOptions()
	opts.DefaultRetentionMultiplier = 2
	opts.MinimumRetentionDays = 30
	opts.EnableDataExpiration = true
	opts.ArchiveSchedule = "DAILY"

	for _, cluster := range clusters.GetResults() {
		clusterName := cluster.GetName()
		fmt.Printf("\n=== Analyzing cluster: %s ===", clusterName)

		// Find collections suitable for archiving based on demo criteria.
		// This simplified example first selects all collections with counts, and then filters them.
		// NOTE: In a real implementation, you would analyze collections based on size, age,
		// access patterns, and other factors to determine candidates for archiving.
		stats := archive.ListCollectionsWithCounts(ctx, client, projectID, clusterName)
		candidates := make([]archive.Candidate, 0)
		const docThreshold = 100000
		for _, s := range stats {
			// Skip internal databases
			if s.DatabaseName == "admin" || s.DatabaseName == "local" || s.DatabaseName == "config" {
				continue
			}
			// Demo criterion: collections with >= 100k documents
			if s.EstimatedCount >= docThreshold {
				candidates = append(candidates, archive.Candidate{
					DatabaseName:    s.DatabaseName,
					CollectionName:  s.CollectionName,
					DateField:       "createdAt",
					DateFormat:      "DATE",
					RetentionDays:   90,
					PartitionFields: []string{"createdAt"},
				})
			}
		}
		totalCandidates += len(candidates)
		fmt.Printf("\nFound %d collections eligible for archiving in cluster %s\n",
			len(candidates), clusterName)

		// Configure online archive for each candidate collection
		for _, candidate := range candidates {
			// Pre-validate candidate before attempting configuration
			if err := archive.ValidateCandidate(candidate, opts); err != nil {
				fmt.Printf("- Skipping %s.%s: invalid candidate: %v\n",
					candidate.DatabaseName, candidate.CollectionName, err)
				skippedCandidates++
				continue
			}

			fmt.Printf("- Configuring archive for %s.%s\n",
				candidate.DatabaseName, candidate.CollectionName)

			configureErr := archive.ConfigureOnlineArchive(ctx, client, projectID, clusterName, candidate, opts)
			if configureErr != nil {
				fmt.Printf("  Failed to configure archive: %v\n", configureErr)
				failedArchives++
				continue
			}

			fmt.Printf("  Successfully configured online archive for %s.%s\n",
				candidate.DatabaseName, candidate.CollectionName)
		}
	}

	if skippedCandidates > 0 {
		fmt.Printf("\nINFO: Skipped %d of %d candidates due to validation errors\n", skippedCandidates, totalCandidates)
	}
	if failedArchives > 0 {
		fmt.Printf("WARNING: %d of %d archive configurations failed (excluding skipped)\n", failedArchives, totalCandidates-skippedCandidates)
	}

	fmt.Println("Archive analysis and configuration completed.")
}

