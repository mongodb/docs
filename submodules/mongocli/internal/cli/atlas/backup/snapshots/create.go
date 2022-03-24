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

package snapshots

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/atlas/mongodbatlas"
)

type CreateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	store           store.SnapshotsCreator
	clusterName     string
	desc            string
	retentionInDays int
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplate = "Snapshot '{{.ID}}' created.\n"

func (opts *CreateOpts) Run() error {
	createRequest := opts.newCloudProviderSnapshot()

	r, err := opts.store.CreateSnapshot(opts.ConfigProjectID(), opts.clusterName, createRequest)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *CreateOpts) newCloudProviderSnapshot() *mongodbatlas.CloudProviderSnapshot {
	createRequest := &mongodbatlas.CloudProviderSnapshot{
		RetentionInDays: opts.retentionInDays,
		Description:     opts.desc,
	}
	return createRequest
}

// mongocli atlas backup snapshots create|take clusterName --desc description --retention days [--projectId projectId].
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{}
	cmd := &cobra.Command{
		Use:     "create <clusterName>",
		Aliases: []string{"take"},
		Short:   "Create a backup snapshot for your project and cluster.",
		Args:    require.ExactArgs(1),
		Annotations: map[string]string{
			"args":            "clusterName",
			"clusterNameDesc": "Name of the Atlas cluster whose snapshot you want to restore.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.clusterName = args[0]
			return opts.Run()
		},
	}
	cmd.Flags().StringVar(&opts.desc, flag.Description, "", usage.SnapshotDescription)
	cmd.Flags().IntVar(&opts.retentionInDays, flag.Retention, 1, usage.PrivateEndpointRegion)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Description)

	return cmd
}
