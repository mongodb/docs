package scale

import (
	"context"
	"testing"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

func TestExecuteClusterScaling(t *testing.T) {
	tests := []struct {
		name        string
		projectID   string
		clusterName string
		targetTier  string
		cluster     *admin.ClusterDescription20240805
		expectError bool
		description string
	}{
		{
			name:        "valid_parameters",
			projectID:   "test-project-id",
			clusterName: "test-cluster",
			targetTier:  "M50",
			cluster:     createMockClusterWithElectableSpecs(),
			expectError: true, // Will error in test env due to no real API
			description: "Should attempt to scale cluster with valid parameters",
		},
		{
			name:        "empty_project_id",
			projectID:   "",
			clusterName: "test-cluster",
			targetTier:  "M50",
			cluster:     createMockClusterWithElectableSpecs(),
			expectError: true,
			description: "Should handle empty project ID",
		},
		{
			name:        "empty_cluster_name",
			projectID:   "test-project-id",
			clusterName: "",
			targetTier:  "M50",
			cluster:     createMockClusterWithElectableSpecs(),
			expectError: true,
			description: "Should handle empty cluster name",
		},
		{
			name:        "empty_target_tier",
			projectID:   "test-project-id",
			clusterName: "test-cluster",
			targetTier:  "",
			cluster:     createMockClusterWithElectableSpecs(),
			expectError: true,
			description: "Should handle empty target tier",
		},
		{
			name:        "nil_cluster",
			projectID:   "test-project-id",
			clusterName: "test-cluster",
			targetTier:  "M50",
			cluster:     nil,
			expectError: true,
			description: "Should handle nil cluster and fail to build payload",
		},
		{
			name:        "cluster_without_replication_specs",
			projectID:   "test-project-id",
			clusterName: "test-cluster",
			targetTier:  "M50",
			cluster:     &admin.ClusterDescription20240805{},
			expectError: true,
			description: "Should handle cluster without replication specs",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ctx := context.Background()
			var client *admin.APIClient = nil

			err := ExecuteClusterScaling(ctx, client, tt.projectID, tt.clusterName, tt.cluster, tt.targetTier)

			if tt.expectError {
				if err == nil {
					t.Errorf("Expected error for test case %s, but got none", tt.name)
				}
			} else {
				if err != nil {
					t.Errorf("Unexpected error for test case %s: %v", tt.name, err)
				}
			}

			t.Logf("Test case: %s - %s", tt.name, tt.description)
		})
	}
}

func TestBuildScalePayload(t *testing.T) {
	tests := []struct {
		name        string
		cluster     *admin.ClusterDescription20240805
		targetTier  string
		expectNil   bool
		description string
	}{
		{
			name:        "nil_cluster",
			cluster:     nil,
			targetTier:  "M50",
			expectNil:   true,
			description: "Should return nil for nil cluster",
		},
		{
			name:        "cluster_without_replication_specs",
			cluster:     &admin.ClusterDescription20240805{},
			targetTier:  "M50",
			expectNil:   true,
			description: "Should return nil for cluster without replication specs",
		},
		{
			name:        "valid_cluster_with_electable_specs",
			cluster:     createMockClusterWithElectableSpecs(),
			targetTier:  "M50",
			expectNil:   false,
			description: "Should create payload for cluster with electable specs",
		},
		{
			name:        "valid_cluster_with_readonly_specs",
			cluster:     createMockClusterWithReadOnlySpecs(),
			targetTier:  "M100",
			expectNil:   false,
			description: "Should create payload for cluster with read-only specs",
		},
		{
			name:        "valid_cluster_with_analytics_specs",
			cluster:     createMockClusterWithAnalyticsSpecs(),
			targetTier:  "M200",
			expectNil:   false,
			description: "Should create payload for cluster with analytics specs",
		},
		{
			name:        "valid_cluster_with_all_specs",
			cluster:     createMockClusterWithAllSpecs(),
			targetTier:  "M300",
			expectNil:   false,
			description: "Should create payload for cluster with all spec types",
		},
		{
			name:        "empty_target_tier",
			cluster:     createMockClusterWithElectableSpecs(),
			targetTier:  "",
			expectNil:   false,
			description: "Should create payload even with empty target tier",
		},
		{
			name:        "multiple_replication_specs",
			cluster:     createMockClusterWithMultipleReplicationSpecs(),
			targetTier:  "M50",
			expectNil:   false,
			description: "Should handle clusters with multiple replication specs",
		},
		{
			name:        "multiple_region_configs",
			cluster:     createMockClusterWithMultipleRegionConfigs(),
			targetTier:  "M100",
			expectNil:   false,
			description: "Should handle clusters with multiple region configs",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			payload := buildScalePayload(tt.cluster, tt.targetTier)

			if tt.expectNil {
				if payload != nil {
					t.Errorf("Expected nil payload for test case %s, but got non-nil", tt.name)
				}
			} else {
				if payload == nil {
					t.Errorf("Expected non-nil payload for test case %s, but got nil", tt.name)
				} else {
					// Verify the payload has replication specs
					if !payload.HasReplicationSpecs() {
						t.Errorf("Expected payload to have replication specs for test case %s", tt.name)
					}
				}
			}

			t.Logf("Test case: %s - %s", tt.name, tt.description)
		})
	}
}

