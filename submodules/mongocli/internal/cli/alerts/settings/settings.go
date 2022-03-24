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
	"strings"

	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

const (
	datadog  = "DATADOG"
	slack    = "SLACK"
	victor   = "VICTOR_OPS"
	flowdock = "FLOWDOCK"
	email    = "EMAIL"
	ops      = "OPS_GENIE"
	pager    = "PAGER_DUTY"
	sms      = "SMS"
	group    = "GROUP"
	user     = "USER"
	org      = "ORG"
)

// ConfigOpts contains all the information and functions to manage an alert configuration.
type ConfigOpts struct {
	event                           string
	matcherFieldName                string
	matcherOperator                 string
	matcherValue                    string
	metricThresholdMetricName       string
	metricThresholdOperator         string
	metricThresholdUnits            string
	metricThresholdMode             string
	notificationToken               string // notificationsApiToken, notificationsFlowdockApiToken
	notificationChannelName         string
	apiKey                          string // notificationsDatadogApiKey, notificationsOpsGenieApiKey, notificationsVictorOpsApiKey
	notificationEmailAddress        string
	notificationFlowName            string
	notificationMobileNumber        string
	notificationRegion              string // notificationsOpsGenieRegion, notificationsDatadogRegion
	notificationOrgName             string
	notificationServiceKey          string
	notificationTeamID              string
	notificationType                string
	notificationUsername            string
	notificationVictorOpsRoutingKey string
	notificationDelayMin            int
	notificationIntervalMin         int
	notificationSmsEnabled          bool
	enabled                         bool
	notificationEmailEnabled        bool
	metricThresholdThreshold        float64
}

func (opts *ConfigOpts) NewAlertConfiguration(projectID string) *atlas.AlertConfiguration {
	out := new(atlas.AlertConfiguration)

	out.GroupID = projectID
	out.EventTypeName = strings.ToUpper(opts.event)
	out.Enabled = &opts.enabled

	if opts.matcherFieldName != "" {
		out.Matchers = []atlas.Matcher{*opts.newMatcher()}
	}

	if opts.metricThresholdMetricName != "" {
		out.MetricThreshold = opts.newMetricThreshold()
	}

	out.Notifications = []atlas.Notification{*opts.newNotification()}

	return out
}

func (opts *ConfigOpts) newNotification() *atlas.Notification {
	out := new(atlas.Notification)
	out.TypeName = strings.ToUpper(opts.notificationType)
	out.DelayMin = &opts.notificationDelayMin
	out.IntervalMin = opts.notificationIntervalMin
	out.TeamID = opts.notificationTeamID
	out.Username = opts.notificationUsername
	out.ChannelName = opts.notificationChannelName

	switch out.TypeName {
	case victor:
		out.VictorOpsAPIKey = opts.apiKey
		out.VictorOpsRoutingKey = opts.notificationVictorOpsRoutingKey

	case slack:
		out.VictorOpsAPIKey = opts.apiKey
		out.VictorOpsRoutingKey = opts.notificationVictorOpsRoutingKey
		out.APIToken = opts.notificationToken

	case datadog:
		out.DatadogAPIKey = opts.apiKey
		out.DatadogRegion = strings.ToUpper(opts.notificationRegion)

	case email:
		out.EmailAddress = opts.notificationEmailAddress

	case flowdock:
		out.FlowdockAPIToken = opts.notificationToken
		out.FlowName = opts.notificationFlowName
		out.OrgName = opts.notificationOrgName

	case sms:
		out.MobileNumber = opts.notificationMobileNumber

	case group, user, org:
		out.SMSEnabled = &opts.notificationSmsEnabled
		out.EmailEnabled = &opts.notificationEmailEnabled

	case ops:
		out.OpsGenieAPIKey = opts.apiKey
		out.OpsGenieRegion = opts.notificationRegion

	case pager:
		out.ServiceKey = opts.notificationServiceKey
	}

	return out
}

func (opts *ConfigOpts) newMetricThreshold() *atlas.MetricThreshold {
	return &atlas.MetricThreshold{
		MetricName: strings.ToUpper(opts.metricThresholdMetricName),
		Operator:   strings.ToUpper(opts.metricThresholdOperator),
		Threshold:  opts.metricThresholdThreshold,
		Units:      strings.ToUpper(opts.metricThresholdUnits),
		Mode:       strings.ToUpper(opts.metricThresholdMode),
	}
}

func (opts *ConfigOpts) newMatcher() *atlas.Matcher {
	return &atlas.Matcher{
		FieldName: strings.ToUpper(opts.matcherFieldName),
		Operator:  strings.ToUpper(opts.matcherOperator),
		Value:     strings.ToUpper(opts.matcherValue),
	}
}

func Builder() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "settings",
		Aliases: []string{"config"},
		Short:   "Manages alerts configuration for your project.",
		Long:    `Use this command to list, create, edit, and delete alert configurations.`,
	}

	cmd.AddCommand(
		CreateBuilder(),
		ListBuilder(),
		DeleteBuilder(),
		FieldsBuilder(),
		UpdateBuilder(),
	)

	return cmd
}
