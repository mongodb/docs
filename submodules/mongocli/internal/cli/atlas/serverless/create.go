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

package serverless

import (
	"context"

	atlas "go.mongodb.org/atlas/mongodbatlas"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

const providerName = "SERVERLESS"

type CreateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	instanceName string
	provider     string
	region       string
	store        store.ServerlessInstanceCreator
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplate = "Serverless instance {{.Name}} created.\n"

func (opts *CreateOpts) Run() error {
	r, err := opts.store.CreateServerlessInstance(opts.ConfigProjectID(), opts.newServerlessCreateRequestParams())
	if err != nil {
		return err
	}
	return opts.Print(r)
}

func (opts *CreateOpts) newServerlessCreateRequestParams() *atlas.ServerlessCreateRequestParams {
	return &atlas.ServerlessCreateRequestParams{
		Name: opts.instanceName,
		ProviderSettings: &atlas.ServerlessProviderSettings{
			BackingProviderName: opts.provider,
			ProviderName:        providerName,
			RegionName:          opts.region,
		},
	}
}

// mongocli atlas serverless|sl create <instanceName> --backingProviderName backingProviderName --providerName providerName --regionName regionName [--projectId projectId].
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{}
	cmd := &cobra.Command{
		Use:   "create <instanceName>",
		Short: "Creates one serverless instance in the specified project.",
		Long:  "Your API Key must have the Organization Owner or Project Owner role to successfully call this resource.",
		Args:  require.ExactArgs(1),
		Annotations: map[string]string{
			"args":             "instanceName",
			"instanceNameDesc": "Human-readable label that identifies your serverless instance.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.instanceName = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.provider, flag.Provider, "", usage.ServerlessProvider)
	cmd.Flags().StringVar(&opts.region, flag.Region, "", usage.ServerlessRegion)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Provider)
	_ = cmd.MarkFlagRequired(flag.Region)

	return cmd
}
