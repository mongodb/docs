package archive

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"sync/atomic"
	"testing"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// helper to build an SDK client that targets a test server
func testClient(baseURL string, t *testing.T) *admin.APIClient {
	t.Helper()
	sdk, err := admin.NewClient(
		admin.UseBaseURL(baseURL),
	)
	if err != nil {
		t.Fatalf("failed to create sdk client: %v", err)
	}
	return sdk
}

func TestConfigureOnlineArchive_SendsExpectedRequest_WhenExpirationEnabled(t *testing.T) {
	// Capture request and validate JSON body
	var capturedMethod string
	var capturedPath string
	var capturedBody []byte
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		capturedMethod = r.Method
		capturedPath = r.URL.Path
		body, _ := io.ReadAll(r.Body)
		_ = r.Body.Close()
		capturedBody = append([]byte(nil), body...)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusAccepted)
	}))
	defer srv.Close()

	sdk := testClient(srv.URL, t)

	ctx := context.Background()
	candidate := Candidate{
		DatabaseName:    "sales",
		CollectionName:  "orders",
		RetentionDays:   90,
		PartitionFields: []string{"createdAt", "tenantId"},
		DateField:       "createdAt",
		DateFormat:      "DATE",
	}
	opts := Options{
		MinimumRetentionDays:       30,
		EnableDataExpiration:       true,
		DefaultRetentionMultiplier: 2,
		ArchiveSchedule:            "DAILY",
	}

	err := ConfigureOnlineArchive(ctx, sdk, "1234567890abcdef", "Cluster0", candidate, opts)
	assert.NoError(t, err)

	assert.Equal(t, http.MethodPost, capturedMethod)
	// Path should include groups/{projectId}/clusters/{clusterName}/onlineArchives
	assert.Contains(t, capturedPath, "/groups/1234567890abcdef/")
	assert.Contains(t, capturedPath, "/clusters/Cluster0/")
	assert.Contains(t, capturedPath, "/onlineArchives")

	// Validate JSON payload has expected fields
	var payload map[string]any
	dec := json.NewDecoder(bytes.NewReader(capturedBody))
	dec.UseNumber()
	err = dec.Decode(&payload)
	assert.NoError(t, err)

	assert.Equal(t, "orders", payload["collName"])
	assert.Equal(t, "sales", payload["dbName"])

	// partitionFields should be an array with order values starting at 1
	pfs, ok := payload["partitionFields"].([]any)
	if assert.True(t, ok, "partitionFields should be an array") {
		if assert.Len(t, pfs, 2) {
			pf0 := pfs[0].(map[string]any)
			pf1 := pfs[1].(map[string]any)
			assert.Equal(t, "createdAt", pf0["fieldName"])  // JSON field names are lower-camel
			assert.Equal(t, json.Number("1"), pf0["order"]) // numbers may be json.Number
			assert.Equal(t, "tenantId", pf1["fieldName"])
			assert.Equal(t, json.Number("2"), pf1["order"])
		}
	}

	// Data expiration rule should be present and equal to RetentionDays * multiplier
	der, ok := payload["dataExpirationRule"].(map[string]any)
	if assert.True(t, ok, "dataExpirationRule should be present") {
		assert.Equal(t, json.Number("180"), der["expireAfterDays"]) // 90 * 2
	}

	// Criteria should be included because DateField is provided
	crit, ok := payload["criteria"].(map[string]any)
	if assert.True(t, ok, "criteria should be present") {
		assert.Equal(t, "createdAt", crit["dateField"])
		assert.Equal(t, "DATE", crit["dateFormat"])
		assert.Equal(t, json.Number("90"), crit["expireAfterDays"]) // candidate.RetentionDays
	}
}

func TestConfigureOnlineArchive_NoOp_WhenExpirationDisabled(t *testing.T) {
	var hit int32
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		atomic.AddInt32(&hit, 1)
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{}`))
	}))
	defer srv.Close()

	sdk := testClient(srv.URL, t)

	ctx := context.Background()
	candidate := Candidate{
		DatabaseName:    "db",
		CollectionName:  "coll",
		RetentionDays:   90,
		PartitionFields: []string{"createdAt"},
		DateField:       "createdAt",
		DateFormat:      "DATE",
	}

	// Case 1: disabled flag
	opts := Options{MinimumRetentionDays: 30, EnableDataExpiration: false, DefaultRetentionMultiplier: 2}
	err := ConfigureOnlineArchive(ctx, sdk, "g", "c", candidate, opts)
	assert.NoError(t, err)

	// Case 2: zero multiplier
	opts2 := Options{MinimumRetentionDays: 30, EnableDataExpiration: true, DefaultRetentionMultiplier: 0}
	err = ConfigureOnlineArchive(ctx, sdk, "g", "c", candidate, opts2)
	assert.NoError(t, err)

	// No HTTP requests should have been made in either case
	assert.Equal(t, int32(0), atomic.LoadInt32(&hit))
}
