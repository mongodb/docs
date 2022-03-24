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

func GlobalAlert() *opsmngr.GlobalAlert {
	return &opsmngr.GlobalAlert{
		Alert: atlas.Alert{
			ID:                    "3b7d2de0a4b02fd2c98146de",
			GroupID:               "1",
			AlertConfigID:         "5730f5e1e4b030a9634a3f69",
			EventTypeName:         "OPLOG_BEHIND",
			Created:               "2016-10-09T06:16:36Z",
			Updated:               "2016-10-10T22:03:11Z",
			Status:                "OPEN",
			LastNotified:          "2016-10-10T20:42:32Z",
			ReplicaSetName:        "shardedCluster-shard-0",
			ClusterName:           "shardedCluster",
			AcknowledgedUntil:     "2016-11-01T00:00:00Z",
			AcknowledgingUsername: "admin@example.com",
		},
		Tags:           []string{},
		Links:          []*atlas.Link{},
		SourceTypeName: "REPLICA_SET",
		ClusterID:      "572a00f2e4b051814b144e90",
	}
}

func GlobalAlerts() *opsmngr.GlobalAlerts {
	return &opsmngr.GlobalAlerts{
		Links:      []*atlas.Link{},
		Results:    []*opsmngr.GlobalAlert{GlobalAlert()},
		TotalCount: 1,
	}
}
