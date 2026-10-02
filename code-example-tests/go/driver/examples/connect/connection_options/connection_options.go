//	:replace-start: {
//	  "terms": {
//	    "utils.GetConnectionString()": "os.Getenv(\"MONGODB_URI\")"
//	  }
//	}
//
// Demonstrates how to disable certificate revocation checking for TLS
// connections by using the Go driver
package connection_options

import (
	"log"
	"strings"

	"driver-examples/utils"

	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// DisableCertificateRevocationCheckFromURI demonstrates how to disable
// certificate revocation checking by adding the URI option to the connection
// string. Specifying the option implicitly enables TLS, so the example builds
// the ClientOptions rather than connecting to a server. The returned state
// lets the test validate the driver behavior.
func DisableCertificateRevocationCheckFromURI() DisableCertificateRevocationCheckResult {
	// :snippet-start: disable-cert-revocation-check-uri
	uri := utils.GetConnectionString()
	if uri == "" {
		log.Fatal("Set your 'MONGODB_URI' environment variable")
	}

	// Use an ampersand instead of a question mark if the connection string
	// already contains query options.
	separator := "?"
	if strings.Contains(uri, "?") {
		separator = "&"
	}

	uriOptions := options.Client().
		ApplyURI(uri + separator + "tlsDisableCertificateRevocationCheck=true")
	// :snippet-end:

	return DisableCertificateRevocationCheckResult{
		OptionSet: uriOptions.DisableCertificateRevocationCheck != nil &&
			*uriOptions.DisableCertificateRevocationCheck,
		EnablesTLS: uriOptions.TLSConfig != nil,
	}
}

// DisableCertificateRevocationCheckFromClientOptions demonstrates how to
// disable certificate revocation checking by setting the option on
// ClientOptions. The returned state lets the test validate the driver
// behavior.
func DisableCertificateRevocationCheckFromClientOptions() DisableCertificateRevocationCheckResult {
	// :snippet-start: disable-cert-revocation-check-settings
	settingsOptions := options.Client().
		SetDisableCertificateRevocationCheck(true)
	// :snippet-end:

	return DisableCertificateRevocationCheckResult{
		OptionSet: settingsOptions.DisableCertificateRevocationCheck != nil &&
			*settingsOptions.DisableCertificateRevocationCheck,
		EnablesTLS: settingsOptions.TLSConfig != nil,
	}
}

// DisableCertificateRevocationCheckResult reports how the Go driver honors the
// tlsDisableCertificateRevocationCheck option in each configuration path.
type DisableCertificateRevocationCheckResult struct {
	// OptionSet states whether the configuration path set the option.
	OptionSet bool

	// EnablesTLS states whether the configuration path also configured TLS.
	// The URI option implicitly enables TLS even when its value is false.
	EnablesTLS bool
}

// :replace-end:
