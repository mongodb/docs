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

package dbusers

import (
	"context"
	"errors"
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/convert"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/mongodb/mongocli/internal/validate"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type CreateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	cli.InputOpts
	username    string
	password    string
	x509Type    string
	awsIamType  string
	ldapType    string
	deleteAfter string
	roles       []string
	scopes      []string
	store       store.DatabaseUserCreator
}

const (
	user             = "USER"
	role             = "ROLE"
	group            = "GROUP"
	X509TypeManaged  = "MANAGED"
	X509TypeCustomer = "CUSTOMER"
	none             = "NONE"
	createTemplate   = "Database user '{{.Username}}' successfully created.\n"
)

var (
	validX509Flags   = []string{none, X509TypeManaged, X509TypeCustomer}
	validAWSIAMFlags = []string{none, role, user}
	validLDAPFlags   = []string{none, group, user}
)

func (opts *CreateOpts) isX509Set() bool {
	return opts.x509Type != "" && opts.x509Type != none
}

func (opts *CreateOpts) isAWSIAMSet() bool {
	return opts.awsIamType != "" && opts.awsIamType != none
}

func (opts *CreateOpts) isLDAPSet() bool {
	return opts.ldapType != "" && opts.ldapType != none
}

func (opts *CreateOpts) isExternal() bool {
	return opts.isX509Set() || opts.isAWSIAMSet() || opts.isLDAPSet()
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *CreateOpts) Run() error {
	user := opts.newDatabaseUser()

	r, err := opts.store.CreateDatabaseUser(user)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *CreateOpts) newDatabaseUser() *atlas.DatabaseUser {
	authDB := convert.AdminDB

	if opts.isExternal() && opts.ldapType != group {
		authDB = convert.ExternalAuthDB
	}

	return &atlas.DatabaseUser{
		Roles:           convert.BuildAtlasRoles(opts.roles),
		Scopes:          convert.BuildAtlasScopes(opts.scopes),
		GroupID:         opts.ConfigProjectID(),
		Username:        opts.username,
		Password:        opts.password,
		X509Type:        opts.x509Type,
		AWSIAMType:      opts.awsIamType,
		LDAPAuthType:    opts.ldapType,
		DeleteAfterDate: opts.deleteAfter,
		DatabaseName:    authDB,
	}
}

func (opts *CreateOpts) Prompt() error {
	if opts.isExternal() || opts.password != "" {
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

func (opts *CreateOpts) validate() error {
	if len(opts.roles) == 0 {
		return errors.New("missing role for the user")
	}

	if opts.isExternal() && opts.password != "" {
		return errors.New("can't supply both $external authentication and password")
	}

	// a && (b || c) || (b && c): check if at least two are true
	if opts.isAWSIAMSet() && (opts.isX509Set() || opts.isLDAPSet()) || (opts.isX509Set() && opts.isLDAPSet()) {
		return errors.New("can't supply more than one $external type")
	}

	if err := validate.FlagInSlice(opts.x509Type, flag.X509Type, validX509Flags); err != nil {
		return err
	}
	if err := validate.FlagInSlice(opts.awsIamType, flag.AWSIAMType, validAWSIAMFlags); err != nil {
		return err
	}
	return validate.FlagInSlice(opts.ldapType, flag.LDAPType, validLDAPFlags)
}

// mongocli atlas dbuser(s) create
//		--username username --password password
//		--role roleName@dbName
// 		--scope resourceName@resourceType
//		[--projectId projectId]
//		[--x509Type NONE|MANAGED|CUSTOMER]
//		[--awsIAMType NONE|ROLE|USER]
//		[--ldapType NONE|USER|GROUP]
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{}
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create a database user for your project.",
		Example: `  
  Create an Atlas admin user
  $ mongocli atlas dbuser create atlasAdmin --username <username>  --projectId <projectId>

  Create user with read/write access to any database
  $ mongocli atlas dbuser create readWriteAnyDatabase --username <username> --projectId <projectId>

  Create user with multiple roles 
  $ mongocli atlas dbuser create --username <username> --role clusterMonitor,backup --projectId <projectId>

  Create user with multiple scopes 
  $ mongocli atlas dbuser create --username <username> --role clusterMonitor --scope clusterName:CLUSTER,DataLakeName:DATA_LAKE --projectId <projectId>
`,
		Args:      cobra.OnlyValidArgs,
		ValidArgs: []string{"atlasAdmin", "readWriteAnyDatabase", "readAnyDatabase", "clusterMonitor", "backup", "dbAdminAnyDatabase", "enableSharding"},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.roles = append(opts.roles, args...)

			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplate),
				opts.InitInput(cmd.InOrStdin()),
				opts.validate,
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			if err := opts.Prompt(); err != nil {
				return err
			}
			return opts.Run()
		},
	}

	cmd.Flags().StringVarP(&opts.username, flag.Username, flag.UsernameShort, "", usage.DBUsername)
	cmd.Flags().StringVarP(&opts.password, flag.Password, flag.PasswordShort, "", usage.Password)
	cmd.Flags().StringVar(&opts.deleteAfter, flag.DeleteAfter, "", usage.BDUsersDeleteAfter)
	cmd.Flags().StringSliceVar(&opts.roles, flag.Role, []string{}, usage.Roles)
	cmd.Flags().StringSliceVar(&opts.scopes, flag.Scope, []string{}, usage.Scopes)
	cmd.Flags().StringVar(&opts.x509Type, flag.X509Type, none, usage.X509Type)
	cmd.Flags().StringVar(&opts.awsIamType, flag.AWSIAMType, none, usage.AWSIAMType)
	cmd.Flags().StringVar(&opts.ldapType, flag.LDAPType, none, usage.LDAPType)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Username)

	return cmd
}