func TestBuildScalePayload_InstanceSizeUpdate(t *testing.T) {
	targetTier := "M50"

	// Test electable specs update
	t.Run("electable_specs_update", func(t *testing.T) {
		cluster := createMockClusterWithElectableSpecs()
		payload := buildScalePayload(cluster, targetTier)

		if payload == nil {
			t.Fatal("Expected non-nil payload")
		}

		if !payload.HasReplicationSpecs() {
			t.Fatal("Expected payload to have replication specs")
		}

		repl := payload.GetReplicationSpecs()
		if len(repl) == 0 {
			t.Fatal("Expected at least one replication spec")
		}

		rcs := repl[0].GetRegionConfigs()
		if len(rcs) == 0 {
			t.Fatal("Expected at least one region config")
		}

		if rcs[0].HasElectableSpecs() {
			es := rcs[0].GetElectableSpecs()
			if es.HasInstanceSize() {
				actualTier := es.GetInstanceSize()
				if actualTier != targetTier {
					t.Errorf("Expected electable instance size %s, got %s", targetTier, actualTier)
				}
			} else {
				t.Error("Expected electable specs to have instance size")
			}
		}
	})

	// Test read-only specs update
	t.Run("readonly_specs_update", func(t *testing.T) {
		cluster := createMockClusterWithReadOnlySpecs()
		payload := buildScalePayload(cluster, targetTier)

		if payload == nil {
			t.Fatal("Expected non-nil payload")
		}

		repl := payload.GetReplicationSpecs()
		rcs := repl[0].GetRegionConfigs()

		if rcs[0].HasReadOnlySpecs() {
			ros := rcs[0].GetReadOnlySpecs()
			if ros.HasInstanceSize() {
				actualTier := ros.GetInstanceSize()
				if actualTier != targetTier {
					t.Errorf("Expected read-only instance size %s, got %s", targetTier, actualTier)
				}
			}
		}
	})

	// Test analytics specs update
	t.Run("analytics_specs_update", func(t *testing.T) {
		cluster := createMockClusterWithAnalyticsSpecs()
		payload := buildScalePayload(cluster, targetTier)

		if payload == nil {
			t.Fatal("Expected non-nil payload")
		}

		repl := payload.GetReplicationSpecs()
		rcs := repl[0].GetRegionConfigs()

		if rcs[0].HasAnalyticsSpecs() {
			as := rcs[0].GetAnalyticsSpecs()
			if as.HasInstanceSize() {
				actualTier := as.GetInstanceSize()
				if actualTier != targetTier {
					t.Errorf("Expected analytics instance size %s, got %s", targetTier, actualTier)
				}
			}
		}
	})

	// Test all specs update
	t.Run("all_specs_update", func(t *testing.T) {
		cluster := createMockClusterWithAllSpecs()
		payload := buildScalePayload(cluster, targetTier)

		if payload == nil {
			t.Fatal("Expected non-nil payload")
		}

		repl := payload.GetReplicationSpecs()
		rcs := repl[0].GetRegionConfigs()

		// Check all spec types are updated
		if rcs[0].HasElectableSpecs() {
			es := rcs[0].GetElectableSpecs()
			if es.GetInstanceSize() != targetTier {
				t.Errorf("Expected electable instance size %s, got %s", targetTier, es.GetInstanceSize())
			}
		}

		if rcs[0].HasReadOnlySpecs() {
			ros := rcs[0].GetReadOnlySpecs()
			if ros.GetInstanceSize() != targetTier {
				t.Errorf("Expected read-only instance size %s, got %s", targetTier, ros.GetInstanceSize())
			}
		}

		if rcs[0].HasAnalyticsSpecs() {
			as := rcs[0].GetAnalyticsSpecs()
			if as.GetInstanceSize() != targetTier {
				t.Errorf("Expected analytics instance size %s, got %s", targetTier, as.GetInstanceSize())
			}
		}
	})
}

