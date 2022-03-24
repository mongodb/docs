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

const webhookIntegrationType = "WEBHOOK"

type WebhookOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	url    string
	secret string
	store  store.IntegrationCreator
}

func (opts *WebhookOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplateWebhook = "Webhook integration configured.\n"

func (opts *WebhookOpts) Run() error {
	r, err := opts.store.CreateIntegration(opts.ConfigProjectID(), webhookIntegrationType, opts.newWebhookIntegration())
	if err != nil {
		return err
	}
	return opts.Print(r)
}

func (opts *WebhookOpts) newWebhookIntegration() *atlas.ThirdPartyIntegration {
	return &atlas.ThirdPartyIntegration{
		Type:   webhookIntegrationType,
		URL:    opts.url,
		Secret: opts.secret,
	}
}

// mongocli atlas integration(s) create WEBHOOK --url url --secret secret [--projectId projectId].
func WebhookBuilder() *cobra.Command {
	opts := &WebhookOpts{}
	cmd := &cobra.Command{
		Use:     webhookIntegrationType,
		Aliases: []string{"webhook"},
		Short:   "Create or update the Webhook integration",
		Args:    require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplateWebhook),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.url, flag.URL, "", usage.URL)
	cmd.Flags().StringVar(&opts.secret, flag.Secret, "", usage.Secret)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.URL)
	_ = cmd.MarkFlagRequired(flag.Secret)

	return cmd
}
