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

package peering

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

type WatchOpts struct {
	cli.GlobalOpts
	cli.WatchOpts
	id    string
	store store.PeeringConnectionDescriber
}

func (opts *WatchOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

const (
	waitingForUser    = "WAITING_FOR_USER"
	failed            = "FAILED"
	available         = "AVAILABLE"
	pendingAcceptance = "PENDING_ACCEPTANCE"
)

func (opts *WatchOpts) watcher() (bool, error) {
	result, err := opts.store.PeeringConnection(opts.ConfigProjectID(), opts.id)
	if err != nil {
		return false, err
	}
	if result.Status != "" {
		return result.Status == waitingForUser || result.Status == failed || result.Status == available, nil
	}
	return result.StatusName == pendingAcceptance || result.StatusName == failed || result.StatusName == available, nil
}

func (opts *WatchOpts) Run() error {
	if err := opts.Watch(opts.watcher); err != nil {
		return err
	}

	return opts.Print(nil)
}

// mongocli atlas networking peering watch <ID> [--projectId projectId].
func WatchBuilder() *cobra.Command {
	opts := &WatchOpts{}
	cmd := &cobra.Command{
		Use:   "watch <ID>",
		Short: "Watch for a peering connection to be available.",
		Long: `This command checks the peering connection's status periodically until it becomes available. 
Once it reaches the expected state, the command prints "Network peering changes completed."
If you run the command in the terminal, it blocks the terminal session until the resource is available.
You can interrupt the command's polling at any time with CTRL-C.`,
		Example: `$ mongocli atlas networking peering watch peeringConnectionSampleId`,
		Args:    require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), "\nNetwork peering changes completed.\n"),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.id = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)
	return cmd
}
