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

package store

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"errors"
	"fmt"
	"net"
	"net/http"
	"os"
	"time"

	"github.com/mongodb-forks/digest"
	"github.com/mongodb/mongocli/internal/config"
	atlasauth "go.mongodb.org/atlas/auth"
	atlas "go.mongodb.org/atlas/mongodbatlas"
	"go.mongodb.org/ops-manager/opsmngr"
)

const (
	yes                       = "yes"
	responseHeaderTimeout     = 1 * time.Minute
	tlsHandshakeTimeout       = 5 * time.Second
	timeout                   = 5 * time.Second
	keepAlive                 = 30 * time.Second
	maxIdleConns              = 5
	maxIdleConnsPerHost       = 4
	idleConnTimeout           = 30 * time.Second
	expectContinueTimeout     = 1 * time.Second
	versionManifestStaticPath = "https://opsmanager.mongodb.com/"
	cloudGovServiceURL        = "https://cloud.mongodbgov.com/"
)

var errUnsupportedService = errors.New("unsupported service")

type Store struct {
	service       string
	baseURL       string
	caCertificate string
	skipVerify    bool
	username      string
	password      string
	accessToken   *atlasauth.Token
	client        interface{}
	ctx           context.Context
}

var defaultTransport = &http.Transport{
	DialContext: (&net.Dialer{
		Timeout:   timeout,
		KeepAlive: keepAlive,
	}).DialContext,
	MaxIdleConns:          maxIdleConns,
	MaxIdleConnsPerHost:   maxIdleConnsPerHost,
	Proxy:                 http.ProxyFromEnvironment,
	IdleConnTimeout:       idleConnTimeout,
	ExpectContinueTimeout: expectContinueTimeout,
}

var skipVerifyTransport = &http.Transport{
	ResponseHeaderTimeout: responseHeaderTimeout,
	TLSHandshakeTimeout:   tlsHandshakeTimeout,
	DialContext: (&net.Dialer{
		Timeout:   timeout,
		KeepAlive: keepAlive,
	}).DialContext,
	MaxIdleConns:          maxIdleConns,
	MaxIdleConnsPerHost:   maxIdleConnsPerHost,
	Proxy:                 http.ProxyFromEnvironment,
	IdleConnTimeout:       idleConnTimeout,
	ExpectContinueTimeout: expectContinueTimeout,
	TLSClientConfig:       &tls.Config{InsecureSkipVerify: true}, //nolint:gosec // this is optional for some users,
}

func customCATransport(ca []byte) *http.Transport {
	caCertPool := x509.NewCertPool()
	caCertPool.AppendCertsFromPEM(ca)
	tlsClientConfig := &tls.Config{ //nolint:gosec // we let users set custom certificates
		InsecureSkipVerify: false,
		RootCAs:            caCertPool,
	}
	return &http.Transport{
		ResponseHeaderTimeout: responseHeaderTimeout,
		TLSHandshakeTimeout:   tlsHandshakeTimeout,
		DialContext: (&net.Dialer{
			Timeout:   timeout,
			KeepAlive: keepAlive,
		}).DialContext,
		MaxIdleConns:          maxIdleConns,
		MaxIdleConnsPerHost:   maxIdleConnsPerHost,
		Proxy:                 http.ProxyFromEnvironment,
		IdleConnTimeout:       idleConnTimeout,
		ExpectContinueTimeout: expectContinueTimeout,
		TLSClientConfig:       tlsClientConfig,
	}
}

func (s *Store) httpClient(httpTransport http.RoundTripper) (*http.Client, error) {
	if s.username == "" && s.password == "" && s.accessToken == nil {
		return &http.Client{Transport: httpTransport}, nil
	}
	if s.username != "" && s.password != "" {
		t := &digest.Transport{
			Username: s.username,
			Password: s.password,
		}
		t.Transport = httpTransport
		return t.Client()
	}
	tr := &Transport{
		token: s.accessToken,
		base:  httpTransport,
	}

	return &http.Client{Transport: tr}, nil
}

type Transport struct {
	token *atlasauth.Token
	base  http.RoundTripper
}

func (tr *Transport) RoundTrip(req *http.Request) (*http.Response, error) {
	tr.token.SetAuthHeader(req)
	return tr.base.RoundTrip(req)
}

func (s *Store) transport() (*http.Transport, error) {
	switch {
	case s.caCertificate != "":
		dat, err := os.ReadFile(s.caCertificate)
		if err != nil {
			return nil, err
		}
		return customCATransport(dat), nil
	case s.skipVerify:
		return skipVerifyTransport, nil
	default:
		return defaultTransport, nil
	}
}

// Option is any configuration for Store.
// New will take a list of Option and process them sequentially.
// The store package provides a list of common and preset set of Option you can use
// but you can implement your own.
type Option func(s *Store) error

// Options turns a list of Option instances into a single Option.
// This is a helper when combining multiple Option.
func Options(opts ...Option) Option {
	return func(s *Store) error {
		for _, opt := range opts {
			if err := opt(s); err != nil {
				return err
			}
		}
		return nil
	}
}

// Service configures the Store service, valid options are cloud, cloud-manager, and ops-manager.
func Service(service string) Option {
	return func(s *Store) error {
		s.service = service
		return nil
	}
}

// WithBaseURL sets the base URL for the underling HTTP client.
// the url should not contain any path, to add the public API path use WithPublicPathBaseURL.
func WithBaseURL(configURL string) Option {
	return func(s *Store) error {
		s.baseURL = configURL
		return nil
	}
}

// WithCACertificate enables the Store to use a custom CA certificate.
func WithCACertificate(caCertificate string) Option {
	return func(s *Store) error {
		s.caCertificate = caCertificate
		return nil
	}
}

