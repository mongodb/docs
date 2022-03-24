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
package dbusers

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/convert"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/mongodb/mongocli/internal/validate"
	"github.com/spf13/cobra"
)

const describeTemplate = `USERNAME	DATABASE
{{.Username}}	{{.DatabaseName}}
`

type DescribeOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	store    store.DatabaseUserDescriber
	authDB   string
	username string
}

func (opts *DescribeOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *DescribeOpts) Run() error {
	r, err := opts.store.DatabaseUser(opts.authDB, opts.ConfigProjectID(), opts.username)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli atlas dbuser(s) describe <username> --projectId projectId --authDB authDB.
func DescribeBuilder() *cobra.Command {
	opts := new(DescribeOpts)
	cmd := &cobra.Command{
		Use:     "describe <name>",
		Short:   "Return a single Atlas database user for your project.",
		Args:    require.ExactArgs(1),
		Aliases: []string{"get"},
		Annotations: map[string]string{
			"args":         "username",
			"usernameDesc": "Username to retrieve from the MongoDB database.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.username = args[0]

			validAuthDBs := []string{convert.AdminDB, convert.ExternalAuthDB}
			if err := validate.FlagInSlice(opts.authDB, flag.AuthDB, validAuthDBs); err != nil {
				return err
			}

			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), describeTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.authDB, flag.AuthDB, convert.AdminDB, usage.AuthDB)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
