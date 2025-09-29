package billing_test

import (
	"context"
	"errors"
	"testing"

	"atlas-sdk-examples/internal/billing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
	"go.mongodb.org/atlas-sdk/v20250219001/mockadmin"
)

func TestGetCrossOrgBilling_Success(t *testing.T) {
	billingOrgID := "billingOrg123"
	linkedOrgID1 := "linkedOrg456"
	linkedOrgID2 := "linkedOrg789"
	invoiceID1 := "inv_abc"
	invoiceID2 := "inv_def"

	// Create mock response for billing org with two linked invoices
	mockResponse := &admin.PaginatedApiInvoiceMetadata{
		Results: &[]admin.BillingInvoiceMetadata{
			{
				Id: &invoiceID1,
				LinkedInvoices: &[]admin.BillingInvoiceMetadata{
					{OrgId: &linkedOrgID1, AmountBilledCents: admin.PtrInt64(1000)},
				},
			},
			{
				Id: &invoiceID2,
				LinkedInvoices: &[]admin.BillingInvoiceMetadata{
					{OrgId: &linkedOrgID1, AmountBilledCents: admin.PtrInt64(2000)},
					{OrgId: &linkedOrgID2, AmountBilledCents: admin.PtrInt64(500)},
				},
			},
		},
	}

	mockSvc := mockadmin.NewInvoicesApi(t)
	mockSvc.EXPECT().
		ListInvoices(mock.Anything, billingOrgID).
		Return(admin.ListInvoicesApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListInvoicesExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()

	params := &admin.ListInvoicesApiParams{OrgId: billingOrgID}
	results, err := billing.GetCrossOrgBilling(context.Background(), mockSvc, params)

	require.NoError(t, err)
	assert.Len(t, results, 3, "Should return billing org and two linked orgs")
	assert.Len(t, results[linkedOrgID1], 2, "Should return two invoices for linkedOrgID1")
	assert.Equal(t, int64(1000), *results[linkedOrgID1][0].AmountBilledCents, "First invoice for linkedOrgID1 should have 1000 cents billed")
	assert.Equal(t, int64(2000), *results[linkedOrgID1][1].AmountBilledCents, "Second invoice for linkedOrgID1 should have 2000 cents billed")
	assert.Len(t, results[linkedOrgID2], 1, "Should return one invoice for linkedOrgID2")
	assert.Equal(t, int64(500), *results[linkedOrgID2][0].AmountBilledCents, "Invoice for linkedOrgID2 should have 500 cents billed")
}

func TestGetCrossOrgBilling_ApiError(t *testing.T) {
	billingOrgID := "billingOrgErr"
	expectedError := errors.New("API error")

	mockSvc := mockadmin.NewInvoicesApi(t)
	mockSvc.EXPECT().
		ListInvoices(mock.Anything, billingOrgID).
		Return(admin.ListInvoicesApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListInvoicesExecute(mock.Anything).
		Return(nil, nil, expectedError).Once()

	params := &admin.ListInvoicesApiParams{OrgId: billingOrgID}
	_, err := billing.GetCrossOrgBilling(context.Background(), mockSvc, params)

	require.Error(t, err)
	assert.Contains(t, err.Error(), expectedError.Error(), "Should return API error")
}

func TestGetCrossOrgBilling_NoLinkedInvoices(t *testing.T) {
	billingOrgID := "billingOrgEmpty"
	invoiceID := "inv_empty"

	// Create mock response with no linked invoices
	mockResponse := &admin.PaginatedApiInvoiceMetadata{
		Results: &[]admin.BillingInvoiceMetadata{
			{
				Id:             &invoiceID,
				LinkedInvoices: &[]admin.BillingInvoiceMetadata{},
			},
		},
	}

	mockSvc := mockadmin.NewInvoicesApi(t)
	mockSvc.EXPECT().
		ListInvoices(mock.Anything, billingOrgID).
		Return(admin.ListInvoicesApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListInvoicesExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()

	params := &admin.ListInvoicesApiParams{OrgId: billingOrgID}
	results, err := billing.GetCrossOrgBilling(context.Background(), mockSvc, params)

	require.NoError(t, err)
	assert.Len(t, results, 1, "Should only include the billing org invoice")
}

func TestGetCrossOrgBilling_MissingOrgID(t *testing.T) {
	billingOrgID := "billingOrgMissing"
	linkedOrgID := "validOrgID"
	invoiceID := "inv_missing_org"

	// Create mock response with one valid and one invalid linked invoice
	mockResponse := &admin.PaginatedApiInvoiceMetadata{
		Results: &[]admin.BillingInvoiceMetadata{
			{
				Id: &invoiceID,
				LinkedInvoices: &[]admin.BillingInvoiceMetadata{
					{OrgId: nil, AmountBilledCents: admin.PtrInt64(500)},           // Invalid: missing OrgId
					{OrgId: &linkedOrgID, AmountBilledCents: admin.PtrInt64(1000)}, // Valid
				},
			},
		},
	}

	mockSvc := mockadmin.NewInvoicesApi(t)
	mockSvc.EXPECT().
		ListInvoices(mock.Anything, billingOrgID).
		Return(admin.ListInvoicesApiRequest{ApiService: mockSvc}).Once()
	mockSvc.EXPECT().
		ListInvoicesExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()

	params := &admin.ListInvoicesApiParams{OrgId: billingOrgID}
	results, err := billing.GetCrossOrgBilling(context.Background(), mockSvc, params)

	require.NoError(t, err)
	assert.Len(t, results, 2, "Should return billing org and the valid linked invoice")
	assert.Len(t, results[linkedOrgID], 1, "Should return one invoice for linkedOrgID")
	assert.Equal(t, int64(1000), *results[linkedOrgID][0].AmountBilledCents, "Invoice for linkedOrgID should have 1000 cents billed")
}
