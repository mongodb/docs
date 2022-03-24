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

type AzureOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	region         string
	atlasCIDRBlock string
	directoryID    string
	subscriptionID string
	resourceGroup  string
	vNetName       string
	store          store.AzurePeeringConnectionCreator
}

func (opts *AzureOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplate = "Network peering connection '{{.ID}}' created.\n"

func (opts *AzureOpts) Run() error {
	opts.region = strings.ToUpper(opts.region)
	opts.resourceGroup = strings.ToLower(opts.resourceGroup)

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

func (opts *AzureOpts) containerExists() (*atlas.Container, error) {
	r, err := opts.store.AzureContainers(opts.ConfigProjectID())
	if err != nil {
		return nil, err
	}
	for i := range r {
		if r[i].Region == opts.region {
			return &r[i], nil
		}
	}
	return nil, nil
}

func (opts *AzureOpts) newContainer() *atlas.Container {
	c := &atlas.Container{
		AtlasCIDRBlock: opts.atlasCIDRBlock,
		ProviderName:   "AZURE",
		Region:         opts.region,
	}
	return c
}

func (opts *AzureOpts) newPeer(containerID string) *atlas.Peer {
	a := &atlas.Peer{
		AzureDirectoryID:    opts.directoryID,
		AzureSubscriptionID: opts.subscriptionID,
		ContainerID:         containerID,
		ProviderName:        "AZURE",
		ResourceGroupName:   opts.resourceGroup,
		VNetName:            opts.vNetName,
	}
	return a
}

// mongocli atlas networking peering create azure
// --atlasCidrBlock atlasCidrBlock: CIDR block that Atlas uses for the Network Peering containers in your project.
// --directoryId azureDirectoryId: Unique identifier for an Azure AD directory.
// --subscriptionId azureSubscriptionId: Unique identifier of the Azure subscription in which the VNet resides.
// --resourceGroup resourceGroupName: Name of your Azure resource group.
// --region regionName: Atlas region where the container resides.
// --vnet vnetName: Name of your Azure VNet.
// --projectId projectId: ID of the project
// Create a network peering with Azure, this command will internally check if a container already exists for the provider and region and if it does then we’ll use that,
// if it does not exists we’ll try to create one and use it,
// there can only be one container per provider and region.
func AzureBuilder() *cobra.Command {
	opts := &AzureOpts{}
	cmd := &cobra.Command{
		Use:   "azure",
		Short: "Create a connection with Azure.",
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

	cmd.Flags().StringVar(&opts.directoryID, flag.DirectoryID, "", usage.DirectoryID)
	cmd.Flags().StringVar(&opts.subscriptionID, flag.SubscriptionID, "", usage.SubscriptionID)
	cmd.Flags().StringVar(&opts.resourceGroup, flag.ResourceGroup, "", usage.ResourceGroup)
	cmd.Flags().StringVar(&opts.vNetName, flag.VNet, "", usage.VNet)
	cmd.Flags().StringVar(&opts.region, flag.Region, "", usage.ContainerRegion)
	cmd.Flags().StringVar(&opts.atlasCIDRBlock, flag.AtlasCIDRBlock, "", usage.AtlasCIDRBlock)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.DirectoryID)
	_ = cmd.MarkFlagRequired(flag.SubscriptionID)
	_ = cmd.MarkFlagRequired(flag.ResourceGroup)
	_ = cmd.MarkFlagRequired(flag.VNet)
	_ = cmd.MarkFlagRequired(flag.Region)

	return cmd
}
