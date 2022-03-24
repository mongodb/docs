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

package apikeys

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

type AssignOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	id    string
	roles []string
	store store.ProjectAPIKeyAssigner
}

func (opts *AssignOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *AssignOpts) newAssignAPIKey() *atlas.AssignAPIKey {
	return &atlas.AssignAPIKey{
		Roles: opts.roles,
	}
}

var updateTemplate = "API Key successfully assigned.\n"

func (opts *AssignOpts) Run() error {
	err := opts.store.AssignProjectAPIKey(opts.ConfigProjectID(), opts.id, opts.newAssignAPIKey())
	if err != nil {
		return err
	}
	return opts.Print(nil)
}

// mongocli iam project(s) apiKey(s)|apikey(s) assign <ID> [--role role][--projectId projectId].
func AssignBuilder() *cobra.Command {
	opts := new(AssignOpts)
	cmd := &cobra.Command{
		Use:     "assign <ID>",
		Aliases: []string{"update"},
		Args:    require.ExactArgs(1),
		Short:   "Assign an API Key to a project.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), updateTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.id = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().StringSliceVar(&opts.roles, flag.Role, []string{}, usage.APIKeyRoles)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	_ = cmd.MarkFlagRequired(flag.Role)

	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
