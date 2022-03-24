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

package teams

import (
	"context"
	"errors"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

const describeTemplate = `ID	NAME
{{.ID}}	{{.Name}}
`

type DescribeOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	store store.TeamDescriber
	name  string
	id    string
}

func (opts *DescribeOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *DescribeOpts) Run() error {
	var r interface{}
	var err error

	if opts.name != "" {
		r, err = opts.store.TeamByName(opts.ConfigOrgID(), opts.name)
	}

	if opts.id != "" {
		r, err = opts.store.TeamByID(opts.ConfigOrgID(), opts.id)
	}

	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *DescribeOpts) validate() error {
	if opts.id == "" && opts.name == "" {
		return errors.New("must supply one of 'id' or 'username'")
	}

	if opts.id != "" && opts.name != "" {
		return errors.New("cannot supply both 'id' and 'username'")
	}

	return nil
}

// mongocli iam team(s) describe --id id --name name --orgId orgId.
func DescribeBuilder() *cobra.Command {
	opts := &DescribeOpts{}
	cmd := &cobra.Command{
		Use:     "describe",
		Aliases: []string{"get"},
		Example: `  
  Describe a team by ID
  $ mongocli iam team(s) describe --id teamId --orgId <orgId>

  Describe a team by Name
  $ mongocli iam team(s) describe --name teamName --orgId <orgId>
`,
		Short: "Get a team in an organization.",
		Args:  require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateOrgID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), describeTemplate),
				opts.validate,
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.name, flag.Name, "", usage.TeamName)
	cmd.Flags().StringVar(&opts.id, flag.ID, "", usage.TeamID)

	cmd.Flags().StringVar(&opts.OrgID, flag.OrgID, "", usage.OrgID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
