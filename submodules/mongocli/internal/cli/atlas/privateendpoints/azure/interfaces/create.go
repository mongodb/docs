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
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type CreateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	store                    store.InterfaceEndpointCreator
	privateEndpointID        string
	interfaceEndpointID      string
	privateEndpointIPAddress string
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplate = "Interface endpoint '{{.PrivateEndpointResourceID}}' created.\n"

func (opts *CreateOpts) Run() error {
	r, err := opts.store.CreateInterfaceEndpoint(opts.ConfigProjectID(), provider, opts.interfaceEndpointID, opts.newInterfaceEndpointConnection())
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *CreateOpts) newInterfaceEndpointConnection() *atlas.InterfaceEndpointConnection {
	return &atlas.InterfaceEndpointConnection{
		ID:                       opts.privateEndpointID,
		PrivateEndpointIPAddress: opts.privateEndpointIPAddress,
	}
}

// mongocli atlas privateEndpoint(s)|privateendpoint(s) azure interface(s) create <atlasPrivateEndpointId> [--privateEndpointId privateEndpointID][--privateEndpointIPAddress privateEndpointIPAddress][--projectId projectId].
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{}
	cmd := &cobra.Command{
		Use:     "create <atlasPrivateEndpointId>",
		Aliases: []string{"add"},
		Short:   "Add a new Azure interface to a private endpoint.",
		Args:    require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.interfaceEndpointID = args[0]
			return opts.Run()
		},
	}
	cmd.Flags().StringVar(&opts.privateEndpointID, flag.PrivateEndpointID, "", usage.PrivateEndpointIDAzure)
	cmd.Flags().StringVar(&opts.privateEndpointIPAddress, flag.PrivateEndpointIPAddress, "", usage.PrivateEndpointIPAddressAzure)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.PrivateEndpointID)
	_ = cmd.MarkFlagRequired(flag.PrivateEndpointIPAddress)

	return cmd
}
