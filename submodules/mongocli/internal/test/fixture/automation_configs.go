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
	"github.com/openlyinc/pointy"
	"go.mongodb.org/ops-manager/opsmngr"
)

const (
	defaultMongoDPort        = 27017
	defaultTimeThresholdHrs  = 24
	defaultAuthSchemaVersion = 5
	defaultSizeThresholdMB   = 1000
)

func AutomationConfig() *opsmngr.AutomationConfig {
	return &opsmngr.AutomationConfig{
		Auth: opsmngr.Auth{
			AutoAuthMechanism: "MONGODB-CR",
			Disabled:          true,
			AuthoritativeSet:  false,
		},
		Processes: []*opsmngr.Process{
			{
				Name:                        "myReplicaSet_1",
				ProcessType:                 "mongod",
				Version:                     "4.2.2",
				AuthSchemaVersion:           defaultAuthSchemaVersion,
				FeatureCompatibilityVersion: "4.2",
				Disabled:                    false,
				ManualMode:                  false,
				Hostname:                    "host0",
				Args26: opsmngr.Args26{
					NET: opsmngr.Net{Port: 27000},
					Storage: &opsmngr.Storage{
						DBPath: "/data/rs1",
					},
					SystemLog: opsmngr.SystemLog{
						Destination: "file",
						Path:        "/data/rs1/mongodb.log",
					},
					Replication: &opsmngr.Replication{
						ReplSetName: "myReplicaSet",
					},
				},
				LogRotate: &opsmngr.LogRotate{
					SizeThresholdMB:  defaultSizeThresholdMB,
					TimeThresholdHrs: defaultTimeThresholdHrs,
				},
				LastGoalVersionAchieved: 0,
				Cluster:                 "",
			},
			{
				Name:                        "myReplicaSet_2",
				ProcessType:                 "mongod",
				Version:                     "4.2.2",
				AuthSchemaVersion:           defaultAuthSchemaVersion,
				FeatureCompatibilityVersion: "4.2",
				Disabled:                    false,
				ManualMode:                  false,
				Hostname:                    "host1",
				Args26: opsmngr.Args26{
					NET: opsmngr.Net{Port: 27010},
					Storage: &opsmngr.Storage{
						DBPath: "/data/rs2",
					},
					SystemLog: opsmngr.SystemLog{
						Destination: "file",
						Path:        "/data/rs2/mongodb.log",
					},
					Replication: &opsmngr.Replication{
						ReplSetName: "myReplicaSet",
					},
				},
				LogRotate: &opsmngr.LogRotate{
					SizeThresholdMB:  defaultSizeThresholdMB,
					TimeThresholdHrs: defaultTimeThresholdHrs,
				},
				LastGoalVersionAchieved: 0,
				Cluster:                 "",
			},
			{
				Name:                        "myReplicaSet_3",
				ProcessType:                 "mongod",
				Version:                     "4.2.2",
				AuthSchemaVersion:           defaultAuthSchemaVersion,
				FeatureCompatibilityVersion: "4.2",
				Disabled:                    false,
				ManualMode:                  false,
				Hostname:                    "host0",
				Args26: opsmngr.Args26{
					NET: opsmngr.Net{Port: 27020},
					Storage: &opsmngr.Storage{
						DBPath: "/data/rs3",
					},
					SystemLog: opsmngr.SystemLog{
						Destination: "file",
						Path:        "/data/rs3/mongodb.log",
					},
					Replication: &opsmngr.Replication{
						ReplSetName: "myReplicaSet",
					},
				},
				LogRotate: &opsmngr.LogRotate{
					SizeThresholdMB:  defaultSizeThresholdMB,
					TimeThresholdHrs: defaultTimeThresholdHrs,
				},
				LastGoalVersionAchieved: 0,
				Cluster:                 "",
			},
		},
		ReplicaSets: []*opsmngr.ReplicaSet{
			{
				ID:              "myReplicaSet",
				ProtocolVersion: "1",
				Members: []opsmngr.Member{
					{
						ID:                 0,
						ArbiterOnly:        false,
						BuildIndexes:       true,
						Hidden:             false,
						Host:               "myReplicaSet_1",
						Priority:           1,
						SlaveDelay:         pointy.Float64(1),
						SecondaryDelaySecs: pointy.Float64(1),
						Votes:              1,
					},
					{
						ID:                 1,
						ArbiterOnly:        false,
						BuildIndexes:       true,
						Hidden:             false,
						Host:               "myReplicaSet_2",
						Priority:           1,
						SlaveDelay:         pointy.Float64(1),
						SecondaryDelaySecs: pointy.Float64(1),
						Votes:              1,
					},
					{
						ID:                 2,
						ArbiterOnly:        false,
						BuildIndexes:       true,
						Hidden:             false,
						Host:               "myReplicaSet_3",
						Priority:           1,
						SlaveDelay:         pointy.Float64(1),
						SecondaryDelaySecs: pointy.Float64(1),
						Votes:              1,
					},
				},
			},
		},
		Version: 1,
	}
}

