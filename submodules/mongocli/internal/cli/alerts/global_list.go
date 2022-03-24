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

type GlobalListOpts struct {
	cli.ListOpts
	cli.OutputOpts
	status string
	store  store.GlobalAlertLister
}

func (opts *GlobalListOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *GlobalListOpts) Run() error {
	alertOpts := opts.newAlertsListOptions()
	r, err := opts.store.GlobalAlerts(alertOpts)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *GlobalListOpts) newAlertsListOptions() *atlas.AlertsListOptions {
	return &atlas.AlertsListOptions{
		Status:      opts.status,
		ListOptions: *opts.NewListOptions(),
	}
}

// mongocli om|cm alert(s) global list [--status status].
func GlobalListBuilder() *cobra.Command {
	opts := &GlobalListOpts{}
	opts.Template = listTemplate
	cmd := &cobra.Command{
		Use:     "list",
		Short:   "Returns all global alerts for the specified Ops Manager project.",
		Aliases: []string{"ls"},
		Args:    require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			return opts.initStore(cmd.Context())()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().IntVar(&opts.PageNum, flag.Page, 0, usage.Page)
	cmd.Flags().IntVar(&opts.ItemsPerPage, flag.Limit, 0, usage.Limit)
	cmd.Flags().StringVar(&opts.status, flag.Status, "", usage.Status)

	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
