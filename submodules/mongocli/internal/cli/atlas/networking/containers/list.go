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

package containers

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
	provider string
	store    store.ContainersLister
}

func (opts *ListOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var listTemplate = `ID	PROVIDER	REGION	ATLAS CIDR	PROVISIONED{{range .}}
{{.ID}}	{{.ProviderName}}	{{if .RegionName}}{{.RegionName}}{{else}}{{.Region}}{{end}}	{{.AtlasCIDRBlock}}	{{.Provisioned}}{{end}}
`

func (opts *ListOpts) Run() error {
	var r []atlas.Container
	var err error
	if opts.provider == "" {
		r, err = opts.store.AllContainers(opts.ConfigProjectID(), opts.NewListOptions())
	} else {
		listOpts := opts.newContainerListOptions()
		r, err = opts.store.ContainersByProvider(opts.ConfigProjectID(), listOpts)
	}
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *ListOpts) newContainerListOptions() *atlas.ContainersListOptions {
	return &atlas.ContainersListOptions{
		ProviderName: opts.provider,
		ListOptions:  *opts.NewListOptions(),
	}
}

// mongocli atlas networking container(s) list [--projectId projectId] [--page N] [--limit N] [--minDate minDate] [--maxDate maxDate].
func ListBuilder() *cobra.Command {
	opts := &ListOpts{}
	cmd := &cobra.Command{
		Use:     "list",
		Short:   "List network peering containers in an Atlas project.",
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
	cmd.Flags().StringVar(&opts.provider, flag.Provider, "", usage.Provider)
	cmd.Flags().IntVar(&opts.PageNum, flag.Page, cli.DefaultPage, usage.Page)
	cmd.Flags().IntVar(&opts.ItemsPerPage, flag.Limit, cli.DefaultPageLimit, usage.Limit)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
