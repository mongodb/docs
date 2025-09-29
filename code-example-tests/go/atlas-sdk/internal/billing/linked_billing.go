package billing

import (
	"context"

	"atlas-sdk-examples/internal/errors"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// GetCrossOrgBilling returns a map of all billing invoices for the given organization
// and any linked organizations, grouped by organization ID.
// It accepts a context for the request, an InvoicesApi client instance, the ID of the
// organization to retrieve invoices for, and optional parameters to customize the query.
// It returns a map of organization IDs as keys with corresponding slices of metadata
// as values or an error if the invoice retrieval fails.
//
// Required Permissions:
//   - Organization Billing Viewer role can view invoices for the organization.
//   - Organization Billing Admin or Organization Owner role can view invoices and linked invoices for the organization.
func GetCrossOrgBilling(ctx context.Context, sdk admin.InvoicesApi, p *admin.ListInvoicesApiParams, opts ...InvoiceOption) (map[string][]admin.BillingInvoiceMetadata, error) {
	r, err := ListInvoicesForOrg(ctx, sdk, p, opts...)
	if err != nil {
		return nil, errors.FormatError("get cross-organization billing", p.OrgId, err)
	}

	crossOrgBilling := make(map[string][]admin.BillingInvoiceMetadata)
	if r == nil || !r.HasResults() || len(r.GetResults()) == 0 {
		return crossOrgBilling, nil
	}

	crossOrgBilling[p.OrgId] = r.GetResults()
	for _, invoice := range r.GetResults() {
		if !invoice.HasLinkedInvoices() || len(invoice.GetLinkedInvoices()) == 0 {
			continue
		}

		for _, linkedInvoice := range invoice.GetLinkedInvoices() {
			orgID := linkedInvoice.GetOrgId()
			if orgID == "" {
				continue
			}
			crossOrgBilling[orgID] = append(crossOrgBilling[orgID], linkedInvoice)
		}
	}

	return crossOrgBilling, nil
}
