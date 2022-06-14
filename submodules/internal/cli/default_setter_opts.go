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
	"context"
	"errors"
	"fmt"
	"io"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/mongosh"
	"github.com/mongodb/mongodb-atlas-cli/internal/prompt"
	"github.com/mongodb/mongodb-atlas-cli/internal/store"
	"github.com/mongodb/mongodb-atlas-cli/internal/telemetry"
	"github.com/mongodb/mongodb-atlas-cli/internal/validate"
	atlas "go.mongodb.org/atlas/mongodbatlas"
	"go.mongodb.org/ops-manager/opsmngr"
)

//go:generate mockgen -destination=../mocks/mock_default_opts.go -package=mocks github.com/mongodb/mongodb-atlas-cli/internal/cli ProjectOrgsLister

type ProjectOrgsLister interface {
	Project(id string) (interface{}, error)
	Projects(*atlas.ListOptions) (interface{}, error)
	Organization(id string) (*atlas.Organization, error)
	Organizations(*atlas.OrganizationsListOptions) (*atlas.Organizations, error)
	GetOrgProjects(string, *atlas.ListOptions) (interface{}, error)
}

type DefaultSetterOpts struct {
	Service                  string
	OpsManagerURL            string
	ProjectID                string
	OrgID                    string
	MongoShellPath           string
	TelemetryEnabled         bool
	Output                   string
	Store                    ProjectOrgsLister
	OutWriter                io.Writer
	AskedOrgsOrProjects      bool
	OnMultipleOrgsOrProjects func()
}

func (opts *DefaultSetterOpts) InitStore(ctx context.Context) error {
	if opts.Store != nil {
		return nil
	}

	var err error
	opts.Store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
	return err
}

func (opts *DefaultSetterOpts) IsCloud() bool {
	return opts.Service == config.CloudService || opts.Service == config.CloudGovService
}

func (opts *DefaultSetterOpts) IsOpsManager() bool {
	return opts.Service == config.OpsManagerService
}

const resultsLimit = 500

var (
	errTooManyResults = errors.New("too many results")
	errNoResults      = errors.New("no results")
)

// Projects fetches projects and returns then as a slice of the format `nameIDFormat`,
// and a map such as `map[nameIDFormat]=ID`.
// This is necessary as we can only prompt using `nameIDFormat`
// and we want them to get the ID mapping to store in the config.
func (opts *DefaultSetterOpts) projects() (pMap map[string]string, pSlice []string, err error) {
	var projects interface{}
	if opts.OrgID == "" {
		projects, err = opts.Store.Projects(nil)
	} else {
		projects, err = opts.Store.GetOrgProjects(opts.OrgID, &atlas.ListOptions{ItemsPerPage: resultsLimit})
	}
	if err != nil {
		return nil, nil, err
	}
	switch r := projects.(type) {
	case *atlas.Projects:
		if r.TotalCount == 0 {
			return nil, nil, errNoResults
		}
		if r.TotalCount > resultsLimit {
			return nil, nil, errTooManyResults
		}
		pMap, pSlice = atlasProjects(r.Results)
	case *opsmngr.Projects:
		if r.TotalCount == 0 {
			return nil, nil, errNoResults
		}
		if r.TotalCount > resultsLimit {
			return nil, nil, errTooManyResults
		}
		pMap, pSlice = omProjects(r.Results)
	}

	return pMap, pSlice, nil
}

// Orgs fetches organizations and returns then as a slice of the format `nameIDFormat`,
// and a map such as `map[nameIDFormat]=ID`.
// This is necessary as we can only prompt using `nameIDFormat`
// and we want them to get the ID mapping to store on the config.
func (opts *DefaultSetterOpts) orgs() (oMap map[string]string, oSlice []string, err error) {
	includeDeleted := false
	pagination := &atlas.OrganizationsListOptions{IncludeDeletedOrgs: &includeDeleted}
	pagination.ItemsPerPage = resultsLimit
	orgs, err := opts.Store.Organizations(pagination)
	if err != nil {
		return nil, nil, err
	}
	if orgs.TotalCount == 0 {
		return nil, nil, errNoResults
	}
	if orgs.TotalCount > resultsLimit {
		return nil, nil, errTooManyResults
	}
	oMap = make(map[string]string, len(orgs.Results))
	oSlice = make([]string, len(orgs.Results))
	for i, o := range orgs.Results {
		d := fmt.Sprintf(nameIDFormat, o.Name, o.ID)
		oMap[d] = o.ID
		oSlice[i] = d
	}
	return oMap, oSlice, nil
}

// ProjectExists checks if the project exists and the current user has access to it.
func (opts *DefaultSetterOpts) ProjectExists(id string) bool {
	if p, err := opts.Store.Project(id); p == nil || err != nil {
		return false
	}
	return true
}

