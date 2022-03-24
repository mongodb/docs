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

//go:build e2e || cloudmanager || om44 || om50

package cloud_manager_test

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"sort"
	"testing"
	"time"

	"github.com/mongodb/mongocli/e2e"
	"github.com/mongodb/mongocli/internal/convert"
	"github.com/openlyinc/pointy"
	"go.mongodb.org/atlas/mongodbatlas"
	"go.mongodb.org/ops-manager/opsmngr"
)

const (
	alertsEntity      = "alerts"
	testedMDBVersion  = "4.4.0"
	testedMDBFCV      = "4.4"
	entity            = "cloud-manager"
	serversEntity     = "servers"
	iamEntity         = "iam"
	projectsEntity    = "projects"
	orgsEntity        = "orgs"
	clustersEntity    = "clusters"
	maintenanceEntity = "maintenanceWindows"
	monitoringEntity  = "monitoring"
	processesEntity   = "processes"
	featurePolicies   = "featurePolicies"
	eventsEntity      = "events"
	agentsEntity      = "agents"
	backupEntity      = "backup"
	dbUsersEntity     = "dbusers"
	securityEntity    = "security"
)

// automationServerHostname tries to list available server running the automation agent
// and returns the first available hostname for deployments.
func automationServerHostname(cliPath string) (string, error) {
	cmd := exec.Command(cliPath, entity, serversEntity, "list", "-o=json")
	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	}

	var servers *opsmngr.Agents
	if err := json.Unmarshal(resp, &servers); err != nil {
		return "", err
	}
	if servers.TotalCount == 0 {
		return "", errors.New("no server available")
	}
	sort.Sort(byLastConf(*servers))
	return servers.Results[0].Hostname, nil
}

type byLastConf opsmngr.Agents

func (s byLastConf) Len() int      { return len(s.Results) }
func (s byLastConf) Swap(i, j int) { s.Results[i], s.Results[j] = s.Results[j], s.Results[i] }
func (s byLastConf) Less(i, j int) bool {
	v1, _ := time.Parse(time.RFC3339, s.Results[i].LastConf)
	v2, _ := time.Parse(time.RFC3339, s.Results[j].LastConf)
	return v2.Before(v1)
}

func hostIDs(cliPath string) ([]string, error) {
	cmd := exec.Command(cliPath, entity, processesEntity, "list", "-o=json")
	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	if err != nil {
		return nil, err
	}

	var servers *opsmngr.Hosts
	if err := json.Unmarshal(resp, &servers); err != nil {
		return nil, err
	}
	if servers.TotalCount == 0 {
		return nil, errors.New("no hosts available")
	}
	result := make([]string, len(servers.Results))
	for i, h := range servers.Results {
		result[i] = h.ID
	}
	return result, nil
}

func generateRSConfig(filename, hostname, clusterName, version, fcVersion string) error {
	configFile, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer configFile.Close()

	cluster := &convert.ClusterConfig{
		RSConfig: convert.RSConfig{
			FeatureCompatibilityVersion: fcVersion,
			Name:                        clusterName,
			Version:                     version,
			Processes: []*convert.ProcessConfig{
				{
					DBPath:   fmt.Sprintf("/data/%s/27000", clusterName),
					Hostname: hostname,
					LogPath:  fmt.Sprintf("/data/%s/27000/mongodb.log", clusterName),
					Port:     27000,
					Priority: pointy.Float64(1),
					Votes:    pointy.Float64(1),
					WiredTiger: &map[string]interface{}{
						"collectionConfig": map[string]interface{}{},
						"engineConfig": map[string]interface{}{
							"cacheSizeGB": 1,
						},
						"indexConfig": map[string]interface{}{},
					},
				},
				{
					DBPath:   fmt.Sprintf("/data/%s/27001", clusterName),
					Hostname: hostname,
					LogPath:  fmt.Sprintf("/data/%s/27001/mongodb.log", clusterName),
					Port:     27001,
					Priority: pointy.Float64(1),
					Votes:    pointy.Float64(1),
					WiredTiger: &map[string]interface{}{
						"collectionConfig": map[string]interface{}{},
						"engineConfig": map[string]interface{}{
							"cacheSizeGB": 1,
						},
						"indexConfig": map[string]interface{}{},
					},
				},
				{
					DBPath:   fmt.Sprintf("/data/%s/27002", clusterName),
					Hostname: hostname,
					LogPath:  fmt.Sprintf("/data/%s/27002/mongodb.log", clusterName),
					Port:     27002,
					Priority: pointy.Float64(1),
					Votes:    pointy.Float64(1),
					WiredTiger: &map[string]interface{}{
						"collectionConfig": map[string]interface{}{},
						"engineConfig": map[string]interface{}{
							"cacheSizeGB": 1,
						},
						"indexConfig": map[string]interface{}{},
					},
				},
			},
		},
	}

	jsonEncoder := json.NewEncoder(configFile)
	jsonEncoder.SetIndent("", "  ")
	return jsonEncoder.Encode(cluster)
}

