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

package alerts

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type ListOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	cli.ListOpts
	status string
	store  store.AlertLister
}

func (opts *ListOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var listTemplate = `ID	TYPE	STATUS{{range .Results}}
{{.ID}}	{{.EventTypeName}}	{{.Status}}{{end}}
`

func (opts *ListOpts) Run() error {
	listOpts := opts.newAlertsListOptions()
	r, err := opts.store.Alerts(opts.ConfigProjectID(), listOpts)

	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *ListOpts) newAlertsListOptions() *atlas.AlertsListOptions {
	o := &atlas.AlertsListOptions{
		Status:      opts.status,
		ListOptions: *opts.NewListOptions(),
	}

	return o
}

// mongocli atlas alerts list [--status status] [--projectId projectId] [--page N] [--limit N].
func ListBuilder() *cobra.Command {
	opts := new(ListOpts)
	cmd := &cobra.Command{
		Use:   "list",
		Short: "Retrieves all alerts for the specified Atlas project.",
		Example: `  
  This example uses the "mongocli atlas alerts list" command to retrieve all alerts that occurred for the specified project. It uses the profile named "myprofile" for accessing Atlas.
  $ mongocli atlas alerts list --projectId 5df90590f10fab5e33de2305 \
  -o json --profile myprofile
`,
		Aliases: []string{"ls"},
		Args:    require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), listTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}
	cmd.Flags().IntVar(&opts.PageNum, flag.Page, 0, usage.Page)
	cmd.Flags().IntVar(&opts.ItemsPerPage, flag.Limit, 0, usage.Limit)
	cmd.Flags().StringVar(&opts.status, flag.Status, "", usage.Status)
	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)
	return cmd
}
