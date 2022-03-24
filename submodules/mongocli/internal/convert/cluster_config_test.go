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

//go:build unit
// +build unit

package convert

import (
	"testing"

	"github.com/go-test/deep"
	"github.com/mongodb/mongocli/internal/test/fixture"
	"github.com/openlyinc/pointy"
	"go.mongodb.org/ops-manager/opsmngr"
)

func TestClusterConfig_PatchAutomationConfig(t *testing.T) {
	fipsMode := true
	testCases := map[string]struct {
		current  *opsmngr.AutomationConfig
		expected *opsmngr.AutomationConfig
		changes  *ClusterConfig
	}{
		"add a replica set to an empty config": {
			current: fixture.EmptyAutomationConfig(),
			changes: &ClusterConfig{
				RSConfig: RSConfig{
					FeatureCompatibilityVersion: "4.2",
					Name:                        "test_config",
					Version:                     "4.2.2",
					Processes: []*ProcessConfig{
						{
							DBPath:       "/data",
							Hostname:     "example",
							LogPath:      "/log",
							Port:         1,
							Priority:     pointy.Float64(1),
							Votes:        pointy.Float64(1),
							AuditLogPath: "/audit",
						},
					},
				},
			},
			expected: &opsmngr.AutomationConfig{
				Auth: opsmngr.Auth{
					DeploymentAuthMechanisms: []string{},
				},
				Processes: []*opsmngr.Process{
					{
						Args26: opsmngr.Args26{
							NET: opsmngr.Net{Port: 1},
							Replication: &opsmngr.Replication{
								ReplSetName: "test_config",
							},
							Storage: &opsmngr.Storage{
								DBPath: "/data",
							},
							SystemLog: opsmngr.SystemLog{
								Destination: file,
								Path:        "/log",
							},
							AuditLog: &opsmngr.AuditLog{
								Destination: file,
								Path:        "/audit",
							},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						AuthSchemaVersion:           5,
						Name:                        "test_config_0",
						Disabled:                    false,
						FeatureCompatibilityVersion: "4.2",
						Hostname:                    "example",
						ManualMode:                  false,
						ProcessType:                 "mongod",
						Version:                     "4.2.2",
					},
				},
				ReplicaSets: []*opsmngr.ReplicaSet{
					{
						ID:              "test_config",
						ProtocolVersion: "1",
						Members: []opsmngr.Member{
							{
								ID:           0,
								ArbiterOnly:  false,
								BuildIndexes: true,
								Hidden:       false,
								Host:         "test_config_0",
								Priority:     1,
								SlaveDelay:   nil,
								Votes:        1,
							},
						},
					},
				},
				Sharding: []*opsmngr.ShardingConfig{},
			},
		},
		"add a replica set to a config with an existing replica set": {
			current: fixture.AutomationConfigWithOneReplicaSet("replica_set_1", false),
			changes: &ClusterConfig{
				RSConfig: RSConfig{
					FeatureCompatibilityVersion: "4.2",
					Name:                        "test_config",
					Version:                     "4.2.2",
					Processes: []*ProcessConfig{
						{
							DBPath:   "/data",
							Hostname: "example",
							LogPath:  "/log",
							Port:     1,
							TLS: &TLS{
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
							Priority: pointy.Float64(1),
							Votes:    pointy.Float64(1),
						},
					},
				},
			},
			expected: &opsmngr.AutomationConfig{
				Auth: opsmngr.Auth{
					DeploymentAuthMechanisms: []string{},
				},
				Processes: []*opsmngr.Process{
					// Old
					{
						Args26: opsmngr.Args26{
							NET: opsmngr.Net{
								Port: 27017,
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
								ReplSetName: "replica_set_1",
								OplogSizeMB: pointy.Int(10),
							},
							Storage: &opsmngr.Storage{
								DBPath: "/data/db/",
							},
							SystemLog: opsmngr.SystemLog{
								Destination: file,
								Path:        "/data/db/mongodb.log",
							},
							AuditLog: &opsmngr.AuditLog{
								Destination: file,
								Path:        "/data/db/audit.log",
							},
							Security: &map[string]interface{}{
								"test": "test",
							},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						AuthSchemaVersion:           5,
						Name:                        "replica_set_1_0",
						Disabled:                    false,
						FeatureCompatibilityVersion: "4.2",
						Hostname:                    "host0",
						ManualMode:                  false,
						ProcessType:                 "mongod",
						Version:                     "4.2.2",
					},
					// New
					{
						Args26: opsmngr.Args26{
							NET: opsmngr.Net{
								Port: 1,
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
								ReplSetName: "test_config",
							},
							Storage: &opsmngr.Storage{
								DBPath: "/data",
							},
							SystemLog: opsmngr.SystemLog{
								Destination: file,
								Path:        "/log",
							},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						AuthSchemaVersion:           5,
						Name:                        "test_config_1",
						Disabled:                    false,
						FeatureCompatibilityVersion: "4.2",
						Hostname:                    "example",
						ManualMode:                  false,
						ProcessType:                 "mongod",
						Version:                     "4.2.2",
					},
				},
				ReplicaSets: []*opsmngr.ReplicaSet{
					// Old
					{
						ID:              "replica_set_1",
						ProtocolVersion: "1",
						Members: []opsmngr.Member{
							{
								ArbiterOnly:        false,
								BuildIndexes:       true,
								Hidden:             false,
								Host:               "replica_set_1_0",
								Priority:           1,
								Votes:              1,
								SlaveDelay:         pointy.Float64(1),
								SecondaryDelaySecs: pointy.Float64(1),
							},
						},
					},
					// New
					{
						ID:              "test_config",
						ProtocolVersion: "1",
						Members: []opsmngr.Member{
							{
								ArbiterOnly:  false,
								BuildIndexes: true,
								Hidden:       false,
								Host:         "test_config_1",
								Priority:     1,
								Votes:        1,
							},
						},
					},
				},
			},
		},
		"add a process to a config with an existing replica set": {
			current: fixture.AutomationConfigWithOneReplicaSet("replica_set_1", false),
			changes: &ClusterConfig{
				RSConfig: RSConfig{
					FeatureCompatibilityVersion: "4.2",
					Name:                        "replica_set_1",
					Version:                     "4.2.2",
					Processes: []*ProcessConfig{
						{
							DBPath:   "/data/db/",
							Hostname: "host0",
							LogPath:  "/data/db/mongodb.log",
							Port:     27017,
							Priority: pointy.Float64(1),
							Votes:    pointy.Float64(1),
						}, {
							DBPath:   "/data/db/",
							Hostname: "host1",
							LogPath:  "/data/db/mongodb.log",
							Port:     27017,
							Priority: pointy.Float64(1),
							Votes:    pointy.Float64(1),
							Security: &map[string]interface{}{
								"test": "test",
							},
							SetParameter: &map[string]interface{}{
								"test": "test",
							},
						},
					},
				},
			},
			expected: &opsmngr.AutomationConfig{
				Auth: opsmngr.Auth{
					DeploymentAuthMechanisms: []string{},
				},
				Processes: []*opsmngr.Process{
					// Old
					{
						Args26: opsmngr.Args26{
							NET: opsmngr.Net{
								Port: 27017,
							},
							Replication: &opsmngr.Replication{
								ReplSetName: "replica_set_1",
							},
							Storage: &opsmngr.Storage{
								DBPath: "/data/db/",
							},
							SystemLog: opsmngr.SystemLog{
								Destination: file,
								Path:        "/data/db/mongodb.log",
							},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						AuthSchemaVersion:           5,
						Name:                        "replica_set_1_0",
						Disabled:                    false,
						FeatureCompatibilityVersion: "4.2",
						Hostname:                    "host0",
						ManualMode:                  false,
						ProcessType:                 "mongod",
						Version:                     "4.2.2",
					},
					// New
					{
						Args26: opsmngr.Args26{
							NET: opsmngr.Net{Port: 27017},
							Replication: &opsmngr.Replication{
								ReplSetName: "replica_set_1",
							},
							Storage: &opsmngr.Storage{
								DBPath: "/data/db/",
							},
							SystemLog: opsmngr.SystemLog{
								Destination: file,
								Path:        "/data/db/mongodb.log",
							},
							Security: &map[string]interface{}{
								"test": "test",
							},
							SetParameter: &map[string]interface{}{
								"test": "test",
							},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						AuthSchemaVersion:           5,
						Name:                        "replica_set_1_2",
						Disabled:                    false,
						FeatureCompatibilityVersion: "4.2",
						Hostname:                    "host1",
						ManualMode:                  false,
						ProcessType:                 "mongod",
						Version:                     "4.2.2",
					},
				},
				ReplicaSets: []*opsmngr.ReplicaSet{
					// Old
					{
						ID:              "replica_set_1",
						ProtocolVersion: "1",
						Members: []opsmngr.Member{
							{
								ArbiterOnly:  false,
								BuildIndexes: true,
								Hidden:       false,
								Host:         "replica_set_1_0",
								Priority:     1,
								Votes:        1,
							},
							{
								ID:           1,
								ArbiterOnly:  false,
								BuildIndexes: true,
								Hidden:       false,
								Host:         "replica_set_1_2",
								Priority:     1,
								Votes:        1,
							},
						},
					},
				},
			},
		},
		"replace a process to a config with an existing replica set": {
			current: fixture.AutomationConfigWithOneReplicaSet("replica_set_1", false),
			changes: &ClusterConfig{
				RSConfig: RSConfig{
					FeatureCompatibilityVersion: "4.2",
					Name:                        "replica_set_1",
					Version:                     "4.2.2",
					Processes: []*ProcessConfig{
						{
							DBPath:   "/data/db/",
							Hostname: "host1",
							LogPath:  "/data/db/mongodb.log",
							Port:     27017,
							Priority: pointy.Float64(1),
							Votes:    pointy.Float64(1),
						},
					},
				},
			},
			expected: &opsmngr.AutomationConfig{
				Auth: opsmngr.Auth{
					DeploymentAuthMechanisms: []string{},
				},
				Processes: []*opsmngr.Process{
					// Old
					{
						Args26: opsmngr.Args26{
							NET: opsmngr.Net{
								Port: 27017,
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
							Replication: &opsmngr.Replication{},
							Storage: &opsmngr.Storage{
								DBPath: "/data/db/",
							},
							SystemLog: opsmngr.SystemLog{
								Destination: file,
								Path:        "/data/db/mongodb.log",
							},
							AuditLog: &opsmngr.AuditLog{
								Destination: file,
								Path:        "/data/db/audit.log",
							},
							Security: &map[string]interface{}{
								"test": "test",
							},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						AuthSchemaVersion:           5,
						Name:                        "replica_set_1_0",
						Disabled:                    true,
						FeatureCompatibilityVersion: "4.2",
						Hostname:                    "host0",
						ManualMode:                  false,
						ProcessType:                 "mongod",
						Version:                     "4.2.2",
					},
					// New
					{
						Args26: opsmngr.Args26{
							NET: opsmngr.Net{Port: 27017},
							Replication: &opsmngr.Replication{
								ReplSetName: "replica_set_1",
							},
							Storage: &opsmngr.Storage{
								DBPath: "/data/db/",
							},
							SystemLog: opsmngr.SystemLog{
								Destination: file,
								Path:        "/data/db/mongodb.log",
							},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						AuthSchemaVersion:           5,
						Name:                        "replica_set_1_1",
						Disabled:                    false,
						FeatureCompatibilityVersion: "4.2",
						Hostname:                    "host1",
						ManualMode:                  false,
						ProcessType:                 "mongod",
						Version:                     "4.2.2",
					},
				},
				ReplicaSets: []*opsmngr.ReplicaSet{
					// New
					{
						ID:              "replica_set_1",
						ProtocolVersion: "1",
						Members: []opsmngr.Member{
							{
								ID:           1,
								ArbiterOnly:  false,
								BuildIndexes: true,
								Hidden:       false,
								Host:         "replica_set_1_1",
								Priority:     1,
								Votes:        1,
							},
						},
					},
				},
			},
		},
		"add a sharded cluster set to an empty config": {
			current: fixture.EmptyAutomationConfig(),
			changes: &ClusterConfig{
				RSConfig: RSConfig{
					FeatureCompatibilityVersion: "4.2",
					Name:                        "test_config",
					Version:                     "4.2.2",
				},
				Shards: []*RSConfig{
					{
						Name: "myShard_0",
						Processes: []*ProcessConfig{
							{
								DBPath:   "/data/myShard_0",
								Hostname: "example",
								LogPath:  "/log/myShard_0",
								Port:     1,
								Priority: pointy.Float64(1),
								Votes:    pointy.Float64(1),
							},
						},
					},
				},
				Config: &RSConfig{
					Name: "configRS",
					Processes: []*ProcessConfig{
						{
							DBPath:   "/data/configRS",
							Hostname: "example",
							LogPath:  "/log/configRS",
							Port:     2,
							Priority: pointy.Float64(1),
							Votes:    pointy.Float64(1),
						},
					},
				},
				Mongos: []*ProcessConfig{
					{
						Hostname: "example",
						LogPath:  "/log/mongos",
						Port:     3,
					},
				},
			},
			expected: &opsmngr.AutomationConfig{
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
								Destination: file,
								Path:        "/log/myShard_0",
							},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						AuthSchemaVersion:           5,
						Name:                        "test_config_myShard_0_0",
						Disabled:                    false,
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
								Destination: file,
								Path:        "/log/configRS",
							},
							Sharding: &opsmngr.Sharding{ClusterRole: "configsvr"},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						AuthSchemaVersion:           5,
						Name:                        "test_config_configRS_1",
						Disabled:                    false,
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
								Destination: file,
								Path:        "/log/mongos",
							},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						Cluster:                     "test_config",
						AuthSchemaVersion:           5,
						Name:                        "test_config_mongos_2",
						Disabled:                    false,
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
								ID:           0,
								ArbiterOnly:  false,
								BuildIndexes: true,
								Hidden:       false,
								Host:         "test_config_myShard_0_0",
								Priority:     1,
								Votes:        1,
							},
						},
					},
					{
						ID:              "configRS",
						ProtocolVersion: "1",
						Members: []opsmngr.Member{
							{
								ID:           0,
								ArbiterOnly:  false,
								BuildIndexes: true,
								Hidden:       false,
								Host:         "test_config_configRS_1",
								Priority:     1,
								Votes:        1,
							},
						},
					},
				},
				Sharding: []*opsmngr.ShardingConfig{
					{
						ConfigServerReplica: "configRS",
						Name:                "test_config",
						Collections:         make([]*map[string]interface{}, 0),
						Draining:            make([]string, 0),
						Tags:                make([]string, 0),
						Shards: []*opsmngr.Shard{
							{
								ID:   "myShard_0",
								RS:   "myShard_0",
								Tags: make([]string, 0),
							},
						},
					},
				},
			},
		},
		"add a shard set to an existing sharded cluster config": {
			current: fixture.AutomationConfigWithOneShardedCluster("test_config", false),
			changes: &ClusterConfig{
				RSConfig: RSConfig{
					FeatureCompatibilityVersion: "4.2",
					Name:                        "test_config",
					Version:                     "4.2.2",
				},
				Shards: []*RSConfig{
					// Old
					{
						Name: "myShard_0",
						Processes: []*ProcessConfig{
							{
								DBPath:   "/data/myShard_0",
								Hostname: "example",
								LogPath:  "/log/myShard_0",
								Port:     1,
								Priority: pointy.Float64(1),
								Votes:    pointy.Float64(1),
							},
						},
					},
					// New
					{
						Name: "myShard_1",
						Processes: []*ProcessConfig{
							{
								DBPath:   "/data/myShard_1",
								Hostname: "example",
								LogPath:  "/log/myShard_1",
								Port:     4,
								Priority: pointy.Float64(1),
								Votes:    pointy.Float64(1),
							},
						},
					},
				},
				Config: &RSConfig{
					Name: "configRS",
					Processes: []*ProcessConfig{
						{
							DBPath:   "/data/configRS",
							Hostname: "example",
							LogPath:  "/log/configRS",
							Port:     2,
							Priority: pointy.Float64(1),
							Votes:    pointy.Float64(1),
						},
					},
				},
				Mongos: []*ProcessConfig{
					{
						Hostname: "example",
						LogPath:  "/log/mongos",
						Port:     3,
					},
				},
			},
			expected: &opsmngr.AutomationConfig{
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
								Destination: file,
								Path:        "/log/myShard_0",
							},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						AuthSchemaVersion:           5,
						Name:                        "test_config_myShard_0_0",
						Disabled:                    false,
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
								Destination: file,
								Path:        "/log/configRS",
							},
							Sharding: &opsmngr.Sharding{ClusterRole: "configsvr"},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						AuthSchemaVersion:           5,
						Name:                        "test_config_configRS_1",
						Disabled:                    false,
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
								Destination: file,
								Path:        "/log/mongos",
							},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						Cluster:                     "test_config",
						AuthSchemaVersion:           5,
						Name:                        "test_config_mongos_2",
						Disabled:                    false,
						FeatureCompatibilityVersion: "4.2",
						Hostname:                    "example",
						ManualMode:                  false,
						ProcessType:                 "mongos",
						Version:                     "4.2.2",
					},
					// New
					{
						Args26: opsmngr.Args26{
							NET: opsmngr.Net{Port: 4},
							Replication: &opsmngr.Replication{
								ReplSetName: "myShard_1",
							},
							Storage: &opsmngr.Storage{
								DBPath: "/data/myShard_1",
							},
							SystemLog: opsmngr.SystemLog{
								Destination: file,
								Path:        "/log/myShard_1",
							},
						},
						LogRotate: &opsmngr.LogRotate{
							SizeThresholdMB:  1000,
							TimeThresholdHrs: 24,
						},
						AuthSchemaVersion:           5,
						Name:                        "test_config_myShard_1_3",
						Disabled:                    false,
						FeatureCompatibilityVersion: "4.2",
						Hostname:                    "example",
						ManualMode:                  false,
						ProcessType:                 "mongod",
						Version:                     "4.2.2",
					},
				},
				ReplicaSets: []*opsmngr.ReplicaSet{
					// Old
					{
						ID:              "myShard_0",
						ProtocolVersion: "1",
						Members: []opsmngr.Member{
							{
								ID:           0,
								ArbiterOnly:  false,
								BuildIndexes: true,
								Hidden:       false,
								Host:         "test_config_myShard_0_0",
								Priority:     1,
								Votes:        1,
							},
						},
					},
					{
						ID:              "configRS",
						ProtocolVersion: "1",
						Members: []opsmngr.Member{
							{
								ID:           0,
								ArbiterOnly:  false,
								BuildIndexes: true,
								Hidden:       false,
								Host:         "test_config_configRS_1",
								Priority:     1,
								Votes:        1,
							},
						},
					},
					// New
					{
						ID:              "myShard_1",
						ProtocolVersion: "1",
						Members: []opsmngr.Member{
							{
								ID:           0,
								ArbiterOnly:  false,
								BuildIndexes: true,
								Hidden:       false,
								Host:         "test_config_myShard_1_3",
								Priority:     1,
								Votes:        1,
							},
						},
					},
				},
				Sharding: []*opsmngr.ShardingConfig{
					{
						ConfigServerReplica: "configRS",
						Name:                "test_config",
						Collections:         make([]*map[string]interface{}, 0),
						Draining:            make([]string, 0),
						Tags:                make([]string, 0),
						Shards: []*opsmngr.Shard{
							// Old
							{
								ID:   "myShard_0",
								RS:   "myShard_0",
								Tags: make([]string, 0),
							},
							// New
							{
								ID:   "myShard_1",
								RS:   "myShard_1",
								Tags: make([]string, 0),
							},
						},
					},
				},
			},
		},
	}

	for name, tc := range testCases {
		changes := tc.changes
		current := tc.current
		expected := tc.expected
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			if err := changes.PatchAutomationConfig(current); err != nil {
				t.Fatalf("PatchAutomationConfig() unexpected error: %v\n", err)
			}
			if diff := deep.Equal(current, expected); diff != nil {
				t.Error(diff)
			}
		})
	}
}
