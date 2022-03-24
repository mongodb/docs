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

package ldap

import (
	"context"
	"errors"
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type SaveOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	cli.InputOpts
	hostname              string
	port                  int
	bindUsername          string
	bindPassword          string
	caCertificate         string
	authzQueryTemplate    string
	mappingMatch          string
	mappingLdapQuery      string
	mappingSubstitution   string
	authenticationEnabled bool
	authorizationEnabled  bool
	store                 store.LDAPConfigurationSaver
}

func (opts *SaveOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var saveTemplate = `HOSTNAME	PORT	AUTHENTICATION	AUTHORIZATION
{{.LDAP.Hostname}}	{{.LDAP.Port}}	{{.LDAP.AuthenticationEnabled}}	{{.LDAP.AuthorizationEnabled}}
`

func (opts *SaveOpts) Run() error {
	r, err := opts.store.SaveLDAPConfiguration(opts.ConfigProjectID(), opts.newLDAPConfiguration())
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *SaveOpts) Prompt() error {
	if opts.bindPassword != "" {
		return nil
	}

	if !opts.IsTerminalInput() {
		_, err := fmt.Fscanln(opts.InReader, &opts.bindPassword)
		return err
	}

	prompt := &survey.Password{
		Message: "Password:",
	}

	return survey.AskOne(prompt, &opts.bindPassword)
}

func (opts *SaveOpts) validate() error {
	if opts.mappingMatch != "" {
		if opts.mappingLdapQuery == "" && opts.mappingSubstitution == "" {
			return errors.New("must supply either a query or a substitution for userToDNMapping")
		}
		if opts.mappingLdapQuery != "" && opts.mappingSubstitution != "" {
			return errors.New("can't supply both a query and a substitution for userToDNMapping")
		}
	}

	return nil
}

func (opts *SaveOpts) newLDAPConfiguration() *atlas.LDAPConfiguration {
	ldapConfig := &atlas.LDAPConfiguration{
		LDAP: &atlas.LDAP{
			AuthenticationEnabled: opts.authenticationEnabled,
			AuthorizationEnabled:  opts.authorizationEnabled,
			Hostname:              opts.hostname,
			Port:                  opts.port,
			UserToDNMapping:       []*atlas.UserToDNMapping{},
			BindUsername:          opts.bindUsername,
			BindPassword:          opts.bindPassword,
			CaCertificate:         opts.caCertificate,
			AuthzQueryTemplate:    opts.authzQueryTemplate,
		},
	}
	if opts.mappingMatch != "" {
		ldapConfig.LDAP.UserToDNMapping = append(ldapConfig.LDAP.UserToDNMapping, &atlas.UserToDNMapping{Match: opts.mappingMatch, LDAPQuery: opts.mappingLdapQuery, Substitution: opts.mappingSubstitution})
	}
	return ldapConfig
}

// mongocli atlas security ldap save --hostname hostname --port port --bindUsername bindUsername --bindPassword bindPassword --caCertificate caCertificate
// --authzQueryTemplate authzQueryTemplate [--mappingMatch mappingMatch (--mappingLdapQuery mappingLdapQuery | --mappingSubstitution mappingSubstitution)]
// --authenticationEnabled authenticationEnabled --authorizationEnabled authorizationEnabled [--projectId projectId].
func SaveBuilder() *cobra.Command {
	opts := &SaveOpts{}
	cmd := &cobra.Command{
		Use:   "save",
		Short: "Save an LDAP configuration.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.validate,
				opts.InitOutput(cmd.OutOrStdout(), saveTemplate),
				opts.InitInput(cmd.InOrStdin()))
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.hostname, flag.Hostname, "", usage.LDAPHostname)
	cmd.Flags().IntVar(&opts.port, flag.Port, defaultLDAPPort, usage.LDAPPort)
	cmd.Flags().StringVar(&opts.bindUsername, flag.BindUsername, "", usage.BindUsername)
	cmd.Flags().StringVar(&opts.bindPassword, flag.BindPassword, "", usage.BindPassword)
	cmd.Flags().StringVar(&opts.caCertificate, flag.CaCertificate, "", usage.CaCertificate)
	cmd.Flags().StringVar(&opts.authzQueryTemplate, flag.AuthzQueryTemplate, "", usage.AuthzQueryTemplate)
	cmd.Flags().StringVar(&opts.mappingMatch, flag.MappingMatch, "", usage.MappingMatch)
	cmd.Flags().StringVar(&opts.mappingLdapQuery, flag.MappingLdapQuery, "", usage.MappingLdapQuery)
	cmd.Flags().StringVar(&opts.mappingSubstitution, flag.MappingSubstitution, "", usage.MappingSubstitution)
	cmd.Flags().BoolVar(&opts.authenticationEnabled, flag.AuthenticationEnabled, false, usage.AuthenticationEnabled)
	cmd.Flags().BoolVar(&opts.authorizationEnabled, flag.AuthorizationEnabled, false, usage.AuthorizationEnabled)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Hostname)
	_ = cmd.MarkFlagRequired(flag.BindUsername)

	return cmd
}
