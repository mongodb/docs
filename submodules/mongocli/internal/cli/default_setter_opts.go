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
	"fmt"
	"os"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/mongosh"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/validate"
	atlas "go.mongodb.org/atlas/mongodbatlas"
	"go.mongodb.org/ops-manager/opsmngr"
)

//go:generate mockgen -destination=../mocks/mock_default_opts.go -package=mocks github.com/mongodb/mongocli/internal/cli ProjectOrgsLister

type ProjectOrgsLister interface {
	Projects(*atlas.ListOptions) (interface{}, error)
	Organizations(*atlas.OrganizationsListOptions) (*atlas.Organizations, error)
}

type DefaultSetterOpts struct {
	Service        string
	OpsManagerURL  string
	ProjectID      string
	OrgID          string
	MongoShellPath string
	Output         string
	Store          ProjectOrgsLister
}

func (opts *DefaultSetterOpts) InitStore(ctx context.Context) error {
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

// Projects fetches projects and returns then as a slice of the format `nameIDFormat`,
// and a map such as `map[nameIDFormat]=ID`.
// This is necessary as we can only prompt using `nameIDFormat`
// and we want them to get the ID mapping to store on the config.
func (opts *DefaultSetterOpts) Projects() (pMap map[string]string, pSlice []string, err error) {
	projects, err := opts.Store.Projects(nil)
	if err != nil {
		_, _ = fmt.Fprintf(os.Stderr, "there was a problem fetching projects: %s\n", err)
		return nil, nil, err
	}
	if opts.IsCloud() {
		pMap, pSlice = atlasProjects(projects.(*atlas.Projects).Results)
	} else {
		pMap, pSlice = omProjects(projects.(*opsmngr.Projects).Results)
	}
	return pMap, pSlice, nil
}

// Orgs fetches organizations and returns then as a slice of the format `nameIDFormat`,
// and a map such as `map[nameIDFormat]=ID`.
// This is necessary as we can only prompt using `nameIDFormat`
// and we want them to get the ID mapping to store on the config.
func (opts *DefaultSetterOpts) Orgs() (oMap map[string]string, oSlice []string, err error) {
	includeDeleted := false
	orgs, err := opts.Store.Organizations(&atlas.OrganizationsListOptions{IncludeDeletedOrgs: &includeDeleted})
	if orgs != nil && orgs.TotalCount > len(orgs.Results) {
		orgs, err = opts.Store.Organizations(&atlas.OrganizationsListOptions{IncludeDeletedOrgs: &includeDeleted, ListOptions: atlas.ListOptions{ItemsPerPage: orgs.TotalCount}})
	}
	if err != nil {
		_, _ = fmt.Fprintf(os.Stderr, "there was a problem fetching orgs: %s\n", err)
		return nil, nil, err
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
	if opts.MongoShellPath != "" {
		config.SetMongoShellPath(opts.MongoShellPath)
	}
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

func (opts *DefaultSetterOpts) DefaultQuestions() []*survey.Question {
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
	if opts.IsCloud() {
		defaultPath := config.MongoShellPath()
		if defaultPath == "" {
			defaultPath = mongosh.Path()
		}
		atlasQuestion := &survey.Question{
			Name: "mongoShellPath",
			Prompt: &survey.Input{
				Message: "Default MongoDB Shell Path:",
				Help:    "MongoDB CLI will use the MongoDB shell version provided to allow you to access your deployments.",
				Default: defaultPath,
			},
			Validate: validate.OptionalPath,
		}
		q = append(q, atlasQuestion)
	}
	return q
}
