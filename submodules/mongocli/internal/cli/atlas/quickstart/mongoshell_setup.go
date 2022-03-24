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
	"os"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/pkg/browser"
)

func (opts *Opts) askMongoShellQuestion() error {
	if opts.SkipMongosh {
		return nil
	}

	fmt.Printf(`
[Connect to %s]
`, opts.ClusterName)

	q := newMongoShellQuestionAccessDeployment(opts.ClusterName)
	if err := survey.AskOne(q, &opts.runMongoShell); err != nil || !opts.runMongoShell {
		return err
	}

	if config.MongoShellPath() != "" {
		return nil
	}
	_, _ = fmt.Fprint(os.Stderr, "No MongoDB shell version configured.\n")
	if err := survey.AskOne(newIsMongoShellInstalledQuestion(), &opts.mongoShellInstalled); err != nil {
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
	if err := survey.AskOne(newMongoShellQuestionOpenBrowser(), &openURL); !openURL || err != nil {
		return err
	}

	return browser.OpenURL(mongoshURL)
}

func askMongoShellPathQuestion() error {
	var wantToProvidePath bool
	q := newMongoShellPathQuestion()
	if err := survey.AskOne(q, &wantToProvidePath); !wantToProvidePath || err != nil {
		return err
	}

	return askMongoShellAndSetConfig()
}
