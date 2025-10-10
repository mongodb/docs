package scale

import (
	"context"
	"fmt"

	"atlas-sdk-examples/internal/config"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// EvaluateDecision returns true if scaling should occur and a human-readable reason.
func EvaluateDecision(ctx context.Context, client *admin.APIClient, projectID, clusterName string, sc config.ScalingConfig) (bool, string) {
	// Pre-scale always wins (explicit operator intent for predictable events)
	if sc.PreScale {
		return true, "pre-scale event flag set (predictable traffic spike)"
	}

	// Reactive scaling based on sustained CPU utilization
	// Aligned with Atlas auto-scaling guidance: 75% for 1 hour triggers upscaling
	avgCPU, err := GetAverageProcessCPU(ctx, client, projectID, clusterName, sc.PeriodMinutes)
	if err != nil {
		fmt.Printf("  Warning: unable to compute average CPU for reactive scaling: %v\n", err)
		return false, "metrics unavailable for reactive scaling decision"
	}

	fmt.Printf("  Average CPU last %d minutes: %.1f%% (threshold: %.1f%%)\n",
		sc.PeriodMinutes, avgCPU, sc.CPUThreshold)

	if avgCPU > sc.CPUThreshold {
		return true, fmt.Sprintf("sustained CPU utilization %.1f%% > %.1f%% threshold over %d minutes",
			avgCPU, sc.CPUThreshold, sc.PeriodMinutes)
	}

	return false, fmt.Sprintf("CPU utilization %.1f%% below threshold %.1f%%", avgCPU, sc.CPUThreshold)
}

// EvaluateDecisionForProcess mirrors EvaluateDecision but uses an explicit process ID.
func EvaluateDecisionForProcess(ctx context.Context, client *admin.APIClient, projectID, clusterName, processID string, sc config.ScalingConfig) (bool, string) {
	// Pre-scale always wins (explicit operator intent for predictable events)
	if sc.PreScale {
		return true, "pre-scale event flag set (predictable traffic spike)"
	}

	// Reactive scaling based on sustained CPU utilization
	// Aligned with Atlas auto-scaling guidance: 75% for 1 hour triggers upscaling
	avgCPU, err := GetAverageCPUForProcess(ctx, client, projectID, processID, sc.PeriodMinutes)
	if err != nil {
		fmt.Printf("  Warning: unable to compute average CPU for reactive scaling (cluster=%s process=%s): %v\n", clusterName, processID, err)
		return false, "metrics unavailable for reactive scaling decision"
	}

	fmt.Printf("  Average CPU last %d minutes (process %s): %.1f%% (threshold: %.1f%%)\n",
		sc.PeriodMinutes, processID, avgCPU, sc.CPUThreshold)

	if avgCPU > sc.CPUThreshold {
		return true, fmt.Sprintf("sustained CPU utilization %.1f%% > %.1f%% threshold over %d minutes",
			avgCPU, sc.CPUThreshold, sc.PeriodMinutes)
	}

	return false, fmt.Sprintf("CPU utilization %.1f%% below threshold %.1f%%", avgCPU, sc.CPUThreshold)
}

// EvaluateDecisionAggregated evaluates scaling using multiple process metrics.
// Strategy:
// 1. If PreScale set -> scale.
// 2. If primary metrics available and exceed threshold -> scale.
// 3. Else compute average across all available processes -> scale if exceeds threshold.
// 4. If no metrics -> not scale (metrics unavailable).
func EvaluateDecisionAggregated(ctx context.Context, client *admin.APIClient, projectID, clusterName string, processIDs []string, primaryID string, sc config.ScalingConfig) (bool, string) {
	if sc.PreScale {
		return true, "pre-scale event flag set (predictable traffic spike)"
	}
	if client == nil || projectID == "" || clusterName == "" || sc.PeriodMinutes <= 0 {
		return false, "invalid inputs for aggregated evaluation"
	}
	if len(processIDs) == 0 {
		return EvaluateDecision(ctx, client, projectID, clusterName, sc)
	}
	cpus := GetAverageCPUForProcesses(ctx, client, projectID, processIDs, sc.PeriodMinutes)
	if len(cpus) == 0 {
		fmt.Printf("  Warning: no usable metrics across %d processes for cluster %s\n", len(processIDs), clusterName)
		return false, "metrics unavailable for reactive scaling decision"
	}
	if primaryID != "" {
		if v, ok := cpus[primaryID]; ok {
			fmt.Printf("  Primary process %s average CPU: %.1f%% (threshold: %.1f%%)\n", primaryID, v, sc.CPUThreshold)
			if v > sc.CPUThreshold {
				return true, fmt.Sprintf("primary CPU %.1f%% > %.1f%% threshold", v, sc.CPUThreshold)
			}
		}
	}
	// Aggregate across all processes
	sum := 0.0
	for _, v := range cpus {
		sum += v
	}
	agg := sum / float64(len(cpus))
	fmt.Printf("  Aggregated average CPU across %d processes: %.1f%% (threshold: %.1f%%)\n", len(cpus), agg, sc.CPUThreshold)
	if agg > sc.CPUThreshold {
		return true, fmt.Sprintf("aggregated CPU %.1f%% > %.1f%% threshold", agg, sc.CPUThreshold)
	}
	return false, fmt.Sprintf("aggregated CPU %.1f%% below threshold %.1f%%", agg, sc.CPUThreshold)
}
