module atlas-sdk-examples

go 1.24

// :remove-start:
// NOTE: confirm testify and indirect dependencies are removed in Bluehawk copy output
// once copied, confirm project builds successfully in artifact repo
// :remove-end:
require (
	github.com/joho/godotenv v1.5.1
	github.com/stretchr/testify v1.11.1 // :remove:
	go.mongodb.org/atlas-sdk/v20250219001 v20250219001.1.0
	go.mongodb.org/mongo-driver v1.17.6
)

require (
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/mongodb-forks/digest v1.1.0 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect; indirect // :remove:
	github.com/stretchr/objx v0.5.2 // indirect; indirect // :remove:
	golang.org/x/oauth2 v0.30.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

require (
	github.com/golang/snappy v1.0.0 // indirect
	github.com/klauspost/compress v1.18.0 // indirect
	github.com/montanaflynn/stats v0.7.1 // indirect
	github.com/xdg-go/pbkdf2 v1.0.0 // indirect
	github.com/xdg-go/scram v1.1.2 // indirect
	github.com/xdg-go/stringprep v1.0.4 // indirect
	github.com/youmark/pkcs8 v0.0.0-20240726163527-a2c0da244d78 // indirect
	golang.org/x/crypto v0.41.0 // indirect
	golang.org/x/sync v0.16.0 // indirect
	golang.org/x/text v0.28.0 // indirect
)
