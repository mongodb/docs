package connection_options

import (
	"strings"
	"testing"

	"driver-examples/examples/connect/connection_options"
	"driver-examples/utils"
	"driver-examples/utils/compare"

	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// addURIOption appends a connection string option to the test connection
// string, matching how the example appends the option to the URI.
func addURIOption(uri, extra string) string {
	sep := "?"
	if strings.Contains(uri, "?") {
		sep = "&"
	}
	return uri + sep + extra
}

func TestDisableCertificateRevocationCheckFromURI(t *testing.T) {
	uri := utils.GetConnectionString()
	if uri == "" {
		t.Fatal("set your 'CONNECTION_STRING' environment variable")
	}

	result := connection_options.DisableCertificateRevocationCheckFromURI()

	compare.ExpectThat(t, result.OptionSet).ShouldMatch(true)
	compare.ExpectThat(t, result.EnablesTLS).ShouldMatch(true)
}

func TestDisableCertificateRevocationCheckFromClientOptions(t *testing.T) {
	result := connection_options.DisableCertificateRevocationCheckFromClientOptions()

	compare.ExpectThat(t, result.OptionSet).ShouldMatch(true)
	compare.ExpectThat(t, result.EnablesTLS).ShouldMatch(false)
}

func TestDisableCertificateRevocationCheckFromURIWithFalseValue(t *testing.T) {
	uri := utils.GetConnectionString()
	if uri == "" {
		t.Fatal("set your 'CONNECTION_STRING' environment variable")
	}

	// Specifying the URI option with a false value also implicitly enables
	// TLS without enabling the option itself.
	opts := options.Client().ApplyURI(addURIOption(uri, "tlsDisableCertificateRevocationCheck=false"))

	compare.ExpectThat(t, opts.TLSConfig != nil).ShouldMatch(true)
	compare.ExpectThat(t, opts.DisableCertificateRevocationCheck != nil).ShouldMatch(true)
	compare.ExpectThat(t, *opts.DisableCertificateRevocationCheck).ShouldMatch(false)
}

func TestTLSDisableCertificateRevocationCheckConflicts(t *testing.T) {
	uri := utils.GetConnectionString()
	if uri == "" {
		t.Fatal("set your 'CONNECTION_STRING' environment variable")
	}

	testCases := []struct {
		name     string
		extra    string
		expected string
	}{
		{
			name:     "tlsInsecure",
			extra:    "tlsDisableCertificateRevocationCheck=true&tlsInsecure=true",
			expected: "error validating uri: sslInsecure/tlsInsecure cannot be used with tlsDisableCertificateRevocationCheck",
		},
		{
			name:     "tlsDisableOCSPEndpoint",
			extra:    "tlsDisableCertificateRevocationCheck=true&tlsDisableOCSPEndpointCheck=true",
			expected: "error validating uri: tlsDisableOCSPEndpointCheck cannot be used with tlsDisableCertificateRevocationCheck",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			opts := options.Client().ApplyURI(addURIOption(uri, tc.extra))
			err := opts.Validate()

			compare.ExpectThat(t, err != nil).ShouldMatch(true)
			compare.ExpectThat(t, err.Error()).ShouldMatch(tc.expected)
		})
	}
}
