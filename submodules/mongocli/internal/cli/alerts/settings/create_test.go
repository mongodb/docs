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

//go:build unit
// +build unit

package settings

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestCreate_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockAlertConfigurationCreator(ctrl)
	defer ctrl.Finish()

	expected := &mongodbatlas.AlertConfiguration{}

	createOpts := &CreateOpts{
		ConfigOpts: ConfigOpts{
			event:                     "OUTSIDE_METRIC_THRESHOLD",
			enabled:                   true,
			matcherFieldName:          "HOSTNAME_AND_PORT",
			matcherOperator:           "EQUALS",
			matcherValue:              "mongo.example.com:27017",
			metricThresholdMetricName: "ASSERT_REGULAR",
			metricThresholdOperator:   "LESS_THAN",
			metricThresholdThreshold:  99,
			metricThresholdUnits:      "RAW",
			metricThresholdMode:       "RAW",
			notificationDelayMin:      0,
			notificationIntervalMin:   5,
			notificationMobileNumber:  "2343454567",
			notificationType:          "sms",
		},
		store: mockStore}

	alert := createOpts.NewAlertConfiguration(createOpts.ConfigProjectID())
	mockStore.
		EXPECT().
		CreateAlertConfiguration(alert).
		Return(expected, nil).
		Times(1)

	if err := createOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestAcknowledgeBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		CreateBuilder(),
		0,
		[]string{
			flag.Event,
			flag.Enabled,
			flag.MatcherFieldName,
			flag.MatcherOperator,
			flag.Output,
		},
	)
}
