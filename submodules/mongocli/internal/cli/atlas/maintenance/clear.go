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

package maintenance

import (
	"context"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/prompt"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

type ClearOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	Confirm bool
	store   store.MaintenanceWindowClearer
}

func (opts *ClearOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var clearTemplate = "Maintenance window removed.\n"

func (opts *ClearOpts) Run() error {
	err := opts.store.ClearMaintenanceWindow(opts.ConfigProjectID())
	if err != nil {
		return err
	}

	return opts.Print(nil)
}

// Prompt confirms that the resource should be deleted.
func (opts *ClearOpts) Prompt() error {
	if opts.Confirm {
		return nil
	}

	p := prompt.NewDeleteConfirm("maintenance window")
	return survey.AskOne(p, &opts.Confirm)
}

// mongocli atlas maintenanceWindow(s) clear [--projectId projectId].
func ClearBuilder() *cobra.Command {
	opts := &ClearOpts{}
	cmd := &cobra.Command{
		Use:     "clear",
		Short:   "Clear the maintenance window.",
		Aliases: []string{"rm", "delete"},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), clearTemplate),
				opts.Prompt,
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().BoolVar(&opts.Confirm, flag.Force, false, usage.Force)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
