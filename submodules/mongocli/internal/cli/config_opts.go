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

package cli

import (
	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/prompt"
	"github.com/mongodb/mongocli/internal/validate"
)

type ConfigOpts struct {
	DefaultSetterOpts
	PublicAPIKey  string
	PrivateAPIKey string
}

func (opts *ConfigOpts) SetUpServiceAndKeys() {
	config.SetService(opts.Service)
	if opts.PublicAPIKey != "" {
		config.SetPublicAPIKey(opts.PublicAPIKey)
	}
	if opts.PrivateAPIKey != "" {
		config.SetPrivateAPIKey(opts.PrivateAPIKey)
	}
}

// AskProject will try to construct a select based on fetched projects.
// If it fails or there are no projects to show we fallback to ask for project by ID.
func (opts *ConfigOpts) AskProject() error {
	pMap, pSlice, err := opts.Projects()
	var projectID string
	if err != nil || len(pSlice) == 0 {
		p := prompt.NewProjectIDInput()
		return survey.AskOne(p, &opts.ProjectID, survey.WithValidator(validate.OptionalObjectID))
	}

	p := prompt.NewProjectSelect(pSlice)
	if err := survey.AskOne(p, &projectID); err != nil {
		return err
	}
	opts.ProjectID = pMap[projectID]
	return nil
}

// AskOrg will try to construct a select based on fetched organizations.
// If it fails or there are no organizations to show we fallback to ask for org by ID.
func (opts *ConfigOpts) AskOrg() error {
	oMap, oSlice, err := opts.Orgs()
	var orgID string
	if err != nil || len(oSlice) == 0 {
		p := prompt.NewOrgIDInput()
		return survey.AskOne(p, &opts.OrgID, survey.WithValidator(validate.OptionalObjectID))
	}

	p := prompt.NewOrgSelect(oSlice)
	if err := survey.AskOne(p, &orgID); err != nil {
		return err
	}
	opts.OrgID = oMap[orgID]
	return nil
}
