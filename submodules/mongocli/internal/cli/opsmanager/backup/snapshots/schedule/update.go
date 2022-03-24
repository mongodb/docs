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

package schedule

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

var updateTemplate = "Snapshot schedule updated.\n"

type UpdateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	store                          store.SnapshotScheduleUpdater
	clusterID                      string
	referenceTimeZoneOffset        string
	dailySnapshotRetentionDays     int
	clusterCheckpointIntervalMin   int
	monthlySnapshotRetentionMonths int
	snapshotIntervalHours          int
	snapshotRetentionDays          int
	weeklySnapshotRetentionWeeks   int
	pointInTimeWindowHours         int
	referenceHourOfDay             int
	referenceMinuteOfHour          int
}

func (opts *UpdateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *UpdateOpts) Run() error {
	r, err := opts.store.UpdateSnapshotSchedule(opts.ConfigProjectID(), opts.clusterID, opts.newSnapshotSchedule())
	if err != nil {
		return err
	}
	return opts.Print(r)
}

func (opts *UpdateOpts) newSnapshotSchedule() *opsmngr.SnapshotSchedule {
	snapshotSchedule := &opsmngr.SnapshotSchedule{
		ClusterID:                      opts.clusterID,
		GroupID:                        opts.ConfigProjectID(),
		ReferenceTimeZoneOffset:        opts.referenceTimeZoneOffset,
		DailySnapshotRetentionDays:     opts.dailySnapshotRetentionDays,
		ClusterCheckpointIntervalMin:   opts.clusterCheckpointIntervalMin,
		MonthlySnapshotRetentionMonths: opts.monthlySnapshotRetentionMonths,
		SnapshotIntervalHours:          opts.snapshotIntervalHours,
		SnapshotRetentionDays:          opts.snapshotRetentionDays,
		WeeklySnapshotRetentionWeeks:   opts.weeklySnapshotRetentionWeeks,
	}

	if opts.pointInTimeWindowHours >= 0 {
		snapshotSchedule.PointInTimeWindowHours = &opts.pointInTimeWindowHours
	}

	if opts.referenceHourOfDay >= 0 {
		snapshotSchedule.ReferenceHourOfDay = &opts.referenceHourOfDay
	}

	if opts.referenceMinuteOfHour >= 0 {
		snapshotSchedule.ReferenceMinuteOfHour = &opts.referenceMinuteOfHour
	}

	return snapshotSchedule
}

// mongocli ops-manager backup snapshot(s) schedule update [--clusterID clusterID ][--projectId projectId] [--referenceTimeZoneOffset referenceTimeZoneOffset]
// [--dailySnapshotRetentionDays dailySnapshotRetentionDays] [--clusterCheckpointIntervalMin clusterCheckpointIntervalMin]
// [--snapshotIntervalHours snapshotIntervalHours] [--snapshotRetentionDays snapshotRetentionDays] [--weeklySnapshotRetentionWeeks weeklySnapshotRetentionWeeks]
// [--pointInTimeWindowHours pointInTimeWindowHours] [--referenceHourOfDay referenceHourOfDay] [--referenceMinuteOfHour referenceMinuteOfHour]
// [--monthlySnapshotRetentionMonths monthlySnapshotRetentionMonths]

func UpdateBuilder() *cobra.Command {
	opts := &UpdateOpts{}
	opts.Template = updateTemplate
	cmd := &cobra.Command{
		Use:   "update",
		Short: "Update a snapshot schedule for a cluster.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			return opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context()))
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.clusterID, flag.ClusterID, "", usage.ClusterID)
	cmd.Flags().StringVar(&opts.referenceTimeZoneOffset, flag.ReferenceTimeZoneOffset, "", usage.ReferenceTimeZoneOffset)
	cmd.Flags().IntVar(&opts.dailySnapshotRetentionDays, flag.DailySnapshotRetentionDays, 0, usage.DailySnapshotRetentionDays)
	cmd.Flags().IntVar(&opts.clusterCheckpointIntervalMin, flag.ClusterCheckpointIntervalMin, 0, usage.ClusterCheckpointIntervalMin)
	cmd.Flags().IntVar(&opts.snapshotIntervalHours, flag.SnapshotIntervalHours, 0, usage.SnapshotIntervalHours)
	cmd.Flags().IntVar(&opts.snapshotRetentionDays, flag.SnapshotRetentionDays, 0, usage.SnapshotRetentionDays)
	cmd.Flags().IntVar(&opts.weeklySnapshotRetentionWeeks, flag.WeeklySnapshotRetentionWeeks, 0, usage.WeeklySnapshotRetentionWeeks)
	cmd.Flags().IntVar(&opts.pointInTimeWindowHours, flag.PointInTimeWindowHours, 0, usage.PointInTimeWindowHours)
	cmd.Flags().IntVar(&opts.referenceHourOfDay, flag.ReferenceHourOfDay, 0, usage.ReferenceHourOfDay)
	cmd.Flags().IntVar(&opts.referenceMinuteOfHour, flag.ReferenceMinuteOfHour, 0, usage.ReferenceMinuteOfHour)
	cmd.Flags().IntVar(&opts.monthlySnapshotRetentionMonths, flag.MonthlySnapshotRetentionMonths, 0, usage.MonthlySnapshotRetentionMonths)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.ClusterID)

	return cmd
}
