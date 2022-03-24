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

import "go.mongodb.org/ops-manager/opsmngr"

func AutomationStatus() *opsmngr.AutomationStatus {
	return &opsmngr.AutomationStatus{
		GoalVersion: 2,
		Processes: []opsmngr.ProcessStatus{
			{
				Name:                    "shardedCluster_myShard_0_0",
				Hostname:                "testDeploy-0",
				Plan:                    []string{},
				LastGoalVersionAchieved: 2,
			},
			{
				Name:                    "shardedCluster_myShard_0_1",
				Hostname:                "testDeploy-1",
				Plan:                    []string{},
				LastGoalVersionAchieved: 2,
			},
			{
				Name:                    "shardedCluster_myShard_0_2",
				Plan:                    []string{"Download", "Start", "WaitRsInit"},
				Hostname:                "testDeploy-2",
				LastGoalVersionAchieved: 2,
			},
		},
	}
}
