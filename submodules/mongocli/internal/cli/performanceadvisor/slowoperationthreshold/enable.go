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
package slowoperationthreshold

import (
	"context"
	"fmt"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

const EnableTemplate = `Atlas management of the slow operation enabled
`

type EnableOpts struct {
	cli.GlobalOpts
	store store.PerformanceAdvisorSlowOperationThresholdEnabler
}

func (opts *EnableOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *EnableOpts) Run() error {
	if err := opts.store.EnablePerformanceAdvisorSlowOperationThreshold(opts.ConfigProjectID()); err != nil {
		return err
	}

	fmt.Print(EnableTemplate)
	return nil
}

// mongocli atlas performanceAdvisor sot enable  [--projectId projectId].
func EnableBuilder() *cobra.Command {
	opts := new(EnableOpts)
	cmd := &cobra.Command{
		Use:     "enable",
		Short:   "Enable the application-managed slow operation threshold for your project.",
		Long:    "The slow operation threshold determines which operations are flagged by the Performance Advisor and Query Profiler. When enabled, the application uses the average execution time for operations on your cluster to determine slow-running queries. As a result, the threshold is more pertinent to your cluster workload. Application-managed slow operation threshold is enabled by default for dedicated clusters (M10+).",
		Aliases: []string{"ls"},
		Args:    require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	return cmd
}
