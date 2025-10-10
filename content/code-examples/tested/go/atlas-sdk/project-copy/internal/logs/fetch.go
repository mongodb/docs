package logs

import (
	"context"
	"io"

	"atlas-sdk-examples/internal/errors"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// FetchHostLogs retrieves logs for a specific host in a given Atlas project.
// Accepts a context for the request, an MonitoringAndLogsApi client instance, and
// the request parameters.
// Returns the raw, compressed log stream or an error if the operation fails.
func FetchHostLogs(ctx context.Context, sdk admin.MonitoringAndLogsApi, p *admin.GetHostLogsApiParams) (io.ReadCloser, error) {
	req := sdk.GetHostLogs(ctx, p.GroupId, p.HostName, p.LogName)
	rc, _, err := req.Execute()
	if err != nil {
		return nil, errors.FormatError("fetch logs", p.HostName, err)
	}
	if rc == nil {
		return nil, &errors.NotFoundError{Resource: "logs", ID: p.HostName + "/" + p.LogName}
	}
	return rc, nil
}