func TestBuildScalePayload_PreservesOtherSettings(t *testing.T) {
	// Test that buildScalePayload only changes instance sizes and preserves other settings
	cluster := createMockClusterWithElectableSpecs()
	originalRepl := cluster.GetReplicationSpecs()

	payload := buildScalePayload(cluster, "M100")

	if payload == nil {
		t.Fatal("Expected non-nil payload")
	}

	newRepl := payload.GetReplicationSpecs()

	// Should have same number of replication specs
	if len(newRepl) != len(originalRepl) {
		t.Errorf("Expected %d replication specs, got %d", len(originalRepl), len(newRepl))
	}

	// Should have same number of region configs
	if len(newRepl[0].GetRegionConfigs()) != len(originalRepl[0].GetRegionConfigs()) {
		t.Error("Region config count should be preserved")
	}
}

// Helper functions to create mock cluster descriptions for testing

func createMockClusterWithElectableSpecs() *admin.ClusterDescription20240805 {
	cluster := admin.NewClusterDescription20240805()

	// Create electable specs using the correct Atlas SDK types
	electableSpecs := admin.HardwareSpec20240805{}
	electableSpecs.SetInstanceSize("M30")

	// Create region config
	regionConfig := admin.NewCloudRegionConfig20240805()
	regionConfig.SetElectableSpecs(electableSpecs)

	// Create replication spec
	replSpec := admin.NewReplicationSpec20240805()
	replSpec.SetRegionConfigs([]admin.CloudRegionConfig20240805{*regionConfig})

	// Set replication specs on cluster
	cluster.SetReplicationSpecs([]admin.ReplicationSpec20240805{*replSpec})

	return cluster
}

func createMockClusterWithReadOnlySpecs() *admin.ClusterDescription20240805 {
	cluster := admin.NewClusterDescription20240805()

	// Create read-only specs using the correct Atlas SDK types
	readOnlySpecs := admin.DedicatedHardwareSpec20240805{}
	readOnlySpecs.SetInstanceSize("M30")

	// Create region config
	regionConfig := admin.NewCloudRegionConfig20240805()
	regionConfig.SetReadOnlySpecs(readOnlySpecs)

	// Create replication spec
	replSpec := admin.NewReplicationSpec20240805()
	replSpec.SetRegionConfigs([]admin.CloudRegionConfig20240805{*regionConfig})

	// Set replication specs on cluster
	cluster.SetReplicationSpecs([]admin.ReplicationSpec20240805{*replSpec})

	return cluster
}

func createMockClusterWithAnalyticsSpecs() *admin.ClusterDescription20240805 {
	cluster := admin.NewClusterDescription20240805()

	// Create analytics specs using the correct Atlas SDK types
	analyticsSpecs := admin.DedicatedHardwareSpec20240805{}
	analyticsSpecs.SetInstanceSize("M30")

	// Create region config
	regionConfig := admin.NewCloudRegionConfig20240805()
	regionConfig.SetAnalyticsSpecs(analyticsSpecs)

	// Create replication spec
	replSpec := admin.NewReplicationSpec20240805()
	replSpec.SetRegionConfigs([]admin.CloudRegionConfig20240805{*regionConfig})

	// Set replication specs on cluster
	cluster.SetReplicationSpecs([]admin.ReplicationSpec20240805{*replSpec})

	return cluster
}

