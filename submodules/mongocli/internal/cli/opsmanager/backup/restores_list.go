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

const restoresTemplate = `ID	TIMESTAMP	STATUS{{range .Results}}
{{.ID}}	{{.Timestamp.Date}}	{{.StatusName}}{{end}}
`

type RestoresListOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	cli.ListOpts
	clusterID string
	store     store.ContinuousJobLister
}

func (opts *RestoresListOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *RestoresListOpts) Run() error {
	listOpts := opts.NewListOptions()
	r, err := opts.store.ContinuousRestoreJobs(opts.ConfigProjectID(), opts.clusterID, listOpts)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli atlas backup(s) restore(s) job(s) list <clusterId> [--page N] [--limit N].
func RestoresListBuilder() *cobra.Command {
	opts := new(RestoresListOpts)
	cmd := &cobra.Command{
		Use:     "list <clusterId>",
		Aliases: []string{"ls"},
		Short:   "Lists restore jobs for a project and cluster.",
		Args:    require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), restoresTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			if err := validate.ObjectID(args[0]); err != nil {
				return err
			}
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
