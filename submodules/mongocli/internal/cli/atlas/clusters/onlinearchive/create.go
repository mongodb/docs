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

package onlinearchive

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

type CreateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	clusterName  string
	dbName       string
	collection   string
	dateField    string
	dateFormat   string
	archiveAfter float64
	partitions   []string
	store        store.OnlineArchiveCreator
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplate = "Online archive '{{.ID}}' created.\n"

func (opts *CreateOpts) Run() error {
	archive := opts.newOnlineArchive()

	r, err := opts.store.CreateOnlineArchive(opts.ConfigProjectID(), opts.clusterName, archive)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *CreateOpts) newOnlineArchive() *atlas.OnlineArchive {
	partitions := opts.partitionFields()
	a := &atlas.OnlineArchive{
		CollName: opts.collection,
		Criteria: &atlas.OnlineArchiveCriteria{
			DateField:       opts.dateField,
			DateFormat:      opts.dateFormat,
			ExpireAfterDays: &opts.archiveAfter,
		},
		DBName:          opts.dbName,
		PartitionFields: partitions,
	}
	return a
}

const (
	maxPartitions = 2
)

func (opts *CreateOpts) partitionFields() []*atlas.PartitionFields {
	fields := make([]*atlas.PartitionFields, len(opts.partitions))
	for i, p := range opts.partitions {
		order := float64(i)
		fields[i] = &atlas.PartitionFields{
			FieldName: p,
			Order:     &order,
		}
	}
	return fields
}

// mongocli atlas cluster(s) onlineArchive(s) create [--clusterName clusterName] [--db dbName][--collection collection][--partition fieldName:fieldType][--projectId projectId].
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{}
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create an online archive for a cluster.",
		Args:  require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if len(opts.partitions) > maxPartitions {
				return fmt.Errorf("can only define up to 2 partition fields, got: %d", len(opts.partitions))
			}
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

	cmd.Flags().StringVar(&opts.clusterName, flag.ClusterName, "", usage.ClusterName)
	cmd.Flags().StringVar(&opts.dbName, flag.Database, "", usage.Database)
	cmd.Flags().StringVar(&opts.collection, flag.Collection, "", usage.Collection)
	cmd.Flags().StringVar(&opts.dateField, flag.DateField, "", usage.DateField)
	cmd.Flags().StringVar(&opts.dateFormat, flag.DateFormat, "ISODATE", usage.DateFormat)
	cmd.Flags().Float64Var(&opts.archiveAfter, flag.ArchiveAfter, 0, usage.ArchiveAfter)
	cmd.Flags().StringSliceVar(&opts.partitions, flag.Partition, nil, usage.PartitionFields)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.ClusterName)
	_ = cmd.MarkFlagRequired(flag.Database)
	_ = cmd.MarkFlagRequired(flag.Collection)
	_ = cmd.MarkFlagRequired(flag.DateField)
	_ = cmd.MarkFlagRequired(flag.ArchiveAfter)

	return cmd
}
