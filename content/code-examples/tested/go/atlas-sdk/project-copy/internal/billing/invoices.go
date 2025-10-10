package billing

import (
	"context"
	"time"

	"atlas-sdk-examples/internal/errors"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// InvoiceOption defines a function type that modifies the parameters for listing invoices
type InvoiceOption func(*admin.ListInvoicesApiParams)

// WithIncludeCount sets the optional includeCount parameter (default: true)
func WithIncludeCount(includeCount bool) InvoiceOption {
	return func(p *admin.ListInvoicesApiParams) {
		p.IncludeCount = &includeCount
	}
}

// WithItemsPerPage sets the optional itemsPerPage parameter (default: 100)
func WithItemsPerPage(itemsPerPage int) InvoiceOption {
	return func(p *admin.ListInvoicesApiParams) {
		p.ItemsPerPage = &itemsPerPage
	}
}

// WithPageNum sets the optional pageNum parameter (default: 1)
func WithPageNum(pageNum int) InvoiceOption {
	return func(p *admin.ListInvoicesApiParams) {
		p.PageNum = &pageNum
	}
}

// WithViewLinkedInvoices sets the optional viewLinkedInvoices parameter (default: true)
func WithViewLinkedInvoices(viewLinkedInvoices bool) InvoiceOption {
	return func(p *admin.ListInvoicesApiParams) {
		p.ViewLinkedInvoices = &viewLinkedInvoices
	}
}

// WithStatusNames sets the optional statusNames parameter (default: include all statuses)
// Possible status names: "PENDING" "CLOSED" "FORGIVEN" "FAILED" "PAID" "FREE" "PREPAID" "INVOICED"
func WithStatusNames(statusNames []string) InvoiceOption {
	return func(p *admin.ListInvoicesApiParams) {
		p.StatusNames = &statusNames
	}
}

// WithDateRange sets the optional fromDate and toDate parameters (default: earliest valid start to latest valid end)
func WithDateRange(fromDate, toDate time.Time) InvoiceOption {
	return func(p *admin.ListInvoicesApiParams) {
		from := fromDate.Format(time.DateOnly) // Format to "YYYY-MM-DD" string
		to := toDate.Format(time.DateOnly)     // Format to "YYYY-MM-DD" string
		p.FromDate = &from
		p.ToDate = &to
	}
}

// WithSortBy sets the optional sortBy parameter (default: "END_DATE")
func WithSortBy(sortBy string) InvoiceOption {
	return func(p *admin.ListInvoicesApiParams) {
		p.SortBy = &sortBy
	}
}

// WithOrderBy sets the optional orderBy parameter (default: "desc")
func WithOrderBy(orderBy string) InvoiceOption {
	return func(p *admin.ListInvoicesApiParams) {
		p.OrderBy = &orderBy
	}
}

// ListInvoicesForOrg returns all eligible invoices for the given Atlas organization,
// including linked organizations when cross-organization billing is enabled.
// Accepts a context for the request, an InvoicesApi client instance, the ID of the
// organization to retrieve invoices for, and optional query parameters.
// Returns the invoice results or an error if the operation fails.
// Use options to customize pagination, filtering, and sorting (see With* functions).
//
// Required Permissions:
//   - Organization Billing Viewer role can view invoices for the organization
//   - Organization Billing Admin or Organization Owner role can view invoices and linked invoices for the organization
func ListInvoicesForOrg(ctx context.Context, sdk admin.InvoicesApi, p *admin.ListInvoicesApiParams, opts ...InvoiceOption) (*admin.PaginatedApiInvoiceMetadata, error) {
	params := &admin.ListInvoicesApiParams{
		OrgId: p.OrgId,
	}

	for _, opt := range opts {
		opt(params)
	}

	req := sdk.ListInvoices(ctx, params.OrgId)

	if params.IncludeCount != nil {
		req = req.IncludeCount(*params.IncludeCount)
	}
	if params.ItemsPerPage != nil {
		req = req.ItemsPerPage(*params.ItemsPerPage)
	}
	if params.PageNum != nil {
		req = req.PageNum(*params.PageNum)
	}
	if params.ViewLinkedInvoices != nil {
		req = req.ViewLinkedInvoices(*params.ViewLinkedInvoices)
	}
	if params.StatusNames != nil {
		req = req.StatusNames(*params.StatusNames)
	}
	if params.FromDate != nil {
		req = req.FromDate(*params.FromDate)
	}
	if params.ToDate != nil {
		req = req.ToDate(*params.ToDate)
	}
	if params.SortBy != nil {
		req = req.SortBy(*params.SortBy)
	}
	if params.OrderBy != nil {
		req = req.OrderBy(*params.OrderBy)
	}

	r, _, err := req.Execute()
	if err != nil {
		return nil, errors.FormatError("list invoices", p.OrgId, err)
	}
	if r == nil || !r.HasResults() || len(r.GetResults()) == 0 {
		return nil, &errors.NotFoundError{Resource: "Invoices", ID: p.OrgId}
	}
	return r, nil
}
