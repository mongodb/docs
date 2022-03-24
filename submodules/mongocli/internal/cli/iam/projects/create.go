// Copyright 2020 MongoDB Inc
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

package projects

import (
	"context"
	"fmt"

	"github.com/Masterminds/semver/v3"
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

const (
	atlasCreateTemplate = "Project '{{.ID}}' created.\n"
	govRegionOnly       = "GOV_REGIONS_ONLY"
)

type CreateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	name                        string
	projectOwnerID              string
	regionUsageRestrictions     bool
	withoutDefaultAlertSettings bool
	serviceVersion              *semver.Version
	store                       store.ProjectCreator
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		if opts.ConfigOrgID() == "" {
			return cli.ErrMissingOrgID
		}

		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *CreateOpts) Run() error {
	var defaultAlertSettings *bool
	if opts.withoutDefaultAlertSettings {
		f := false
		defaultAlertSettings = &f
	}

	r, err := opts.store.CreateProject(opts.name, opts.ConfigOrgID(),
		opts.newRegionUsageRestrictions(), defaultAlertSettings, opts.newCreateProjectOptions())

	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *CreateOpts) newRegionUsageRestrictions() string {
	if opts.regionUsageRestrictions {
		return govRegionOnly
	}

	return ""
}

func (opts *CreateOpts) newCreateProjectOptions() *atlas.CreateProjectOptions {
	return &atlas.CreateProjectOptions{ProjectOwnerID: opts.projectOwnerID}
}

func (opts *CreateOpts) validateOwnerID() error {
	if opts.projectOwnerID == "" || opts.serviceVersion == nil {
		return nil
	}

	constrain, err := semver.NewConstraint(">= 6.0")
	if err != nil {
		return err
	}

	if !constrain.Check(opts.serviceVersion) {
		return fmt.Errorf("%s is available only for Atlas, Cloud Manager and Ops Manager >= 6.0", flag.OwnerID)
	}

	return nil
}

func (opts *CreateOpts) validateWithoutDefaultAlertSettings() error {
	if !opts.withoutDefaultAlertSettings || opts.serviceVersion == nil {
		return nil
	}

	constrain, err := semver.NewConstraint(">= 6.0")
	if err != nil {
		return err
	}

	if !constrain.Check(opts.serviceVersion) {
		return fmt.Errorf("%s is available only for Atlas, Cloud Manager and Ops Manager >= 6.0", flag.WithoutDefaultAlertSettings)
	}

	return nil
}

func (opts *CreateOpts) initServiceVersion() error {
	if config.Service() != config.OpsManagerService {
		return nil
	}
	v, err := opts.store.ServiceVersion()
	if err != nil {
		return err
	}

	sv, err := cli.ParseServiceVersion(v)
	if err != nil {
		return err
	}

	opts.serviceVersion = sv
	return nil
}

// mongocli iam project(s) create <name> [--orgId orgId] [--ownerID ownerID] [--withoutDefaultAlertSettings].
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{}
	opts.Template = atlasCreateTemplate
	cmd := &cobra.Command{
		Use:   "create <projectName>",
		Short: "Create a project.",
		Args:  require.ExactArgs(1),
		Annotations: map[string]string{
			"args":            "projectName",
			"requiredArgs":    "projectName",
			"projectNameDesc": "Name of the project.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			if !config.IsCloud() {
				opts.Template += "Agent API Key: '{{.AgentAPIKey}}'\n"
			}
			return opts.PreRunE(opts.initStore(cmd.Context()), opts.initServiceVersion, opts.validateOwnerID, opts.validateWithoutDefaultAlertSettings)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.name = args[0]
			return opts.Run()
		},
	}
	cmd.Flags().StringVar(&opts.OrgID, flag.OrgID, "", usage.OrgID)
	cmd.Flags().StringVar(&opts.projectOwnerID, flag.OwnerID, "", usage.ProjectOwnerID)
	cmd.Flags().BoolVar(&opts.regionUsageRestrictions, flag.GovCloudRegionsOnly, false, usage.GovCloudRegionsOnly)
	cmd.Flags().BoolVar(&opts.withoutDefaultAlertSettings, flag.WithoutDefaultAlertSettings, false, usage.WithoutDefaultAlertSettings)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
