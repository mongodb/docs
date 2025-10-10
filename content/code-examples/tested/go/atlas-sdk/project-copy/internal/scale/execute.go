package scale

import (
	"context"
	"errors"
	"fmt"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// ExecuteClusterScaling performs the scaling operation by updating the cluster's instance sizes.
func ExecuteClusterScaling(ctx context.Context, client *admin.APIClient, projectID, clusterName string,
	cluster *admin.ClusterDescription20240805, targetTier string) error {
	// Defensive validation so example tests using nil / empty parameters don't panic.
	if client == nil {
		return errors.New("nil atlas client")
	}
	if projectID == "" {
		return errors.New("empty project id")
	}
	if clusterName == "" {
		return errors.New("empty cluster name")
	}
	if targetTier == "" {
		return errors.New("empty target tier")
	}

	payload := buildScalePayload(cluster, targetTier)
	if payload == nil {
		return fmt.Errorf("failed to build scaling payload")
	}

	_, _, err := client.ClustersApi.UpdateCluster(ctx, projectID, clusterName, payload).Execute()
	return err
}

// buildScalePayload copies current replication specs and updates instance sizes to targetTier.
func buildScalePayload(cur *admin.ClusterDescription20240805, targetTier string) *admin.ClusterDescription20240805 {
	payload := admin.NewClusterDescription20240805()
	if cur == nil || !cur.HasReplicationSpecs() {
		return nil
	}

	repl := cur.GetReplicationSpecs()
	for i := range repl {
		rcs := repl[i].GetRegionConfigs()
		for j := range rcs {
			if rcs[j].HasElectableSpecs() {
				es := rcs[j].GetElectableSpecs()
				es.SetInstanceSize(targetTier)
				rcs[j].SetElectableSpecs(es)
			}
			if rcs[j].HasReadOnlySpecs() {
				ros := rcs[j].GetReadOnlySpecs()
				ros.SetInstanceSize(targetTier)
				rcs[j].SetReadOnlySpecs(ros)
			}
			if rcs[j].HasAnalyticsSpecs() {
				as := rcs[j].GetAnalyticsSpecs()
				as.SetInstanceSize(targetTier)
				rcs[j].SetAnalyticsSpecs(as)
			}
		}
		repl[i].SetRegionConfigs(rcs)
	}
	payload.SetReplicationSpecs(repl)
	return payload
}
