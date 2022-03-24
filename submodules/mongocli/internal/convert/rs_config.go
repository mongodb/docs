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
	"strconv"

	"github.com/Masterminds/semver/v3"
	"go.mongodb.org/ops-manager/opsmngr"
	"go.mongodb.org/ops-manager/search"
)

// RSConfig shared properties of replica sets, config servers, and sharded clusters.
type RSConfig struct {
	Name                        string           `yaml:"name,omitempty" json:"name,omitempty"`
	FeatureCompatibilityVersion string           `yaml:"featureCompatibilityVersion,omitempty" json:"featureCompatibilityVersion,omitempty"`
	Processes                   []*ProcessConfig `yaml:"processes,omitempty" json:"processes,omitempty"`
	Tags                        []string         `yaml:"tags,omitempty" json:"tags,omitempty"`
	Version                     string           `yaml:"version,omitempty" json:"version,omitempty"`
}

type patcher func(*ProcessConfig, string) *opsmngr.Process

// patch is a generic replica set patcher, you'll need to provide a function of the type patcher
// which will define how a process is patched.
func (c *RSConfig) patch(out *opsmngr.AutomationConfig, f patcher, names ...string) error {
	newProcesses := make([]*opsmngr.Process, len(c.Processes))
	rs, err := newReplicaSet(c)
	if err != nil {
		return err
	}
	// transform cli config to automation config
	for i, pc := range c.Processes {
		id := strconv.Itoa(len(out.Processes) + i)
		pc.setDefaults(c)
		pc.setProcessName(out.Processes, append(names, c.Name, id)...)
		newProcesses[i] = f(pc, c.Name)
		rs.Members[i] = pc.member(i)
	}
	// This value may not be present and is mandatory
	if out.Auth.DeploymentAuthMechanisms == nil {
		out.Auth.DeploymentAuthMechanisms = make([]string, 0)
	}
	patchProcesses(out, rs.ID, newProcesses)
	patchReplicaSet(out, rs)
	return nil
}

// patchReplicaSet patches a opsmngr.AutomationConfig using a replica set approach.
func (c *RSConfig) patchReplicaSet(out *opsmngr.AutomationConfig) error {
	return c.patch(out, newReplicaSetProcess)
}

// patchShard patches a opsmngr.AutomationConfig using a sharded cluster approach.
func (c *RSConfig) patchShard(out *opsmngr.AutomationConfig, name string) error {
	return c.patch(out, newReplicaSetProcess, name)
}

// patchConfigServer patches a opsmngr.AutomationConfig using a config server/replica set approach.
func (c *RSConfig) patchConfigServer(out *opsmngr.AutomationConfig, name string) error {
	return c.patch(out, newConfigRSProcess, name)
}

// protocolVer determines the appropriate protocol based on FCV
// returns "0" for versions <4.0 or "1" otherwise.
func (c *RSConfig) protocolVer() (string, error) {
	fcVersion := c.FeatureCompatibilityVersion
	if fcVersion == "" {
		// search per process, this may be the case when users get a cluster description,
		// manually update it and then try to apply that updated config
		for _, p := range c.Processes {
			if p.FeatureCompatibilityVersion != "" {
				fcVersion = p.FeatureCompatibilityVersion
				break
			}
		}
	}
	if fcVersion == "" {
		return "", errors.New("no featureCompatibilityVersion available")
	}
	ver, err := semver.NewVersion(fcVersion)
	if err != nil {
		return "", err
	}
	constrain, _ := semver.NewConstraint(fcvLessThanFour)

	if constrain.Check(ver) {
		return zero, nil
	}
	return one, nil
}

// newReplicaSet convert from cli config to opsmngr.ReplicaSet.
func newReplicaSet(c *RSConfig) (*opsmngr.ReplicaSet, error) {
	pv, err := c.protocolVer()
	if err != nil {
		return nil, err
	}

	rs := &opsmngr.ReplicaSet{
		ID:              c.Name,
		Members:         make([]opsmngr.Member, len(c.Processes)),
		ProtocolVersion: pv,
	}

	return rs, nil
}

// newRSConfig.
func newRSConfig(in *opsmngr.AutomationConfig, id string) *RSConfig {
	rsi, found := search.ReplicaSets(in.ReplicaSets, func(rs *opsmngr.ReplicaSet) bool {
		return rs.ID == id
	})
	if !found {
		return nil
	}
	rs := in.ReplicaSets[rsi]
	out := &RSConfig{
		Name:      rs.ID,
		Processes: make([]*ProcessConfig, len(rs.Members)),
	}

	for i, m := range rs.Members {
		for l, p := range in.Processes {
			if p.Name == m.Host {
				out.Processes[i] = newReplicaSetProcessConfig(&rs.Members[i], p)
				in.Processes = append(in.Processes[:l], in.Processes[l+1:]...)
				break
			}
		}
	}
	in.ReplicaSets = append(in.ReplicaSets[:rsi], in.ReplicaSets[rsi+1:]...)
	return out
}