func createMockClusterWithAllSpecs() *admin.ClusterDescription20240805 {
	cluster := admin.NewClusterDescription20240805()

	// Create all spec types using the correct Atlas SDK types
	electableSpecs := admin.HardwareSpec20240805{}
	electableSpecs.SetInstanceSize("M30")

	readOnlySpecs := admin.DedicatedHardwareSpec20240805{}
	readOnlySpecs.SetInstanceSize("M30")

	analyticsSpecs := admin.DedicatedHardwareSpec20240805{}
	analyticsSpecs.SetInstanceSize("M30")

	// Create region config with all specs
	regionConfig := admin.NewCloudRegionConfig20240805()
	regionConfig.SetElectableSpecs(electableSpecs)
	regionConfig.SetReadOnlySpecs(readOnlySpecs)
	regionConfig.SetAnalyticsSpecs(analyticsSpecs)

	// Create replication spec
	replSpec := admin.NewReplicationSpec20240805()
	replSpec.SetRegionConfigs([]admin.CloudRegionConfig20240805{*regionConfig})

	// Set replication specs on cluster
	cluster.SetReplicationSpecs([]admin.ReplicationSpec20240805{*replSpec})

	return cluster
}

func createMockClusterWithMultipleReplicationSpecs() *admin.ClusterDescription20240805 {
	cluster := admin.NewClusterDescription20240805()

	// Create first replication spec
	electableSpecs1 := admin.HardwareSpec20240805{}
	electableSpecs1.SetInstanceSize("M30")
	regionConfig1 := admin.NewCloudRegionConfig20240805()
	regionConfig1.SetElectableSpecs(electableSpecs1)
	replSpec1 := admin.NewReplicationSpec20240805()
	replSpec1.SetRegionConfigs([]admin.CloudRegionConfig20240805{*regionConfig1})

	// Create second replication spec
	electableSpecs2 := admin.HardwareSpec20240805{}
	electableSpecs2.SetInstanceSize("M40")
	regionConfig2 := admin.NewCloudRegionConfig20240805()
	regionConfig2.SetElectableSpecs(electableSpecs2)
	replSpec2 := admin.NewReplicationSpec20240805()
	replSpec2.SetRegionConfigs([]admin.CloudRegionConfig20240805{*regionConfig2})

	// Set multiple replication specs
	cluster.SetReplicationSpecs([]admin.ReplicationSpec20240805{*replSpec1, *replSpec2})

	return cluster
}

func createMockClusterWithMultipleRegionConfigs() *admin.ClusterDescription20240805 {
	cluster := admin.NewClusterDescription20240805()

	// Create first region config
	electableSpecs1 := admin.HardwareSpec20240805{}
	electableSpecs1.SetInstanceSize("M30")
	regionConfig1 := admin.NewCloudRegionConfig20240805()
	regionConfig1.SetElectableSpecs(electableSpecs1)

	// Create second region config
	electableSpecs2 := admin.HardwareSpec20240805{}
	electableSpecs2.SetInstanceSize("M30")
	regionConfig2 := admin.NewCloudRegionConfig20240805()
	regionConfig2.SetElectableSpecs(electableSpecs2)

	// Create replication spec with multiple region configs
	replSpec := admin.NewReplicationSpec20240805()
	replSpec.SetRegionConfigs([]admin.CloudRegionConfig20240805{*regionConfig1, *regionConfig2})

	// Set replication specs on cluster
	cluster.SetReplicationSpecs([]admin.ReplicationSpec20240805{*replSpec})

	return cluster
}

// BenchmarkBuildScalePayload provides a benchmark for the payload building function
func BenchmarkBuildScalePayload(b *testing.B) {
	cluster := createMockClusterWithAllSpecs()
	targetTier := "M50"

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = buildScalePayload(cluster, targetTier)
	}
}

// BenchmarkExecuteClusterScaling provides a benchmark for the cluster scaling function
func BenchmarkExecuteClusterScaling(b *testing.B) {
	ctx := context.Background()
	var client *admin.APIClient = nil
	cluster := createMockClusterWithAllSpecs()

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		// This will fail quickly due to nil client, but measures the function call overhead
		_ = ExecuteClusterScaling(ctx, client, "test-project", "test-cluster", cluster, "M50")
	}
}

// BenchmarkBuildScalePayload_LargeCluster benchmarks payload building for clusters with many specs
func BenchmarkBuildScalePayload_LargeCluster(b *testing.B) {
	cluster := createMockClusterWithMultipleReplicationSpecs()
	targetTier := "M200"

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = buildScalePayload(cluster, targetTier)
	}
}
