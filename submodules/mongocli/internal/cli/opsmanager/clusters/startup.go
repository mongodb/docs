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
	"strings"

	"github.com/AlecAivazis/survey/v2"
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

type StartupOpts struct {
	cli.GlobalOpts
	clusterName string
	confirm     bool
	processes   []string
	store       store.AutomationPatcher
}

func (opts *StartupOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *StartupOpts) Run() error {
	if !opts.confirm {
		return nil
	}
	current, err := opts.store.GetAutomationConfig(opts.ConfigProjectID())
	if err != nil {
		return err
	}

	if !search.ClusterExists(current, opts.clusterName) {
		return fmt.Errorf("cluster '%s' doesn't exist", opts.clusterName)
	}

	err = atmcfg.StartupProcessesByClusterName(current, opts.clusterName, opts.processes)
	if err != nil {
		return err
	}

	if err := opts.store.UpdateAutomationConfig(opts.ConfigProjectID(), current); err != nil {
		return err
	}

	fmt.Print(cli.DeploymentStatus(config.OpsManagerURL(), opts.ConfigProjectID()))

	return nil
}

func (opts *StartupOpts) Confirm() error {
	if opts.confirm {
		return nil
	}

	startupProcess := opts.clusterName

	if len(opts.processes) > 0 {
		startupProcess = fmt.Sprintf("%s (%s)", opts.clusterName, strings.Join(opts.processes, ", "))
	}

	prompt := &survey.Confirm{
		Message: fmt.Sprintf("Are you sure you want to startup: %s", startupProcess),
	}
	return survey.AskOne(prompt, &opts.confirm)
}

// mongocli cloud-manager cluster(s) startup <clusterName> --process hostname:port,hostname2:port2 --projectId projectId [--force].
func StartupBuilder() *cobra.Command {
	opts := &StartupOpts{}
	cmd := &cobra.Command{
		Use:   "startup <clusterName>",
		Short: "Start up a cluster for your project.",
		Args:  require.ExactArgs(1),
		Annotations: map[string]string{
			"args":            "clusterName",
			"clusterNameDesc": "Name of the cluster that you want to start.",
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

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	return cmd
}
