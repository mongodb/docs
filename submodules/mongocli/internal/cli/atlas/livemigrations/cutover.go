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

var cutoverTemplate = "Cutover process '{{.ID}}' successfully started.\n"

type CutoverOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	store           store.LiveMigrationCutoverCreator
	liveMigrationID string
}

func (opts *CutoverOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *CutoverOpts) Run() error {
	r, err := opts.store.CreateLiveMigrationCutover(opts.ConfigOrgID(), opts.liveMigrationID)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli atlas liveMigrations|lm cutover [--liveMigrationID liveMigrationId] [--projectId projectId].
func CutoverBuilder() *cobra.Command {
	opts := &CutoverOpts{}
	cmd := &cobra.Command{
		Use:   "cutover",
		Short: "Start the cutover and confirm when the cutover completes. When the cutover completes, the application completes the live migration process and stops synchronizing with the source cluster.",
		Long:  "Your API Key must have the Organization Owner role to successfully run this command.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateOrgID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), cutoverTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}
	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVar(&opts.liveMigrationID, flag.LiveMigrationID, "", usage.LiveMigrationID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.LiveMigrationID)

	return cmd
}
