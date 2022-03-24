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

package integrations

import (
	"context"
	"strings"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

type DescribeOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	integrationType string
	store           store.IntegrationDescriber
}

func (opts *DescribeOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var describeTemplateSlack = `TYPE	API TOKEN	TEAM	CHANNEL
{{.Type}}	{{.APIToken}}	{{.TeamName}}	{{.ChannelName}}
`
var describeTemplateDatadogOpsGenie = `TYPE	API KEY	REGION
{{.Type}}	{{.APIKey}}	{{.Region}}
`
var describeTemplateFlowdog = `TYPE	API TOKEN	FLOW NAME	ORGANIZATION
{{.Type}}	{{.APIToken}}	{{.FlowName}}	{{.OrgName}}
`
var describeTemplateNewRelic = `TYPE	ACCOUNT ID	LICENSE KEY	WRITE TOKEN	READ TOKEN
{{.Type}}	{{.AccountID}}	{{.LicenseKey}}	{{.WriteToken}}	{{.ReadToken}}
`
var describeTemplatePagerDuty = `TYPE	SERVICE KEY
{{.Type}}	{{.ServiceKey}}
`
var describeTemplateVictorOps = `TYPE	API KEY	ROUTING KEY
{{.Type}}	{{.APIKey}}	{{.RoutingKey}}
`
var describeTemplateWebhook = `TYPE	URL	SECRET
{{.Type}}	{{.URL}}	{{.Secret}}
`

func (opts *DescribeOpts) Run() error {
	r, err := opts.store.Integration(opts.ConfigProjectID(), opts.integrationType)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *DescribeOpts) template() string {
	switch opts.integrationType {
	case "DATADOG":
		return describeTemplateDatadogOpsGenie
	case "FLOWDOCK":
		return describeTemplateFlowdog
	case "NEW_RELIC":
		return describeTemplateNewRelic
	case "PAGER_DUTY":
		return describeTemplatePagerDuty
	case "VICTOR_OPS":
		return describeTemplateVictorOps
	case "OPS_GENIE":
		return describeTemplateDatadogOpsGenie
	case "WEBHOOK":
		return describeTemplateWebhook
	default:
		return describeTemplateSlack
	}
}

// mongocli atlas integration(s) describe <TYPE> [--projectId projectId].
func DescribeBuilder() *cobra.Command {
	opts := &DescribeOpts{}
	cmd := &cobra.Command{
		Use:       "describe <TYPE>",
		Short:     "Get a third party integration",
		Args:      require.ExactValidArgs(1),
		ValidArgs: []string{"WEBHOOK", "OPS_GENIE", "VICTOR_OPS", "PAGER_DUTY", "NEW_RELIC", "FLOWDOCK", "DATADOG", "SLACK"},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.integrationType = strings.ToUpper(args[0])
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), opts.template()),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
