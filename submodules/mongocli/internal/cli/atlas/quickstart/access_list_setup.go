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
	"github.com/mongodb/mongocli/internal/store"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

func (opts *Opts) createAccessList() error {
	if err := opts.askAccessListOptions(); err != nil {
		return err
	}
	if opts.IPAddressesResponse != "" {
		ips := strings.Split(opts.IPAddressesResponse, ",")
		opts.IPAddresses = append(opts.IPAddresses, ips...)
	}
	entries := opts.newProjectIPAccessList()
	if _, err := opts.store.CreateProjectIPAccessList(entries); err != nil {
		return err
	}

	return nil
}

func (opts *Opts) askAccessListOptions() error {
	if len(opts.IPAddresses) > 0 {
		return nil
	}

	fmt.Print(`
[Set up your database network access details]
`)
	message := ""
	publicIP := store.IPAddress()
	if publicIP != "" {
		message = fmt.Sprintf(" [Press Enter to use your public IP address '%s']", publicIP)
	}
	return survey.AskOne(
		newAccessListQuestion(publicIP, message),
		&opts.IPAddressesResponse,
		survey.WithValidator(survey.Required),
	)
}

func (opts *Opts) newProjectIPAccessList() []*atlas.ProjectIPAccessList {
	const accessListComment = "IP added with mongocli atlas quickstart"
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
