package clusterutils

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
	"go.mongodb.org/atlas-sdk/v20250219001/mockadmin"
)

func TestListClusterNames_Success(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	groupID := "group123"
	clusterName := "ClusterA"

	mockResponse := &admin.PaginatedClusterDescription20240805{
		Results: &[]admin.ClusterDescription20240805{
			{
				Name:    admin.PtrString("ClusterA"),
				GroupId: &groupID,
			},
		},
	}

	mockSvc := mockadmin.NewClustersApi(t)
	mockSvc.EXPECT().
		ListClusters(mock.Anything, groupID).
		Return(admin.ListClustersApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListClustersExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()
	params := &admin.ListClustersApiParams{GroupId: groupID}
	result, err := ListClusterNames(ctx, mockSvc, params)

	require.NoError(t, err)
	require.NotNil(t, result)
	require.Len(t, result, 1, "Should return one cluster name")
	require.Equal(t, clusterName, result[0], "Cluster name should match expected")
}

func TestListClusterNames_ApiError(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	groupID := "group123"

	mockSvc := mockadmin.NewClustersApi(t)
	mockSvc.EXPECT().
		ListClusters(mock.Anything, groupID).
		Return(admin.ListClustersApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListClustersExecute(mock.Anything).
		Return(nil, nil, assert.AnError).Once()

	params := &admin.ListClustersApiParams{GroupId: groupID}
	result, err := ListClusterNames(ctx, mockSvc, params)

	require.Error(t, err)
	require.Nil(t, result)
	assert.Contains(t, err.Error(), "list clusters", "Should return formatted error when API call fails")
}

func TestListClusterNames_NoClusters(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	groupID := "group123"

	// Create empty response
	mockResponse := &admin.PaginatedClusterDescription20240805{
		Results: &[]admin.ClusterDescription20240805{},
	}

	mockSvc := mockadmin.NewClustersApi(t)
	mockSvc.EXPECT().
		ListClusters(mock.Anything, groupID).
		Return(admin.ListClustersApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListClustersExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()

	params := &admin.ListClustersApiParams{GroupId: groupID}
	result, err := ListClusterNames(ctx, mockSvc, params)

	require.Nil(t, result)
	require.NoError(t, err, "No error should be returned when no clusters exist")
}

func TestGetProcessIdForCluster_Success(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	groupID := "group123"
	clusterName := "host"
	processID := "host:27017"

	mockResponse := &admin.PaginatedHostViewAtlas{
		Results: &[]admin.ApiHostViewAtlas{
			{
				GroupId:   admin.PtrString(groupID),
				Id:        admin.PtrString(processID),
				UserAlias: admin.PtrString(clusterName),
			},
		},
	}

	mockSvc := mockadmin.NewMonitoringAndLogsApi(t)
	mockSvc.EXPECT().
		ListAtlasProcesses(mock.Anything, groupID).
		Return(admin.ListAtlasProcessesApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListAtlasProcessesExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()

	params := &admin.ListAtlasProcessesApiParams{GroupId: groupID}
	result, err := GetProcessIdForCluster(ctx, mockSvc, params, clusterName)

	require.NoError(t, err)
	require.NotNil(t, result)
	require.Equal(t, processID, result, "Process ID should match expected value")
}

func TestGetProcessIdForCluster_ApiError(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	groupID := "group123"
	clusterName := "host"

	mockSvc := mockadmin.NewMonitoringAndLogsApi(t)
	mockSvc.EXPECT().
		ListAtlasProcesses(mock.Anything, groupID).
		Return(admin.ListAtlasProcessesApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListAtlasProcessesExecute(mock.Anything).
		Return(nil, nil, assert.AnError).Once()

	params := &admin.ListAtlasProcessesApiParams{GroupId: groupID}
	result, err := GetProcessIdForCluster(ctx, mockSvc, params, clusterName)

	require.Error(t, err)
	require.Emptyf(t, result, "Process ID should be empty on error")
	assert.Contains(t, err.Error(), "list atlas processes", "Should return formatted error when API call fails")
}

func TestGetProcessIdForCluster_NoProcesses(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	groupID := "group123"
	clusterName := "host"

	// Create empty response
	mockResponse := &admin.PaginatedHostViewAtlas{
		Results: &[]admin.ApiHostViewAtlas{},
	}

	mockSvc := mockadmin.NewMonitoringAndLogsApi(t)
	mockSvc.EXPECT().
		ListAtlasProcesses(mock.Anything, groupID).
		Return(admin.ListAtlasProcessesApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListAtlasProcessesExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()

	params := &admin.ListAtlasProcessesApiParams{GroupId: groupID}
	result, err := GetProcessIdForCluster(ctx, mockSvc, params, clusterName)

	require.Emptyf(t, result, "Process ID should be empty when no processes exist")
	require.NoError(t, err, "No error should be returned when no processes exist")
}

func newTestAtlasClient(t *testing.T, handler http.HandlerFunc) *admin.APIClient {
	t.Helper()
	server := httptest.NewServer(handler)
	t.Cleanup(server.Close)
	client, err := admin.NewClient(admin.UseBaseURL(server.URL))
	require.NoError(t, err)
	return client
}

func TestGetClusterSRVConnectionString_Success(t *testing.T) {
	t.Parallel()
	projectID := "proj1"
	clusterName := "Cluster0"

	handler := func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{
			"connectionStrings": {
				"standardSrv": "mongodb+srv://cluster0.example.net"
			}
		}`))
	}
	client := newTestAtlasClient(t, handler)

	srv, err := GetClusterSRVConnectionString(context.Background(), client, projectID, clusterName)

	require.NoError(t, err)
	assert.Equal(t, "mongodb+srv://cluster0.example.net", srv)
}

func TestGetClusterSRVConnectionString_MissingField(t *testing.T) {
	t.Parallel()
	projectID := "proj1"
	clusterName := "Cluster0"

	handler := func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		// connectionStrings present but standardSrv missing
		_, _ = w.Write([]byte(`{"connectionStrings": {}}`))
	}
	client := newTestAtlasClient(t, handler)

	srv, err := GetClusterSRVConnectionString(context.Background(), client, projectID, clusterName)

	require.Error(t, err)
	assert.Empty(t, srv)
	assert.Contains(t, err.Error(), "no standard SRV")
}

func TestGetClusterSRVConnectionString_ApiError(t *testing.T) {
	t.Parallel()
	projectID := "proj1"
	clusterName := "Cluster0"

	handler := func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte(`{"detail": "server error"}`))
	}
	client := newTestAtlasClient(t, handler)

	srv, err := GetClusterSRVConnectionString(context.Background(), client, projectID, clusterName)

	require.Error(t, err)
	assert.Empty(t, srv)
	assert.Contains(t, err.Error(), "get cluster")
}

func TestGetPrimaryProcessID(t *testing.T) {
	t.Parallel()
	cases := []struct {
		name      string
		processes []ClusterProcess
		expectID  string
		found     bool
	}{
		{"primary_present", []ClusterProcess{{ID: "a", Role: "REPLICA_SECONDARY"}, {ID: "b", Role: "REPLICA_PRIMARY"}}, "b", true},
		{"no_primary", []ClusterProcess{{ID: "a", Role: "REPLICA_SECONDARY"}}, "", false},
		{"empty", []ClusterProcess{}, "", false},
	}
	for _, c := range cases {
		c := c
		t.Run(c.name, func(t *testing.T) {
			id, ok := GetPrimaryProcessID(c.processes)
			if ok != c.found {
				t.Fatalf("expected found=%v got=%v", c.found, ok)
			}
			if id != c.expectID {
				t.Fatalf("expected id=%s got=%s", c.expectID, id)
			}
		})
	}
}
