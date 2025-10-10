package main

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"atlas-sdk-examples/internal/auth"
	"atlas-sdk-examples/internal/clusterutils"
	"atlas-sdk-examples/internal/config"
	"atlas-sdk-examples/internal/scale"

	"github.com/joho/godotenv"
)

func main() {
	envFile := ".env.production"
	if err := godotenv.Load(envFile); err != nil {
		log.Printf("Warning: could not load %s file: %v", envFile, err)
	}

	secrets, cfg, err := config.LoadAllFromEnv()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Minute)
	defer cancel()
	client, err := auth.NewClient(ctx, cfg, secrets)
	if err != nil {
		log.Fatalf("Failed to initialize authentication client: %v", err)
	}

	projectID := cfg.ProjectID
	if projectID == "" {
		log.Fatal("Failed to find Project ID in configuration")
	}

	procDetails, err := clusterutils.ListClusterProcessDetails(ctx, client, projectID)
	if err != nil {
		log.Printf("Warning: unable to map detailed processes to clusters: %v", err)
	}

	// Based on the configuration settings, perform the following programmatic scaling:
	//   - Pre-scale ahead of a known traffic spike (e.g. planned bulk inserts)
	//   - Reactive scale when sustained compute utilization exceeds a threshold
	//
	// NOTE: Prefer Atlas built-in auto-scaling for gradual growth. Use programmatic scaling for exceptional events or custom logic.
	scaling := scale.LoadScalingConfig(cfg)
	fmt.Printf("Starting scaling analysis for project: %s\n", projectID)
	fmt.Printf("Configuration - Target tier: %s, Pre-scale: %v, CPU threshold: %.1f%%, Period: %d min, Dry run: %v\n",
		scaling.TargetTier, scaling.PreScale, scaling.CPUThreshold, scaling.PeriodMinutes, scaling.DryRun)

	clusterList, _, err := client.ClustersApi.ListClusters(ctx, projectID).Execute()
	if err != nil {
		log.Fatalf("Failed to list clusters: %v", err)
	}

	clusters := clusterList.GetResults()
	fmt.Printf("\nFound %d clusters to analyze for scaling\n", len(clusters))

	// Track scaling operations across all clusters
	scalingCandidates := 0
	successfulScales := 0
	failedScales := 0
	skippedClusters := 0

	for _, cluster := range clusters {
		clusterName := cluster.GetName()
		fmt.Printf("\n=== Analyzing cluster: %s ===\n", clusterName)

		// Skip clusters that are not in IDLE state
		if cluster.HasStateName() && cluster.GetStateName() != "IDLE" {
			fmt.Printf("- Skipping cluster %s: not in IDLE state (current: %s)\n", clusterName, cluster.GetStateName())
			skippedClusters++
			continue
		}

		currentTier, err := scale.ExtractInstanceSize(&cluster)
		if err != nil {
			fmt.Printf("- Skipping cluster %s: failed to extract current tier: %v\n", clusterName, err)
			skippedClusters++
			continue
		}
		fmt.Printf("- Current tier: %s, Target tier: %s\n", currentTier, scaling.TargetTier)

		// Skip if already at target tier
		if strings.EqualFold(currentTier, scaling.TargetTier) {
			fmt.Printf("- No action needed: cluster already at target tier %s\n", scaling.TargetTier)
			continue
		}

		// Shared tier handling: skip reactive CPU (metrics unavailable) unless pre-scale
		if scale.IsSharedTier(currentTier) && !scaling.PreScale {
			fmt.Printf("- Shared tier (%s): reactive CPU metrics unavailable; skipping (enable PreScale to force scale)\n", currentTier)
			continue
		}

		// Gather process info for dedicated tiers
		var processID string
		var primaryID string
		var processIDs []string
		if procs, ok := procDetails[clusterName]; ok && len(procs) > 0 {
			for _, p := range procs {
				processIDs = append(processIDs, p.ID)
			}
			if pid, okp := clusterutils.GetPrimaryProcessID(procs); okp {
				primaryID = pid
			}
			processID = processIDs[0]
		}
		if len(processIDs) > 0 && !scale.IsSharedTier(currentTier) {
			fmt.Printf("- Found %d processes (primary=%s)\n", len(processIDs), primaryID)
		} else if processID != "" {
			fmt.Printf("- Using process ID: %s for metrics\n", processID)
		}

		// Evaluate scaling decision based on configuration and metrics
		var shouldScale bool
		var reason string
		if !scale.IsSharedTier(currentTier) && len(processIDs) > 0 { // dedicated tier with multiple processes
			shouldScale, reason = scale.EvaluateDecisionAggregated(ctx, client, projectID, clusterName, processIDs, primaryID, scaling)
		} else if !scale.IsSharedTier(currentTier) && processID != "" { // fallback if no aggregation possible
			shouldScale, reason = scale.EvaluateDecisionForProcess(ctx, client, projectID, clusterName, processID, scaling)
		} else if !scale.IsSharedTier(currentTier) { // dedicated tier but no process info
			shouldScale, reason = scale.EvaluateDecision(ctx, client, projectID, clusterName, scaling)
		} else { // shared tier (M0/M2/M5)
			shouldScale = scaling.PreScale
			if shouldScale {
				reason = "pre-scale event flag set (shared tier)"
			} else {
				reason = "shared tier without pre-scale"
			}
		}
		if !shouldScale {
			fmt.Printf("- Conditions not met: %s\n", reason)
			continue
		}

		scalingCandidates++
		fmt.Printf("- Scaling decision: proceed -> %s\n", reason)

		if scaling.DryRun {
			fmt.Printf("- DRY_RUN=true: would scale cluster %s from %s to %s\n",
				clusterName, currentTier, scaling.TargetTier)
			successfulScales++
			continue
		}

		if err := scale.ExecuteClusterScaling(ctx, client, projectID, clusterName, &cluster, scaling.TargetTier); err != nil {
			fmt.Printf("- ERROR: Failed to scale cluster %s: %v\n", clusterName, err)
			failedScales++
			continue
		}
		fmt.Printf("- Successfully initiated scaling for cluster %s from %s to %s\n",
			clusterName, currentTier, scaling.TargetTier)
		successfulScales++
	}

	fmt.Printf("\n=== Scaling Operation Summary ===\n")
	fmt.Printf("Total clusters analyzed: %d\n", len(clusters))
	fmt.Printf("Scaling candidates identified: %d\n", scalingCandidates)
	fmt.Printf("Successful scaling operations: %d\n", successfulScales)
	fmt.Printf("Failed scaling operations: %d\n", failedScales)
	fmt.Printf("Skipped clusters: %d\n", skippedClusters)

	if failedScales > 0 {
		fmt.Printf("WARNING: %d of %d scaling operations failed\n", failedScales, scalingCandidates)
	}

	if successfulScales > 0 && !scaling.DryRun {
		fmt.Println("\nAtlas will perform rolling resizes with zero-downtime semantics.")
		fmt.Println("Monitor status in the Atlas UI or poll cluster states until STATE_NAME becomes IDLE.")
	}
	fmt.Println("Scaling analysis and operations completed.")
}

