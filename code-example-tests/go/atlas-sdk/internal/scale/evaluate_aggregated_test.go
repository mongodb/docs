package scale

import (
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
	"go.mongodb.org/atlas-sdk/v20250219001/mockadmin"
)

// helper to build measurements with provided float32 values (interpreting <=1 as fractional)
func buildMeasurements(vals ...float32) *admin.ApiMeasurementsGeneralViewAtlas {
	pts := make([]admin.MetricDataPointAtlas, 0, len(vals))
	for i, v := range vals {
		pts = append(pts, admin.MetricDataPointAtlas{
			Timestamp: admin.PtrTime(time.Unix(int64(1700000000+i*60), 0).UTC()),
			Value:     admin.PtrFloat32(v),
		})
	}
	return &admin.ApiMeasurementsGeneralViewAtlas{Measurements: &[]admin.MetricsMeasurementAtlas{{
		Name:       admin.PtrString("PROCESS_CPU_USER"),
		DataPoints: &pts,
	}}}
}

func TestEvaluateDecisionAggregated_PrimaryTriggers(t *testing.T) {
	ctx := context.Background()
	projectID := "proj1"
	clusterName := "clusterA"
	primaryID := "primary:27017"
	secondaryID := "secondary:27017"

	mockSvc := mockadmin.NewMonitoringAndLogsApi(t)

	// Primary metrics average 80% (0.80 fractional) > threshold 75
	mockSvc.EXPECT().GetHostMeasurements(mock.Anything, projectID, primaryID).Return(admin.GetHostMeasurementsApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().GetHostMeasurementsExecute(mock.Anything).Return(buildMeasurements(0.80, 0.80), nil, nil).Once()
	// Secondary metrics average 50%
	mockSvc.EXPECT().GetHostMeasurements(mock.Anything, projectID, secondaryID).Return(admin.GetHostMeasurementsApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().GetHostMeasurementsExecute(mock.Anything).Return(buildMeasurements(0.50, 0.50), nil, nil).Once()

	client := &admin.APIClient{MonitoringAndLogsApi: mockSvc}
	sc := ScalingConfig{TargetTier: "M50", CPUThreshold: 75, PeriodMinutes: 60}

	shouldScale, reason := EvaluateDecisionAggregated(ctx, client, projectID, clusterName, []string{primaryID, secondaryID}, primaryID, sc)
	require.True(t, shouldScale, "expected scaling due to primary > threshold")
	require.Contains(t, reason, "primary CPU", "reason should reference primary trigger")
}

func TestEvaluateDecisionAggregated_AggregatedTriggers(t *testing.T) {
	ctx := context.Background()
	projectID := "proj1"
	clusterName := "clusterA"
	primaryID := "primary:27017"
	sec1 := "sec1:27017"
	sec2 := "sec2:27017"

	mockSvc := mockadmin.NewMonitoringAndLogsApi(t)
	// Primary 70% (below threshold)
	mockSvc.EXPECT().GetHostMeasurements(mock.Anything, projectID, primaryID).Return(admin.GetHostMeasurementsApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().GetHostMeasurementsExecute(mock.Anything).Return(buildMeasurements(0.70, 0.70), nil, nil).Once()
	// Secondaries high (85%) raising aggregate above threshold 75
	mockSvc.EXPECT().GetHostMeasurements(mock.Anything, projectID, sec1).Return(admin.GetHostMeasurementsApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().GetHostMeasurementsExecute(mock.Anything).Return(buildMeasurements(0.85, 0.85), nil, nil).Once()
	mockSvc.EXPECT().GetHostMeasurements(mock.Anything, projectID, sec2).Return(admin.GetHostMeasurementsApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().GetHostMeasurementsExecute(mock.Anything).Return(buildMeasurements(0.85, 0.85), nil, nil).Once()

	client := &admin.APIClient{MonitoringAndLogsApi: mockSvc}
	sc := ScalingConfig{TargetTier: "M50", CPUThreshold: 75, PeriodMinutes: 60}

	shouldScale, reason := EvaluateDecisionAggregated(ctx, client, projectID, clusterName, []string{primaryID, sec1, sec2}, primaryID, sc)
	require.True(t, shouldScale, "expected scaling due to aggregated > threshold")
	require.Contains(t, reason, "aggregated CPU", "reason should reference aggregated trigger")
}

func TestEvaluateDecisionAggregated_NoMetrics(t *testing.T) {
	ctx := context.Background()
	projectID := "proj1"
	clusterName := "clusterA"
	primaryID := "primary:27017"
	sec := "sec:27017"

	mockSvc := mockadmin.NewMonitoringAndLogsApi(t)
	// Return errors (simulate metrics not available) by returning nil measurements with not found error detail
	mockSvc.EXPECT().GetHostMeasurements(mock.Anything, projectID, primaryID).Return(admin.GetHostMeasurementsApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().GetHostMeasurementsExecute(mock.Anything).Return(nil, nil, fmt.Errorf("not found"))
	mockSvc.EXPECT().GetHostMeasurements(mock.Anything, projectID, sec).Return(admin.GetHostMeasurementsApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().GetHostMeasurementsExecute(mock.Anything).Return(nil, nil, fmt.Errorf("not found"))

	client := &admin.APIClient{MonitoringAndLogsApi: mockSvc}
	sc := ScalingConfig{TargetTier: "M50", CPUThreshold: 75, PeriodMinutes: 60}

	shouldScale, reason := EvaluateDecisionAggregated(ctx, client, projectID, clusterName, []string{primaryID, sec}, primaryID, sc)
	require.False(t, shouldScale, "expected not to scale with no metrics")
	require.Contains(t, reason, "metrics unavailable", "expected metrics unavailable reason")
}

func TestEvaluateDecisionAggregated_PreScaleShortCircuit(t *testing.T) {
	ctx := context.Background()
	projectID := "proj1"
	clusterName := "clusterA"
	primaryID := "primary:27017"
	sec := "sec:27017"

	mockSvc := mockadmin.NewMonitoringAndLogsApi(t)
	// No expectations for metrics (shouldn't be called)
	client := &admin.APIClient{MonitoringAndLogsApi: mockSvc}
	sc := ScalingConfig{TargetTier: "M50", CPUThreshold: 75, PeriodMinutes: 60, PreScale: true}

	shouldScale, reason := EvaluateDecisionAggregated(ctx, client, projectID, clusterName, []string{primaryID, sec}, primaryID, sc)
	require.True(t, shouldScale, "expected scale due to pre-scale")
	require.Contains(t, reason, "pre-scale", "reason should mention pre-scale")
}
