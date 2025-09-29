package billing

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
	"go.mongodb.org/atlas-sdk/v20250219001/mockadmin"
)

func TestListInvoicesForOrg_Success(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	orgID := "org123"
	invoiceID := "inv_123"

	mockResponse := &admin.PaginatedApiInvoiceMetadata{
		Results: &[]admin.BillingInvoiceMetadata{
			{
				Id:    &invoiceID,
				OrgId: &orgID,
			},
		},
	}

	mockSvc := mockadmin.NewInvoicesApi(t)
	mockSvc.EXPECT().
		ListInvoices(mock.Anything, orgID).
		Return(admin.ListInvoicesApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListInvoicesExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()
	params := &admin.ListInvoicesApiParams{OrgId: orgID}
	result, err := ListInvoicesForOrg(ctx, mockSvc, params)

	require.NoError(t, err)
	require.NotNil(t, result)
	require.Len(t, *result.Results, 1, "Should return one invoice")
	assert.Equal(t, invoiceID, *(*result.Results)[0].Id, "Invoice ID should match expected value")
}

func TestListInvoicesForOrg_ApiError(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	orgID := "org123"

	mockSvc := mockadmin.NewInvoicesApi(t)
	mockSvc.EXPECT().
		ListInvoices(mock.Anything, orgID).
		Return(admin.ListInvoicesApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListInvoicesExecute(mock.Anything).
		Return(nil, nil, assert.AnError).Once()

	params := &admin.ListInvoicesApiParams{OrgId: orgID}
	result, err := ListInvoicesForOrg(ctx, mockSvc, params)

	require.Error(t, err)
	assert.Nil(t, result)
	assert.Contains(t, err.Error(), "list invoices", "Should return formatted error when API call fails")
}

func TestListInvoicesForOrg_NoInvoices(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	orgID := "org123"

	// Create empty mock response
	mockResponse := &admin.PaginatedApiInvoiceMetadata{
		Results: &[]admin.BillingInvoiceMetadata{},
	}

	mockSvc := mockadmin.NewInvoicesApi(t)
	mockSvc.EXPECT().
		ListInvoices(mock.Anything, orgID).
		Return(admin.ListInvoicesApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListInvoicesExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()

	params := &admin.ListInvoicesApiParams{OrgId: orgID}
	result, err := ListInvoicesForOrg(ctx, mockSvc, params)

	require.Error(t, err)
	require.Nil(t, result)
	assert.Contains(t, err.Error(), "not found", "Should return NotFoundError when no invoices exist")
}

func TestListInvoicesForOrg_WithEachOption(t *testing.T) {
	t.Parallel()
	orgID := "org123"

	// Apply each With* function and check if corresponding non-default param is set correctly
	t.Run("WithIncludeCount", func(t *testing.T) {
		params := &admin.ListInvoicesApiParams{OrgId: orgID}
		includeCount := false // (default: true)
		opt := WithIncludeCount(includeCount)
		opt(params)
		require.NotNil(t, params.IncludeCount)
		assert.Equal(t, includeCount, *params.IncludeCount, "IncludeCount should be set to false")
	})

	t.Run("WithItemsPerPage", func(t *testing.T) {
		params := &admin.ListInvoicesApiParams{OrgId: orgID}
		itemsPerPage := 50 // (default: 100)
		opt := WithItemsPerPage(itemsPerPage)
		opt(params)
		require.NotNil(t, params.ItemsPerPage)
		assert.Equal(t, itemsPerPage, *params.ItemsPerPage, "ItemsPerPage should be set to 50")
	})

	t.Run("WithPageNum", func(t *testing.T) {
		params := &admin.ListInvoicesApiParams{OrgId: orgID}
		pageNum := 3 // (default: 1)
		opt := WithPageNum(pageNum)
		opt(params)
		require.NotNil(t, params.PageNum)
		assert.Equal(t, pageNum, *params.PageNum, "PageNum should be set to 3")
	})

	t.Run("WithViewLinkedInvoices", func(t *testing.T) {
		params := &admin.ListInvoicesApiParams{OrgId: orgID}
		viewLinkedInvoices := false // (default: true)
		opt := WithViewLinkedInvoices(viewLinkedInvoices)
		opt(params)
		require.NotNil(t, params.ViewLinkedInvoices)
		assert.Equal(t, viewLinkedInvoices, *params.ViewLinkedInvoices, "ViewLinkedInvoices should be set to false")
	})

	t.Run("WithStatusNames", func(t *testing.T) {
		params := &admin.ListInvoicesApiParams{OrgId: orgID}
		statusNames := []string{"PENDING", "CLOSED"}
		opt := WithStatusNames(statusNames) // (default: all statuses)
		opt(params)
		require.NotNil(t, params.StatusNames)
		assert.Equal(t, statusNames, *params.StatusNames, "StatusNames should be set to [PENDING CLOSED]")
	})

	t.Run("WithDateRange", func(t *testing.T) {
		params := &admin.ListInvoicesApiParams{OrgId: orgID}
		fromDate := time.Date(2023, 1, 1, 0, 0, 0, 0, time.UTC)
		toDate := time.Date(2023, 1, 31, 0, 0, 0, 0, time.UTC)
		opt := WithDateRange(fromDate, toDate)
		opt(params)
		require.NotNil(t, params.FromDate)
		require.NotNil(t, params.ToDate)
		assert.Equal(t, "2023-01-01", *params.FromDate, "FromDate should be set to 2023-01-01")
		assert.Equal(t, "2023-01-31", *params.ToDate, "ToDate should be set to 2023-01-31")
	})

	t.Run("WithSortBy", func(t *testing.T) {
		params := &admin.ListInvoicesApiParams{OrgId: orgID}
		sortBy := "CREATED_DATE" // (default: "END_DATE")
		opt := WithSortBy(sortBy)
		opt(params)
		require.NotNil(t, params.SortBy)
		assert.Equal(t, sortBy, *params.SortBy, "SortBy should be set to CREATED_DATE")
	})

	t.Run("WithOrderBy", func(t *testing.T) {
		params := &admin.ListInvoicesApiParams{OrgId: orgID}
		orderBy := "asc" // (default: "desc")
		opt := WithOrderBy(orderBy)
		opt(params)
		require.NotNil(t, params.OrderBy)
		assert.Equal(t, orderBy, *params.OrderBy, "OrderBy should be set to asc")
	})
}

// TODO revisit this test to assert the options are applied correctly
func TestListInvoicesForOrg_WithCombinedOptions(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	orgID := "org123"

	mockResponse := &admin.PaginatedApiInvoiceMetadata{
		Results: &[]admin.BillingInvoiceMetadata{
			{Id: admin.PtrString("inv_123")},
			{Id: admin.PtrString("inv_456")},
			{Id: admin.PtrString("inv_789")},
			{Id: admin.PtrString("inv_abc")},
			{Id: admin.PtrString("inv_def")},
		},
	}

	includeCount := false
	itemsPerPage := 50
	pageNum := 2
	viewLinked := false
	statusNames := []string{"PENDING", "CLOSED"}
	sortBy := "CREATED_DATE"
	orderBy := "asc"

	mockSvc := mockadmin.NewInvoicesApi(t)

	params := &admin.ListInvoicesApiParams{OrgId: orgID}
	// Apply all options
	options := []InvoiceOption{
		WithIncludeCount(includeCount),
		WithItemsPerPage(itemsPerPage),
		WithPageNum(pageNum),
		WithViewLinkedInvoices(viewLinked),
		WithStatusNames(statusNames),
		WithDateRange(
			time.Date(2023, 1, 1, 0, 0, 0, 0, time.UTC),
			time.Date(2023, 1, 31, 0, 0, 0, 0, time.UTC),
		),
		WithSortBy(sortBy),
		WithOrderBy(orderBy),
	}
	// Mock the ListInvoices call to return our mockReq
	mockSvc.EXPECT().ListInvoices(mock.Anything, orgID).Return(admin.ListInvoicesApiRequest{
		ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListInvoicesExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()

	result, err := ListInvoicesForOrg(ctx, mockSvc, params, options...)

	require.NoError(t, err)
	require.NotNil(t, result)
	require.NotNil(t, result.Results)
	require.Equal(t, mockResponse, result)
	require.Len(t, *result.Results, 5, "Should return all five invoices from the mock response")
}
