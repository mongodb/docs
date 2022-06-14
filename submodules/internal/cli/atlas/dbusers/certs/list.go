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

package certs

import (
	"context"

	"github.com/mongodb/mongodb-atlas-cli/internal/cli"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/require"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/flag"
	"github.com/mongodb/mongodb-atlas-cli/internal/store"
	"github.com/mongodb/mongodb-atlas-cli/internal/usage"
	"github.com/spf13/cobra"
)

type ListOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	cli.ListOpts
	store    store.DBUserCertificateLister
	username string
}

func (opts *ListOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *ListOpts) Run() error {
	r, err := opts.store.DBUserCertificates(opts.ConfigProjectID(), opts.username, nil)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

var listTemplate = `ID USERNAME	SUBJECT CREATED AT{{range .}}
{{.ID}}	{{.Username}}	{{.Subject}}	{{.CreatedAt}}{{end}}
`

// mongocli atlas dbuser(s) certs list|ls <username> [--projectId projectId].
func ListBuilder() *cobra.Command {
	opts := &ListOpts{}
	cmd := &cobra.Command{
		Use:     "list <username>",
		Aliases: []string{"ls"},
		Short:   "List of all Atlas-managed, unexpired certificates for a database user.",
		Args:    require.ExactArgs(1),
		Annotations: map[string]string{
			"args":         "username",
			"usernameDesc": "Username of the database user for whom you want to list Atlas-managed certificates.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.username = args[0]

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

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
