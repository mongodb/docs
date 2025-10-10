package auth

import (
	"context"

	"atlas-sdk-examples/internal/config"
	"atlas-sdk-examples/internal/errors"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// NewClient initializes and returns an authenticated Atlas API client using OAuth2 with service account credentials (recommended)
// See: https://www.mongodb.com/docs/atlas/architecture/current/auth/#service-accounts
func NewClient(ctx context.Context, cfg config.Config, secrets config.Secrets) (*admin.APIClient, error) {
	if cfg == (config.Config{}) {
		return nil, &errors.ValidationError{Message: "config cannot be empty"}
	}
	if secrets.ServiceAccountID() == "" || secrets.ServiceAccountSecret() == "" {
		return nil, &errors.ValidationError{Message: "secrets cannot be nil"}
	}
	sdk, err := admin.NewClient(
		admin.UseBaseURL(cfg.BaseURL),
		admin.UseOAuthAuth(
			ctx,
			secrets.ServiceAccountID(),
			secrets.ServiceAccountSecret(),
		),
	)
	if err != nil {
		return nil, errors.WithContext(err, "create atlas client")
	}
	return sdk, nil
}
