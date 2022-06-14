// Copyright 2021 MongoDB Inc
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

package quickstart

import (
	"errors"
	"fmt"
	"strings"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli"
	"github.com/mongodb/mongodb-atlas-cli/internal/flag"
	"github.com/mongodb/mongodb-atlas-cli/internal/search"
	"github.com/mongodb/mongodb-atlas-cli/internal/telemetry"
	"github.com/mongodb/mongodb-atlas-cli/internal/usage"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

var ErrNoRegions = errors.New("no regions found for cloud provider")

func (opts *Opts) createCluster() error {
	if _, err := opts.store.CreateCluster(opts.newCluster()); err != nil {
		return err
	}

	return nil
}

func (opts *Opts) askClusterOptions() error {
	var qs []*survey.Question

	if opts.shouldAskForValue(flag.ClusterName) {
		if opts.ClusterName == "" {
			opts.ClusterName = opts.defaultName
		}
		qs = append(qs, newClusterNameQuestion(opts.ClusterName))
	}

	if opts.shouldAskForValue(flag.Provider) {
		qs = append(qs, newClusterProviderQuestion())
	}

	if opts.shouldAskForValue(flag.ClusterName) || opts.shouldAskForValue(flag.Provider) || opts.shouldAskForValue(flag.Region) {
		fmt.Print(`
[Set up your Atlas cluster]
`)
	}

	if err := telemetry.TrackAsk(qs, opts); err != nil {
		return err
	}

	// We need the provider to ask for the region
	if opts.shouldAskForValue(flag.Region) {
		return opts.askClusterRegion()
	}
	return nil
}

func (opts *Opts) askClusterRegion() error {
	regions, err := opts.defaultRegions()
	if err != nil {
		return err
	}

	if len(regions) == 0 {
		return fmt.Errorf("%w: %v", ErrNoRegions, opts.Provider)
	}

	regionQ := newRegionQuestions(regions)
	return telemetry.TrackAskOne(regionQ, &opts.Region, survey.WithValidator(survey.Required))
}

func newRegionQuestions(defaultRegions []string) survey.Prompt {
	return &survey.Select{
		Message: "Cloud Provider Region",
		Help:    usage.Region,
		Options: defaultRegions,
	}
}

func defaultDiskSizeGB(provider, tier string) float64 {
	return atlas.DefaultDiskSizeGB[strings.ToUpper(provider)][tier]
}

func (opts *Opts) newCluster() *atlas.AdvancedCluster {
	cluster := &atlas.AdvancedCluster{
		GroupID:          opts.ConfigProjectID(),
		ClusterType:      replicaSet,
		ReplicationSpecs: []*atlas.AdvancedReplicationSpec{opts.newAdvanceReplicationSpec()},
		Name:             opts.ClusterName,
		Labels: []atlas.Label{
			{
				Key:   "Infrastructure Tool",
				Value: "MongoDB CLI Quickstart",
			},
		},
	}

	if opts.providerName() != tenant {
		diskSizeGB := defaultDiskSizeGB(opts.providerName(), opts.Tier)
		mdbVersion, _ := cli.DefaultMongoDBMajorVersion()
		cluster.DiskSizeGB = &diskSizeGB
		cluster.MongoDBMajorVersion = mdbVersion
	}

	return cluster
}

const (
	shards   = 1
	zoneName = "Zone 1"
)

func (opts *Opts) newAdvanceReplicationSpec() *atlas.AdvancedReplicationSpec {
	return &atlas.AdvancedReplicationSpec{
		NumShards:     shards,
		ZoneName:      zoneName,
		RegionConfigs: []*atlas.AdvancedRegionConfig{opts.newAdvancedRegionConfig()},
	}
}

const (
	tenant  = "TENANT"
	atlasM2 = "M2"
	atlasM5 = "M5"
)

func (opts *Opts) newAdvancedRegionConfig() *atlas.AdvancedRegionConfig {
	providerName := opts.providerName()

	priority := 7
	regionConfig := atlas.AdvancedRegionConfig{
		RegionName: opts.Region,
		Priority:   &priority,
	}

	regionConfig.ProviderName = providerName
	regionConfig.ElectableSpecs = &atlas.Specs{
		InstanceSize: opts.Tier,
	}

	members := 3
	if providerName == tenant {
		regionConfig.BackingProviderName = opts.Provider
	} else {
		regionConfig.ElectableSpecs.NodeCount = &members
	}

	return &regionConfig
}

func providerName(tier, provider string) string {
	if tier == DefaultAtlasTier || tier == atlasM2 || tier == atlasM5 {
		return tenant
	}
	return strings.ToUpper(provider)
}

func (opts *Opts) providerName() string {
	return providerName(opts.Tier, opts.Provider)
}

func (opts *quickstart) providerName() string {
	return providerName(opts.Tier, opts.Provider)
}

func (opts *Opts) defaultRegions() ([]string, error) {
	cloudProviders, err := opts.store.CloudProviderRegions(
		opts.ConfigProjectID(),
		opts.Tier,
		[]*string{&opts.Provider},
	)

	if err != nil {
		return nil, err
	}

	if len(cloudProviders.Results) == 0 || len(cloudProviders.Results[0].InstanceSizes) == 0 {
		return nil, errors.New("no regions available")
	}

	availableRegions := cloudProviders.Results[0].InstanceSizes[0].AvailableRegions

	defaultRegions := make([]string, 0, len(availableRegions))
	popularRegionIndex := search.DefaultRegion(availableRegions)

	if popularRegionIndex != -1 {
		// the most popular region must be the first in the list
		popularRegion := availableRegions[popularRegionIndex]
		defaultRegions = append(defaultRegions, popularRegion.Name)

		// remove popular region from availableRegions
		availableRegions = append(availableRegions[:popularRegionIndex], availableRegions[popularRegionIndex+1:]...)
	}

	for _, v := range availableRegions {
		defaultRegions = append(defaultRegions, v.Name)
	}

	return defaultRegions, nil
}
