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

package logs

import (
	"context"
	"fmt"
	"strings"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/search"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/ops-manager/opsmngr"
)

type JobsCollectOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	resourceType              string
	resourceName              string
	logTypes                  []string
	sizeRequestedPerFileBytes int64
	redacted                  bool
	store                     store.LogCollector
}

func (opts *JobsCollectOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var collectTemplate = "Log collection job '{{.ID}}' started successfully.\n"

func (opts *JobsCollectOpts) Run() error {
	r, err := opts.store.Collect(opts.ConfigProjectID(), opts.newLog())
	if err != nil {
		return err
	}
	return opts.Print(r)
}

func (opts *JobsCollectOpts) newLog() *opsmngr.LogCollectionJob {
	return &opsmngr.LogCollectionJob{
		ResourceType:              opts.resourceType,
		ResourceName:              opts.resourceName,
		Redacted:                  &opts.redacted,
		SizeRequestedPerFileBytes: opts.sizeRequestedPerFileBytes,
		LogTypes:                  opts.logTypes,
	}
}

// mongocli om logs jobs collect <resourceType> <resourceName> --sizeRequestedPerFileBytes size --type type --redacted redacted [--projectId projectId].
func JobsCollectOptsBuilder() *cobra.Command {
	const argsN = 2
	opts := &JobsCollectOpts{}
	cmd := &cobra.Command{
		Use:   "collect <resourceType> <resourceName>",
		Short: "Start a job to collect logs for your project.",
		Args: func(cmd *cobra.Command, args []string) error {
			if len(args) != argsN {
				return fmt.Errorf("accepts %d arg(s), received %d", argsN, len(args))
			}

			args[0] = strings.ToLower(args[0])
			if !search.StringInSlice(cmd.ValidArgs, args[0]) {
				return fmt.Errorf("invalid resource type '%s', expected one of %v", args[0], cmd.ValidArgs)
			}
			return nil
		},
		ValidArgs: []string{"cluster", "process", "replicaset"},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), collectTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.resourceType = args[0]
			opts.resourceName = args[1]
			return opts.Run()
		},
	}

	cmd.Flags().StringSliceVar(&opts.logTypes, flag.Type, []string{}, usage.LogTypes)
	cmd.Flags().Int64Var(&opts.sizeRequestedPerFileBytes, flag.SizeRequestedPerFileBytes, 0, usage.SizeRequestedPerFileBytes)
	cmd.Flags().BoolVar(&opts.redacted, flag.Redacted, false, usage.LogRedacted)

	_ = cmd.MarkFlagRequired(flag.SizeRequestedPerFileBytes)
	_ = cmd.MarkFlagRequired(flag.Type)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
