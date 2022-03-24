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
)

func TestFromAutomationConfig(t *testing.T) {
	name := "cluster_1"
	fipsMode := true
	t.Run("replica set", func(t *testing.T) {
		t.Parallel()
		config := fixture.AutomationConfigWithOneReplicaSet(name, false)
		expected := []*ClusterConfig{
			{
				RSConfig: RSConfig{
					Name: name,
					Processes: []*ProcessConfig{
						{
							ArbiterOnly:                 pointy.Bool(false),
							BuildIndexes:                pointy.Bool(true),
							DBPath:                      "/data/db/",
							Disabled:                    false,
							Hidden:                      pointy.Bool(false),
							Hostname:                    "host0",
							LogPath:                     "/data/db/mongodb.log",
							LogDestination:              file,
							AuditLogDestination:         file,
							AuditLogPath:                "/data/db/audit.log",
							Port:                        27017,
							Priority:                    pointy.Float64(1),
							ProcessType:                 mongod,
							SlaveDelay:                  pointy.Float64(1),
							SecondaryDelaySecs:          pointy.Float64(1),
							Votes:                       pointy.Float64(1),
							FeatureCompatibilityVersion: "4.2",
							Version:                     "4.2.2",
							Name:                        name + "_0",
							OplogSizeMB:                 pointy.Int(10),
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
							Security: &map[string]interface{}{
								"test": "test",
							},
						},
					},
				},
				MongoURI: "mongodb://host0:27017",
			},
		}

		result := FromAutomationConfig(config)
		if diff := deep.Equal(result, expected); diff != nil {
			t.Error(diff)
		}
	})
	t.Run("sharded cluster", func(t *testing.T) {
		t.Parallel()
		config := fixture.AutomationConfigWithOneShardedCluster(name, false)
		expected := []*ClusterConfig{
			{
				MongoURI: "mongodb://example:3",
				RSConfig: RSConfig{
					Name: name,
				},
				Shards: []*RSConfig{
					{
						Name: "myShard_0",
						Processes: []*ProcessConfig{
							{
								ArbiterOnly:                 pointy.Bool(false),
								BuildIndexes:                pointy.Bool(true),
								DBPath:                      "/data/myShard_0",
								Disabled:                    false,
								Hidden:                      pointy.Bool(false),
								Hostname:                    "example",
								LogPath:                     "/log/myShard_0",
								LogDestination:              file,
								Port:                        1,
								Priority:                    pointy.Float64(1),
								ProcessType:                 mongod,
								SlaveDelay:                  pointy.Float64(1),
								SecondaryDelaySecs:          pointy.Float64(1),
								Votes:                       pointy.Float64(1),
								FeatureCompatibilityVersion: "4.2",
								Version:                     "4.2.2",
								Name:                        name + "_myShard_0_0",
							},
						},
					},
				},
				Config: &RSConfig{
					Name: "configRS",
					Processes: []*ProcessConfig{
						{
							ArbiterOnly:                 pointy.Bool(false),
							BuildIndexes:                pointy.Bool(true),
							DBPath:                      "/data/configRS",
							Disabled:                    false,
							Hidden:                      pointy.Bool(false),
							Hostname:                    "example",
							LogPath:                     "/log/configRS",
							LogDestination:              file,
							Port:                        2,
							Priority:                    pointy.Float64(1),
							ProcessType:                 mongod,
							SlaveDelay:                  pointy.Float64(1),
							SecondaryDelaySecs:          pointy.Float64(1),
							Votes:                       pointy.Float64(1),
							FeatureCompatibilityVersion: "4.2",
							Version:                     "4.2.2",
							Name:                        name + "_configRS_1",
						},
					},
				},
				Mongos: []*ProcessConfig{
					{
						Disabled:                    false,
						Hostname:                    "example",
						LogPath:                     "/log/mongos",
						LogDestination:              file,
						Port:                        3,
						ProcessType:                 "mongos",
						FeatureCompatibilityVersion: "4.2",
						Version:                     "4.2.2",
						Name:                        name + "_mongos_2",
					},
				},
			},
		}
		result := FromAutomationConfig(config)
		if diff := deep.Equal(result, expected); diff != nil {
			t.Error(diff)
		}
	})
}
