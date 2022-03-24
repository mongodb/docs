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

package clusters

import (
	"context"
	"fmt"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/search"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/ops-manager/atmcfg"
)

type UnmanageOpts struct {
	cli.GlobalOpts
	*cli.DeleteOpts
	store store.AutomationPatcher
}

func (opts *UnmanageOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *UnmanageOpts) Run() error {
	if !opts.Confirm {
		return nil
	}
	current, err := opts.store.GetAutomationConfig(opts.ConfigProjectID())

	if err != nil {
		return err
	}

	if !search.ClusterExists(current, opts.Entry) {
		return fmt.Errorf("cluster '%s' doesn't exist", opts.Entry)
	}

	atmcfg.RemoveByClusterName(current, opts.Entry)

	if err := opts.store.UpdateAutomationConfig(opts.ConfigProjectID(), current); err != nil {
		return err
	}

	fmt.Print(cli.DeploymentStatus(config.OpsManagerURL(), opts.ConfigProjectID()))

	return nil
}

// mongocli cloud-manager cluster(s) unmanage <name> --projectId projectId [--force].
func UnmanageBuilder() *cobra.Command {
	opts := &UnmanageOpts{
		DeleteOpts: cli.NewDeleteOpts("", "Cluster not deleted\""),
	}
	cmd := &cobra.Command{
		Use:     "unmanage <name>",
		Aliases: []string{"rm"},
		Short:   "Stop managing a cluster via automation.",
		Long:    "This commands only removes entries from the automation config but does not actually remove a cluster.",
		Args:    require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if err := opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context())); err != nil {
				return err
			}
			opts.Entry = args[0]
			return opts.Prompt()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().BoolVar(&opts.Confirm, flag.Force, false, usage.Force)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	return cmd
}
