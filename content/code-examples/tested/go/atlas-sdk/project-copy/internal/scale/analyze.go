package scale

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"atlas-sdk-examples/internal/clusterutils"
	"atlas-sdk-examples/internal/metrics"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// GetAverageProcessCPU fetches host CPU metrics and returns a simple average percentage over the lookback period.
func GetAverageProcessCPU(ctx context.Context, client *admin.APIClient, projectID, clusterName string, periodMinutes int) (float64, error) {
	// Defensive validation so examples/tests can pass nil or bad inputs without panics
	if client == nil {
		return 0, fmt.Errorf("nil atlas client")
	}
	if projectID == "" {
		return 0, fmt.Errorf("empty project id")
	}
	if clusterName == "" {
		return 0, fmt.Errorf("empty cluster name")
	}
	if periodMinutes <= 0 {
		return 0, fmt.Errorf("invalid period minutes: %d", periodMinutes)
	}

	procID, err := clusterutils.GetProcessIdForCluster(ctx, client.MonitoringAndLogsApi, &admin.ListAtlasProcessesApiParams{GroupId: projectID}, clusterName)
	if err != nil {
		return 0, err
	}
	if procID == "" {
		return 0, fmt.Errorf("no process found for cluster %s", clusterName)
	}

	granularity := "PT1M"
	period := fmt.Sprintf("PT%vM", periodMinutes)
	metricsList := []string{"PROCESS_CPU_USER"}
	m, err := metrics.FetchProcessMetrics(ctx, client.MonitoringAndLogsApi, &admin.GetHostMeasurementsApiParams{
		GroupId:     projectID,
		ProcessId:   procID,
		Granularity: &granularity,
		Period:      &period,
		M:           &metricsList,
	})
	if err != nil {
		return 0, err
	}

	if m == nil || !m.HasMeasurements() {
		return 0, fmt.Errorf("no measurements returned")
	}
	meas := m.GetMeasurements()
	if len(meas) == 0 || !meas[0].HasDataPoints() {
		return 0, fmt.Errorf("no datapoints returned")
	}

	total := 0.0
	count := 0.0
	for _, dp := range meas[0].GetDataPoints() {
		if dp.HasValue() {
			v := float64(dp.GetValue())
			total += v
			count++
		}
	}
	if count == 0 {
		return 0, fmt.Errorf("no usable datapoint values")
	}
	avg := total / count
	// Convert fractional to % if needed
	if avg <= 1.0 {
		avg *= 100.0
	}
	return avg, nil
}

// GetAverageCPUForProcess fetches host CPU metrics for a specific process ID and returns an average percentage.
func GetAverageCPUForProcess(ctx context.Context, client *admin.APIClient, projectID, processID string, periodMinutes int) (float64, error) {
	if client == nil {
		return 0, fmt.Errorf("nil atlas client")
	}
	if projectID == "" {
		return 0, fmt.Errorf("empty project id")
	}
	if processID == "" {
		return 0, fmt.Errorf("empty process id")
	}
	if periodMinutes <= 0 {
		return 0, fmt.Errorf("invalid period minutes: %d", periodMinutes)
	}
	granularity := "PT1M"
	period := fmt.Sprintf("PT%vM", periodMinutes)
	metricsList := []string{"PROCESS_CPU_USER"}
	m, err := metrics.FetchProcessMetrics(ctx, client.MonitoringAndLogsApi, &admin.GetHostMeasurementsApiParams{
		GroupId:     projectID,
		ProcessId:   processID,
		Granularity: &granularity,
		Period:      &period,
		M:           &metricsList,
	})
	if err != nil {
		return 0, err
	}
	if m == nil || !m.HasMeasurements() {
		return 0, fmt.Errorf("no measurements returned")
	}
	meas := m.GetMeasurements()
	if len(meas) == 0 || !meas[0].HasDataPoints() {
		return 0, fmt.Errorf("no datapoints returned")
	}
	total := 0.0
	count := 0.0
	for _, dp := range meas[0].GetDataPoints() {
		if dp.HasValue() {
			v := float64(dp.GetValue())
			total += v
			count++
		}
	}
	if count == 0 {
		return 0, fmt.Errorf("no usable datapoint values")
	}
	avg := total / count
	if avg <= 1.0 { // convert fractional to percent
		avg *= 100.0
	}
	return avg, nil
}

// GetAverageCPUForProcesses returns a map of processID -> average CPU (percent) ignoring processes with errors.
func GetAverageCPUForProcesses(ctx context.Context, client *admin.APIClient, projectID string, processIDs []string, periodMinutes int) map[string]float64 {
	out := make(map[string]float64, len(processIDs))
	for _, pid := range processIDs {
		avg, err := GetAverageCPUForProcess(ctx, client, projectID, pid, periodMinutes)
		if err != nil {
			continue
		}
		out[pid] = avg
	}
	return out
}

// ExtractInstanceSize retrieves the electable instance size from the first region config.
func ExtractInstanceSize(cur *admin.ClusterDescription20240805) (string, error) {
	if cur == nil || !cur.HasReplicationSpecs() {
		return "", errors.New("cluster has no replication specs")
	}
	repl := cur.GetReplicationSpecs()
	if len(repl) == 0 {
		return "", errors.New("no replication specs entries")
	}
	rcs := repl[0].GetRegionConfigs()
	if len(rcs) == 0 || !rcs[0].HasElectableSpecs() {
		return "", errors.New("no region config electable specs")
	}
	es := rcs[0].GetElectableSpecs()
	if !es.HasInstanceSize() {
		return "", errors.New("electable specs missing instance size")
	}
	return es.GetInstanceSize(), nil
}

// IsSharedTier returns true if the tier is not a dedicated tier (M0, M2, M5) cluster.
func IsSharedTier(tier string) bool {
	if tier == "" {
		return false
	}
	upper := strings.ToUpper(tier)
	return upper == "M0" || upper == "M2" || upper == "M5"
}
