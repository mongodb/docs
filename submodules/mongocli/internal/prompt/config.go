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

package prompt

import (
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/validate"
)

func NewOMURLInput() survey.Prompt {
	return &survey.Input{
		Message: "URL to Access Ops Manager:",
		Help:    "FQDN and port number of the Ops Manager Application.",
		Default: config.OpsManagerURL(),
	}
}

func NewOrgIDInput() survey.Prompt {
	return &survey.Input{
		Message: "Default Org ID:",
		Help:    "ID of an existing organization that your API keys have access to. If you don't enter an ID, you must use --orgId for every command that requires it.",
		Default: config.OrgID(),
	}
}

func NewProjectIDInput() survey.Prompt {
	return &survey.Input{
		Message: "Default Project ID:",
		Help:    "ID of an existing project that your API keys have access to. If you don't enter an ID, you must use --projectId for every command that requires it.",
		Default: config.ProjectID(),
	}
}

func AccessQuestions(isOM bool) []*survey.Question {
	helpLink := "Please provide your API keys. To create new keys, see the documentation: https://docs.atlas.mongodb.com/configure-api-access/"
	if isOM {
		helpLink = "Please provide your API keys. To create new keys, see the documentation: https://docs.opsmanager.mongodb.com/current/tutorial/configure-public-api-access/"
	}

	q := []*survey.Question{
		{
			Name: "publicAPIKey",
			Prompt: &survey.Input{
				Message: "Public API Key:",
				Help:    helpLink,
				Default: config.PublicAPIKey(),
			},
		},
		{
			Name: "privateAPIKey",
			Prompt: &survey.Password{
				Message: "Private API Key:",
				Help:    helpLink,
			},
		},
	}
	if isOM {
		omQuestions := []*survey.Question{
			{
				Name:     "opsManagerURL",
				Prompt:   NewOMURLInput(),
				Validate: validate.OptionalURL,
			},
		}
		q = append(omQuestions, q...)
	}
	return q
}

func TenantQuestions() []*survey.Question {
	q := []*survey.Question{
		{
			Name:     "projectId",
			Prompt:   NewProjectIDInput(),
			Validate: validate.OptionalObjectID,
		},
		{
			Name:     "orgId",
			Prompt:   NewOrgIDInput(),
			Validate: validate.OptionalObjectID,
		},
	}
	return q
}

// NewProfileReplaceConfirm creates a prompt to confirm if an existing profile should be replaced.
func NewProfileReplaceConfirm(entry string) survey.Prompt {
	prompt := &survey.Confirm{
		Message: fmt.Sprintf("There is already a profile called %s.\nDo you want to replace it?", entry),
	}
	return prompt
}

// NewOrgSelect create a prompt to choice the organization.
func NewOrgSelect(options []string) survey.Prompt {
	return &survey.Select{
		Message: "Choose a default organization:",
		Options: options,
	}
}

// NewProjectSelect create a prompt to choice the project.
func NewProjectSelect(options []string) survey.Prompt {
	return &survey.Select{
		Message: "Choose a default project:",
		Options: options,
	}
}
