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

package options

import (
	"errors"
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/prompt"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/atlas/mongodbatlas"
)

type LiveMigrationsOpts struct {
	cli.OutputOpts
	cli.InputOpts
	cli.GlobalOpts
	DestinationClusterName      string
	DestinationDropEnabled      bool
	MigrationHosts              []string
	SourceCACertificatePath     string
	SourceClusterName           string
	SourceProjectID             string
	SourceSSL                   bool
	SourceManagedAuthentication bool
	SourceUsername              string
	SourcePassword              string
}

func (opts *LiveMigrationsOpts) NewCreateRequest() *mongodbatlas.LiveMigration {
	return &mongodbatlas.LiveMigration{
		Source: &mongodbatlas.Source{
			ClusterName:           opts.SourceClusterName,
			GroupID:               opts.SourceProjectID,
			Username:              opts.SourceUsername,
			Password:              opts.SourcePassword,
			SSL:                   &opts.SourceSSL,
			CACertificatePath:     opts.SourceCACertificatePath,
			ManagedAuthentication: &opts.SourceManagedAuthentication,
		},
		Destination: &mongodbatlas.Destination{
			ClusterName: opts.DestinationClusterName,
			GroupID:     opts.ConfigProjectID(),
		},
		MigrationHosts: opts.MigrationHosts,
		DropEnabled:    &opts.DestinationDropEnabled,
	}
}

func (opts *LiveMigrationsOpts) askDestinationDropConfirm() error {
	if !opts.DestinationDropEnabled {
		return nil
	}
	confirmDrop := false
	p := prompt.NewConfirm("Are you sure you want to drop the destination collections?")

	if err := survey.AskOne(p, &confirmDrop); err != nil {
		return err
	}

	if !confirmDrop {
		return errors.New("user-aborted. Not dropping destination collections")
	}
	return nil
}

func (opts *LiveMigrationsOpts) askPassword() error {
	if opts.SourceManagedAuthentication {
		return nil
	}
	if opts.SourcePassword != "" {
		return nil
	}

	if !opts.IsTerminalInput() {
		if _, err := fmt.Fscanln(opts.InReader, &opts.SourcePassword); err != nil {
			return err
		}
	} else {
		p := &survey.Password{
			Message: "Password:",
		}
		if err := survey.AskOne(p, &opts.SourcePassword); err != nil {
			return err
		}
	}
	if opts.SourcePassword == "" {
		return errors.New("no password provided")
	}
	return nil
}

func (opts *LiveMigrationsOpts) Prompt() error {
	if err := opts.askDestinationDropConfirm(); err != nil {
		return err
	}

	return opts.askPassword()
}

func (opts *LiveMigrationsOpts) Validate() error {
	if err := opts.ValidateOrgID(); err != nil {
		return err
	}

	if err := opts.ValidateProjectID(); err != nil {
		return err
	}

	if opts.SourceManagedAuthentication && opts.SourceUsername != "" {
		return fmt.Errorf("--%s and --%s are exclusive", flag.LiveMigrationSourceManagedAuthentication, flag.LiveMigrationSourceUsername)
	}
	if !opts.SourceManagedAuthentication && opts.SourceUsername == "" {
		return fmt.Errorf("MongoDB Automation is not managing authentication, --%s must be set", flag.LiveMigrationSourceUsername)
	}
	if opts.SourceCACertificatePath != "" {
		opts.SourceSSL = true
	}
	return nil
}

func (opts *LiveMigrationsOpts) GenerateFlags(cmd *cobra.Command) {
	cmd.Flags().StringVar(&opts.OrgID, flag.OrgID, "", usage.OrgID)
	cmd.Flags().StringVar(&opts.SourceClusterName, flag.LiveMigrationSourceClusterName, "", usage.LiveMigrationSourceClusterName)
	cmd.Flags().StringVar(&opts.SourceProjectID, flag.LiveMigrationSourceProjectID, "", usage.LiveMigrationSourceProjectID)
	cmd.Flags().StringVarP(&opts.SourceUsername, flag.LiveMigrationSourceUsername, flag.UsernameShort, "", usage.LiveMigrationSourceUsername)
	cmd.Flags().StringVarP(&opts.SourcePassword, flag.LiveMigrationSourcePassword, flag.PasswordShort, "", usage.LiveMigrationSourcePassword)
	cmd.Flags().BoolVar(&opts.SourceSSL, flag.LiveMigrationSourceSSL, false, usage.LiveMigrationSourceSSL)
	cmd.Flags().StringVar(&opts.SourceCACertificatePath, flag.LiveMigrationSourceCACertificatePath, "", usage.LiveMigrationSourceCACertificatePath)
	cmd.Flags().BoolVar(&opts.SourceManagedAuthentication, flag.LiveMigrationSourceManagedAuthentication, false, usage.LiveMigrationSourceManagedAuthentication)
	cmd.Flags().StringVar(&opts.DestinationClusterName, flag.ClusterName, "", usage.LiveMigrationDestinationClusterName)
	cmd.Flags().StringSliceVar(&opts.MigrationHosts, flag.LiveMigrationHost, []string{}, usage.LiveMigrationHostEntries)
	cmd.Flags().BoolVar(&opts.DestinationDropEnabled, flag.LiveMigrationDropCollections, false, usage.LiveMigrationDropCollections)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.LiveMigrationSourceClusterName)
	_ = cmd.MarkFlagRequired(flag.LiveMigrationSourceProjectID)
	_ = cmd.MarkFlagRequired(flag.ClusterName)
	_ = cmd.MarkFlagRequired(flag.LiveMigrationHost)
}
