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

const newRelicIntegrationType = "NEW_RELIC"

type NewRelicOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	licenseKey string
	accountID  string
	writeToken string
	readToken  string
	store      store.IntegrationCreator
}

func (opts *NewRelicOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplateNewRelic = "New Relic integration configured.\n"

func (opts *NewRelicOpts) Run() error {
	r, err := opts.store.CreateIntegration(opts.ConfigProjectID(), newRelicIntegrationType, opts.newNewRelicIntegration())
	if err != nil {
		return err
	}
	return opts.Print(r)
}

func (opts *NewRelicOpts) newNewRelicIntegration() *atlas.ThirdPartyIntegration {
	return &atlas.ThirdPartyIntegration{
		Type:       newRelicIntegrationType,
		LicenseKey: opts.licenseKey,
		AccountID:  opts.accountID,
		WriteToken: opts.writeToken,
		ReadToken:  opts.readToken,
	}
}

// mongocli atlas integration(s) create NEW_RELIC --licenceKey licenceKey --accountId accountId --writeToken writeToken --readToken readToken [--projectId projectId].
func NewRelicBuilder() *cobra.Command {
	opts := &NewRelicOpts{}
	cmd := &cobra.Command{
		Use:     "NEW_RELIC",
		Aliases: []string{"new_relic", "newRelic"},
		Short:   "Create or update the New Relic integration.",
		Args:    require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplateNewRelic),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.licenseKey, flag.LicenceKey, "", usage.LicenceKey)
	cmd.Flags().StringVar(&opts.accountID, flag.AccountID, "", usage.NewRelicAccountID)
	cmd.Flags().StringVar(&opts.writeToken, flag.WriteToken, "", usage.WriteToken)
	cmd.Flags().StringVar(&opts.readToken, flag.ReadToken, "", usage.ReadToken)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.LicenceKey)
	_ = cmd.MarkFlagRequired(flag.AccountID)
	_ = cmd.MarkFlagRequired(flag.WriteToken)
	_ = cmd.MarkFlagRequired(flag.ReadToken)

	return cmd
}
