package metrics

import (
	"context"
	"testing"

	"time"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
	"go.mongodb.org/atlas-sdk/v20250219001/mockadmin"
)

// Fixed timestamp for testing
const fixedTS = "2023-04-01T12:00:00Z"

// parseTS parses a timestamp string into a time.Time object
func parseTS(t *testing.T, ts string) time.Time {
	parsed, err := time.Parse(time.RFC3339, ts)
	require.NoError(t, err)
	return parsed
}

// -----------------------------------------------------------------------------
// Integration tests against test HTTP server
// -----------------------------------------------------------------------------
// TODO: Implement integration tests

// -----------------------------------------------------------------------------
// Unit‐level tests against SDK mocks
// -----------------------------------------------------------------------------

func TestFetchDiskMetrics(t *testing.T) {
	t.Parallel()
	ctx := context.Background()

	cases := []struct {
		name      string
		view      *admin.ApiMeasurementsGeneralViewAtlas
		wantErr   bool
		wantCount int
	}{
		{name: "Happy path returns data",
			view: &admin.ApiMeasurementsGeneralViewAtlas{
				Measurements: &[]admin.MetricsMeasurementAtlas{{
					Name: admin.PtrString("DISK_METRIC"),
					DataPoints: &[]admin.MetricDataPointAtlas{{
						Timestamp: admin.PtrTime(parseTS(t, fixedTS)),
						Value:     admin.PtrFloat32(4.56)}}}}},
			wantCount: 1},
		{name: "No available data returns error",
			view:    &admin.ApiMeasurementsGeneralViewAtlas{},
			wantErr: true},
	}

	baseDisk := admin.GetDiskMeasurementsApiParams{
		GroupId:       "gID",
		PartitionName: "part",
		ProcessId:     "pID",
		Granularity:   admin.PtrString("P1D"),
		Period:        admin.PtrString("P1D"),
		M:             &[]string{"DISK_METRIC"},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			// setup mock SDK
			mockSvc := mockadmin.NewMonitoringAndLogsApi(t)
			mockSvc.EXPECT().
				GetDiskMeasurements(mock.Anything, baseDisk.GroupId, baseDisk.PartitionName, baseDisk.ProcessId).
				Return(admin.GetDiskMeasurementsApiRequest{ApiService: mockSvc}).Once()
			mockSvc.EXPECT().
				GetDiskMeasurementsExecute(mock.Anything).
				Return(tc.view, nil, nil).Once()

			result, err := FetchDiskMetrics(ctx, mockSvc, &baseDisk)

			if tc.wantErr {
				require.Error(t, err)
				return
			}
			require.NoError(t, err)
			require.ElementsMatch(t, *result.Measurements, tc.view.GetMeasurements())
			require.Len(t, *result.Measurements, tc.wantCount)
		})
	}
}
