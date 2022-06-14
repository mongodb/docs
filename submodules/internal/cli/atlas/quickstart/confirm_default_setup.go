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

package quickstart

import (
	"errors"
	"fmt"
	"strings"

	"github.com/mongodb/mongodb-atlas-cli/internal/telemetry"
)

func (opts *Opts) askConfirmDefaultQuestion(values *quickstart) error {
	if opts.Confirm {
		return nil
	}

	loadSampleData := ""
	if !opts.SkipSampleData {
		loadSampleData = loadSampleDataMsg
	}

	clusterTier := ""
	if opts.Tier != DefaultAtlasTier {
		diskSize := defaultDiskSizeGB(values.providerName(), opts.Tier)

		clusterTier = fmt.Sprintf(`
Cluster Tier:				%s
Cluster Disk Size (GiB):		%.1f`, opts.Tier, diskSize)
	}

	fmt.Printf(`
[Default Settings]
Cluster Name:				%s%s
Cloud Provider and Region:		%s
Database User Username:			%s%s
Allow connections from (IP Address):	%s
`,
		values.ClusterName,
		clusterTier,
		values.Provider+" - "+values.Region,
		values.DBUsername,
		loadSampleData,
		strings.Join(values.IPAddresses, ", "),
	)

	q := newClusterDefaultConfirm(opts.Tier)
	if err := telemetry.TrackAskOne(q, &opts.Confirm); err != nil {
		return err
	}

	if !opts.Confirm {
		return errors.New("user-aborted. Not creating cluster")
	}
	return nil
}
