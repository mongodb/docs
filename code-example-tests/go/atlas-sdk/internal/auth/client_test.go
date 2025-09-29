package auth_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"atlas-sdk-examples/internal/auth"
	"atlas-sdk-examples/internal/config"
	internalerrors "atlas-sdk-examples/internal/errors"
)

func TestNewClient_Success(t *testing.T) {
	t.Parallel()
	cfg := config.Config{BaseURL: "https://example.com"}
	secrets := config.NewSecrets("validID", "validSecret")

	client, err := auth.NewClient(context.Background(), cfg, secrets)

	require.NoError(t, err)
	require.NotNil(t, client)
}

func TestNewClient_returnsErrorWhenConfigIsNil(t *testing.T) {
	t.Parallel()
	secrets := config.NewSecrets("validID", "validSecret")

	// Zero value config
	var cfg config.Config

	client, err := auth.NewClient(context.Background(), cfg, secrets)

	require.Error(t, err)
	require.Nil(t, client)
	var validationErr *internalerrors.ValidationError
	require.True(t, assert.ErrorAs(t, err, &validationErr), "expected error to be *errors.ValidationError")
	assert.Equal(t, "config cannot be empty", validationErr.Message)
}

func TestNewClient_returnsErrorWhenSecretsAreNil(t *testing.T) {
	t.Parallel()
	cfg := config.Config{BaseURL: "https://example.com"}

	// Zero value secrets
	var secrets config.Secrets

	client, err := auth.NewClient(context.Background(), cfg, secrets)

	require.Error(t, err)
	require.Nil(t, client)
	var validationErr *internalerrors.ValidationError
	require.True(t, assert.ErrorAs(t, err, &validationErr), "expected error to be *errors.ValidationError")
	assert.Equal(t, "secrets cannot be nil", validationErr.Message)
}
