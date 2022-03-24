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

package disks

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

type ListsOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	cli.ListOpts
	cli.MetricsOpts
	host  string
	port  int
	store store.ProcessDisksLister
}

func (opts *ListsOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *ListsOpts) Run() error {
	listOpts := opts.NewListOptions()
	r, err := opts.store.ProcessDisks(opts.ConfigProjectID(), opts.host, opts.port, listOpts)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

var listTemplate = `{{range .Results}}
{{.PartitionName}}{{end}}
`

// mongocli atlas metric(s) disks lists <hostname:port>.
func ListBuilder() *cobra.Command {
	opts := &ListsOpts{}
	cmd := &cobra.Command{
		Use:     "list <hostname:port>",
		Long:    `To retrieve the hostname and port needed for this command, run mongocli atlas process list.`,
		Short:   "List available disks or disk partitions for a given host.",
		Aliases: []string{"ls"},
		Args:    require.ExactArgs(1),
		Annotations: map[string]string{
			"args":              "hostname:port",
			"requiredArgs":      "hostname:port",
			"hostname:portDesc": "Hostname and port number of the instance running the Atlas MongoDB process.",
		},
		Example: `This example lists the available disks for the host "atlas-lnmtkm-shard-00-00.ajlj3.mongodb.net:27017"
  $ mongocli atlas metrics disk ls atlas-lnmtkm-shard-00-00.ajlj3.mongodb.net:27017`,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), listTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			var err error
			opts.host, opts.port, err = cli.GetHostnameAndPort(args[0])
			if err != nil {
				return err
			}

			return opts.Run()
		},
	}

	cmd.Flags().IntVar(&opts.PageNum, flag.Page, cli.DefaultPage, usage.Page)
	cmd.Flags().IntVar(&opts.ItemsPerPage, flag.Limit, cli.DefaultPageLimit, usage.Limit)
	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