func AutomationConfigWithBackup() *opsmngr.AutomationConfig {
	return &opsmngr.AutomationConfig{
		BackupVersions: []*opsmngr.ConfigVersion{
			{
				Hostname: "test",
			},
		},
		Version: 1,
	}
}

func AutomationConfigWithMonitoring() *opsmngr.AutomationConfig {
	return &opsmngr.AutomationConfig{
		MonitoringVersions: []*opsmngr.ConfigVersion{
			{
				Hostname: "test",
			},
		},
		Version: 1,
	}
}

func AutomationConfigWithOneReplicaSet(name string, disabled bool) *opsmngr.AutomationConfig {
	fipsMode := true
	return &opsmngr.AutomationConfig{
		Processes: []*opsmngr.Process{
			{
				Args26: opsmngr.Args26{
					NET: opsmngr.Net{
						Port: defaultMongoDPort,
						TLS: &opsmngr.TLS{
							CAFile:                     "CAFile",
							CertificateKeyFile:         "CertificateKeyFile",
							CertificateKeyFilePassword: "CertificateKeyFilePassword",
							CertificateSelector:        "CertificateSelector",
							ClusterCertificateSelector: "ClusterCertificateSelector",
							ClusterFile:                "ClusterFile",
							ClusterPassword:            "ClusterPassword",
							CRLFile:                    "CRLFile",
							DisabledProtocols:          "DisabledProtocols",
							FIPSMode:                   &fipsMode,
							Mode:                       "Mode",
							PEMKeyFile:                 "PEMKeyFile",
						},
					},
					Replication: &opsmngr.Replication{
						ReplSetName: name,
						OplogSizeMB: pointy.Int(10),
					},
					Sharding: nil,
					Storage: &opsmngr.Storage{
						DBPath: "/data/db/",
					},
					Security: &map[string]interface{}{
						"test": "test",
					},
					SystemLog: opsmngr.SystemLog{
						Destination: "file",
						Path:        "/data/db/mongodb.log",
					},
					AuditLog: &opsmngr.AuditLog{
						Destination: "file",
						Path:        "/data/db/audit.log",
					},
				},
				AuthSchemaVersion:           defaultAuthSchemaVersion,
				Name:                        name + "_0",
				Disabled:                    disabled,
				FeatureCompatibilityVersion: "4.2",
				Hostname:                    "host0",
				LogRotate: &opsmngr.LogRotate{
					SizeThresholdMB:  defaultSizeThresholdMB,
					TimeThresholdHrs: defaultTimeThresholdHrs,
				},
				ProcessType: "mongod",
				Version:     "4.2.2",
			},
		},
		ReplicaSets: []*opsmngr.ReplicaSet{
			{
				ID:              name,
				ProtocolVersion: "1",
				Members: []opsmngr.Member{
					{
						ArbiterOnly:        false,
						BuildIndexes:       true,
						Hidden:             false,
						Host:               name + "_0",
						Priority:           1,
						SlaveDelay:         pointy.Float64(1),
						SecondaryDelaySecs: pointy.Float64(1),
						Votes:              1,
					},
				},
			},
		},
	}
}

