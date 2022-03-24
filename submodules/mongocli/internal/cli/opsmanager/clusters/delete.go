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

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/search"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/ops-manager/atmcfg"
	"go.mongodb.org/ops-manager/opsmngr"
)

type DeleteOpts struct {
	cli.GlobalOpts
	cli.WatchOpts
	*cli.DeleteOpts
	store store.CloudManagerClustersDeleter
}

func (opts *DeleteOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *DeleteOpts) Run() error {
	if !opts.Confirm {
		return nil
	}

	hostIds, err := opts.hostIDs()
	if err != nil {
		return err
	}

	// shutdown cluster
	err = opts.shutdownCluster()
	if err != nil {
		return err
	}

	// Remove cluster from automation
	err = opts.removeClusterFromAutomation()
	if err != nil {
		return err
	}

	// Stop monitoring
	err = opts.stopMonitoring(hostIds)
	if err != nil {
		return err
	}

	fmt.Print("Cluster deleted\n")
	return nil
}

func (opts *DeleteOpts) hostIDs() ([]string, error) {
	current, err := opts.store.GetAutomationConfig(opts.ConfigProjectID())
	if err != nil {
		return nil, err
	}

	hostnameMap := make(map[string][]int32)
	replicaSetHostNames(current, hostnameMap, opts.Entry)
	opts.shardClusterHostNames(current, hostnameMap)

	var hostIds []string
	for k, ports := range hostnameMap {
		for _, port := range ports {
			host, err := opts.store.HostByHostname(opts.ConfigProjectID(), k, int(port))
			if err != nil {
				return nil, err
			}
			hostIds = append(hostIds, host.ID)
		}
	}

	if len(hostIds) == 0 {
		return nil, fmt.Errorf("cluster '%s' doesn't exist", opts.Entry)
	}

	return hostIds, nil
}

func replicaSetHostNames(automationConfig *opsmngr.AutomationConfig, hostnameMap map[string][]int32, name string) {
	for _, process := range automationConfig.Processes {
		if process.Cluster == name || (process.Args26.Replication != nil && process.Args26.Replication.ReplSetName == name) {
			hostnameMap[process.Hostname] = append(hostnameMap[process.Hostname], int32(process.Args26.NET.Port))
		}
	}
}

func (opts *DeleteOpts) shardClusterHostNames(automationConfig *opsmngr.AutomationConfig, hostnameMap map[string][]int32) {
	for _, sharding := range automationConfig.Sharding {
		if sharding.Name == opts.Entry {
			for _, shard := range sharding.Shards {
				replicaSetHostNames(automationConfig, hostnameMap, shard.RS)
			}
			// config rs
			replicaSetHostNames(automationConfig, hostnameMap, sharding.ConfigServerReplica)
			break
		}
	}
}

func (opts *DeleteOpts) stopMonitoring(hostIds []string) error {
	for _, id := range hostIds {
		if err := opts.store.StopMonitoring(opts.ConfigProjectID(), id); err != nil {
			return err
		}
	}

	return nil
}

func (opts *DeleteOpts) removeClusterFromAutomation() error {
	current, err := opts.store.GetAutomationConfig(opts.ConfigProjectID())
	if err != nil {
		return err
	}

	atmcfg.RemoveByClusterName(current, opts.Entry)
	if err := opts.store.UpdateAutomationConfig(opts.ConfigProjectID(), current); err != nil {
		return err
	}

	// Wait for changes being deployed on automation
	return opts.Watch(opts.watcher)
}

func (opts *DeleteOpts) shutdownCluster() error {
	current, err := opts.store.GetAutomationConfig(opts.ConfigProjectID())
	if err != nil {
		return err
	}
	if !search.ClusterExists(current, opts.Entry) {
		return fmt.Errorf("cluster '%s' doesn't exist", opts.Entry)
	}

	// Shutdown Cluster
	atmcfg.Shutdown(current, opts.Entry)
	if err := opts.store.UpdateAutomationConfig(opts.ConfigProjectID(), current); err != nil {
		return err
	}

	// Wait for changes being deployed on automation
	return opts.Watch(opts.watcher)
}

func (opts *DeleteOpts) watcher() (bool, error) {
	result, err := opts.store.GetAutomationStatus(opts.ConfigProjectID())
	if err != nil {
		return false, err
	}

	for _, p := range result.Processes {
		if p.LastGoalVersionAchieved != result.GoalVersion {
			return false, nil
		}
	}
	return true, nil
}

// mongocli cloud-manager cluster(s) delete <name> --projectId projectId [--force].
func DeleteBuilder() *cobra.Command {
	opts := &DeleteOpts{
		DeleteOpts: cli.NewDeleteOpts("", "Cluster not deleted\""),
	}
	cmd := &cobra.Command{
		Use:     "delete <name>",
		Aliases: []string{"rm"},
		Short:   "Completely removes a cluster from your project.",
		Args:    require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if err := opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context())); err != nil {
				return err
			}
			opts.Entry = args[0]
			opts.OutWriter = cmd.OutOrStdout()
			return opts.Prompt()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().BoolVar(&opts.Confirm, flag.Force, false, usage.Force)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	return cmd
}
