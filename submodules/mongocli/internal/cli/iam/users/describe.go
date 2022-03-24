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

package users

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

const describeTemplate = `ID	FIRST NAME	LAST NAME	USERNAME	EMAIL
{{.ID}}	{{.FirstName}}	{{.LastName}}	{{.Username}}	{{.EmailAddress}}
`

type DescribeOpts struct {
	cli.OutputOpts
	store    store.UserDescriber
	username string
	id       string
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

	if opts.username != "" {
		r, err = opts.store.UserByName(opts.username)
	}

	if opts.id != "" {
		r, err = opts.store.UserByID(opts.id)
	}

	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *DescribeOpts) validate() error {
	if opts.id == "" && opts.username == "" {
		return errors.New("must supply one of 'id' or 'username'")
	}

	if opts.id != "" && opts.username != "" {
		return errors.New("cannot supply both 'id' and 'username'")
	}

	return nil
}

type cmdOpt func() error

// PreRunE is a function to call before running the command,
// It calls any additional function pass as a callback.
func PreRunE(cbs ...cmdOpt) error {
	for _, f := range cbs {
		if err := f(); err != nil {
			return err
		}
	}
	return nil
}

// mongocli iam user(s) describe --id id --username USERNAME.
func DescribeBuilder() *cobra.Command {
	opts := &DescribeOpts{}
	cmd := &cobra.Command{
		Use:     "describe",
		Aliases: []string{"get"},
		Example: `  
  Describe a user by ID
  $ mongocli iam users describe --id <id>

  Describe a user by username
  $ mongocli iam users describe --username <username>
`,
		Short: "Get a user by username or id.",
		Args:  require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return PreRunE(
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), describeTemplate),
				opts.validate,
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.username, flag.Username, "", usage.Username)
	cmd.Flags().StringVar(&opts.id, flag.ID, "", usage.UserID)

	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
