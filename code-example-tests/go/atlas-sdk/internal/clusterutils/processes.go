package clusterutils

import (
	"context"
	"fmt"
	"strings"

	"atlas-sdk-examples/internal/errors"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// ListClusterNames lists all clusters in a project and returns their names.
func ListClusterNames(ctx context.Context, sdk admin.ClustersApi, p *admin.ListClustersApiParams) ([]string, error) {
	req := sdk.ListClusters(ctx, p.GroupId)
	clusters, _, err := req.Execute()
	if err != nil {
		return nil, errors.FormatError("list clusters", p.GroupId, err)
	}

	var names []string
	if clusters != nil && clusters.Results != nil {
		for _, cluster := range *clusters.Results {
			if cluster.Name != nil {
				names = append(names, *cluster.Name)
			}
		}
	}
	return names, nil
}

// GetProcessIdForCluster retrieves the first matching process ID for a given cluster name.
// It only inspects the Atlas processes list and applies simple matching heuristics.
// If no match is found it returns an empty string and no error to allow callers to decide fallback behavior.
func GetProcessIdForCluster(ctx context.Context, monApi admin.MonitoringAndLogsApi,
	p *admin.ListAtlasProcessesApiParams, clusterName string) (string, error) {
	if p == nil || p.GroupId == "" {
		return "", fmt.Errorf("missing group id")
	}
	if clusterName == "" {
		return "", fmt.Errorf("empty cluster name")
	}

	req := monApi.ListAtlasProcesses(ctx, p.GroupId)
	resp, _, err := req.Execute()
	if err != nil {
		return "", errors.FormatError("list atlas processes", p.GroupId, err)
	}
	if resp == nil || resp.Results == nil || len(*resp.Results) == 0 {
		return "", nil // no processes available
	}

	lc := strings.ToLower(clusterName)
	for _, proc := range *resp.Results {
		id := safe(proc.Id)
		alias := strings.ToLower(safe(proc.UserAlias))
		host := strings.ToLower(safe(proc.Hostname))

		if alias == lc || strings.Contains(alias, lc+"-") || strings.Contains(alias, lc+"_") {
			if id != "" {
				return id, nil
			}
		}
		// hostname often embeds the cluster name
		if host == lc || strings.Contains(host, lc+"-") || strings.Contains(host, lc+"_") {
			if id != "" {
				return id, nil
			}
		}
	}
	return "", nil
}

// safe helper returns dereferenced string pointer or empty.
func safe(p *string) string {
	if p == nil {
		return ""
	}
	return *p
}

// ClusterProcess describes a process linked to a cluster including its role and hostname.
type ClusterProcess struct {
	ID       string
	Hostname string
	Role     string // Atlas typeName e.g. REPLICA_PRIMARY, REPLICA_SECONDARY, MONGOS
}

// ListClusterProcessDetails returns a mapping of cluster name to a list of ClusterProcess, including role and hostname.
// If only one cluster exists, all processes are assigned to it.
func ListClusterProcessDetails(ctx context.Context, client *admin.APIClient, projectID string) (map[string][]ClusterProcess, error) {
	if client == nil {
		return nil, fmt.Errorf("nil client")
	}
	if projectID == "" {
		return nil, fmt.Errorf("empty project id")
	}

	clReq := client.ClustersApi.ListClusters(ctx, projectID)
	clResp, _, err := clReq.Execute()
	if err != nil {
		return nil, errors.FormatError("list clusters", projectID, err)
	}
	var clusterNames []string
	if clResp != nil && clResp.Results != nil {
		for _, c := range *clResp.Results {
			if c.Name != nil {
				clusterNames = append(clusterNames, *c.Name)
			}
		}
	}
	out := make(map[string][]ClusterProcess, len(clusterNames))
	for _, n := range clusterNames {
		out[n] = []ClusterProcess{}
	}
	if len(clusterNames) == 0 {
		return out, nil
	}
	lowerNames := make([]string, len(clusterNames))
	for i, n := range clusterNames {
		lowerNames[i] = strings.ToLower(n)
	}

	prReq := client.MonitoringAndLogsApi.ListAtlasProcesses(ctx, projectID)
	prResp, _, err := prReq.Execute()
	if err != nil {
		return nil, errors.FormatError("list atlas processes", projectID, err)
	}
	if prResp == nil || prResp.Results == nil {
		return out, nil
	}

	for _, proc := range *prResp.Results {
		id := safe(proc.Id)
		if id == "" {
			continue
		}
		alias := strings.ToLower(safe(proc.UserAlias))
		host := strings.ToLower(safe(proc.Hostname))
		role := safe(proc.TypeName)
		hostRaw := safe(proc.Hostname)

		matched := false
		for i, cnameLower := range lowerNames {
			if cnameLower == alias || cnameLower == host ||
				strings.Contains(alias, cnameLower+"-") || strings.Contains(host, cnameLower+"-") ||
				strings.Contains(alias, cnameLower+"_") || strings.Contains(host, cnameLower+"_") {
				cp := ClusterProcess{ID: id, Hostname: hostRaw, Role: role}
				out[clusterNames[i]] = append(out[clusterNames[i]], cp)
				matched = true
			}
		}
		if !matched && len(clusterNames) == 1 { // attribute to single cluster fallback
			cp := ClusterProcess{ID: id, Hostname: hostRaw, Role: role}
			out[clusterNames[0]] = append(out[clusterNames[0]], cp)
		}
	}
	return out, nil
}

// GetPrimaryProcessID returns the ID of a primary process if present.
func GetPrimaryProcessID(processes []ClusterProcess) (string, bool) {
	for _, p := range processes {
		if p.Role == "REPLICA_PRIMARY" {
			return p.ID, true
		}
	}
	return "", false
}
