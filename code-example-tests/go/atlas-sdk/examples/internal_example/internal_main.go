/** NOTE: This is an internal-only file intended for demonstration
* purposes.
* This file shows how to use Bluehawk markup to generate code
* examples from the source code using the snippet and copy functions.
* It would generate the following files:
* - `internal_main.snippet.example-script.go` (snippet file)
* - `internal_example/internal_main.go` (copied file)
**/

// :snippet-start: example-script
// :state-remove-start: copy
// This text will be removed from the copied file. But it will be included in the snippet.
// :state-remove-end:
package main

import (
	"context"
	"fmt"
	"log"

	"atlas-sdk-examples/internal/auth"
	"atlas-sdk-examples/internal/config"

	"github.com/joho/godotenv"
)

func main() {
	envFile := ".env.production"
	if err := godotenv.Load(envFile); err != nil {
		log.Printf("Warning: could not load %s file: %v", envFile, err)
	}

	secrets, cfg, err := config.LoadAllFromEnv()
	if err != nil {
		log.Fatalf("Failed to load configuration %v", err)
	}

	ctx := context.Background()
	client, err := auth.NewClient(ctx, cfg, secrets)
	if err != nil {
		log.Fatalf("Failed to initialize authentication client: %v", err)
	}

	alertId := client.AlertsApi.GetAlert(ctx, "alertId", cfg.ProjectID)

	fmt.Println("Alert ID:", alertId)
	// :remove-start:
	fmt.Println("This is an internal-only log message. It won't be included in the snippet or the copied file.")
	// :remove-end:
}

// :snippet-end:
// :state-remove-start: copy
// NOTE: INTERNAL (this won't be included in the copied file)
// ** OUTPUT EXAMPLE **
//
// Alert ID: 12345
// :state-remove-end:
//
// This text will be included in the copied file.
