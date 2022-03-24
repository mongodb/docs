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

package backup

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
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

const (
	automatedRestore = "AUTOMATED_RESTORE"
	httpRestore      = "HTTP"
	onlyFor          = "'%s' can only be used with %s"
	createTemplate   = `Created restore job(s):{{range .Results}} '{{.ID}}'{{end}}.
`
)

type RestoresStartOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	method               string
	clusterID            string
	targetProjectID      string
	targetClusterID      string
	checkpointID         string
	oplogTS              string
	oplogInc             int64
	snapshotID           string
	expirationHours      int64
	expires              string
	maxDownloads         int64
	pointInTimeUTCMillis float64
	store                store.ContinuousJobCreator
}

func (opts *RestoresStartOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *RestoresStartOpts) Run() error {
	request := opts.newContinuousJobRequest()
	r, err := opts.store.CreateContinuousRestoreJob(opts.ConfigProjectID(), opts.clusterID, request)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *RestoresStartOpts) newContinuousJobRequest() *atlas.ContinuousJobRequest {
	request := &atlas.ContinuousJobRequest{SnapshotID: opts.snapshotID}
	request.Delivery.MethodName = opts.method

	if opts.isAutomatedRestore() {
		request.Delivery.TargetGroupID = opts.targetProjectID
		request.Delivery.TargetClusterID = opts.targetClusterID

		if opts.oplogTS != "" && opts.oplogInc != 0 {
			request.OplogTS = opts.oplogTS
			request.OplogInc = opts.oplogInc
		}
		if opts.pointInTimeUTCMillis != 0 {
			request.PointInTimeUTCMillis = opts.pointInTimeUTCMillis
		}
	}

	if opts.isHTTP() {
		if opts.expires != "" {
			request.Delivery.Expires = opts.expires
		}
		if opts.maxDownloads > 0 {
			request.Delivery.MaxDownloads = opts.maxDownloads
		}
		if opts.expirationHours > 0 {
			request.Delivery.ExpirationHours = opts.expirationHours
		}
	}
	return request
}

func (opts *RestoresStartOpts) isAutomatedRestore() bool {
	return opts.method == automatedRestore
}

func (opts *RestoresStartOpts) isHTTP() bool {
	return opts.method == httpRestore
}

func (opts *RestoresStartOpts) validateParams() error {
	if !opts.isAutomatedRestore() {
		if e := opts.automatedRestoreOnlyFlags(); e != nil {
			return e
		}
	}

	if !opts.isHTTP() {
		if e := opts.httpRestoreOnlyFlags(); e != nil {
			return e
		}
	}

	return nil
}

func (opts *RestoresStartOpts) httpRestoreOnlyFlags() error {
	if opts.expires != "" {
		return fmt.Errorf(onlyFor, flag.Expires, httpRestore)
	}
	if opts.maxDownloads > 0 {
		return fmt.Errorf(onlyFor, flag.MaxDownloads, httpRestore)
	}
	if opts.expirationHours > 0 {
		return fmt.Errorf(onlyFor, flag.ExpirationHours, httpRestore)
	}
	return nil
}

func (opts *RestoresStartOpts) automatedRestoreOnlyFlags() error {
	if opts.checkpointID != "" {
		return fmt.Errorf(onlyFor, flag.CheckpointID, automatedRestore)
	}
	if opts.oplogTS != "" {
		return fmt.Errorf(onlyFor, flag.OplogTS, automatedRestore)
	}
	if opts.oplogInc > 0 {
		return fmt.Errorf(onlyFor, flag.OplogInc, automatedRestore)
	}
	if opts.pointInTimeUTCMillis > 0 {
		return fmt.Errorf(onlyFor, flag.PointInTimeUTCMillis, automatedRestore)
	}
	return nil
}

func markRequiredAutomatedRestoreFlags(cmd *cobra.Command) error {
	if err := cmd.MarkFlagRequired(flag.TargetProjectID); err != nil {
		return err
	}

	return cmd.MarkFlagRequired(flag.TargetClusterID)
}

// mongocli atlas backup(s) restore(s) job(s) start.
func RestoresStartBuilder() *cobra.Command {
	opts := new(RestoresStartOpts)
	cmd := &cobra.Command{
		Use:       fmt.Sprintf("start <%s|%s>", automatedRestore, httpRestore),
		Short:     "Start a restore job for a project and cluster.",
		Args:      require.ExactValidArgs(1),
		ValidArgs: []string{automatedRestore, httpRestore},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.method = args[0]
			if opts.isAutomatedRestore() {
				if err := markRequiredAutomatedRestoreFlags(cmd); err != nil {
					return err
				}
			}
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.validateParams,
				opts.InitOutput(cmd.OutOrStdout(), createTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.snapshotID, flag.SnapshotID, "", usage.SnapshotID)
	cmd.Flags().StringVar(&opts.clusterID, flag.ClusterID, "", usage.ClusterID)
	cmd.Flags().StringVar(&opts.targetClusterID, flag.TargetClusterID, "", usage.TargetClusterID)
	cmd.Flags().StringVar(&opts.checkpointID, flag.CheckpointID, "", usage.CheckpointID)
	cmd.Flags().StringVar(&opts.oplogTS, flag.OplogTS, "", usage.OplogTS)
	cmd.Flags().Int64Var(&opts.oplogInc, flag.OplogInc, 0, usage.OplogInc)
	cmd.Flags().Float64Var(&opts.pointInTimeUTCMillis, flag.PointInTimeUTCMillis, 0, usage.PointInTimeUTCMillis)

	// For Automatic restore
	cmd.Flags().StringVar(&opts.targetProjectID, flag.TargetProjectID, "", usage.TargetProjectID)
	// For http restore
	cmd.Flags().StringVar(&opts.expires, flag.Expires, "", usage.Expires)
	cmd.Flags().Int64Var(&opts.maxDownloads, flag.MaxDownloads, 0, usage.MaxDownloads)
	cmd.Flags().Int64Var(&opts.expirationHours, flag.ExpirationHours, 0, usage.ExpirationHours)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.ClusterID)

	return cmd
}
