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

//go:build unit
// +build unit

package accesslists

import (
	"fmt"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

func TestCreate_Run(t *testing.T) {
	runCreateTest := func(t *testing.T, service string, version string, accessList bool) {
		t.Helper()
		t.Run(fmt.Sprintf("%s %s", service, version), func(t *testing.T) {
			ctrl := gomock.NewController(t)
			mockStore := mocks.NewMockOrganizationAPIKeyAccessListWhitelistCreator(ctrl)
			defer ctrl.Finish()

			createOpts := &CreateOpts{
				store:  mockStore,
				apyKey: "1",
				ips:    []string{"77.54.32.11"},
			}

			r, err := createOpts.newAccessListAPIKeysReq()
			if err != nil {
				t.Fatalf("newAccessListAPIKeysReq() unexpected error: %v", err)
			}

			prevServ := config.Service()
			config.SetService(service)
			defer func() {
				config.SetService(prevServ)
			}()

			if version != "" {
				mockStore.
					EXPECT().
					ServiceVersion().
					Return(&atlas.ServiceVersion{GitHash: "some git hash", Version: version}, nil).
					Times(1)
			}

			if accessList {
				mockStore.
					EXPECT().
					CreateOrganizationAPIKeyAccessList(createOpts.OrgID, createOpts.apyKey, r).
					Return(&atlas.AccessListAPIKeys{}, nil).
					Times(1)
			} else {
				mockStore.
					EXPECT().
					CreateOrganizationAPIKeyWhitelist(createOpts.OrgID, createOpts.apyKey, fromAccessListAPIKeysReqToWhitelistAPIKeysReq(r)).
					Return(&atlas.WhitelistAPIKeys{}, nil).
					Times(1)
			}

			if err = createOpts.Run(); err != nil {
				t.Fatalf("Run() unexpected error: %v", err)
			}
		})
	}

	runCreateTest(t, config.CloudService, "", true)
	runCreateTest(t, config.CloudGovService, "", true)
	runCreateTest(t, config.CloudManagerService, "", true)
	runCreateTest(t, config.OpsManagerService, "5.0.0.100.20210101T0000Z", true)
	runCreateTest(t, config.OpsManagerService, "5.0.0-rc0.100.20210101T0000Z", true)
	runCreateTest(t, config.OpsManagerService, "4.4.0.100.20210101T0000Z", false)
	runCreateTest(t, config.OpsManagerService, "4.2.0.100.20210101T0000Z", false)
}

func TestCreateBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		CreateBuilder(),
		0,
		[]string{flag.OrgID, flag.Output, flag.APIKey, flag.CIDR, flag.IP},
	)
}
