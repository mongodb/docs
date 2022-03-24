// Copyright 2022 MongoDB Inc
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

package auth

import (
	"bytes"
	"context"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/auth"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

func TestBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		Builder(),
		3,
		[]string{},
	)
}

func TestLoginBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		LoginBuilder(),
		0,
		[]string{"gov", "cm", "noBrowser"},
	)
}

func Test_loginOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockFlow := mocks.NewMockAuthenticator(ctrl)
	mockConfig := mocks.NewMockLoginConfig(ctrl)
	mockStore := mocks.NewMockProjectOrgsLister(ctrl)
	defer ctrl.Finish()
	buf := new(bytes.Buffer)

	opts := &loginOpts{
		flow:      mockFlow,
		config:    mockConfig,
		OutWriter: buf,
		noBrowser: true,
		loginOnly: true,
	}
	opts.Store = mockStore
	expectedCode := &auth.DeviceCode{
		UserCode:        "12345678",
		VerificationURI: "http://localhost",
		DeviceCode:      "123",
		ExpiresIn:       300,
		Interval:        10,
	}
	ctx := context.TODO()
	mockFlow.
		EXPECT().
		RequestCode(ctx).
		Return(expectedCode, nil, nil).
		Times(1)

	expectedToken := &auth.Token{
		AccessToken:  "asdf",
		RefreshToken: "querty",
		Scope:        "openid",
		IDToken:      "1",
		TokenType:    "Bearer",
		ExpiresIn:    3600,
	}
	mockFlow.
		EXPECT().
		PollToken(ctx, expectedCode).
		Return(expectedToken, nil, nil).
		Times(1)

	mockConfig.EXPECT().Set("service", "cloud").Times(1)
	mockConfig.EXPECT().Set("access_token", "asdf").Times(1)
	mockConfig.EXPECT().Set("refresh_token", "querty").Times(1)
	mockConfig.EXPECT().Set("ops_manager_url", gomock.Any()).Times(0)
	mockConfig.EXPECT().AccessTokenSubject().Return("test@10gen.com", nil).Times(1)
	mockConfig.EXPECT().Save().Return(nil).Times(1)
	expectedOrgs := &atlas.Organizations{}
	mockStore.EXPECT().Organizations(gomock.Any()).Return(expectedOrgs, nil).Times(0)
	expectedProjects := &atlas.Projects{}
	mockStore.EXPECT().Projects(gomock.Any()).Return(expectedProjects, nil).Times(0)
	require.NoError(t, opts.Run(ctx))
	assert.Equal(t, `
First, copy your one-time code: 1234-5678

Next, sign with your browser and enter the code.

Or go to http://localhost

Your code will expire after 5 minutes.
Successfully logged in as test@10gen.com.
`, buf.String())
}
