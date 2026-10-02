uri := os.Getenv("MONGODB_URI")
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
