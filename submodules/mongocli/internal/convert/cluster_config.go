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

package convert

import (
	"errors"
	"fmt"
	"strconv"

	"go.mongodb.org/ops-manager/opsmngr"
	"go.mongodb.org/ops-manager/search"
)

const (
	zero            = "0"
	one             = "1"
	file            = "file"
	fcvLessThanFour = "< 4.0"
	mongos          = "mongos"
)

// ClusterConfig configuration for a cluster
// This cluster can be used to patch an automation config.
type ClusterConfig struct {
	RSConfig `yaml:",inline"`
	MongoURI string           `yaml:"mongoURI,omitempty" json:"mongoURI,omitempty"`
	Shards   []*RSConfig      `yaml:"shards,omitempty" json:"shards,omitempty"`
	Config   *RSConfig        `yaml:"config,omitempty" json:"config,omitempty"`
	Mongos   []*ProcessConfig `yaml:"mongos,omitempty" json:"mongos,omitempty"`
}

// newReplicaSetCluster when config is a replicaset.
func newReplicaSetCluster(name string, s int) *ClusterConfig {
	rs := &ClusterConfig{}
	rs.Name = name
	rs.Processes = make([]*ProcessConfig, s)

	return rs
}

// newShardedCluster when config is a sharded cluster.
func newShardedCluster(s *opsmngr.ShardingConfig) *ClusterConfig {
	rs := &ClusterConfig{}
	rs.Name = s.Name
	rs.Shards = make([]*RSConfig, len(s.Shards))
	rs.Mongos = make([]*ProcessConfig, 0, 1)
	rs.Tags = s.Tags

	return rs
}

// PatchAutomationConfig adds the ClusterConfig to a opsmngr.AutomationConfig
// this method will modify the given AutomationConfig to add the new replica set or sharded cluster information.
func (c *ClusterConfig) PatchAutomationConfig(out *opsmngr.AutomationConfig) error {
	// A replica set should be just a list of processes
	if c.Processes != nil && c.Mongos == nil && c.Shards == nil && c.Config == nil {
		return c.patchReplicaSet(out)
	}
	// a sharded cluster will be a list of mongos (processes),
	// shards, each with a list of process (replica sets)
	// one (1) config server, with a list of process (replica set)
	if c.Processes == nil && c.Mongos != nil && c.Shards != nil && c.Config != nil {
		return c.patchSharding(out)
	}

	return errors.New("invalid config")
}

func (c *ClusterConfig) patchSharding(out *opsmngr.AutomationConfig) error {
	newCluster := newShardingConfig(c)
	// transform cli config to automation config
	for i, s := range c.Shards {
		s.Version = c.Version
		s.FeatureCompatibilityVersion = c.FeatureCompatibilityVersion
		if err := s.patchShard(out, c.Name); err != nil {
			return err
		}
		newCluster.Shards[i] = newShard(s)
	}
	c.Config.Version = c.Version
	c.Config.FeatureCompatibilityVersion = c.FeatureCompatibilityVersion
	if err := c.Config.patchConfigServer(out, c.Name); err != nil {
		return err
	}

	newProcesses := make([]*opsmngr.Process, len(c.Mongos))
	for i, pc := range c.Mongos {
		pc.ProcessType = mongos
		pc.setDefaults(&c.RSConfig)
		pc.setProcessName(out.Processes, c.Name, "mongos", strconv.Itoa(len(out.Processes)+i))
		newProcesses[i] = newMongosProcess(pc, c.Name)
	}
	// This value may not be present and is mandatory
	if out.Auth.DeploymentAuthMechanisms == nil {
		out.Auth.DeploymentAuthMechanisms = make([]string, 0)
	}
	patchProcesses(out, newCluster.Name, newProcesses)
	patchSharding(out, newCluster)
	return nil
}

func (c *ClusterConfig) addToMongoURI(p *opsmngr.Process) {
	if c.MongoURI == "" {
		c.MongoURI = fmt.Sprintf("mongodb://%s:%d", p.Hostname, p.Args26.NET.Port)
	} else {
		c.MongoURI = fmt.Sprintf("%s,%s:%d", c.MongoURI, p.Hostname, p.Args26.NET.Port)
	}
}

