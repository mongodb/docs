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

package auth

import (
	"context"
	"testing"

	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/test"
	"github.com/stretchr/testify/assert"
)

func Test_GetStatus_InvalidToken(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	ctx := context.TODO()
	config.SetAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ")

	status, _ := GetStatus(ctx)
	assert.Equal(t, LoggedInWithInvalidToken, status)
}

func Test_GetStatus_APIKeys(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	ctx := context.TODO()

	config.SetPublicAPIKey("publicKey")
	config.SetPrivateAPIKey("privateKey")

	status, _ := GetStatus(ctx)
	assert.Equal(t, LoggedInWithAPIKeys, status)
}

func Test_GetStatus_NotLoggedIn(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	ctx := context.TODO()

	status, _ := GetStatus(ctx)
	assert.Equal(t, NotLoggedIn, status)
}
