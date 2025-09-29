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

func TestCollectLineItemBillingData_Success(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	orgID := "org123"
	orgName := "Test Organization"

	// Create sample invoice data
	startDate := time.Now().Add(-24 * time.Hour)
	invoiceID := "inv_123"
	projectID := "proj456"
	projectName := "Test Project"
	clusterName := "testCluster"
	sku := "CLUSTER-XYZ"

	mockInvoice := admin.BillingInvoice{
		Id: &invoiceID,
		LineItems: &[]admin.InvoiceLineItem{
			{
				StartDate:       admin.PtrTime(startDate),
				GroupId:         &projectID,
				GroupName:       &projectName,
				ClusterName:     &clusterName,
				Sku:             &sku,
				TotalPriceCents: admin.PtrInt64(5000),
			},
		},
	}

	mockResponse := &admin.PaginatedApiInvoice{
		Results: &[]admin.BillingInvoice{mockInvoice},
	}

	mockOrg := &admin.AtlasOrganization{
		Id:   &orgID,
		Name: orgName,
	}

	// Setup mock invoice service
	mockInvoiceSvc := mockadmin.NewInvoicesApi(t)
	mockInvoiceSvc.EXPECT().
		ListPendingInvoices(mock.Anything, orgID).
		Return(admin.ListPendingInvoicesApiRequest{ApiService: mockInvoiceSvc}).Once()
	mockInvoiceSvc.EXPECT().
		ListPendingInvoicesExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()

	// Setup mock org service
	mockOrgSvc := mockadmin.NewOrganizationsApi(t)
	mockOrgSvc.EXPECT().
		GetOrganization(mock.Anything, orgID).
		Return(admin.GetOrganizationApiRequest{ApiService: mockOrgSvc}).Once()
	mockOrgSvc.EXPECT().
		GetOrganizationExecute(mock.Anything).
		Return(mockOrg, nil, nil).Once()

	// Test execution
	lastProcessedDate := time.Now().Add(-48 * time.Hour) // Older than the invoice
	result, err := CollectLineItemBillingData(ctx, mockInvoiceSvc, mockOrgSvc, orgID, &lastProcessedDate)

	// Assertions
	require.NoError(t, err)
	require.Len(t, result, 1)
	detail := result[0]
	assert.Equal(t, orgID, detail.Org.ID)
	assert.Equal(t, orgName, detail.Org.Name)
	assert.Equal(t, projectID, detail.Project.ID)
	assert.Equal(t, projectName, detail.Project.Name)
	assert.Equal(t, clusterName, detail.Cluster)
	assert.Equal(t, sku, detail.SKU)
	assert.Equal(t, 50.0, detail.Cost) // 5000 cents = $50.00
	assert.Equal(t, startDate, detail.Date)
}

func TestCollectLineItemBillingData_ApiError(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	orgID := "org123"

	// Setup mock invoice service with error
	mockInvoiceSvc := mockadmin.NewInvoicesApi(t)
	mockInvoiceSvc.EXPECT().
		ListPendingInvoices(mock.Anything, orgID).
		Return(admin.ListPendingInvoicesApiRequest{ApiService: mockInvoiceSvc}).Once()
	mockInvoiceSvc.EXPECT().
		ListPendingInvoicesExecute(mock.Anything).
		Return(nil, nil, assert.AnError).Once()

	mockOrgSvc := mockadmin.NewOrganizationsApi(t)

	// Test execution
	result, err := CollectLineItemBillingData(ctx, mockInvoiceSvc, mockOrgSvc, orgID, nil)

	// Assertions
	require.Error(t, err)
	assert.Contains(t, err.Error(), "list pending invoices")
	assert.Nil(t, result)
}

func TestCollectLineItemBillingData_NoInvoices(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	orgID := "org123"

	// Create empty response
	mockResponse := &admin.PaginatedApiInvoice{
		Results: &[]admin.BillingInvoice{},
	}

	// Setup mock invoice service
	mockInvoiceSvc := mockadmin.NewInvoicesApi(t)
	mockInvoiceSvc.EXPECT().
		ListPendingInvoices(mock.Anything, orgID).
		Return(admin.ListPendingInvoicesApiRequest{ApiService: mockInvoiceSvc}).Once()
	mockInvoiceSvc.EXPECT().
		ListPendingInvoicesExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()

	mockOrgSvc := mockadmin.NewOrganizationsApi(t)

	// Test execution
	result, err := CollectLineItemBillingData(ctx, mockInvoiceSvc, mockOrgSvc, orgID, nil)

	// Assertions
	require.NoError(t, err) // Invoice lookup returning no results is not an error
	require.Len(t, result, 0)
	assert.Nil(t, result)
}

