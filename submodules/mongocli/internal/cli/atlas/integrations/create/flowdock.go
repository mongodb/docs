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

const flowdockType = "FLOWDOCK"

type FlowdockOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	apiToken string
	flowName string
	orgName  string
	store    store.IntegrationCreator
}

func (opts *FlowdockOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplateFlowDock = "Flowdock integration configured.\n"

func (opts *FlowdockOpts) Run() error {
	r, err := opts.store.CreateIntegration(opts.ConfigProjectID(), flowdockType, opts.newFlowdockIntegration())
	if err != nil {
		return err
	}
	return opts.Print(r)
}

func (opts *FlowdockOpts) newFlowdockIntegration() *atlas.ThirdPartyIntegration {
	return &atlas.ThirdPartyIntegration{
		Type:     flowdockType,
		OrgName:  opts.orgName,
		FlowName: opts.flowName,
		APIToken: opts.apiToken,
	}
}

// mongocli atlas integration(s) create FLOWDOCK --apiToken apiToken --orgName orgName --flowName --flowName [--projectId projectId].
func FlowdockBuilder() *cobra.Command {
	opts := &FlowdockOpts{}
	cmd := &cobra.Command{
		Use:     flowdockType,
		Aliases: []string{"flowdock"},
		Short:   "Create or update the Flowdock integration.",
		Args:    require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplateFlowDock),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.flowName, flag.FlowName, "", usage.FlowName)
	cmd.Flags().StringVar(&opts.apiToken, flag.APIToken, "", usage.IntegrationAPIToken)
	cmd.Flags().StringVar(&opts.orgName, flag.OrgName, "", usage.OrgName)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.FlowName)
	_ = cmd.MarkFlagRequired(flag.APIToken)
	_ = cmd.MarkFlagRequired(flag.OrgName)

	return cmd
}