func generateShardedConfig(filename, hostname, clusterName, version, fcVersion string) error {
	configFile, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer configFile.Close()

	cluster := &convert.ClusterConfig{
		RSConfig: convert.RSConfig{
			FeatureCompatibilityVersion: fcVersion,
			Name:                        clusterName,
			Version:                     version,
		},
		Config: &convert.RSConfig{
			Name: clusterName + "_configRS",
			Processes: []*convert.ProcessConfig{
				{
					DBPath:   fmt.Sprintf("/data/%s/29000", clusterName),
					Hostname: hostname,
					LogPath:  fmt.Sprintf("/data/%s/29000/mongodb.log", clusterName),
					Port:     29000,
					Priority: pointy.Float64(1),
					Votes:    pointy.Float64(1),
					WiredTiger: &map[string]interface{}{
						"collectionConfig": map[string]interface{}{},
						"engineConfig": map[string]interface{}{
							"cacheSizeGB": 1,
						},
						"indexConfig": map[string]interface{}{},
					},
				},
				{
					DBPath:   fmt.Sprintf("/data/%s/29001", clusterName),
					Hostname: hostname,
					LogPath:  fmt.Sprintf("/data/%s/29001/mongodb.log", clusterName),
					Port:     29001,
					Priority: pointy.Float64(1),
					Votes:    pointy.Float64(1),
					WiredTiger: &map[string]interface{}{
						"collectionConfig": map[string]interface{}{},
						"engineConfig": map[string]interface{}{
							"cacheSizeGB": 1,
						},
						"indexConfig": map[string]interface{}{},
					},
				},
				{
					DBPath:   fmt.Sprintf("/data/%s/29002", clusterName),
					Hostname: hostname,
					LogPath:  fmt.Sprintf("/data/%s/29002/mongodb.log", clusterName),
					Port:     29002,
					Priority: pointy.Float64(1),
					Votes:    pointy.Float64(1),
					WiredTiger: &map[string]interface{}{
						"collectionConfig": map[string]interface{}{},
						"engineConfig": map[string]interface{}{
							"cacheSizeGB": 1,
						},
						"indexConfig": map[string]interface{}{},
					},
				},
			},
		},
		Mongos: []*convert.ProcessConfig{
			{
				Hostname: hostname,
				LogPath:  fmt.Sprintf("/data/%s/30000/mongodb.log", clusterName),
				Port:     30000,
			},
		},
		Shards: []*convert.RSConfig{
			{
				Name: clusterName + "_myShard_0",
				Processes: []*convert.ProcessConfig{
					{
						DBPath:   fmt.Sprintf("/data/%s/27000", clusterName),
						Hostname: hostname,
						LogPath:  fmt.Sprintf("/data/%s/27000/mongodb.log", clusterName),
						Port:     27000,
						Priority: pointy.Float64(1),
						Votes:    pointy.Float64(1),
						WiredTiger: &map[string]interface{}{
							"collectionConfig": map[string]interface{}{},
							"engineConfig": map[string]interface{}{
								"cacheSizeGB": 1,
							},
							"indexConfig": map[string]interface{}{},
						},
					},
					{
						DBPath:   fmt.Sprintf("/data/%s/27001", clusterName),
						Hostname: hostname,
						LogPath:  fmt.Sprintf("/data/%s/27001/mongodb.log", clusterName),
						Port:     27001,
						Priority: pointy.Float64(1),
						Votes:    pointy.Float64(1),
						WiredTiger: &map[string]interface{}{
							"collectionConfig": map[string]interface{}{},
							"engineConfig": map[string]interface{}{
								"cacheSizeGB": 1,
							},
							"indexConfig": map[string]interface{}{},
						},
					},
					{
						DBPath:   fmt.Sprintf("/data/%s/27002", clusterName),
						Hostname: hostname,
						LogPath:  fmt.Sprintf("/data/%s/27002/mongodb.log", clusterName),
						Port:     27002,
						Priority: pointy.Float64(1),
						Votes:    pointy.Float64(1),
						WiredTiger: &map[string]interface{}{
							"collectionConfig": map[string]interface{}{},
							"engineConfig": map[string]interface{}{
								"cacheSizeGB": 1,
							},
							"indexConfig": map[string]interface{}{},
						},
					},
				},
			},
			{
				Name: clusterName + "_myShard_1",
				Processes: []*convert.ProcessConfig{
					{
						DBPath:   fmt.Sprintf("/data/%s/28000", clusterName),
						Hostname: hostname,
						LogPath:  fmt.Sprintf("/data/%s/28000/mongodb.log", clusterName),
						Port:     28000,
						Priority: pointy.Float64(1),
						Votes:    pointy.Float64(1),
					},
					{
						DBPath:   fmt.Sprintf("/data/%s/28001", clusterName),
						Hostname: hostname,
						LogPath:  fmt.Sprintf("/data/%s/28001/mongodb.log", clusterName),
						Port:     28001,
						Priority: pointy.Float64(1),
						Votes:    pointy.Float64(1),
					},
					{
						DBPath:   fmt.Sprintf("/data/%s/28002", clusterName),
						Hostname: hostname,
						LogPath:  fmt.Sprintf("/data/%s/28002/mongodb.log", clusterName),
						Port:     28002,
						Priority: pointy.Float64(1),
						Votes:    pointy.Float64(1),
					},
				},
			},
		},
	}

	jsonEncoder := json.NewEncoder(configFile)
	jsonEncoder.SetIndent("", "  ")
	return jsonEncoder.Encode(cluster)
}

func watchAutomation(cliPath string) func(t *testing.T) {
	return func(t *testing.T) {
		t.Helper()
		cmd := exec.Command(cliPath,
			entity,
			"automation",
			"watch",
		)

		cmd.Env = os.Environ()
		if resp, err := cmd.CombinedOutput(); err != nil {
			t.Fatalf("unexpected error: %v, resp: %v\n", err, string(resp))
		}
	}
}

func createProject(projectName string) (string, error) {
	cliPath, err := e2e.Bin()
	if err != nil {
		return "", err
	}
	cmd := exec.Command(cliPath,
		iamEntity,
		projectsEntity,
		"create",
		projectName,
		"-o=json")
	cmd.Env = os.Environ()
	resp, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	}

	var project mongodbatlas.Project
	if err := json.Unmarshal(resp, &project); err != nil {
		return "", err
	}

	return project.ID, nil
}

func deleteProject(projectID string) error {
	cliPath, err := e2e.Bin()
	if err != nil {
		return err
	}
	cmd := exec.Command(cliPath,
		iamEntity,
		projectsEntity,
		"delete",
		projectID,
		"--force")
	cmd.Env = os.Environ()
	return cmd.Run()
}
