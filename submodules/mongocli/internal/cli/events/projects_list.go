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
package events

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

type projectListOpts struct {
	EventListOpts
	cli.GlobalOpts
	cli.OutputOpts
	store store.ProjectEventLister
}

func (opts *projectListOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *projectListOpts) Run() error {
	listOpts := opts.newEventListOptions()

	var r *atlas.EventResponse
	var err error
	r, err = opts.store.ProjectEvents(opts.ConfigProjectID(), listOpts)

	if err != nil {
		return err
	}

	return opts.Print(r)
}

// ProjectListBuilder
// 	mongocli atlas event(s) list
// [--page N]
// [--limit N]
// [--minDate minDate]
// [--maxDate maxDate].
func ProjectListBuilder() *cobra.Command {
	opts := &projectListOpts{}
	cmd := &cobra.Command{
		Use:     "list",
		Short:   "Return all events for a project.",
		Long:    "Your API Key must have the Project Read Only role to successfully call this resource.",
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

	cmd.Flags().StringSliceVar(&opts.EventType, flag.Type, nil, usage.Event)
	cmd.Flags().StringVar(&opts.MaxDate, flag.MaxDate, "", usage.MaxDate)
	cmd.Flags().StringVar(&opts.MinDate, flag.MinDate, "", usage.MinDate)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}

func ProjectsBuilder() *cobra.Command {
	const use = "projects"
	cmd := &cobra.Command{
		Use:     use,
		Short:   "Project operations.",
		Long:    "List projects events.",
		Aliases: cli.GenerateAliases(use),
	}
	cmd.AddCommand(
		ProjectListBuilder(),
	)

	return cmd
}