// AskProject will try to construct a select based on fetched projects.
// If it fails or there are no projects to show we fallback to ask for project by ID.
// If only one project, select it by default without prompting the user.
func (opts *DefaultSetterOpts) AskProject() error {
	pMap, pSlice, err := opts.projects()
	if err != nil {
		var target *atlas.ErrorResponse
		switch {
		case errors.Is(err, errNoResults):
			_, _ = fmt.Fprintln(opts.OutWriter, "You don't seem to have access to any project")
		case errors.Is(err, errTooManyResults):
			_, _ = fmt.Fprintf(opts.OutWriter, "You have access to more than %d projects\n", resultsLimit)
		case errors.As(err, &target):
			_, _ = fmt.Fprintf(opts.OutWriter, "There was an error fetching your projects: %s\n", target.Detail)
		default:
			_, _ = fmt.Fprintf(opts.OutWriter, "There was an error fetching your projects: %s\n", err)
		}
		p := &survey.Confirm{
			Message: "Do you want to enter the Project ID manually?",
		}
		manually := true
		if err2 := telemetry.TrackAskOne(p, &manually); err2 != nil {
			return err2
		}
		opts.AskedOrgsOrProjects = true
		if manually {
			p := prompt.NewProjectIDInput()
			return telemetry.TrackAskOne(p, &opts.ProjectID, survey.WithValidator(validate.OptionalObjectID))
		}
		_, _ = fmt.Fprint(opts.OutWriter, "Skipping default project setting\n")
		return nil
	}

	if len(pSlice) == 1 {
		opts.ProjectID = pMap[pSlice[0]]
	} else {
		opts.runOnMultipleOrgsOrProjects()
		p := prompt.NewProjectSelect(pSlice)
		var projectID string
		if err := telemetry.TrackAskOne(p, &projectID); err != nil {
			return err
		}
		opts.ProjectID = pMap[projectID]
		opts.AskedOrgsOrProjects = true
	}

	return nil
}

// OrgExists checks if the org exists and the current user has access to it.
func (opts *DefaultSetterOpts) OrgExists(id string) bool {
	if o, err := opts.Store.Organization(id); o == nil || err != nil {
		return false
	}
	return true
}

// AskOrg will try to construct a select based on fetched organizations.
// If it fails or there are no organizations to show we fallback to ask for org by ID.
// If only one organization, select it by default without prompting the user.
func (opts *DefaultSetterOpts) AskOrg() error {
	oMap, oSlice, err := opts.orgs()
	if err != nil {
		var target *atlas.ErrorResponse
		switch {
		case errors.Is(err, errNoResults):
			_, _ = fmt.Fprintln(opts.OutWriter, "You don't seem to have access to any organization")
		case errors.Is(err, errTooManyResults):
			_, _ = fmt.Fprintf(opts.OutWriter, "You have access to more than %d organizations\n", resultsLimit)
		case errors.As(err, &target):
			_, _ = fmt.Fprintf(opts.OutWriter, "There was an error fetching your organizations: %s\n", target.Detail)
		default:
			_, _ = fmt.Fprintf(opts.OutWriter, "There was an error fetching your organizations: %s\n", err)
		}
		p := &survey.Confirm{
			Message: "Do you want to enter the Org ID manually?",
		}
		manually := true
		if err2 := telemetry.TrackAskOne(p, &manually); err2 != nil {
			return err2
		}
		opts.AskedOrgsOrProjects = true
		if manually {
			p := prompt.NewOrgIDInput()
			return telemetry.TrackAskOne(p, &opts.OrgID, survey.WithValidator(validate.OptionalObjectID))
		}
		_, _ = fmt.Fprint(opts.OutWriter, "Skipping default organization setting\n")
		return nil
	}

	if len(oSlice) == 1 {
		opts.OrgID = oMap[oSlice[0]]
	} else {
		opts.runOnMultipleOrgsOrProjects()
		p := prompt.NewOrgSelect(oSlice)
		var orgID string
		if err := telemetry.TrackAskOne(p, &orgID); err != nil {
			return err
		}
		opts.OrgID = oMap[orgID]
		opts.AskedOrgsOrProjects = true
	}

	return nil
}

func (opts *DefaultSetterOpts) SetUpProject() {
	if opts.ProjectID != "" {
		config.SetProjectID(opts.ProjectID)
	}
}

func (opts *DefaultSetterOpts) SetUpOrg() {
	if opts.OrgID != "" {
		config.SetOrgID(opts.OrgID)
	}
}

func (opts *DefaultSetterOpts) SetUpMongoSHPath() {
	if !opts.IsCloud() {
		return
	}

	defaultPath := config.MongoShellPath()
	if defaultPath == "" {
		defaultPath = mongosh.Path()
	}

	config.SetMongoShellPath(defaultPath)
}

func (opts *DefaultSetterOpts) SetUpOutput() {
	if opts.Output != plaintextFormat {
		config.SetOutput(opts.Output)
	}
}

const nameIDFormat = "%s (%s)"

// atlasProjects transform []*atlas.Project to a map[string]string and []string.
func atlasProjects(projects []*atlas.Project) (pMap map[string]string, pSlice []string) {
	pMap = make(map[string]string, len(projects))
	pSlice = make([]string, len(projects))
	for i, p := range projects {
		d := fmt.Sprintf(nameIDFormat, p.Name, p.ID)
		pMap[d] = p.ID
		pSlice[i] = d
	}
	return pMap, pSlice
}

// omProjects transform []*opsmngr.Project to a map[string]string and []string.
func omProjects(projects []*opsmngr.Project) (pMap map[string]string, pSlice []string) {
	pMap = make(map[string]string, len(projects))
	pSlice = make([]string, len(projects))
	for i, p := range projects {
		d := fmt.Sprintf(nameIDFormat, p.Name, p.ID)
		pMap[d] = p.ID
		pSlice[i] = d
	}
	return pMap, pSlice
}

func (*DefaultSetterOpts) DefaultQuestions() []*survey.Question {
	q := []*survey.Question{
		{
			Name: "output",
			Prompt: &survey.Select{
				Message: "Default Output Format:",
				Options: []string{plaintextFormat, jsonFormat},
				Default: config.Output(),
			},
		},
	}
	return q
}

func (opts *DefaultSetterOpts) runOnMultipleOrgsOrProjects() {
	if opts.OnMultipleOrgsOrProjects != nil {
		opts.OnMultipleOrgsOrProjects()
	}
}
