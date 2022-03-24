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

package owner

import (
	"context"
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/ops-manager/opsmngr"
)

type CreateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	cli.InputOpts
	email     string
	password  string
	firstName string
	lastName  string
	accessIps []string
	store     store.OwnerCreator
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.UnauthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplate = `Owner successfully created.
{{if .APIKey}}Personal API Key: {{.APIKey}}{{end}}
{{- if .ProgrammaticAPIKey}}
Public API Key: {{.ProgrammaticAPIKey.PublicKey}}
Private API Key: {{.ProgrammaticAPIKey.PrivateKey}}
{{- end}}
`

func (opts *CreateOpts) Run() error {
	user := opts.newOwner()
	r, err := opts.store.CreateOwner(user, opts.accessIps)

	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *CreateOpts) newOwner() *opsmngr.User {
	user := &opsmngr.User{
		Username:     opts.email,
		Password:     opts.password,
		FirstName:    opts.firstName,
		LastName:     opts.lastName,
		EmailAddress: opts.email,
		Links:        nil,
	}
	return user
}

func (opts *CreateOpts) Prompt() error {
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

// CreateBuilder mongocli ops-manager owner create --email username --password password --firstName firstName --lastName lastName --accessListIp <IP>.
func CreateBuilder() *cobra.Command {
	opts := new(CreateOpts)
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create the first user for Ops Manager.",
		Long:  "Create the first user for Ops Manager. Use this command to automate Ops Manager Installations.",
		Args:  require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if err := opts.PreRunE(
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplate),
				opts.InitInput(cmd.InOrStdin())); err != nil {
				return err
			}

			return opts.Prompt()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.email, flag.Email, "", usage.Email)
	cmd.Flags().StringVarP(&opts.password, flag.Password, flag.PasswordShort, "", usage.Password)
	cmd.Flags().StringVar(&opts.firstName, flag.FirstName, "", usage.FirstName)
	cmd.Flags().StringVar(&opts.lastName, flag.LastName, "", usage.LastName)
	cmd.Flags().StringSliceVar(&opts.accessIps, flag.AccessListIP, []string{}, usage.AccessListIps)
	cmd.Flags().StringSliceVar(&opts.accessIps, flag.WhitelistIP, []string{}, usage.AccessListIps)
	_ = cmd.Flags().MarkDeprecated(flag.WhitelistIP, fmt.Sprintf("please use --%s instead", flag.AccessListIP))

	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Email)
	_ = cmd.MarkFlagRequired(flag.FirstName)
	_ = cmd.MarkFlagRequired(flag.LastName)

	return cmd
}
