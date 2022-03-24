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

	"github.com/mongodb/mongocli/internal/cli"
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
	alertType   []string
	startDate   string
	endDate     string
	description string
	store       store.OpsManagerMaintenanceWindowCreator
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplate = "Maintenance window '{{.ID}}' successfully created.\n"

func (opts *CreateOpts) Run() error {
	r, err := opts.store.CreateOpsManagerMaintenanceWindow(opts.ConfigProjectID(), opts.newMaintenanceWindow())
	if err != nil {
		return err
	}
	return opts.Print(r)
}

func (opts *CreateOpts) newMaintenanceWindow() *opsmngr.MaintenanceWindow {
	return &opsmngr.MaintenanceWindow{
		StartDate:      opts.startDate,
		EndDate:        opts.endDate,
		AlertTypeNames: opts.alertType,
		Description:    opts.description,
	}
}

// mongocli ops-manager maintenanceWindows create --startDate startDate --endDate endDate --alertType alertType --desc desc [--projectId projectId].
func CreateBuilder() *cobra.Command {
	opts := new(CreateOpts)
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create a maintenance window.",
		Args:  cobra.OnlyValidArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.startDate, flag.StartDate, "", usage.StartDate)
	cmd.Flags().StringVar(&opts.endDate, flag.EndDate, "", usage.EndDate)
	cmd.Flags().StringSliceVar(&opts.alertType, flag.AlertType, []string{}, usage.AlertType)
	cmd.Flags().StringVar(&opts.description, flag.Description, "", usage.MaintenanceDescription)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.StartDate)
	_ = cmd.MarkFlagRequired(flag.EndDate)
	_ = cmd.MarkFlagRequired(flag.AlertType)

	return cmd
}
