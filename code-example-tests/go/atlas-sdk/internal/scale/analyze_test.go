package scale

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
	"go.mongodb.org/atlas-sdk/v20250219001/mockadmin"
)

const fixedTS = "2023-04-01T12:00:00Z"

func parseTS(t *testing.T, ts string) time.Time {
	v, err := time.Parse(time.RFC3339, ts)
	require.NoError(t, err)
	return v
}

func TestGetAverageProcessCPU(t *testing.T) {
	ctx := context.Background()
	tests := []struct {
		name          string
		projectID     string
		clusterName   string
		periodMinutes int
		processID     string
		processList   *admin.PaginatedHostViewAtlas
		measurements  *admin.ApiMeasurementsGeneralViewAtlas
		expectError   bool
		expectedCPU   float64
		msg           string
	}{
		{
			name:          "fractional_datapoints",
			projectID:     "proj1",
			clusterName:   "clusterA",
			periodMinutes: 60,
			processID:     "procA",
			processList: &admin.PaginatedHostViewAtlas{Results: &[]admin.ApiHostViewAtlas{{
				Id:        admin.PtrString("procA"),
				UserAlias: admin.PtrString("clusterA"),
			}}},
			measurements: &admin.ApiMeasurementsGeneralViewAtlas{Measurements: &[]admin.MetricsMeasurementAtlas{{
				Name: admin.PtrString("PROCESS_CPU_USER"),
				DataPoints: &[]admin.MetricDataPointAtlas{{
					Timestamp: admin.PtrTime(parseTS(t, fixedTS)),
					Value:     admin.PtrFloat32(0.75),
				}, {
					Timestamp: admin.PtrTime(parseTS(t, "2023-04-01T12:01:00Z")),
					Value:     admin.PtrFloat32(0.80),
				}},
			}}},
			expectedCPU: 77.5,
			msg:         "average of fractional datapoints converted to percent",
		},
		{
			name:          "percentage_datapoints",
			projectID:     "proj1",
			clusterName:   "clusterA",
			periodMinutes: 60,
			processID:     "procA",
			processList: &admin.PaginatedHostViewAtlas{Results: &[]admin.ApiHostViewAtlas{{
				Id:        admin.PtrString("procA"),
				UserAlias: admin.PtrString("clusterA"),
			}}},
			measurements: &admin.ApiMeasurementsGeneralViewAtlas{Measurements: &[]admin.MetricsMeasurementAtlas{{
				Name: admin.PtrString("PROCESS_CPU_USER"),
				DataPoints: &[]admin.MetricDataPointAtlas{{
					Timestamp: admin.PtrTime(parseTS(t, fixedTS)),
					Value:     admin.PtrFloat32(75.0),
				}, {
					Timestamp: admin.PtrTime(parseTS(t, "2023-04-01T12:01:00Z")),
					Value:     admin.PtrFloat32(80.0),
				}},
			}}},
			expectedCPU: 77.5,
			msg:         "average of already-percentage datapoints",
		},
		{
			name:          "no_process_found",
			projectID:     "proj1",
			clusterName:   "clusterA",
			periodMinutes: 60,
			processID:     "", // won't be used
			processList: &admin.PaginatedHostViewAtlas{Results: &[]admin.ApiHostViewAtlas{{ // alias mismatch
				Id:        admin.PtrString("procX"),
				UserAlias: admin.PtrString("otherCluster"),
			}}},
			expectError: true,
			msg:         "error when no process matches cluster",
		},
		{
			name:          "no_measurements",
			projectID:     "proj1",
			clusterName:   "clusterA",
			periodMinutes: 60,
			processID:     "procA",
			processList: &admin.PaginatedHostViewAtlas{Results: &[]admin.ApiHostViewAtlas{{
				Id:        admin.PtrString("procA"),
				UserAlias: admin.PtrString("clusterA"),
			}}},
			measurements: &admin.ApiMeasurementsGeneralViewAtlas{},
			expectError:  true,
			msg:          "error when measurements absent",
		},
		{
			name:          "empty_datapoints",
			projectID:     "proj1",
			clusterName:   "clusterA",
			periodMinutes: 60,
			processID:     "procA",
			processList: &admin.PaginatedHostViewAtlas{Results: &[]admin.ApiHostViewAtlas{{
				Id:        admin.PtrString("procA"),
				UserAlias: admin.PtrString("clusterA"),
			}}},
			measurements: &admin.ApiMeasurementsGeneralViewAtlas{Measurements: &[]admin.MetricsMeasurementAtlas{{
				Name:       admin.PtrString("PROCESS_CPU_USER"),
				DataPoints: &[]admin.MetricDataPointAtlas{},
			}}},
			expectError: true,
			msg:         "error when datapoints slice empty",
		},
	}

	for _, tc := range tests {
		c := tc
		t.Run(c.name, func(t *testing.T) {
			mockSvc := mockadmin.NewMonitoringAndLogsApi(t)

			// Expect list processes
			mockSvc.EXPECT().
				ListAtlasProcesses(mock.Anything, c.projectID).
				Return(admin.ListAtlasProcessesApiRequest{ApiService: mockSvc}).Once()
			mockSvc.EXPECT().
				ListAtlasProcessesExecute(mock.Anything).
				Return(c.processList, nil, nil).Once()

			// Determine if we will find matching process
			found := false
			if c.processList != nil && c.processList.Results != nil {
				for _, p := range *c.processList.Results {
					if p.UserAlias != nil && *p.UserAlias == c.clusterName {
						found = true
						break
					}
				}
			}
			if found && c.processID != "" { // simulate metrics call
				mockSvc.EXPECT().
					GetHostMeasurements(mock.Anything, c.projectID, c.processID).
					Return(admin.GetHostMeasurementsApiRequest{ApiService: mockSvc}).Once()
				mockSvc.EXPECT().
					GetHostMeasurementsExecute(mock.Anything).
					Return(c.measurements, nil, nil).Once()
			}

			client := &admin.APIClient{MonitoringAndLogsApi: mockSvc}
			val, err := GetAverageProcessCPU(ctx, client, c.projectID, c.clusterName, c.periodMinutes)
			if c.expectError {
				require.Error(t, err, c.msg)
				return
			}
			require.NoError(t, err, c.msg)
			require.InDelta(t, c.expectedCPU, val, 0.01, c.msg)
		})
	}
}

