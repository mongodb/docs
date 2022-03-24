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

package create

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type GCPOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	atlasCIDRBlock string
	gcpProjectID   string
	network        string
	regions        []string
	store          store.GCPPeeringConnectionCreator
}

func (opts *GCPOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *GCPOpts) Run() error {
	container, err := opts.containerExists()
	if err != nil {
		return err
	}

	if container == nil {
		var err2 error
		container, err2 = opts.store.CreateContainer(opts.ConfigProjectID(), opts.newContainer())
		if err2 != nil {
			return err2
		}
	}
	r, err := opts.store.CreatePeeringConnection(opts.ConfigProjectID(), opts.newPeer(container.ID))
	if err != nil {
		return err
	}
	return opts.Print(r)
}

func (opts *GCPOpts) containerExists() (*atlas.Container, error) {
	r, err := opts.store.GCPContainers(opts.ConfigProjectID())
	if err != nil {
		return nil, err
	}
	if len(r) > 0 {
		return &r[0], nil
	}
	return nil, nil
}

func (opts *GCPOpts) newContainer() *atlas.Container {
	c := &atlas.Container{
		AtlasCIDRBlock: opts.atlasCIDRBlock,
		Regions:        opts.regions,
		ProviderName:   "GCP",
	}
	return c
}

func (opts *GCPOpts) newPeer(containerID string) *atlas.Peer {
	a := &atlas.Peer{
		ContainerID:  containerID,
		GCPProjectID: opts.gcpProjectID,
		NetworkName:  opts.network,
		ProviderName: "GCP",
	}
	return a
}

// mongocli atlas networking peering create gcp [--atlasCidrBlock atlasCidrBlock][--gcpProjectId gcpProjectId][--network networkName]
// [--regions region][--projectId projectId]
// --atlasCidrBlock atlasCidrBlock: CIDR block that Atlas uses for the Network Peering containers in your project.
// --gcpProjectId gcpProjectId: GCP project ID of the owner of the network peer.
// --network networkName: Name of the network peer to which Atlas connects.
// --regions region: "List of Atlas regions where the container resides."
// --projectId projectId: ID of the project
// Create a network peering with GCP, this command will internally check if a container already exists for the provider and if it does then we’ll use that,
// if it does not exists we’ll try to create one and use it, there can only be one container per GCP provider.
func GCPBuilder() *cobra.Command {
	opts := &GCPOpts{}
	cmd := &cobra.Command{
		Use:   "gcp",
		Short: "Create a connection with GCP.",
		Args:  require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
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

	cmd.Flags().StringVar(&opts.gcpProjectID, flag.GCPProjectID, "", usage.GCPProjectID)
	cmd.Flags().StringVar(&opts.network, flag.Network, "", usage.Network)
	cmd.Flags().StringVar(&opts.atlasCIDRBlock, flag.AtlasCIDRBlock, "", usage.AtlasCIDRBlock)
	cmd.Flags().StringSliceVar(&opts.regions, flag.Region, []string{}, usage.ContainerRegions)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.AtlasCIDRBlock)

	return cmd
}
