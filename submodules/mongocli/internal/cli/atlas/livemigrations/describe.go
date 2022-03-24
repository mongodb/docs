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

package livemigrations

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

type DescribeOpts struct {
	cli.OutputOpts
	cli.GlobalOpts
	liveMigrationID string
	store           store.LiveMigrationDescriber
}

func (opts *DescribeOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var describeTemplate = `ID	PROJECT ID	SOURCE PROJECT ID	STATUS
{{.ID}}	{{.Destination.GroupID}}	{{.Source.GroupID}}	{{.Status}}`

func (opts *DescribeOpts) Run() error {
	r, err := opts.store.LiveMigrationDescribe(opts.ConfigProjectID(), opts.liveMigrationID)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli atlas liveMigrations|lm describe --liveMigrationId <liveMigrationId> [--projectId projectId].
func DescribeBuilder() *cobra.Command {
	opts := &DescribeOpts{}
	cmd := &cobra.Command{
		Use:     "describe",
		Aliases: []string{"get"},
		Short:   "Return one migration job.",
		Long:    "Your API Key must have the Organization Owner role to successfully run this command.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), describeTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.liveMigrationID, flag.LiveMigrationID, "", usage.LiveMigrationID)

	_ = cmd.MarkFlagRequired(flag.LiveMigrationID)

	return cmd
}