func TestGetAverageProcessCPU_InputValidation(t *testing.T) {
	ctx := context.Background()
	mockSvc := mockadmin.NewMonitoringAndLogsApi(t)
	client := &admin.APIClient{MonitoringAndLogsApi: mockSvc}

	cases := []struct {
		name        string
		projectID   string
		clusterName string
		period      int
	}{
		{"empty_project", "", "c", 60},
		{"empty_cluster", "p", "", 60},
		{"zero_period", "p", "c", 0},
		{"negative_period", "p", "c", -5},
	}
	for _, c := range cases {
		c := c
		t.Run(c.name, func(t *testing.T) {
			_, err := GetAverageProcessCPU(ctx, client, c.projectID, c.clusterName, c.period)
			require.Error(t, err)
		})
	}
}

func BenchmarkGetAverageProcessCPU(b *testing.B) {
	ctx := context.Background()
	mockSvc := mockadmin.NewMonitoringAndLogsApi(b)
	procList := &admin.PaginatedHostViewAtlas{Results: &[]admin.ApiHostViewAtlas{{
		Id:        admin.PtrString("proc"),
		UserAlias: admin.PtrString("benchCluster"),
	}}}
	meas := &admin.ApiMeasurementsGeneralViewAtlas{Measurements: &[]admin.MetricsMeasurementAtlas{{
		Name: admin.PtrString("PROCESS_CPU_USER"),
		DataPoints: &[]admin.MetricDataPointAtlas{{
			Timestamp: admin.PtrTime(time.Now()),
			Value:     admin.PtrFloat32(0.50),
		}},
	}}}
	mockSvc.EXPECT().ListAtlasProcesses(mock.Anything, "benchProj").Return(admin.ListAtlasProcessesApiRequest{ApiService: mockSvc}).Maybe()
	mockSvc.EXPECT().ListAtlasProcessesExecute(mock.Anything).Return(procList, nil, nil).Maybe()
	mockSvc.EXPECT().GetHostMeasurements(mock.Anything, "benchProj", "proc").Return(admin.GetHostMeasurementsApiRequest{ApiService: mockSvc}).Maybe()
	mockSvc.EXPECT().GetHostMeasurementsExecute(mock.Anything).Return(meas, nil, nil).Maybe()
	client := &admin.APIClient{MonitoringAndLogsApi: mockSvc}
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_, _ = GetAverageProcessCPU(ctx, client, "benchProj", "benchCluster", 60)
	}
}
