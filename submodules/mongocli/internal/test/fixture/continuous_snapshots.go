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

import atlas "go.mongodb.org/atlas/mongodbatlas"

func ContinuousSnapshots() *atlas.ContinuousSnapshots {
	doNotDelete := false
	part := new(atlas.Part)

	part.ClusterID = "7c2487d833e9e75286093696"
	part.CompressionSetting = "GZIP"
	part.DataSizeBytes = 4502
	part.EncryptionEnabled = false
	part.FileSizeBytes = 324760
	part.MongodVersion = "3.6.10"
	part.ReplicaSetName = "Cluster0-shard-0"
	part.StorageSizeBytes = 53248
	part.TypeName = "REPLICA_SET"

	return &atlas.ContinuousSnapshots{
		Links: []*atlas.Link{
			{
				Href: "https://cloud.mongodb.com/api/atlas/v1.0/groups/6c7498dg87d9e6526801572b/clusters/Cluster0/snapshots?pageNum=1&itemsPerPage=100",
				Rel:  "self",
			},
		},
		Results: []*atlas.ContinuousSnapshot{
			{
				ClusterID: "7c2487d833e9e75286093696",
				Complete:  true,
				Created: &atlas.SnapshotTimestamp{
					Date:      "2017-12-26T16:32:16Z",
					Increment: 1,
				},
				DoNotDelete: &doNotDelete,
				Expires:     "2018-12-25T16:32:16Z",
				GroupID:     "6c7498dg87d9e6526801572b",
				ID:          "5a4279d4fcc178500596745a",
				LastOplogAppliedTimestamp: &atlas.SnapshotTimestamp{
					Date:      "2017-12-26T16:32:15Z",
					Increment: 1,
				},
				Links: []*atlas.Link{
					{
						Href: "https://cloud.mongodb.com/api/atlas/v1.0/groups/6c7498dg87d9e6526801572b/clusters/Cluster0/snapshots/5a4279d4fcc178500596745a",
						Rel:  "self",
					},
				},
				Parts: []*atlas.Part{part},
			},
		},
		TotalCount: 1,
	}
}
