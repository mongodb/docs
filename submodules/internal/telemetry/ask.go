// Copyright 2022 MongoDB Inc
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

package telemetry

import (
	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/log"
)

func TrackAsk(qs []*survey.Question, response interface{}, opts ...survey.AskOpt) error {
	err := survey.Ask(qs, response, opts...)
	if !config.TelemetryEnabled() {
		return err
	}

	for _, q := range qs {
		answer, _ := readAnswer(response, q.Name)
		if e := currentTracker.trackSurvey(q.Prompt, answer, err); e != nil {
			_, _ = log.Debugf("telemetry: failed to track survey: %v\n", e)
		}
	}
	return err
}

func TrackAskOne(p survey.Prompt, response interface{}, opts ...survey.AskOpt) error {
	err := survey.AskOne(p, response, opts...)
	if !config.TelemetryEnabled() {
		return err
	}

	if e := currentTracker.trackSurvey(p, response, err); e != nil {
		_, _ = log.Debugf("telemetry: failed to track survey: %v\n", e)
	}
	return err
}
