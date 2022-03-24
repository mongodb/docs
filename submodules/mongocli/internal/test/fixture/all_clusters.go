// Copyright 2020 MongoDB Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package fixture

import (
	atlas "go.mongodb.org/atlas/mongodbatlas"
	"go.mongodb.org/ops-manager/opsmngr"
)

func AllClusters() *opsmngr.AllClustersProjects {
	return &opsmngr.AllClustersProjects{
		Links: []*atlas.Link{},
		Results: []*opsmngr.AllClustersProject{
			{
				GroupName: "AtlasGroup1",
				OrgName:   "TestAtlasOrg1",
				PlanType:  "Atlas",
				GroupID:   "5e5fbc29e76c9a4be2ed3d39",
				OrgID:     "5e5fbc29e76c9a4be2ed3d36",
				Clusters: []opsmngr.AllClustersCluster{
					{
						ClusterID:     "5e5fbc29e76c9a4be2ed3d4d",
						Name:          "AtlasCluster1",
						Type:          "sharded cluster",
						Availability:  "unavailable",
						Versions:      []string{"3.4.2"},
						BackupEnabled: true,
						AuthEnabled:   true,
						SSLEnabled:    true,
						AlertCount:    0,
						DataSizeBytes: 1000000,
						NodeCount:     7,
					},
					{
						ClusterID:     "5e5fbc29e76c9a4be2ed3d4f",
						Name:          "AtlasReplSet1",
						Type:          "replica set",
						Availability:  "dead",
						Versions:      []string{"3.4.1"},
						BackupEnabled: false,
						AuthEnabled:   true,
						SSLEnabled:    true,
						AlertCount:    0,
						DataSizeBytes: 1300000,
						NodeCount:     2,
					},
				},
			},
			{
				GroupName: "CloudGroup1",
				OrgName:   "TestCloudOrg1",
				PlanType:  "Cloud Manager",
				GroupID:   "5e5fbc29e76c9a4be2ed3d38",
				OrgID:     "5e5fbc29e76c9a4be2ed3d34",
				Tags:      []string{"some tag 1", "some tag 2"},
				Clusters: []opsmngr.AllClustersCluster{
					{
						ClusterID:     "5e5fbc29e76c9a4be2ed3d42",
						Name:          "cluster1",
						Type:          "sharded cluster",
						Availability:  "warning",
						Versions:      []string{"3.4.1", "2.4.3"},
						BackupEnabled: true,
						AuthEnabled:   false,
						SSLEnabled:    false,
						AlertCount:    0,
						DataSizeBytes: 1000000,
						NodeCount:     6,
					},
					{
						ClusterID:     "5e5fbc29e76c9a4be2ed3d3c",
						Name:          "replica_set",
						Type:          "replica set",
						Availability:  "available",
						Versions:      []string{"3.4.1"},
						BackupEnabled: true,
						AuthEnabled:   true,
						SSLEnabled:    true,
						AlertCount:    0,
						DataSizeBytes: 500000,
						NodeCount:     2,
					},
					{
						ClusterID:     "da303f3fec69b2100bacf10dd9e6d5e0",
						Name:          "standalone:27017",
						Type:          "standalone",
						Availability:  "unavailable",
						Versions:      []string{"2.4.3"},
						BackupEnabled: false,
						AuthEnabled:   false,
						SSLEnabled:    true,
						AlertCount:    0,
						DataSizeBytes: 2000000,
						NodeCount:     1,
					},
				},
			},
		},
		TotalCount: 2,
	}
}
