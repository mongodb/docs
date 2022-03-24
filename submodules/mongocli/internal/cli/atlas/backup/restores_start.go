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
	"errors"
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
	automatedRestore   = "automated"
	downloadRestore    = "download"
	pointInTimeRestore = "pointInTime"
)

type RestoresStartOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	method               string
	clusterName          string
	targetProjectID      string
	targetClusterName    string
	oplogTS              int64
	oplogInc             int64
	snapshotID           string
	pointInTimeUTCMillis int64
	store                store.RestoreJobsCreator
}

func (opts *RestoresStartOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var startTemplate = "Restore job '{{.ID}}' successfully started\n"

func (opts *RestoresStartOpts) Run() error {
	request := opts.newCloudProviderSnapshotRestoreJob()
	r, err := opts.store.CreateRestoreJobs(opts.ConfigProjectID(), opts.clusterName, request)

	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *RestoresStartOpts) newCloudProviderSnapshotRestoreJob() *atlas.CloudProviderSnapshotRestoreJob {
	request := new(atlas.CloudProviderSnapshotRestoreJob)
	request.DeliveryType = opts.method

	if opts.targetProjectID != "" {
		request.TargetGroupID = opts.targetProjectID
	}

	if opts.targetClusterName != "" {
		request.TargetClusterName = opts.targetClusterName
	}

	if opts.snapshotID != "" {
		request.SnapshotID = opts.snapshotID
	}

	// Set only in pointInTimeRestore
	if opts.oplogTS != 0 && opts.oplogInc != 0 {
		request.OplogTs = opts.oplogTS
		request.OplogInc = opts.oplogInc
	} else if opts.pointInTimeUTCMillis != 0 {
		// Set only when oplogTS and oplogInc are not set
		request.PointInTimeUTCSeconds = opts.pointInTimeUTCMillis
	}

	return request
}

func (opts *RestoresStartOpts) isAutomatedRestore() bool {
	return opts.method == automatedRestore
}

func (opts *RestoresStartOpts) isPointInTimeRestore() bool {
	return opts.method == pointInTimeRestore
}

func (opts *RestoresStartOpts) isDownloadRestore() bool {
	return opts.method == downloadRestore
}

func (opts *RestoresStartOpts) validateParams() error {
	if opts.clusterName == "" {
		return errors.New("needs clusterName")
	}

	return nil
}

func markRequiredAutomatedRestoreFlags(cmd *cobra.Command) error {
	if err := cmd.MarkFlagRequired(flag.TargetProjectID); err != nil {
		return err
	}

	if err := cmd.MarkFlagRequired(flag.SnapshotID); err != nil {
		return err
	}

	if err := cmd.MarkFlagRequired(flag.TargetClusterID); err != nil {
		return err
	}

	return cmd.MarkFlagRequired(flag.ClusterName)
}

func markRequiredPointInTimeRestoreFlags(cmd *cobra.Command) error {
	if err := cmd.MarkFlagRequired(flag.TargetProjectID); err != nil {
		return err
	}

	if err := cmd.MarkFlagRequired(flag.TargetClusterID); err != nil {
		return err
	}

	return cmd.MarkFlagRequired(flag.ClusterName)
}

// mongocli atlas backup(s) restore(s) job(s) start <automated|download|pointInTime>.
func RestoresStartBuilder() *cobra.Command {
	opts := new(RestoresStartOpts)
	cmd := &cobra.Command{
		Use:       fmt.Sprintf("start <%s|%s|%s>", automatedRestore, downloadRestore, pointInTimeRestore),
		Short:     "Start a restore job for your project and cluster.",
		Args:      require.ExactValidArgs(1),
		ValidArgs: []string{automatedRestore, downloadRestore, pointInTimeRestore},
		Annotations: map[string]string{
			"args":             "deliveryType",
			"deliveryTypeDesc": "Type of restore job to create. Accepted values include: automated, download, pointInTime.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if opts.isAutomatedRestore() {
				if err := markRequiredAutomatedRestoreFlags(cmd); err != nil {
					return err
				}
			}

			if opts.isPointInTimeRestore() {
				if err := markRequiredPointInTimeRestoreFlags(cmd); err != nil {
					return err
				}
			}

			if opts.isDownloadRestore() {
				if err := cmd.MarkFlagRequired(flag.SnapshotID); err != nil {
					return err
				}
			}

			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), startTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.method = args[0]

			if e := opts.validateParams(); e != nil {
				return e
			}

			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.snapshotID, flag.SnapshotID, "", usage.SnapshotID)
	// Atlas uses cluster name
	cmd.Flags().StringVar(&opts.clusterName, flag.ClusterName, "", usage.ClusterName)

	cmd.Flags().StringVar(&opts.targetProjectID, flag.TargetProjectID, "", usage.TargetProjectID)
	// Atlas uses cluster name
	cmd.Flags().StringVar(&opts.targetClusterName, flag.TargetClusterName, "", usage.TargetClusterName)
	cmd.Flags().Int64Var(&opts.oplogTS, flag.OplogTS, 0, usage.OplogTS)
	cmd.Flags().Int64Var(&opts.oplogInc, flag.OplogInc, 0, usage.OplogInc)
	cmd.Flags().Int64Var(&opts.pointInTimeUTCMillis, flag.PointInTimeUTCMillis, 0, usage.PointInTimeUTCMillis)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
