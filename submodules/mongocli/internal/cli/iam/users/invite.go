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

package users

import (
	"context"
	"fmt"
	"strings"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
	"go.mongodb.org/ops-manager/opsmngr"
)

var inviteTemplate = "The user '{{.Username}}' has been invited.\nInvited users do not have access to the project until they accept the invitation.\n"

type InviteOpts struct {
	cli.OutputOpts
	cli.InputOpts
	username     string
	password     string
	country      string
	email        string
	mobile       string
	firstName    string
	lastName     string
	orgRoles     []string
	projectRoles []string
	store        store.UserCreator
}

func (opts *InviteOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *InviteOpts) newUserRequest() (*store.UserRequest, error) {
	atlasRoles, err := opts.createAtlasRole()
	if err != nil {
		return nil, err
	}

	userRoles, err := opts.createUserRole()
	if err != nil {
		return nil, err
	}

	user := &store.UserRequest{
		AtlasRoles: atlasRoles,
		User: &opsmngr.User{
			Username:     opts.username,
			Password:     opts.password,
			FirstName:    opts.firstName,
			LastName:     opts.lastName,
			EmailAddress: opts.email,
			MobileNumber: opts.mobile,
			Country:      opts.country,
			Roles:        userRoles,
		},
	}

	return user, nil
}

func (opts *InviteOpts) Run() error {
	user, err := opts.newUserRequest()
	if err != nil {
		return err
	}

	r, err := opts.store.CreateUser(user)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

const keyParts = 2

func (opts *InviteOpts) createAtlasRole() ([]atlas.AtlasRole, error) {
	if !config.IsCloud() {
		return nil, nil
	}

	atlasRoles := make([]atlas.AtlasRole, len(opts.orgRoles)+len(opts.projectRoles))

	i := 0
	for _, role := range opts.orgRoles {
		atlasRole, err := newAtlasOrgRole(role)
		if err != nil {
			return nil, err
		}
		atlasRoles[i] = atlasRole
		i++
	}

	for _, role := range opts.projectRoles {
		atlasRole, err := newAtlasProjectRole(role)
		if err != nil {
			return nil, err
		}
		atlasRoles[i] = atlasRole
		i++
	}

	return atlasRoles, nil
}

func (opts *InviteOpts) createUserRole() ([]*opsmngr.UserRole, error) {
	if config.IsCloud() {
		return nil, nil
	}

	roles := make([]*opsmngr.UserRole, len(opts.orgRoles)+len(opts.projectRoles))

	i := 0
	for _, role := range opts.orgRoles {
		userRole, err := newUserOrgRole(role)
		if err != nil {
			return nil, err
		}
		roles[i] = userRole
		i++
	}

	for _, role := range opts.projectRoles {
		userRole, err := newUserProjectRole(role)
		if err != nil {
			return nil, err
		}
		roles[i] = userRole
		i++
	}

	return roles, nil
}

func (opts *InviteOpts) Prompt() error {
	if opts.password != "" {
		return nil
	}

	if !opts.IsTerminalInput() {
		_, err := fmt.Fscanln(opts.InReader, &opts.password)
		return err
	}

	prompt := &survey.Password{
		Message: "Password:",
	}
	return survey.AskOne(prompt, &opts.password)
}

func splitRole(role string) ([]string, error) {
	value := strings.Split(role, ":")
	if len(value) != keyParts {
		return nil, fmt.Errorf("unexpected role format: %s", role)
	}
	return value, nil
}

func newUserOrgRole(role string) (*opsmngr.UserRole, error) {
	value, err := splitRole(role)
	if err != nil {
		return nil, err
	}
	userRole := &opsmngr.UserRole{
		OrgID:    value[0],
		RoleName: strings.ToUpper(value[1]),
	}

	return userRole, nil
}

func newUserProjectRole(role string) (*opsmngr.UserRole, error) {
	value, err := splitRole(role)
	if err != nil {
		return nil, err
	}
	userRole := &opsmngr.UserRole{
		GroupID:  value[0],
		RoleName: strings.ToUpper(value[1]),
	}

	return userRole, nil
}

func newAtlasProjectRole(role string) (atlas.AtlasRole, error) {
	value, err := splitRole(role)
	if err != nil {
		return atlas.AtlasRole{}, err
	}
	atlasRole := atlas.AtlasRole{
		GroupID:  value[0],
		RoleName: strings.ToUpper(value[1]),
	}

	return atlasRole, nil
}

func newAtlasOrgRole(role string) (atlas.AtlasRole, error) {
	value, err := splitRole(role)
	if err != nil {
		return atlas.AtlasRole{}, err
	}
	atlasRole := atlas.AtlasRole{
		OrgID:    value[0],
		RoleName: strings.ToUpper(value[1]),
	}
	return atlasRole, nil
}

// mongocli iam users(s) invite --username username --password password --country country --email email
// --mobile mobile --firstName firstName --lastName lastName --team team1,team2 --orgRoles orgID:ROLE_NAME
// --projectRoles projectID:ROLE_NAME

func InviteBuilder() *cobra.Command {
	opts := &InviteOpts{}
	opts.Template = inviteTemplate
	cmd := &cobra.Command{
		Use:   "invite",
		Short: "Invite a user.",
		Args:  require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			opts.InitInput(cmd.InOrStdin())
			if config.Service() != config.OpsManagerService {
				_ = cmd.MarkFlagRequired(flag.Country)
			}
			return opts.initStore(cmd.Context())()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			if err := opts.Prompt(); err != nil {
				return err
			}
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.username, flag.Username, "", usage.Username)
	cmd.Flags().StringVar(&opts.password, flag.Password, "", usage.Password)
	cmd.Flags().StringVar(&opts.country, flag.Country, "", usage.Country)
	cmd.Flags().StringVar(&opts.email, flag.Email, "", usage.Email)
	cmd.Flags().StringVar(&opts.mobile, flag.Mobile, "", usage.Mobile)
	cmd.Flags().StringVar(&opts.firstName, flag.FirstName, "", usage.FirstName)
	cmd.Flags().StringVar(&opts.lastName, flag.LastName, "", usage.LastName)
	cmd.Flags().StringSliceVar(&opts.orgRoles, flag.OrgRole, []string{}, usage.OrgRole)
	cmd.Flags().StringSliceVar(&opts.projectRoles, flag.ProjectRole, []string{}, usage.ProjectRole)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Username)
	_ = cmd.MarkFlagRequired(flag.Email)
	_ = cmd.MarkFlagRequired(flag.FirstName)
	_ = cmd.MarkFlagRequired(flag.LastName)

	return cmd
}
