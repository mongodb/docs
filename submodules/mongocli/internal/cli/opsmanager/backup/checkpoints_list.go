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

package backup

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/mongodb/mongocli/internal/validate"
	"github.com/spf13/cobra"
)

const checkpointsTemplate = `ID	TIMESTAMP{{range .Results}}
{{.ID}}	{{.Timestamp}}{{end}}
`

type CheckpointsListOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	cli.ListOpts
	clusterID string
	store     store.CheckpointsLister
}

func (opts *CheckpointsListOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *CheckpointsListOpts) Run() error {
	listOpts := opts.NewListOptions()

	r, err := opts.store.Checkpoints(opts.ConfigProjectID(), opts.clusterID, listOpts)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli atlas backup(s) checkpoint(s) list <clusterId> [--projectId projectId].
func AtlasBackupsCheckpointsListBuilder() *cobra.Command {
	opts := new(CheckpointsListOpts)
	cmd := &cobra.Command{
		Use:     "list <clusterId>",
		Aliases: []string{"ls"},
		Short:   "List continuous backup checkpoints for your project.",
		Args:    require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if err := validate.ObjectID(args[0]); err != nil {
				return err
			}
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), checkpointsTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.clusterID = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().IntVar(&opts.PageNum, flag.Page, 0, usage.Page)
	cmd.Flags().IntVar(&opts.ItemsPerPage, flag.Limit, 0, usage.Limit)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
