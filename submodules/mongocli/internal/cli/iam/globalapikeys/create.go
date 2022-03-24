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

package globalapikeys

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

const createTemplate = `API Key '{{.ID}}' created.
Public API Key {{.PublicKey}}
Private API Key {{.PrivateKey}}
`

type CreateOpts struct {
	cli.OutputOpts
	desc  string
	roles []string
	store store.GlobalAPIKeyCreator
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *CreateOpts) newAPIKeyInput() *atlas.APIKeyInput {
	return &atlas.APIKeyInput{
		Desc:  opts.desc,
		Roles: opts.roles,
	}
}

func (opts *CreateOpts) Run() error {
	r, err := opts.store.CreateGlobalAPIKey(opts.newAPIKeyInput())

	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli iam globalApiKey(s) create [--role role][--desc description].
func CreateBuilder() *cobra.Command {
	opts := new(CreateOpts)
	opts.Template = createTemplate
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create a Global API Key.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			return opts.initStore(cmd.Context())()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringSliceVar(&opts.roles, flag.Role, []string{}, usage.APIKeyRoles)
	cmd.Flags().StringVar(&opts.desc, flag.Description, "", usage.APIKeyDescription)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Description)
	_ = cmd.MarkFlagRequired(flag.Role)

	return cmd
}
