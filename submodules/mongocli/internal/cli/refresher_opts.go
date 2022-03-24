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

package cli

import (
	"context"
	"errors"
	"fmt"

	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/oauth"
	atlasauth "go.mongodb.org/atlas/auth"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type RefresherOpts struct {
	flow Refresher
}

type Refresher interface {
	RefreshToken(context.Context, string) (*atlasauth.Token, *atlas.Response, error)
}

func (opts *RefresherOpts) InitFlow() error {
	var err error
	opts.flow, err = oauth.FlowWithConfig(config.Default())
	return err
}

var ErrInvalidRefreshToken = errors.New("session expired")

func (opts *RefresherOpts) RefreshAccessToken(ctx context.Context) error {
	current, err := config.Token()
	if current == nil {
		return err
	}
	if current.Valid() {
		return nil
	}
	t, _, err := opts.flow.RefreshToken(ctx, config.RefreshToken())
	if err != nil {
		var target *atlas.ErrorResponse
		if errors.As(err, &target) && target.ErrorCode == "INVALID_REFRESH_TOKEN" {
			return fmt.Errorf(
				"%w\n\nTo login, run: %s %s",
				ErrInvalidRefreshToken,
				config.BinName(),
				"auth login")
		}
		return err
	}
	config.SetAccessToken(t.AccessToken)
	config.SetRefreshToken(t.RefreshToken)
	return config.Save()
}
