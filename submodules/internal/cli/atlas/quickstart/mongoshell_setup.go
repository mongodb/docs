// Copyright 2021 MongoDB Inc
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

package quickstart

import (
	"fmt"

	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/log"
	"github.com/mongodb/mongodb-atlas-cli/internal/telemetry"
	"github.com/pkg/browser"
)

func (opts *Opts) askMongoShellQuestion() error {
	if opts.SkipMongosh {
		return nil
	}

	fmt.Printf(`
[MongoDB Shell (mongosh) is an interactive command line interface to query, update and manage data in the MongoDB database.]
`)

	q := newMongoShellQuestionAccessDeployment(opts.ClusterName)
	if err := telemetry.TrackAskOne(q, &opts.runMongoShell); err != nil || !opts.runMongoShell {
		return err
	}

	if config.MongoShellPath() != "" {
		return nil
	}
	_, _ = log.Warningln("No MongoDB shell version configured.")
	if err := telemetry.TrackAskOne(newIsMongoShellInstalledQuestion(), &opts.mongoShellInstalled); err != nil {
		return err
	}

	if !opts.mongoShellInstalled {
		if err := openInstallInstructions(); err != nil {
			return err
		}
	}

	return askMongoShellPathQuestion()
}

func openInstallInstructions() error {
	var openURL bool
	if err := telemetry.TrackAskOne(newMongoShellQuestionOpenBrowser(), &openURL); !openURL || err != nil {
		return err
	}

	return browser.OpenURL(mongoshURL)
}

func askMongoShellPathQuestion() error {
	var wantToProvidePath bool
	q := newMongoShellPathQuestion()
	if err := telemetry.TrackAskOne(q, &wantToProvidePath); !wantToProvidePath || err != nil {
		return err
	}

	return askMongoShellAndSetConfig()
}
