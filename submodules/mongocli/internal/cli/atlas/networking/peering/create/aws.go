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

type AWSOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	region              string
	routeTableCidrBlock string
	accountID           string
	vpcID               string
	atlasCIDRBlock      string
	store               store.AWSPeeringConnectionCreator
}

func (opts *AWSOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *AWSOpts) Run() error {
	opts.region = normalizeAtlasRegion(opts.region)
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

func (opts *AWSOpts) containerExists() (*atlas.Container, error) {
	r, err := opts.store.AWSContainers(opts.ConfigProjectID())
	if err != nil {
		return nil, err
	}
	for i := range r {
		if r[i].RegionName == opts.region {
			return &r[i], nil
		}
	}
	return nil, nil
}

func (opts *AWSOpts) newContainer() *atlas.Container {
	c := &atlas.Container{
		AtlasCIDRBlock: opts.atlasCIDRBlock,
		RegionName:     opts.region,
		ProviderName:   "AWS",
	}
	return c
}

func normalizeAtlasRegion(region string) string {
	region = strings.ToUpper(region)
	return strings.ReplaceAll(region, "-", "_")
}

func (opts *AWSOpts) newPeer(containerID string) *atlas.Peer {
	region := strings.ToLower(opts.region)
	region = strings.ReplaceAll(region, "_", "-")
	a := &atlas.Peer{
		AccepterRegionName:  region,
		AWSAccountID:        opts.accountID,
		ContainerID:         containerID,
		RouteTableCIDRBlock: opts.routeTableCidrBlock,
		VpcID:               opts.vpcID,
	}
	return a
}

// mongocli atlas networking peering create aws
// --accepterRegionName accepterRegionName: Specifies the region where the peer VPC resides.
// --awsAccountId awsAccountId: Account ID of the owner of the peer VPC.
// --containerId containerId: Unique identifier of the Atlas VPC container for the region.
// --routeTableCidrBlock routeTableCidrBlock: 	Peer VPC CIDR block or subnet.
// --vpcID vpcID: Unique identifier of the peer VPC.
// --projectId projectId: ID of the project
// Create a network peering with AWS, this command will internally check if a container already exists for the provider and region and if it does then we’ll use that,
// if it does not exists we’ll try to create one and use it,
// there can only be one container per provider and region.
func AwsBuilder() *cobra.Command {
	opts := &AWSOpts{}
	cmd := &cobra.Command{
		Use:   "aws",
		Short: "Create a connection with AWS.",
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

	cmd.Flags().StringVar(&opts.accountID, flag.AccountID, "", usage.AccountID)
	cmd.Flags().StringVar(&opts.region, flag.Region, "", usage.ContainerRegion)
	cmd.Flags().StringVar(&opts.routeTableCidrBlock, flag.RouteTableCidrBlock, "", usage.RouteTableCidrBlock)
	cmd.Flags().StringVar(&opts.vpcID, flag.VpcID, "", usage.VpcID)
	cmd.Flags().StringVar(&opts.atlasCIDRBlock, flag.AtlasCIDRBlock, "", usage.AtlasCIDRBlock)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.AccountID)
	_ = cmd.MarkFlagRequired(flag.RouteTableCidrBlock)
	_ = cmd.MarkFlagRequired(flag.VpcID)
	_ = cmd.MarkFlagRequired(flag.Region)

	return cmd
}
