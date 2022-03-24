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

package settings

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

type UpdateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	ConfigOpts
	store   store.AlertConfigurationUpdater
	alertID string
}

func (opts *UpdateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var updateTemplate = "Alert configuration '{{.ID}}' updated.\n"

func (opts *UpdateOpts) Run() error {
	alert := opts.NewAlertConfiguration(opts.ConfigProjectID())
	alert.ID = opts.alertID
	r, err := opts.store.UpdateAlertConfiguration(alert)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli atlas alerts config(s) update <ID> [--event event] [--enabled enabled][--matcherField fieldName --matcherOperator operator --matcherValue value]
// [--notificationType type --notificationDelayMin min --notificationEmailEnabled --notificationSmsEnabled --notificationUsername username --notificationTeamID id
// [--notificationEmailAddress email --notificationMobileNumber number --notificationChannelName channel --notificationApiToken --notificationRegion region]
// [--projectId projectId].
func UpdateBuilder() *cobra.Command {
	opts := new(UpdateOpts)
	cmd := &cobra.Command{
		Use:   "update <alertConfigId>",
		Short: "Updates one alert configuration in the specified project.",
		Args:  require.ExactArgs(1),
		Annotations: map[string]string{
			"args":              "alertConfigId",
			"requiredArgs":      "alertConfigId",
			"alertConfigIdDesc": "Unique identifier of the alert configuration you want to update.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), updateTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.alertID = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.event, flag.Event, "", usage.Event)
	cmd.Flags().BoolVar(&opts.enabled, flag.Enabled, false, usage.Enabled)
	cmd.Flags().StringVar(&opts.matcherFieldName, flag.MatcherFieldName, "", usage.MatcherFieldName)
	cmd.Flags().StringVar(&opts.matcherOperator, flag.MatcherOperator, "", usage.MatcherOperator)
	cmd.Flags().StringVar(&opts.matcherValue, flag.MatcherValue, "", usage.MatcherValue)
	cmd.Flags().StringVar(&opts.metricThresholdMetricName, flag.MetricName, "", usage.MetricName)
	cmd.Flags().StringVar(&opts.metricThresholdOperator, flag.MetricOperator, "", usage.MetricOperator)
	cmd.Flags().Float64Var(&opts.metricThresholdThreshold, flag.MetricThreshold, 0, usage.MetricThreshold)
	cmd.Flags().StringVar(&opts.metricThresholdUnits, flag.MetricUnits, "", usage.MetricUnits)
	cmd.Flags().StringVar(&opts.metricThresholdMode, flag.MetricMode, "", usage.MetricMode)
	cmd.Flags().StringVar(&opts.notificationToken, flag.NotificationToken, "", usage.NotificationToken)
	cmd.Flags().StringVar(&opts.notificationChannelName, flag.NotificationChannelName, "", usage.NotificationsChannelName)
	cmd.Flags().StringVar(&opts.apiKey, flag.APIKey, "", usage.AlertConfigAPIKey)
	cmd.Flags().StringVar(&opts.notificationRegion, flag.NotificationRegion, "", usage.NotificationRegion)
	cmd.Flags().IntVar(&opts.notificationDelayMin, flag.NotificationDelayMin, 0, usage.NotificationDelayMin)
	cmd.Flags().StringVar(&opts.notificationEmailAddress, flag.NotificationEmailAddress, "", usage.NotificationEmailAddress)
	cmd.Flags().BoolVar(&opts.notificationEmailEnabled, flag.NotificationEmailEnabled, false, usage.NotificationEmailEnabled)
	cmd.Flags().StringVar(&opts.notificationFlowName, flag.NotificationFlowName, "", usage.NotificationFlowName)
	cmd.Flags().IntVar(&opts.notificationIntervalMin, flag.NotificationIntervalMin, 0, usage.NotificationIntervalMin)
	cmd.Flags().StringVar(&opts.notificationMobileNumber, flag.NotificationMobileNumber, "", usage.NotificationMobileNumber)
	cmd.Flags().StringVar(&opts.notificationOrgName, flag.NotificationOrgName, "", usage.NotificationOrgName)
	cmd.Flags().StringVar(&opts.notificationServiceKey, flag.NotificationServiceKey, "", usage.NotificationServiceKey)
	cmd.Flags().BoolVar(&opts.notificationSmsEnabled, flag.NotificationSmsEnabled, false, usage.NotificationSmsEnabled)
	cmd.Flags().StringVar(&opts.notificationTeamID, flag.NotificationTeamID, "", usage.NotificationTeamID)
	cmd.Flags().StringVar(&opts.notificationType, flag.NotificationType, "", usage.NotificationType)
	cmd.Flags().StringVar(&opts.notificationUsername, flag.NotificationUsername, "", usage.NotificationUsername)
	cmd.Flags().StringVar(&opts.notificationVictorOpsRoutingKey, flag.NotificationVictorOpsRoutingKey, "", usage.NotificationVictorOpsRoutingKey)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
