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

package validation

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli/atlas/livemigrations/options"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/spf13/cobra"
)

type CreateOpts struct {
	options.LiveMigrationsOpts
	store store.LiveMigrationValidationsCreator
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplate = `ID	PROJECT ID	SOURCE PROJECT ID	STATUS
{{.ID}}	{{.GroupID}}	{{.SourceGroupID}}	{{.Status}}`

func (opts *CreateOpts) Run() error {
	if err := opts.Prompt(); err != nil {
		return err
	}

	createRequest := opts.LiveMigrationsOpts.NewCreateRequest()

	r, err := opts.store.CreateValidation(opts.LiveMigrationsOpts.ConfigProjectID(), createRequest)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli atlas liveMigrations|lm validation create --clusterName clusterName --migrationHosts hosts --sourceClusterName clusterName --sourceProjectId projectId [--sourceSSL] [--sourceCACertificatePath path] [--sourceManagedAuthentication] [--sourceUsername userName] [--sourcePassword password] [--drop] [--projectId projectId].
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{}
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create one new validation request.",
		Long:  "Your API Key must have the Organization Owner role to successfully run this command.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplate),
				opts.InitInput(cmd.InOrStdin()),
				opts.Validate,
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	opts.GenerateFlags(cmd)

	return cmd
}
