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
// limitations under the License.package auth

package auth

import (
	"context"

	"github.com/mongodb/mongodb-atlas-cli/internal/cli"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/validate"
)

const (
	_ = iota // ignore first value by assigning to blank identifier
	LoggedInWithValidToken
	LoggedInWithInvalidToken
	LoggedInWithAPIKeys
	NotLoggedIn
)

// GetStatus get user authentication status.
func GetStatus(ctx context.Context) (int, error) {
	var err error

	if config.PublicAPIKey() != "" && config.PrivateAPIKey() != "" {
		return LoggedInWithAPIKeys, nil
	}
	if _, err = AccountWithAccessToken(); err == nil {
		// token exists but it is not refreshed
		if err = cli.RefreshToken(ctx); err != nil || validate.Token() != nil {
			return LoggedInWithInvalidToken, nil
		}
		return LoggedInWithValidToken, nil
	}

	return NotLoggedIn, err
}
