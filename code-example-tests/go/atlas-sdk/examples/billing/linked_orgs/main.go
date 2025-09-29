// :snippet-start: linked-billing
// :state-remove-start: copy
// See entire project at https://github.com/mongodb/atlas-architecture-go-sdk
// :state-remove-end: [copy]
package main

import (
	"context"
	"fmt"
	"log"

	"atlas-sdk-examples/internal/auth"
	"atlas-sdk-examples/internal/billing"
	"atlas-sdk-examples/internal/config"

	"github.com/joho/godotenv"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
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

	p := &admin.ListInvoicesApiParams{
		OrgId: cfg.OrgID,
	}

	fmt.Printf("Fetching linked organizations for billing organization: %s\n", p.OrgId)

	invoices, err := billing.GetCrossOrgBilling(ctx, client.InvoicesApi, p)
	if err != nil {
		log.Fatalf("Failed to retrieve cross-organization billing data for %s: %v", p.OrgId, err)
	}

	displayLinkedOrganizations(invoices, p.OrgId)
}

func displayLinkedOrganizations(invoices map[string][]admin.BillingInvoiceMetadata, primaryOrgID string) {
	var linkedOrgs []string
	for orgID := range invoices {
		if orgID != primaryOrgID {
			linkedOrgs = append(linkedOrgs, orgID)
		}
	}

	if len(linkedOrgs) == 0 {
		fmt.Println("No linked organizations found for the billing organization")
		return
	}

	fmt.Printf("Found %d linked organizations:\n", len(linkedOrgs))
	for i, orgID := range linkedOrgs {
		fmt.Printf("  %d. Organization ID: %s\n", i+1, orgID)
	}
}

// :snippet-end: [linked-billing]
// :state-remove-start: copy
// NOTE: INTERNAL
// ** OUTPUT EXAMPLE **
//
// Fetching linked organizations for billing organization: 5f7a9ec7d78fc03b42959328
//
// Found 4 linked organizations:
//  1. Organization ID: 61f4d5e2bf82763afcd12e45
//  2. Organization ID: 62a1b937c845d9f216890c72
//  3. Organization ID: 60c8f71e4d8a219b37a5d90f
//  4. Organization ID: 63e7d2c8a19b4f7654321abc
// :state-remove-end: [copy]
