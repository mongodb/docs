// Copyright 2022 MongoDB Inc
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

package gcp

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

type DeleteOpts struct {
	cli.GlobalOpts
	*cli.DeleteOpts
	store store.PrivateEndpointDeleter
}

func (opts *DeleteOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var successDeleteTemplate = "Private endpoint '%s' deleted\n"
var failDeleteTemplate = "Private endpoint not deleted"

func (opts *DeleteOpts) Run() error {
	return opts.Delete(opts.store.DeletePrivateEndpoint, opts.ConfigProjectID(), provider)
}

// mongocli atlas privateEndpoints gcp delete <privateEndpointId> [--force][--projectId projectId].
func DeleteBuilder() *cobra.Command {
	opts := &DeleteOpts{
		DeleteOpts: cli.NewDeleteOpts(successDeleteTemplate, failDeleteTemplate),
	}
	cmd := &cobra.Command{
		Use:     "delete <privateEndpointId>",
		Aliases: []string{"rm"},
		Short:   "Delete a GCP private endpoint for your project.",
		Annotations: map[string]string{
			"args":                  "privateEndpointId",
			"requiredArgs":          "privateEndpointId",
			"privateEndpointIdDesc": "Unique 22-character alphanumeric string that identifies the private endpoint.",
		},
		Example: `$ mongocli atlas privateEndpoint gcp delete vpce-abcdefg0123456789 --force`,
		Args:    require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if err := opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context())); err != nil {
				return err
			}
			opts.Entry = args[0]
			return opts.Prompt()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().BoolVar(&opts.Confirm, flag.Force, false, usage.Force)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	return cmd
}
