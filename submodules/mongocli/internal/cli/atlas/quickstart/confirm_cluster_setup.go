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
	"errors"
	"fmt"
	"strings"

	"github.com/AlecAivazis/survey/v2"
)

func (opts *Opts) askConfirmConfigQuestion() error {
	if opts.Confirm {
		return nil
	}

	diskSize := 0.5
	if opts.newCluster().DiskSizeGB != nil {
		diskSize = *opts.newCluster().DiskSizeGB
	}

	const noMsg = "No"
	const yesMsg = "Yes"
	loadSampleData := yesMsg
	if opts.SkipSampleData {
		loadSampleData = noMsg
	}

	runMongoShell := noMsg
	if opts.runMongoShell {
		runMongoShell = yesMsg
	}

	fmt.Printf(`
[Summary of changes]
Cluster Name:				%s
Cluster Tier:				%s
Cloud Provider:				%s
Region:					%s
Cluster Disk Size (GiB):		%.1f
Database Username:			%s
Allow connections from (IP Address):	%s
Load sample data:			%s
Open shell:				%s
`,
		opts.ClusterName,
		opts.tier,
		opts.Provider,
		opts.Region,
		diskSize,
		opts.DBUsername,
		strings.Join(opts.IPAddresses, ", "),
		loadSampleData,
		runMongoShell,
	)

	q := newClusterCreateConfirm(opts.ClusterName)
	if err := survey.AskOne(q, &opts.Confirm); err != nil {
		return err
	}

	if !opts.Confirm {
		return errors.New("user-aborted. Not creating cluster")
	}
	return nil
}
