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

package accesslists

import (
	"context"
	"fmt"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

const createTemplate = "Created new access list entry(s).\n"

type CreateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	apyKey string
	ips    []string
	cidrs  []string
	store  store.OrganizationAPIKeyAccessListWhitelistCreator
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *CreateOpts) newAccessListAPIKeysReq() ([]*atlas.AccessListAPIKeysReq, error) {
	req := make([]*atlas.AccessListAPIKeysReq, 0, len(opts.ips)+len(opts.cidrs))
	if len(opts.ips) == 0 && len(opts.cidrs) == 0 {
		return nil, fmt.Errorf("either --ip or --cidr must be set")
	}
	for _, v := range opts.ips {
		entry := &atlas.AccessListAPIKeysReq{
			IPAddress: v,
		}
		req = append(req, entry)
	}

	for _, v := range opts.cidrs {
		entry := &atlas.AccessListAPIKeysReq{
			CidrBlock: v,
		}
		req = append(req, entry)
	}

	return req, nil
}

func (opts *CreateOpts) Run() error {
	req, err := opts.newAccessListAPIKeysReq()
	if err != nil {
		return err
	}

	useAccessList, err := shouldUseAccessList(opts.store)
	if err != nil {
		return err
	}

	var result *atlas.AccessListAPIKeys

	if useAccessList {
		result, err = opts.store.CreateOrganizationAPIKeyAccessList(opts.ConfigOrgID(), opts.apyKey, req)
		if err != nil {
			return err
		}
		return opts.Print(result)
	}

	r, e := opts.store.CreateOrganizationAPIKeyWhitelist(opts.ConfigOrgID(), opts.apyKey, fromAccessListAPIKeysReqToWhitelistAPIKeysReq(req))
	if e != nil {
		return e
	}
	result = fromWhitelistAPIKeysToAccessListAPIKeys(r)
	return opts.Print(result)
}

// mongocli iam organizations|orgs apiKey(s)|apikeys accessList create [--apiKey keyId] [--orgId orgId] [--ip ip] [--cidr cidr].
func CreateBuilder() *cobra.Command {
	opts := new(CreateOpts)
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create an IP access list for your API Key.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateOrgID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.apyKey, flag.APIKey, "", usage.APIKey)
	cmd.Flags().StringSliceVar(&opts.cidrs, flag.CIDR, []string{}, usage.AccessListCIDREntry)
	cmd.Flags().StringSliceVar(&opts.ips, flag.IP, []string{}, usage.APIAccessListIPEntry)

	cmd.Flags().StringVar(&opts.OrgID, flag.OrgID, "", usage.OrgID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.APIKey)

	return cmd
}

// fromAccessListAPIKeysReqToWhitelistAPIKeysReq convert from atlas.AccessListAPIKeysReq format to atlas.WhitelistAPIKeysReq
// We use this function with whitelist endpoints to keep supporting OM 4.2 and OM 4.4.
func fromAccessListAPIKeysReqToWhitelistAPIKeysReq(in []*atlas.AccessListAPIKeysReq) []*atlas.WhitelistAPIKeysReq {
	if in == nil {
		return nil
	}
	out := make([]*atlas.WhitelistAPIKeysReq, len(in))
	for i, element := range in {
		accessListElement := &atlas.WhitelistAPIKeysReq{
			IPAddress: element.IPAddress,
			CidrBlock: element.CidrBlock,
		}
		out[i] = accessListElement
	}
	return out
}
