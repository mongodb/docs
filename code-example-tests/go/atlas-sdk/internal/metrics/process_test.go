package metrics

import (
	"context"
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
	"go.mongodb.org/atlas-sdk/v20250219001/mockadmin"
)

// -----------------------------------------------------------------------------
// Integration tests against test HTTP server
// -----------------------------------------------------------------------------
// TODO: Implement integration tests

// -----------------------------------------------------------------------------
// Unit‐level tests against SDK mocks
// -----------------------------------------------------------------------------

func TestFetchProcessMetrics_Unit(t *testing.T) {
	t.Parallel()
	ctx := context.Background()

	cases := []struct {
		name      string
		view      *admin.ApiMeasurementsGeneralViewAtlas
		wantErr   bool
		wantCount int
	}{
		{
			name: "Happy path returns data",
			view: &admin.ApiMeasurementsGeneralViewAtlas{
				Measurements: &[]admin.MetricsMeasurementAtlas{{
					Name: admin.PtrString("PROCESS_METRIC"),
					DataPoints: &[]admin.MetricDataPointAtlas{{
						Timestamp: admin.PtrTime(parseTS(t, fixedTS)),
						Value:     admin.PtrFloat32(1.23)}}}}},
			wantCount: 1,
		},
		{
			name:    "No available data returns error",
			view:    &admin.ApiMeasurementsGeneralViewAtlas{},
			wantErr: true,
		},
	}

	var baseProcess = admin.GetHostMeasurementsApiParams{
		GroupId:     "gID",
		ProcessId:   "pID",
		Granularity: admin.PtrString("PT1H"),
		Period:      admin.PtrString("P1D"),
		M:           &[]string{"METRIC"},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			mockSvc := mockadmin.NewMonitoringAndLogsApi(t)
			mockSvc.EXPECT().
				GetHostMeasurements(mock.Anything, baseProcess.GroupId, baseProcess.ProcessId).
				Return(admin.GetHostMeasurementsApiRequest{ApiService: mockSvc}).Once()
			mockSvc.EXPECT().
				GetHostMeasurementsExecute(mock.Anything).
				Return(tc.view, nil, nil).Once()

			result, err := FetchProcessMetrics(ctx, mockSvc, &baseProcess)

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
