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
	"github.com/mongodb/mongocli/internal/mocks"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestUpdates_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockAlertConfigurationUpdater(ctrl)
	defer ctrl.Finish()

	expected := &mongodbatlas.AlertConfiguration{}

	updateOpts := &UpdateOpts{
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
		store:   mockStore,
		alertID: "1",
	}

	alert := updateOpts.NewAlertConfiguration(updateOpts.ConfigProjectID())
	alert.ID = updateOpts.alertID
	mockStore.
		EXPECT().
		UpdateAlertConfiguration(alert).
		Return(expected, nil).
		Times(1)
	if err := updateOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}
