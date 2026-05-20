// See entire project at https://github.com/mongodb/atlas-architecture-go-sdk
package main

import (
	"context"
	"fmt"
	"log"
	"time"

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
	fmt.Printf("Fetching historical invoices for organization: %s\n", p.OrgId)

	// Fetch invoices from the previous six months with the provided options
	invoices, err := billing.ListInvoicesForOrg(ctx, client.InvoicesApi, p,
		billing.WithViewLinkedInvoices(true),
		billing.WithIncludeCount(true),
		billing.WithDateRange(time.Now().AddDate(0, -6, 0), time.Now()))
	if err != nil {
		log.Fatalf("Failed to retrieve invoices: %v", err)
	}

	if invoices.GetTotalCount() > 0 {
		fmt.Printf("Total count of invoices: %d\n", invoices.GetTotalCount())
	} else {
		fmt.Println("No invoices found for the specified date range")
		return
	}

	// Get organization name for more user-friendly filenames
	orgName, err := orgutils.GetOrganizationName(ctx, client.OrganizationsApi, p.OrgId)
	if err != nil {
		// Non-critical error, continue with orgID as name
		fmt.Printf("Warning: %v\n", err)
		orgName = p.OrgId
	}
	sanitizedOrgName := orgutils.SanitizeForFilename(orgName)

	// Export invoice data to be used in other systems or for reporting
	outDir := "invoices"
	prefix := fmt.Sprintf("historical_%s", sanitizedOrgName)

	err = exportInvoicesToJSON(invoices, outDir, prefix)
	if err != nil {
		log.Fatalf("Failed to export invoices to JSON: %v", err)
	}
	err = exportInvoicesToCSV(invoices, outDir, prefix)
	if err != nil {
		log.Fatalf("Failed to export invoices to CSV: %v", err)
	}
}

func exportInvoicesToJSON(invoices *admin.PaginatedApiInvoiceMetadata, outDir, prefix string) error {
	jsonPath, err := fileutils.GenerateOutputPath(outDir, prefix, "json")
	if err != nil {
		return fmt.Errorf("failed to generate JSON output path: %v", err)
	}
	if err := export.ToJSON(invoices.GetResults(), jsonPath); err != nil {
		return fmt.Errorf("failed to write JSON file: %v", err)
	}
	fmt.Printf("Exported invoice data to %s\n", jsonPath)
	return nil
}

func exportInvoicesToCSV(invoices *admin.PaginatedApiInvoiceMetadata, outDir, prefix string) error {
	csvPath, err := fileutils.GenerateOutputPath(outDir, prefix, "csv")
	if err != nil {
		return fmt.Errorf("failed to generate CSV output path: %v", err)
	}

	// Set the headers and mapped rows for the CSV export
	headers := []string{"InvoiceID", "Status", "Created", "AmountBilled"}
	err = export.ToCSVWithMapper(invoices.GetResults(), csvPath, headers, func(invoice admin.BillingInvoiceMetadata) []string {
		return []string{
			invoice.GetId(),
			invoice.GetStatusName(),
			invoice.GetCreated().Format(time.RFC3339),
			fmt.Sprintf("%.2f", float64(invoice.GetAmountBilledCents())/100.0),
		}
	})
	if err != nil {
		return fmt.Errorf("failed to write CSV file: %v", err)
	}

	fmt.Printf("Exported invoice data to %s\n", csvPath)
	return nil
}

