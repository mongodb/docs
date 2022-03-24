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

package create

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

const victorOpsIntegrationType = "VICTOR_OPS"

type VictorOpsOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	apiKey     string
	routingKey string
	store      store.IntegrationCreator
}

func (opts *VictorOpsOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplateVictorOps = "Victor Ops integration configured.\n"

func (opts *VictorOpsOpts) Run() error {
	r, err := opts.store.CreateIntegration(opts.ConfigProjectID(), victorOpsIntegrationType, opts.newVictorOpsIntegration())
	if err != nil {
		return err
	}
	return opts.Print(r)
}

func (opts *VictorOpsOpts) newVictorOpsIntegration() *atlas.ThirdPartyIntegration {
	return &atlas.ThirdPartyIntegration{
		Type:       victorOpsIntegrationType,
		APIKey:     opts.apiKey,
		RoutingKey: opts.routingKey,
	}
}

// mongocli atlas integration(s) create VICTOR_OPS --apiKey apiKey --routingKey routingKey [--projectId projectId].
func VictorOpsBuilder() *cobra.Command {
	opts := &VictorOpsOpts{}
	cmd := &cobra.Command{
		Use:     victorOpsIntegrationType,
		Aliases: []string{"victor_ops", "victorOps"},
		Short:   "Create or update the VictorOps integrations",
		Args:    require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplateVictorOps),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.apiKey, flag.APIKey, "", usage.APIKey)
	cmd.Flags().StringVar(&opts.routingKey, flag.RoutingKey, "", usage.RoutingKey)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.APIKey)
	_ = cmd.MarkFlagRequired(flag.RoutingKey)

	return cmd
}
