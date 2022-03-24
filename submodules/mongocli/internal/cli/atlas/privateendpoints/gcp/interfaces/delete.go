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

package interfaces

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
	privateEndpointServiceID string
	store                    store.InterfaceEndpointDeleter
}

func (opts *DeleteOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *DeleteOpts) Run() error {
	return opts.Delete(opts.store.DeleteInterfaceEndpoint, opts.ConfigProjectID(), provider, opts.privateEndpointServiceID)
}

// mongocli atlas privateEndpoint(s) gcp interface(s) delete <endpointGroupId> --endpointServiceId endpointServiceId [--projectId projectId].
func DeleteBuilder() *cobra.Command {
	opts := &DeleteOpts{
		DeleteOpts: cli.NewDeleteOpts("Interface endpoint '%s' deleted\n", "Interface endpoint not deleted"),
	}
	cmd := &cobra.Command{
		Use:     "delete <endpointGroupId>",
		Aliases: []string{"rm"},
		Args:    require.ExactArgs(1),
		Short:   "Delete a specific GCP private endpoint interface for your project.",
		Annotations: map[string]string{
			"args":                "endpointGroupId",
			"requiredArgs":        "endpointGroupId",
			"endpointGroupIdDesc": "Unique identifier for the endpoint group.",
		},
		Example: `$ mongocli atlas privateEndpoints gcp interfaces delete endpoint-1 --endpointServiceId 61eaca605af86411903de1dd`,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context()))
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.Entry = args[0]
			if err := opts.Prompt(); err != nil {
				return err
			}
			return opts.Run()
		},
	}
	cmd.Flags().BoolVar(&opts.Confirm, flag.Force, false, usage.Force)
	cmd.Flags().StringVar(&opts.privateEndpointServiceID, flag.EndpointServiceID, "", usage.EndpointServiceID)
	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	_ = cmd.MarkFlagRequired(flag.EndpointServiceID)
	return cmd
}
