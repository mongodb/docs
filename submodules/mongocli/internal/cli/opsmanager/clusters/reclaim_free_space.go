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

package clusters

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
	"go.mongodb.org/ops-manager/atmcfg"
)

type ReclaimFreeSpaceOpts struct {
	cli.GlobalOpts
	confirm     bool
	clusterName string
	timestamp   string
	processes   []string
	store       store.AutomationPatcher
}

func (opts *ReclaimFreeSpaceOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *ReclaimFreeSpaceOpts) Run() error {
	current, err := opts.store.GetAutomationConfig(opts.ConfigProjectID())
	if err != nil {
		return err
	}

	err = atmcfg.ReclaimFreeSpaceForProcessesByClusterName(current, opts.clusterName, opts.timestamp, opts.processes)
	if err != nil {
		return err
	}

	if err := opts.store.UpdateAutomationConfig(opts.ConfigProjectID(), current); err != nil {
		return err
	}

	fmt.Print(cli.DeploymentStatus(config.OpsManagerURL(), opts.ConfigProjectID()))

	return nil
}

func (opts *ReclaimFreeSpaceOpts) Confirm() error {
	if opts.confirm {
		return nil
	}

	process := opts.clusterName

	if len(opts.processes) > 0 {
		process = fmt.Sprintf("%s (%s)", opts.clusterName, strings.Join(opts.processes, ", "))
	}

	prompt := &survey.Confirm{
		Message: fmt.Sprintf("Are you sure you want to reclaim free space for: %s", process),
	}
	return survey.AskOne(prompt, &opts.confirm)
}

// mongocli cloud-manager cluster(s) reclaimFreeSpace|rfs <clusterName> [--processName process1,process2...][--timestamp timestamp] [--force].
func ReclaimFreeSpaceBuilder() *cobra.Command {
	opts := &ReclaimFreeSpaceOpts{}
	cmd := &cobra.Command{
		Use:     "reclaimFreeSpace <clusterName>",
		Short:   "Reclaim unused space for a cluster.",
		Aliases: []string{"rfs"},
		Args:    require.ExactArgs(1),
		Annotations: map[string]string{
			"args":            "clusterName",
			"clusterNameDesc": "Name of the cluster for which you want to reclaim free space.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if err := opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context())); err != nil {
				return err
			}
			opts.clusterName = args[0]
			return opts.Confirm()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringSliceVar(&opts.processes, flag.ProcessName, []string{}, usage.ProcessName)
	cmd.Flags().BoolVar(&opts.confirm, flag.Force, false, usage.Force)
	cmd.Flags().StringVar(&opts.timestamp, flag.Timestamp, "", usage.ReclaimFreeSpaceTimestamp)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	return cmd
}
