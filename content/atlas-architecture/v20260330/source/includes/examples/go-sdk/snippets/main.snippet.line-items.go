// See entire project at https://github.com/mongodb/atlas-architecture-go-sdk
package main

import (
	"context"
	"fmt"
	"log"

	"atlas-sdk-examples/internal/auth"
	"atlas-sdk-examples/internal/billing"
	"atlas-sdk-examples/internal/config"
	"atlas-sdk-examples/internal/data/export"
	"atlas-sdk-examples/internal/fileutils"
	"atlas-sdk-examples/internal/orgutils"

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

	fmt.Printf("Fetching pending invoices for organization: %s\n", p.OrgId)

	details, err := billing.CollectLineItemBillingData(ctx, client.InvoicesApi, client.OrganizationsApi, p.OrgId, nil)
	if err != nil {
		log.Fatalf("Failed to retrieve pending invoices for %s: %v", p.OrgId, err)
	}

	if len(details) == 0 {
		fmt.Printf("No pending invoices found for organization: %s\n", p.OrgId)
		return
	}
	fmt.Printf("Found %d line items in pending invoices\n", len(details))

	// Use organization name from the returned details for more user-friendly filenames
	orgName := details[0].Org.Name
	sanitizedOrgName := orgutils.SanitizeForFilename(orgName)

	// Export invoice data to be used in other systems or for reporting
	outDir := "invoices"
	prefix := fmt.Sprintf("pending_%s", sanitizedOrgName)

	err = exportInvoicesToJSON(details, outDir, prefix)
	if err != nil {
		log.Fatalf("Failed to export invoices to JSON: %v", err)
	}
	err = exportInvoicesToCSV(details, outDir, prefix)
	if err != nil {
		log.Fatalf("Failed to export invoices to CSV: %v", err)
	}
}

func exportInvoicesToJSON(details []billing.Detail, outDir, prefix string) error {
	jsonPath, err := fileutils.GenerateOutputPath(outDir, prefix, "json")
	if err != nil {
		return fmt.Errorf("failed to generate JSON output path: %v", err)
	}

	if err := export.ToJSON(details, jsonPath); err != nil {
		return fmt.Errorf("failed to write JSON file: %v", err)
	}
	fmt.Printf("Exported billing data to %s\n", jsonPath)
	return nil
}

func exportInvoicesToCSV(details []billing.Detail, outDir, prefix string) error {
	csvPath, err := fileutils.GenerateOutputPath(outDir, prefix, "csv")
	if err != nil {
		return fmt.Errorf("failed to generate CSV output path: %v", err)
	}

	// Set the headers and mapped rows for the CSV export
	headers := []string{"Organization", "OrgID", "Project", "ProjectID", "Cluster",
		"SKU", "Cost", "Date", "Provider", "Instance", "Category"}
	err = export.ToCSVWithMapper(details, csvPath, headers, func(item billing.Detail) []string {
		return []string{
			item.Org.Name,
			item.Org.ID,
			item.Project.Name,
			item.Project.ID,
			item.Cluster,
			item.SKU,
			fmt.Sprintf("%.2f", item.Cost),
			item.Date.Format("2006-01-02"),
			item.Provider,
			item.Instance,
			item.Category,
		}
	})
	if err != nil {
		return fmt.Errorf("failed to write CSV file: %v", err)
	}
	fmt.Printf("Exported billing data to %s\n", csvPath)
	return nil
}

