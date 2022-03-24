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

package aws

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/atlas/mongodbatlas"
)

type CreateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	privateEndpointID string
	comment           string
	store             store.DataLakePrivateEndpointCreator
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplate = "Data Lake private endpoint '{{ (index .Results 0).EndpointID }}' created.\n"

func (opts *CreateOpts) Run() error {
	r, err := opts.store.DataLakeCreatePrivateEndpoint(opts.ConfigProjectID(), opts.newPrivateLinkEndpointDataLake())
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *CreateOpts) newPrivateLinkEndpointDataLake() *mongodbatlas.PrivateLinkEndpointDataLake {
	createRequest := &mongodbatlas.PrivateLinkEndpointDataLake{
		Comment:    opts.comment,
		EndpointID: opts.privateEndpointID,
		Provider:   provider,
		Type:       privateEndpointType,
	}
	return createRequest
}

// mongocli atlas privateEndpoint(s) dataLake aws create [--privateEndpointId privateEndpointId] [--comment comment] --projectId projectId.
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{}
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create a new Data Lake private endpoint for your project.",
		Long: `When you run this command:
- If the endpoint ID already exists and there is no change to the associated comment, Atlas Data Lake makes no change to the endpoint ID list.
- If the endpoint ID already exists and there is a change to the associated comment, Atlas Data Lake updates the comment value only in the endpoint ID list.
- If the endpoint ID doesn't exist, Atlas Data Lake appends the new endpoint to the list of endpoints in the endpoint ID list.
Your API key must have the GROUP_ATLAS_ADMIN (Project Owner) role to create a private endpoint.`,
		Args: require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.privateEndpointID, flag.PrivateEndpointID, "", usage.PrivateEndpointID)
	cmd.Flags().StringVar(&opts.comment, flag.Comment, "", usage.Comment)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.PrivateEndpointID)

	return cmd
}
