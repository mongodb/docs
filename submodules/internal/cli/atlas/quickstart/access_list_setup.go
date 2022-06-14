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
	"strings"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli"
	"github.com/mongodb/mongodb-atlas-cli/internal/flag"
	"github.com/mongodb/mongodb-atlas-cli/internal/store"
	"github.com/mongodb/mongodb-atlas-cli/internal/telemetry"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

func (opts *Opts) createAccessList() error {
	entries := opts.newProjectIPAccessList()
	if _, err := opts.store.CreateProjectIPAccessList(entries); err != nil {
		return err
	}

	return nil
}

func (opts *Opts) askAccessListOptions() error {
	if !opts.shouldAskForValue(flag.AccessListIP) {
		return nil
	}
	message := ""

	if len(opts.IPAddresses) == 0 {
		publicIP := store.IPAddress()
		if publicIP != "" {
			message = fmt.Sprintf(" [Press Enter to use your public IP address '%s']", publicIP)
		}
		opts.IPAddresses = append(opts.IPAddresses, publicIP)
	}
	fmt.Print(`
[Set up your database network access details]
`)
	err := telemetry.TrackAskOne(
		newAccessListQuestion(strings.Join(opts.IPAddresses, ", "), message),
		&opts.IPAddressesResponse,
		survey.WithValidator(survey.Required),
	)

	if err == nil && opts.IPAddressesResponse != "" {
		ips := strings.Split(opts.IPAddressesResponse, ",")
		opts.IPAddresses = ips
	}
	return err
}

func (opts *Opts) newProjectIPAccessList() []*atlas.ProjectIPAccessList {
	var accessListComment = fmt.Sprintf("IP added with %s quickstart", cli.ExampleAtlasEntryPoint())

	accessListArray := make([]*atlas.ProjectIPAccessList, len(opts.IPAddresses))
	for i, addr := range opts.IPAddresses {
		accessList := &atlas.ProjectIPAccessList{
			GroupID:   opts.ConfigProjectID(),
			Comment:   accessListComment,
			IPAddress: addr,
		}

		accessListArray[i] = accessList
	}
	return accessListArray
}