// SkipVerify skips CA certificate verification, use at your own risk.
func SkipVerify() Option {
	return func(s *Store) error {
		s.skipVerify = true
		return nil
	}
}

// CredentialsGetter interface for how to get credentials when Store must be authenticated.
type CredentialsGetter interface {
	PublicAPIKey() string
	PrivateAPIKey() string
	Token() (*atlasauth.Token, error)
}

// WithAuthentication sets the store credentials.
func WithAuthentication(c CredentialsGetter) Option {
	return func(s *Store) error {
		s.username = c.PublicAPIKey()
		s.password = c.PrivateAPIKey()
		t, err := c.Token()
		if err != nil {
			return err
		}
		s.accessToken = t
		return nil
	}
}

// WithContext sets the store context.
func WithContext(ctx context.Context) Option {
	return func(s *Store) error {
		s.ctx = ctx
		return nil
	}
}

// setAtlasClient sets the internal client to use an Atlas client and methods.
func (s *Store) setAtlasClient(client *http.Client) error {
	opts := []atlas.ClientOpt{atlas.SetUserAgent(config.UserAgent)}
	if s.baseURL != "" {
		opts = append(opts, atlas.SetBaseURL(s.baseURL))
	}
	c, err := atlas.New(client, opts...)
	if err != nil {
		return err
	}
	s.client = c
	return nil
}

// setOpsManagerClient sets the internal client to use an Ops Manager client and methods.
func (s *Store) setOpsManagerClient(client *http.Client) error {
	opts := []opsmngr.ClientOpt{opsmngr.SetUserAgent(config.UserAgent)}
	if s.baseURL != "" {
		opts = append(opts, opsmngr.SetBaseURL(s.baseURL))
	}
	c, err := opsmngr.New(client, opts...)
	if err != nil {
		return err
	}

	s.client = c
	return nil
}

// TransportConfigGetter interface for Ops Manager custom network settings.
type TransportConfigGetter interface {
	OpsManagerCACertificate() string
	OpsManagerSkipVerify() string
}

// NetworkPresets is the default Option to set custom network preference.
func NetworkPresets(c TransportConfigGetter) Option {
	options := make([]Option, 0)
	if caCertificate := c.OpsManagerCACertificate(); caCertificate != "" {
		options = append(options, WithCACertificate(caCertificate))
	}
	if skipVerify := c.OpsManagerSkipVerify(); skipVerify != yes {
		options = append(options, SkipVerify())
	}
	return Options(options...)
}

// ServiceGetter is a basic interface for service and base url settings.
type ServiceGetter interface {
	Service() string
	OpsManagerURL() string
}

// AuthenticatedConfig an interface of the methods needed to set up a Store.
type AuthenticatedConfig interface {
	CredentialsGetter
	TransportConfigGetter
	ServiceGetter
}

// AuthenticatedPreset is the default Option when connecting to the public API with authentication.
func AuthenticatedPreset(c AuthenticatedConfig) Option {
	options := []Option{Service(c.Service()), WithAuthentication(c)}
	if baseURLOpt := baseURLOption(c); baseURLOpt != nil {
		options = append(options, baseURLOpt)
	}
	options = append(options, NetworkPresets(c))
	return Options(options...)
}

func baseURLOption(c ServiceGetter) Option {
	if configURL := c.OpsManagerURL(); configURL != "" {
		return WithBaseURL(configURL)
	} else if c.Service() == config.CloudGovService {
		return WithBaseURL(cloudGovServiceURL)
	}
	return nil
}

type BasicConfig interface {
	TransportConfigGetter
	ServiceGetter
}

// UnauthenticatedPreset is the default Option when connecting to the public API without authentication.
func UnauthenticatedPreset(c BasicConfig) Option {
	options := []Option{Service(c.Service())}
	if option := baseURLOption(c); option != nil {
		options = append(options, option)
	}
	options = append(options, NetworkPresets(c))
	return Options(options...)
}

// New returns a new Store based on the given list of Option.
//
// Usage:
//
//	// get a new Store for Atlas
//	store := store.New(Service("cloud"))
//
//	// get a new Store for the public API based on a Config interface
//	store := store.New(AuthenticatedPreset(config))
//
//	// get a new Store for the private API based on a Config interface
//	store := store.New(PrivateAuthenticatedPreset(config))
func New(opts ...Option) (*Store, error) {
	store := new(Store)

	// apply the list of options to Server
	for _, opt := range opts {
		if err := opt(store); err != nil {
			return nil, err
		}
	}

	httpTransport, err := store.transport()
	if err != nil {
		return nil, err
	}
	client, err := store.httpClient(httpTransport)
	if err != nil {
		return nil, err
	}

	switch store.service {
	case config.CloudService, config.CloudGovService:
		err = store.setAtlasClient(client)
	case config.CloudManagerService, config.OpsManagerService:
		err = store.setOpsManagerClient(client)
	default:
		return nil, fmt.Errorf("unsupported service: %s", store.service)
	}
	if err != nil {
		return nil, err
	}

	if store.ctx == nil {
		store.ctx = context.Background()
	}

	return store, nil
}

type ManifestGetter interface {
	Service() string
	OpsManagerVersionManifestURL() string
}

// NewVersionManifest ets the appropriate client for the manifest version page.
func NewVersionManifest(ctx context.Context, c ManifestGetter) (*Store, error) {
	s := new(Store)
	s.ctx = ctx
	s.service = c.Service()
	if s.service != config.OpsManagerService {
		return nil, fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
	s.baseURL = versionManifestStaticPath
	if baseURL := c.OpsManagerVersionManifestURL(); baseURL != "" {
		s.baseURL = baseURL
	}
	if err := s.setOpsManagerClient(http.DefaultClient); err != nil {
		return nil, err
	}

	return s, nil
}