func newShard(rsConfig *RSConfig) *opsmngr.Shard {
	s := &opsmngr.Shard{
		ID:   rsConfig.Name,
		RS:   rsConfig.Name,
		Tags: rsConfig.Tags,
	}
	if s.Tags == nil {
		s.Tags = make([]string, 0)
	}
	return s
}

func newShardingConfig(c *ClusterConfig) *opsmngr.ShardingConfig {
	rs := &opsmngr.ShardingConfig{
		Name:                c.Name,
		Shards:              make([]*opsmngr.Shard, len(c.Shards)),
		ConfigServerReplica: c.Config.Name,
		Tags:                c.Tags,
		Draining:            make([]string, 0),
		Collections:         make([]*map[string]interface{}, 0),
	}
	if rs.Tags == nil {
		rs.Tags = make([]string, 0)
	}

	return rs
}

// patchProcesses replace replica set processes with new configuration
// this will disable all existing processes for the given replica set and remove the association
// Then try to patch then with the new config if one config exists for the same host:port.
func patchProcesses(out *opsmngr.AutomationConfig, newReplicaSetID string, newProcesses []*opsmngr.Process) {
	for i, oldProcess := range out.Processes {
		if oldProcess.Args26.Replication != nil && oldProcess.Args26.Replication.ReplSetName == newReplicaSetID {
			oldProcess.Disabled = true
			oldProcess.Args26.Replication = new(opsmngr.Replication)
		}
		oldName := oldProcess.Name
		pos, found := search.Processes(newProcesses, func(p *opsmngr.Process) bool {
			return p.Name == oldName
		})
		if found {
			keepSettings(oldProcess, newProcesses, pos)
			out.Processes[i] = newProcesses[pos]
			newProcesses = append(newProcesses[:pos], newProcesses[pos+1:]...)
		}
	}
	if len(newProcesses) > 0 {
		out.Processes = append(out.Processes, newProcesses...)
	}
}

// keepSettings if the process exists keep settings we don't expose via the CLI config file.
func keepSettings(oldProcess *opsmngr.Process, newProcesses []*opsmngr.Process, pos int) {
	if oldProcess.Args26.BasisTech != nil {
		newProcesses[pos].Args26.BasisTech = oldProcess.Args26.BasisTech
	}
	if oldProcess.Args26.OperationProfiling != nil {
		newProcesses[pos].Args26.OperationProfiling = oldProcess.Args26.OperationProfiling
	}
	if oldProcess.Args26.ProcessManagement != nil {
		newProcesses[pos].Args26.ProcessManagement = oldProcess.Args26.ProcessManagement
	}
	if oldProcess.Args26.SNMP != nil {
		newProcesses[pos].Args26.SNMP = oldProcess.Args26.SNMP
	}
}

// patchReplicaSet patches the replica set if it exists, else adds it as a new replica set.
func patchReplicaSet(out *opsmngr.AutomationConfig, newReplicaSet *opsmngr.ReplicaSet) {
	pos, found := search.ReplicaSets(out.ReplicaSets, func(r *opsmngr.ReplicaSet) bool {
		return r.ID == newReplicaSet.ID
	})

	if !found {
		out.ReplicaSets = append(out.ReplicaSets, newReplicaSet)
		return
	}

	oldReplicaSet := out.ReplicaSets[pos]
	lastID := oldReplicaSet.Members[len(oldReplicaSet.Members)-1].ID
	for j, newMember := range newReplicaSet.Members {
		newHost := newMember.Host
		k, found := search.Members(oldReplicaSet.Members, func(m opsmngr.Member) bool {
			return m.Host == newHost
		})
		if found {
			newMember.ID = oldReplicaSet.Members[k].ID
		} else {
			lastID++
			newMember.ID = lastID
		}
		newReplicaSet.Members[j] = newMember
	}
	out.ReplicaSets[pos] = newReplicaSet
}

// patchSharding patches the shard if it exists, else adds it as a new shard.
func patchSharding(out *opsmngr.AutomationConfig, s *opsmngr.ShardingConfig) {
	pos, found := search.ShardingConfig(out.Sharding, func(r *opsmngr.ShardingConfig) bool {
		return r.Name == s.Name
	})
	if !found {
		out.Sharding = append(out.Sharding, s)
		return
	}

	out.Sharding[pos] = s
}
