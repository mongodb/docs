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
	"fmt"
	"io"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/mocks"
	"github.com/mongodb/mongodb-atlas-cli/internal/test"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas/auth"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type confirmPromptMock struct {
	message   string
	nbOfCalls int
	responses []bool
	outWriter io.Writer
}

func (c *confirmPromptMock) confirm() (bool, error) {
	c.nbOfCalls++
	_, _ = fmt.Fprintf(c.outWriter, "? "+c.message+" (Y/n)\n")
	return c.responses[c.nbOfCalls-1], nil
}

func TestBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		Builder(),
		3,
		[]string{},
	)
}

func TestBuilderForAtlas(t *testing.T) {
	// Test for AtlasCLI
	prevTool := config.ToolName
	config.ToolName = config.AtlasCLI

	t.Cleanup(func() {
		config.ToolName = prevTool
	})

	test.CmdValidator(
		t,
		Builder(),
		4,
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

	opts := &LoginOpts{
		flow:      mockFlow,
		config:    mockConfig,
		NoBrowser: true,
	}
	opts.OutWriter = buf
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
	expectedOrgs := &atlas.Organizations{
		TotalCount: 1,
		Results: []*atlas.Organization{
			{ID: "o1", Name: "Org1"},
		},
	}
	mockStore.EXPECT().Organizations(gomock.Any()).Return(expectedOrgs, nil).Times(1)
	expectedProjects := &atlas.Projects{TotalCount: 1,
		Results: []*atlas.Project{
			{ID: "p1", Name: "Project1"},
		},
	}
	mockStore.EXPECT().GetOrgProjects("o1", gomock.Any()).Return(expectedProjects, nil).Times(1)
	require.NoError(t, opts.Run(ctx))
	assert.Equal(t, `
To verify your account, copy your one-time verification code:
1234-5678

Paste the code in the browser when prompted to activate your Atlas CLI. Your code will expire after 5 minutes.

To continue, go to http://localhost
Successfully logged in as test@10gen.com.
`, buf.String())
}

func TestLoginPreRun(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	ctx := context.TODO()
	config.SetPublicAPIKey("public")
	config.SetPrivateAPIKey("private")
	require.ErrorContains(t, loginPreRun(ctx), fmt.Sprintf(AlreadyAuthenticatedError, "public"), LoginWithProfileMsg)
}

func Test_loginOpts_oauthFlow(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	t.Run("updates accessToken and refreshToken after code is verified", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		mockFlow := mocks.NewMockAuthenticator(ctrl)
		mockConfig := mocks.NewMockLoginConfig(ctrl)
		defer ctrl.Finish()
		buf := new(bytes.Buffer)
		ctx := context.TODO()

		opts := &LoginOpts{
			flow:                 mockFlow,
			config:               mockConfig,
			NoBrowser:            true,
			regenerateCodePrompt: nil,
		}

		opts.OutWriter = buf

		expectedCode := &auth.DeviceCode{
			UserCode:        "12345678",
			VerificationURI: "http://localhost",
			DeviceCode:      "123",
			ExpiresIn:       300,
			Interval:        10,
		}

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

		require.NoError(t, opts.oauthFlow(ctx))
		assert.Equal(t, opts.AccessToken, expectedToken.AccessToken)
		assert.Equal(t, opts.RefreshToken, expectedToken.RefreshToken)
		assert.Equal(t, `
To verify your account, copy your one-time verification code:
1234-5678

Paste the code in the browser when prompted to activate your Atlas CLI. Your code will expire after 5 minutes.

To continue, go to http://localhost
`, buf.String())
	})

	t.Run("returns ErrTimeout is user choses not to regenerate device code", func(t *testing.T) {
		ctrl := gomock.NewController(t)
		mockFlow := mocks.NewMockAuthenticator(ctrl)
		mockConfig := mocks.NewMockLoginConfig(ctrl)
		defer ctrl.Finish()
		buf := new(bytes.Buffer)
		ctx := context.TODO()
		regenerateCodePromptMock := &confirmPromptMock{
			message:   "Your one-time verification code is expired. Would you like to generate a new one?",
			nbOfCalls: 0,
			responses: []bool{true, false},
			outWriter: buf,
		}

		opts := &LoginOpts{
			flow:                 mockFlow,
			config:               mockConfig,
			NoBrowser:            true,
			regenerateCodePrompt: regenerateCodePromptMock,
		}

		opts.OutWriter = buf

		expectedCode := &auth.DeviceCode{
			UserCode:        "12345678",
			VerificationURI: "http://localhost",
			DeviceCode:      "123",
			ExpiresIn:       300,
			Interval:        10,
		}

		mockFlow.
			EXPECT().
			RequestCode(ctx).
			Return(expectedCode, nil, nil).
			Times(2)

		mockFlow.
			EXPECT().
			PollToken(ctx, expectedCode).
			Return(nil, nil, auth.ErrTimeout).
			Times(2)

		err := opts.oauthFlow(ctx)
		assert.Equal(t, err, auth.ErrTimeout)
		assert.Equal(t, `
To verify your account, copy your one-time verification code:
1234-5678

Paste the code in the browser when prompted to activate your Atlas CLI. Your code will expire after 5 minutes.

To continue, go to http://localhost
? Your one-time verification code is expired. Would you like to generate a new one? (Y/n)

To verify your account, copy your one-time verification code:
1234-5678

Paste the code in the browser when prompted to activate your Atlas CLI. Your code will expire after 5 minutes.

To continue, go to http://localhost
? Your one-time verification code is expired. Would you like to generate a new one? (Y/n)
`, buf.String())
	})
}
