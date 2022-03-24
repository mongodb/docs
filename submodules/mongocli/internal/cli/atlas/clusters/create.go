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

package clusters

import (
	"context"
	"errors"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/file"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

const (
	replicaSet = "REPLICASET"
	tenant     = "TENANT"
	atlasM0    = "M0"
	atlasM2    = "M2"
	atlasM5    = "M5"
	zoneName   = "Zone 1"
	labelKey   = "Infrastructure Tool"
	labelValue = "mongoCLI"
)

type CreateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	name        string
	provider    string
	region      string
	tier        string
	members     int
	shards      int
	clusterType string
	diskSizeGB  float64
	backup      bool
	biConnector bool
	mdbVersion  string
	filename    string
	fs          afero.Fs
	store       store.ClusterCreator
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTmpl = "Deploying cluster '{{.Name}}'.\n"

func (opts *CreateOpts) Run() error {
	cluster, err := opts.newCluster()
	if err != nil {
		return err
	}

	r, err := opts.store.CreateCluster(cluster)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *CreateOpts) newCluster() (*atlas.AdvancedCluster, error) {
	cluster := new(atlas.AdvancedCluster)
	if opts.filename != "" {
		if err := file.Load(opts.fs, opts.filename, cluster); err != nil {
			return nil, err
		}
		RemoveReadOnlyAttributes(cluster)
	} else {
		opts.applyOpts(cluster)
	}

	if opts.name != "" {
		cluster.Name = opts.name
	}

	AddLabel(cluster, atlas.Label{
		Key:   labelKey,
		Value: labelValue,
	})

	cluster.GroupID = opts.ConfigProjectID()
	return cluster, nil
}

func (opts *CreateOpts) applyOpts(out *atlas.AdvancedCluster) {
	replicationSpec := opts.newAdvanceReplicationSpec()
	if opts.backup {
		out.BackupEnabled = &opts.backup
		out.PitEnabled = &opts.backup
	}
	if opts.biConnector {
		out.BiConnector = &atlas.BiConnector{Enabled: &opts.biConnector}
	}
	out.ClusterType = opts.clusterType

	if !opts.isTenant() {
		out.DiskSizeGB = &opts.diskSizeGB
	}

	out.MongoDBMajorVersion = opts.mdbVersion
	out.ReplicationSpecs = []*atlas.AdvancedReplicationSpec{replicationSpec}
}

func (opts *CreateOpts) isTenant() bool {
	return opts.tier == atlasM0 || opts.tier == atlasM2 || opts.tier == atlasM5
}

func (opts *CreateOpts) providerName() string {
	if opts.isTenant() {
		return tenant
	}
	return opts.provider
}

func (opts *CreateOpts) newAdvanceReplicationSpec() *atlas.AdvancedReplicationSpec {
	return &atlas.AdvancedReplicationSpec{
		NumShards:     opts.shards,
		ZoneName:      zoneName,
		RegionConfigs: []*atlas.AdvancedRegionConfig{opts.newAdvancedRegionConfig()},
	}
}

func (opts *CreateOpts) newAdvancedRegionConfig() *atlas.AdvancedRegionConfig {
	priority := 7
	readOnlyNode := 0
	providerName := opts.providerName()

	regionConfig := atlas.AdvancedRegionConfig{
		RegionName: opts.region,
		Priority:   &priority,
	}

	regionConfig.ProviderName = providerName
	regionConfig.ElectableSpecs = &atlas.Specs{
		InstanceSize: opts.tier,
	}

	if providerName == tenant {
		regionConfig.BackingProviderName = opts.provider
	} else {
		regionConfig.ElectableSpecs.NodeCount = &opts.members
	}

	readOnlySpec := &atlas.Specs{
		InstanceSize: opts.tier,
		NodeCount:    &readOnlyNode,
	}
	regionConfig.ReadOnlySpecs = readOnlySpec

	return &regionConfig
}

// CreateBuilder builds a cobra.Command that can run as:
// create <name> --projectId projectId --provider AWS|GCP|AZURE --region regionName [--members N] [--tier M#] [--diskSizeGB N] [--backup] [--mdbVersion].
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{
		fs: afero.NewOsFs(),
	}
	cmd := &cobra.Command{
		Use:   "create [name]",
		Short: "Create one cluster in the specified project.",
		Long: `To get started quickly, specify a name for your cluster, a cloud provider, and a region to deploy a three-member replica set with the latest MongoDB server version.
For full control of your deployment, or to create multi-cloud clusters, provide a JSON configuration file with the --file flag.`,
		Example: `  
  Deploy a three-member replica set in AWS:
  $ mongocli atlas cluster create <clusterName> --projectId <projectId> --provider AWS --region US_EAST_1 --members 3 --tier M10 --mdbVersion 5.0 --diskSizeGB 10

  Deploy a three-member replica set in AZURE:
  $ mongocli atlas cluster create <clusterName> --projectId <projectId> --provider AZURE --region US_EAST_2 --members 3 --tier M10  --mdbVersion 5.0 --diskSizeGB 10
  
  Deploy a three-member replica set in GCP:
  $ mongocli atlas cluster create <clusterName> --projectId <projectId> --provider GCP --region EASTERN_US --members 3 --tier M10  --mdbVersion 5.0 --diskSizeGB 10

  Deploy a cluster or a multi-cloud cluster from a JSON configuration file:
  $ mongocli atlas cluster create --projectId <projectId> --file <path/to/file.json>
`,
		Args: require.MaximumNArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if opts.filename == "" {
				_ = cmd.MarkFlagRequired(flag.Provider)
				_ = cmd.MarkFlagRequired(flag.Region)
				if len(args) == 0 {
					return errors.New("cluster name missing")
				}
			}
			if len(args) != 0 {
				opts.name = args[0]
			}
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTmpl),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
		Annotations: map[string]string{
			"args":            "clusterName",
			"clusterNameDesc": "Name of the cluster. The cluster name cannot be changed after the cluster is created. Cluster name can contain ASCII letters, numbers, and hyphens.",
		},
	}

	currentMDBVersion, _ := cli.DefaultMongoDBMajorVersion()

	const (
		defaultMembersSize = 3
		defaultDiskSize    = 2
		defaultShardSize   = 1
	)
	cmd.Flags().StringVar(&opts.provider, flag.Provider, "", usage.Provider)
	cmd.Flags().StringVarP(&opts.region, flag.Region, flag.RegionShort, "", usage.Region)
	cmd.Flags().IntVarP(&opts.members, flag.Members, flag.MembersShort, defaultMembersSize, usage.Members)
	cmd.Flags().StringVar(&opts.tier, flag.Tier, atlasM2, usage.Tier)
	cmd.Flags().Float64Var(&opts.diskSizeGB, flag.DiskSizeGB, defaultDiskSize, usage.DiskSizeGB)
	cmd.Flags().StringVar(&opts.mdbVersion, flag.MDBVersion, currentMDBVersion, usage.MDBVersion)
	cmd.Flags().BoolVar(&opts.backup, flag.Backup, false, usage.Backup)
	cmd.Flags().BoolVar(&opts.biConnector, flag.BIConnector, false, usage.BIConnector)
	cmd.Flags().StringVarP(&opts.filename, flag.File, flag.FileShort, "", usage.Filename)
	cmd.Flags().StringVar(&opts.clusterType, flag.Type, replicaSet, usage.ClusterTypes)
	cmd.Flags().IntVarP(&opts.shards, flag.Shards, flag.ShardsShort, defaultShardSize, usage.Shards)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagFilename(flag.File)

	return cmd
}
