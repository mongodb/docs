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
package serverusage

import (
	"context"
	"fmt"

	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/spf13/cobra"
)

type CaptureOpts struct {
	store store.SnapshotGenerator
}

func (opts *CaptureOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *CaptureOpts) Run() error {
	err := opts.store.GenerateSnapshot()
	if err != nil {
		return err
	}
	fmt.Print("Snapshot captured.\n")
	return nil
}

// mongocli om serverUsage capture.
func CaptureBuilder() *cobra.Command {
	opts := &CaptureOpts{}
	cmd := &cobra.Command{
		Use:   "capture",
		Short: "Capture a snapshot of usage for the processes Ops Manager manages.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.initStore(cmd.Context())()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	return cmd
}
