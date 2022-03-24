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

package indexes

import (
	"context"
	"fmt"
	"strings"

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
	clusterName string
	name        string
	db          string
	collection  string
	keys        []string
	sparse      bool
	store       store.IndexCreator
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *CreateOpts) Run() error {
	req, err := opts.newIndex()
	if err != nil {
		return err
	}
	if err := opts.store.CreateIndex(opts.ConfigProjectID(), opts.clusterName, req); err != nil {
		return err
	}
	fmt.Println("Your index is being created")
	return nil
}

func (opts *CreateOpts) newIndex() (*atlas.IndexConfiguration, error) {
	keys, err := opts.indexKeys()
	if err != nil {
		return nil, err
	}
	i := new(atlas.IndexConfiguration)
	i.DB = opts.db
	i.Collection = opts.collection
	i.Keys = keys
	i.Options = opts.newIndexOptions()
	return i, nil
}

func (opts *CreateOpts) newIndexOptions() *atlas.IndexOptions {
	return &atlas.IndexOptions{
		Sparse: opts.sparse,
		Name:   opts.name,
	}
}

const keyParts = 2

func (opts *CreateOpts) indexKeys() ([]map[string]string, error) {
	keys := make([]map[string]string, len(opts.keys))
	for i, key := range opts.keys {
		value := strings.Split(key, ":")
		if len(value) != keyParts {
			return nil, fmt.Errorf("unexpected key format: %s", key)
		}
		keys[i] = map[string]string{value[0]: value[1]}
	}

	return keys, nil
}

// CreateBuilder builds a cobra.Command that can run as:
// mcli atlas clusters index create [indexName] --clusterName clusterName  --collection collection --dbName dbName [--key field:type].
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{}
	cmd := &cobra.Command{
		Use:   "create [indexName]",
		Short: "Create a rolling index for your MongoDB cluster.",
		Args:  require.MaximumNArgs(1),
		Annotations: map[string]string{
			"args":          "indexName",
			"indexNameDesc": "Name of the index.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context()))
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			if len(args) == 1 {
				opts.name = args[0]
			}
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.clusterName, flag.ClusterName, "", usage.ClusterName)
	cmd.Flags().StringVar(&opts.db, flag.Database, "", usage.Database)
	cmd.Flags().StringVar(&opts.collection, flag.Collection, "", usage.Collection)
	cmd.Flags().StringSliceVar(&opts.keys, flag.Key, []string{}, usage.Key)
	cmd.Flags().BoolVar(&opts.sparse, flag.Sparse, false, usage.Sparse)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	_ = cmd.MarkFlagRequired(flag.ClusterName)
	_ = cmd.MarkFlagRequired(flag.Database)
	_ = cmd.MarkFlagRequired(flag.Collection)
	_ = cmd.MarkFlagRequired(flag.Key)

	return cmd
}
