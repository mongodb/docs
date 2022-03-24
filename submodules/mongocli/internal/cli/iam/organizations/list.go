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

package organizations

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

const listTemplate = `ID	NAME{{range .Results}}
{{.ID}}	{{.Name}}{{end}}
`

type ListOpts struct {
	cli.ListOpts
	cli.OutputOpts
	store              store.OrganizationLister
	name               string
	includeDeletedOrgs bool
}

func (opts *ListOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *ListOpts) Run() error {
	r, err := opts.store.Organizations(opts.newOrganizationListOptions())
	if err != nil {
		return err
	}
	return opts.Print(r)
}

func (opts *ListOpts) newOrganizationListOptions() *atlas.OrganizationsListOptions {
	return &atlas.OrganizationsListOptions{
		Name:               opts.name,
		IncludeDeletedOrgs: &opts.includeDeletedOrgs,
		ListOptions:        *opts.NewListOptions(),
	}
}

// mongocli iam organizations(s) list --name --includeDeletedOrgs.
func ListBuilder() *cobra.Command {
	opts := new(ListOpts)
	opts.Template = listTemplate
	cmd := &cobra.Command{
		Use:     "list",
		Aliases: []string{"ls"},
		Short:   "List organizations.",
		Args:    require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			return opts.initStore(cmd.Context())()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.name, flag.Name, "", usage.OrgNameFilter)
	cmd.Flags().BoolVar(&opts.includeDeletedOrgs, flag.IncludeDeleted, false, usage.OrgIncludeDeleted)

	cmd.Flags().IntVar(&opts.PageNum, flag.Page, cli.DefaultPage, usage.Page)
	cmd.Flags().IntVar(&opts.ItemsPerPage, flag.Limit, cli.DefaultPageLimit, usage.Limit)

	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