func TestCollectLineItemBillingData_OrgLookupFails(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	orgID := "org123"

	// Create sample invoice data
	startDate := time.Now().Add(-24 * time.Hour)
	invoiceID := "inv_123"
	projectID := "proj456"
	projectName := "Test Project"
	clusterName := "testCluster"
	sku := "CLUSTER-XYZ"

	mockInvoice := admin.BillingInvoice{
		Id: &invoiceID,
		LineItems: &[]admin.InvoiceLineItem{
			{
				StartDate:       admin.PtrTime(startDate),
				GroupId:         &projectID,
				GroupName:       &projectName,
				ClusterName:     &clusterName,
				Sku:             &sku,
				TotalPriceCents: admin.PtrInt64(5000),
			},
		},
	}

	mockResponse := &admin.PaginatedApiInvoice{
		Results: &[]admin.BillingInvoice{mockInvoice},
	}

	// Setup mock services
	mockInvoiceSvc := mockadmin.NewInvoicesApi(t)
	mockInvoiceSvc.EXPECT().
		ListPendingInvoices(mock.Anything, orgID).
		Return(admin.ListPendingInvoicesApiRequest{ApiService: mockInvoiceSvc}).Once()
	mockInvoiceSvc.EXPECT().
		ListPendingInvoicesExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()

	mockOrgSvc := mockadmin.NewOrganizationsApi(t)
	mockOrgSvc.EXPECT().
		GetOrganization(mock.Anything, orgID).
		Return(admin.GetOrganizationApiRequest{ApiService: mockOrgSvc}).Once()
	mockOrgSvc.EXPECT().
		GetOrganizationExecute(mock.Anything).
		Return(nil, nil, assert.AnError).Once()

	// Test execution
	result, err := CollectLineItemBillingData(ctx, mockInvoiceSvc, mockOrgSvc, orgID, nil)

	// Assertions
	require.NoError(t, err) // Org lookup failure is non-fatal
	require.Len(t, result, 1)
	assert.Equal(t, orgID, result[0].Org.Name) // Falls back to using orgID as name
}

func TestCollectLineItemBillingData_FiltersByDate(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	orgID := "org123"
	orgName := "Test Organization"

	// Create invoice with items before and after cutoff
	startDateOld := time.Now().Add(-48 * time.Hour)
	startDateNew := time.Now().Add(-24 * time.Hour)
	invoiceID := "inv_123"
	projectID := "proj456"
	projectName := "Test Project"
	sku := "CLUSTER-XYZ"

	mockInvoice := admin.BillingInvoice{
		Id: &invoiceID,
		LineItems: &[]admin.InvoiceLineItem{
			{
				StartDate:       admin.PtrTime(startDateOld),
				GroupId:         &projectID,
				GroupName:       &projectName,
				Sku:             &sku,
				TotalPriceCents: admin.PtrInt64(5000),
			},
			{
				StartDate:       admin.PtrTime(startDateNew),
				GroupId:         &projectID,
				GroupName:       &projectName,
				Sku:             &sku,
				TotalPriceCents: admin.PtrInt64(3000),
			},
		},
	}

	mockResponse := &admin.PaginatedApiInvoice{
		Results: &[]admin.BillingInvoice{mockInvoice},
	}

	mockOrg := &admin.AtlasOrganization{
		Id:   &orgID,
		Name: orgName,
	}

	// Setup mock services
	mockInvoiceSvc := mockadmin.NewInvoicesApi(t)
	mockInvoiceSvc.EXPECT().
		ListPendingInvoices(mock.Anything, orgID).
		Return(admin.ListPendingInvoicesApiRequest{ApiService: mockInvoiceSvc}).Once()
	mockInvoiceSvc.EXPECT().
		ListPendingInvoicesExecute(mock.Anything).
		Return(mockResponse, nil, nil).Once()

	mockOrgSvc := mockadmin.NewOrganizationsApi(t)
	mockOrgSvc.EXPECT().
		GetOrganization(mock.Anything, orgID).
		Return(admin.GetOrganizationApiRequest{ApiService: mockOrgSvc}).Once()
	mockOrgSvc.EXPECT().
		GetOrganizationExecute(mock.Anything).
		Return(mockOrg, nil, nil).Once()

	// Test with cutoff between the two dates
	cutoffDate := startDateOld.Add(12 * time.Hour)
	result, err := CollectLineItemBillingData(ctx, mockInvoiceSvc, mockOrgSvc, orgID, &cutoffDate)

	// Assertions
	require.NoError(t, err)
	require.Len(t, result, 1, "Should only include the newer line item")
	assert.Equal(t, startDateNew, result[0].Date)
	assert.Equal(t, 30.0, result[0].Cost) // 3000 cents = $30.00
}
