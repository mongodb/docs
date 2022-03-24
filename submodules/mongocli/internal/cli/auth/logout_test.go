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
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"github.com/stretchr/testify/require"
)

func TestLogoutBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		LogoutBuilder(),
		0,
		[]string{flag.Force},
	)
}

func Test_logoutOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockFlow := mocks.NewMockRevoker(ctrl)
	mockConfig := mocks.NewMockConfigDeleter(ctrl)
	defer ctrl.Finish()
	buf := new(bytes.Buffer)

	opts := logoutOpts{
		OutWriter: buf,
		config:    mockConfig,
		flow:      mockFlow,
		DeleteOpts: &cli.DeleteOpts{
			Confirm: true,
		},
	}
	ctx := context.TODO()
	mockFlow.
		EXPECT().
		RevokeToken(ctx, gomock.Any(), gomock.Any()).
		Return(nil, nil).
		Times(1)
	mockConfig.
		EXPECT().
		Delete().
		Return(nil).
		Times(1)
	require.NoError(t, opts.Run(ctx))
}
