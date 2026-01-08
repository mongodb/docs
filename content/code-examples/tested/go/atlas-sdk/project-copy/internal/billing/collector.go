package billing

import (
	"context"
	"fmt"
	"time"

	"atlas-sdk-examples/internal/errors"
	"atlas-sdk-examples/internal/orgutils"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// Detail represents the transformed billing line item
type Detail struct {
	Org      OrgInfo     `json:"org"`
	Project  ProjectInfo `json:"project"`
	Cluster  string      `json:"cluster"`
	SKU      string      `json:"sku"`
	Cost     float64     `json:"cost"`
	Date     time.Time   `json:"date"`
	Provider string      `json:"provider"`
	Instance string      `json:"instance"`
	Category string      `json:"category"`
}

// OrgInfo contains organization identifier information
type OrgInfo struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// ProjectInfo contains project identifier information
type ProjectInfo struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// CollectLineItemBillingData retrieves all pending invoices for the specified organization,
// transforms them into detailed billing records, and filters out items processed before lastProcessedDate.
// Returns a slice of billing Details if pending invoices exists or an error if the operation fails.
func CollectLineItemBillingData(ctx context.Context, sdk admin.InvoicesApi, orgSdk admin.OrganizationsApi, orgID string, lastProcessedDate *time.Time) ([]Detail, error) {
	req := sdk.ListPendingInvoices(ctx, orgID)
	r, _, err := req.Execute()

	if err != nil {
		return nil, errors.FormatError("list pending invoices", orgID, err)
	}
	if r == nil || !r.HasResults() || len(r.GetResults()) == 0 {
		return nil, nil
	}

	// Get organization name
	orgName, err := orgutils.GetOrganizationName(ctx, orgSdk, orgID)
	if err != nil {
		// Non-critical error, continue with orgID as name
		fmt.Printf("Warning: %v\n", err)
		orgName = orgID
	}

	// Process invoices and collect line items
	billingDetails, err := processInvoices(r.GetResults(), orgID, orgName, lastProcessedDate)
	if err != nil {
		return nil, errors.WithContext(err, "processing invoices")
	}

	if len(billingDetails) == 0 {
		return nil, &errors.NotFoundError{Resource: "line items in pending invoices", ID: orgID}
	}

	return billingDetails, nil
}

// processInvoices extracts and transforms billing line items from invoices into Detail structs.
// The function iterates through all invoices and their line items, filters out items processed before
// lastProcessedDate (if provided), then determines line item details, such as organization and project,
// pricing, and SKU-based information.
func processInvoices(invoices []admin.BillingInvoice, orgID, orgName string, lastProcessedDate *time.Time) ([]Detail, error) {
	var billingDetails []Detail

	for _, invoice := range invoices {
		fmt.Printf("Processing invoice ID: %s\n", invoice.GetId())

		for _, lineItem := range invoice.GetLineItems() {
			startDate := lineItem.GetStartDate()
			if lastProcessedDate != nil && !startDate.After(*lastProcessedDate) {
				continue
			}

			detail := Detail{
				Org: OrgInfo{
					ID:   orgID,
					Name: orgName,
				},
				Project: ProjectInfo{
					ID:   lineItem.GetGroupId(),
					Name: lineItem.GetGroupName(),
				},
				Cluster:  getValueOrDefault(lineItem.GetClusterName(), "N/A"),
				SKU:      lineItem.GetSku(),
				Cost:     float64(lineItem.GetTotalPriceCents()) / 100.0,
				Date:     startDate,
				Provider: determineProvider(lineItem.GetSku()),
				Instance: determineInstance(lineItem.GetSku()),
				Category: determineCategory(lineItem.GetSku()),
			}
			billingDetails = append(billingDetails, detail)
		}
	}

	return billingDetails, nil
}

// getValueOrDefault returns the value or a default if empty
func getValueOrDefault(value string, defaultValue string) string {
	if value == "" {
		return defaultValue
	}
	return value
}
