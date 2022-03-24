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

type UpdateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	name       string
	tier       string
	diskSizeGB float64
	mdbVersion string
	filename   string
	fs         afero.Fs
	store      store.AtlasClusterGetterUpdater
}

func (opts *UpdateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var updateTmpl = "Updating cluster '{{.Name}}'.\n"

func (opts *UpdateOpts) Run() error {
	cluster, err := opts.cluster()
	if err != nil {
		return err
	}
	if opts.filename == "" {
		opts.patchOpts(cluster)
	}

	r, err := opts.store.UpdateCluster(opts.ConfigProjectID(), opts.name, cluster)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *UpdateOpts) cluster() (*atlas.AdvancedCluster, error) {
	var cluster *atlas.AdvancedCluster
	if opts.filename != "" {
		err := file.Load(opts.fs, opts.filename, &cluster)
		if err != nil {
			return nil, err
		}
		if opts.name == "" {
			opts.name = cluster.Name
		}
		return cluster, nil
	}
	return opts.store.AtlasCluster(opts.ProjectID, opts.name)
}

func (opts *UpdateOpts) patchOpts(out *atlas.AdvancedCluster) {
	RemoveReadOnlyAttributes(out)
	if opts.mdbVersion != "" {
		out.MongoDBMajorVersion = opts.mdbVersion
	}
	if opts.diskSizeGB > 0 {
		out.DiskSizeGB = &opts.diskSizeGB
	}
	if opts.tier != "" {
		opts.addTierToAdvancedCluster(out)
	}
	AddLabel(out, atlas.Label{
		Key:   labelKey,
		Value: labelValue,
	})
}

func (opts *UpdateOpts) addTierToAdvancedCluster(out *atlas.AdvancedCluster) {
	for _, replicationSpec := range out.ReplicationSpecs {
		for _, regionConf := range replicationSpec.RegionConfigs {
			regionConf.ReadOnlySpecs.InstanceSize = opts.tier
			regionConf.AnalyticsSpecs.InstanceSize = opts.tier
			regionConf.ElectableSpecs.InstanceSize = opts.tier
		}
	}
}

// mongocli atlas cluster(s) update [clusterName] --projectId projectId [--tier M#] [--diskSizeGB N] [--mdbVersion].
func UpdateBuilder() *cobra.Command {
	opts := &UpdateOpts{
		fs: afero.NewOsFs(),
	}
	cmd := &cobra.Command{
		Use:   "update [clusterName]",
		Short: "Update a MongoDB cluster.",
		Example: `
  Update tier for a cluster
  $ mongocli atlas cluster update <clusterName> --projectId <projectId> --tier M50

  Update disk size for a cluster
  $ mongocli atlas cluster update <clusterName> --projectId <projectId> --diskSizeGB 20

  Update MongoDB version for a cluster
  $ mongocli atlas cluster update <clusterName> --projectId <projectId> --mdbVersion 4.2`,
		Args: require.MaximumNArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if len(args) != 0 {
				opts.name = args[0]
			}
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), updateTmpl),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
		Annotations: map[string]string{
			"args":            "clusterName",
			"clusterNameDesc": "Name of the cluster to update.",
		},
	}

	cmd.Flags().StringVar(&opts.tier, flag.Tier, "", usage.Tier)
	cmd.Flags().Float64Var(&opts.diskSizeGB, flag.DiskSizeGB, 0, usage.DiskSizeGB)
	cmd.Flags().StringVar(&opts.mdbVersion, flag.MDBVersion, "", usage.MDBVersion)
	cmd.Flags().StringVarP(&opts.filename, flag.File, flag.FileShort, "", usage.Filename)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagFilename(flag.File)

	return cmd
}