func AutomationConfigWithOneShardedCluster(name string, disabled bool) *opsmngr.AutomationConfig {
	return &opsmngr.AutomationConfig{
		Auth: opsmngr.Auth{
			DeploymentAuthMechanisms: []string{},
		},
		Processes: []*opsmngr.Process{
			{
				Args26: opsmngr.Args26{
					NET: opsmngr.Net{Port: 1},
					Replication: &opsmngr.Replication{
						ReplSetName: "myShard_0",
					},
					Storage: &opsmngr.Storage{
						DBPath: "/data/myShard_0",
					},
					SystemLog: opsmngr.SystemLog{
						Destination: "file",
						Path:        "/log/myShard_0",
					},
				},
				LogRotate: &opsmngr.LogRotate{
					SizeThresholdMB:  defaultSizeThresholdMB,
					TimeThresholdHrs: defaultTimeThresholdHrs,
				},
				AuthSchemaVersion:           defaultAuthSchemaVersion,
				Name:                        name + "_myShard_0_0",
				Disabled:                    disabled,
				FeatureCompatibilityVersion: "4.2",
				Hostname:                    "example",
				ManualMode:                  false,
				ProcessType:                 "mongod",
				Version:                     "4.2.2",
			},
			{
				Args26: opsmngr.Args26{
					NET: opsmngr.Net{Port: 2},
					Replication: &opsmngr.Replication{
						ReplSetName: "configRS",
					},
					Storage: &opsmngr.Storage{
						DBPath: "/data/configRS",
					},
					SystemLog: opsmngr.SystemLog{
						Destination: "file",
						Path:        "/log/configRS",
					},
					Sharding: &opsmngr.Sharding{ClusterRole: "configsvr"},
				},
				LogRotate: &opsmngr.LogRotate{
					SizeThresholdMB:  defaultSizeThresholdMB,
					TimeThresholdHrs: defaultTimeThresholdHrs,
				},
				AuthSchemaVersion:           defaultAuthSchemaVersion,
				Name:                        name + "_configRS_1",
				Disabled:                    disabled,
				FeatureCompatibilityVersion: "4.2",
				Hostname:                    "example",
				ManualMode:                  false,
				ProcessType:                 "mongod",
				Version:                     "4.2.2",
			},
			{
				Args26: opsmngr.Args26{
					NET: opsmngr.Net{Port: 3},
					SystemLog: opsmngr.SystemLog{
						Destination: "file",
						Path:        "/log/mongos",
					},
				},
				LogRotate: &opsmngr.LogRotate{
					SizeThresholdMB:  defaultSizeThresholdMB,
					TimeThresholdHrs: defaultTimeThresholdHrs,
				},
				Cluster:                     name,
				AuthSchemaVersion:           defaultAuthSchemaVersion,
				Name:                        name + "_mongos_2",
				Disabled:                    disabled,
				FeatureCompatibilityVersion: "4.2",
				Hostname:                    "example",
				ManualMode:                  false,
				ProcessType:                 "mongos",
				Version:                     "4.2.2",
			},
		},
		ReplicaSets: []*opsmngr.ReplicaSet{
			{
				ID:              "myShard_0",
				ProtocolVersion: "1",
				Members: []opsmngr.Member{
					{
						ID:                 0,
						ArbiterOnly:        false,
						BuildIndexes:       true,
						Hidden:             false,
						Host:               name + "_myShard_0_0",
						Priority:           1,
						SlaveDelay:         pointy.Float64(1),
						SecondaryDelaySecs: pointy.Float64(1),
						Votes:              1,
					},
				},
			},
			{
				ID:              "configRS",
				ProtocolVersion: "1",
				Members: []opsmngr.Member{
					{
						ID:                 0,
						ArbiterOnly:        false,
						BuildIndexes:       true,
						Hidden:             false,
						Host:               name + "_configRS_1",
						Priority:           1,
						SlaveDelay:         pointy.Float64(1),
						SecondaryDelaySecs: pointy.Float64(1),
						Votes:              1,
					},
				},
			},
		},
		Sharding: []*opsmngr.ShardingConfig{
			{
				ConfigServerReplica: "configRS",
				Name:                name,
				Shards: []*opsmngr.Shard{
					{
						ID: "myShard_0",
						RS: "myShard_0",
					},
				},
			},
		},
	}
}

func MongoDBUsers() *opsmngr.MongoDBUser {
	return &opsmngr.MongoDBUser{
		Mechanisms: &[]string{"SCRAM-SHA-1"},
		Roles: []*opsmngr.Role{
			{
				Role:     "test",
				Database: "test",
			},
		},
		Username: "test",
		Database: "test",
	}
}

func AutomationConfigWithMongoDBUsers() *opsmngr.AutomationConfig {
	return &opsmngr.AutomationConfig{
		Auth: opsmngr.Auth{
			AutoAuthMechanism: "MONGODB-CR",
			Disabled:          true,
			AuthoritativeSet:  false,
			UsersWanted: []*opsmngr.MongoDBUser{
				MongoDBUsers(),
			},
		},
	}
}

func EmptyAutomationConfig() *opsmngr.AutomationConfig {
	return &opsmngr.AutomationConfig{
		Processes:   make([]*opsmngr.Process, 0),
		ReplicaSets: make([]*opsmngr.ReplicaSet, 0),
		Sharding:    make([]*opsmngr.ShardingConfig, 0),
	}
}
