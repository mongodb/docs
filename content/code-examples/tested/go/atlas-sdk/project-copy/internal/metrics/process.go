package metrics

import (
	"context"

	"atlas-sdk-examples/internal/errors"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// FetchProcessMetrics returns measurements for a specified host process in a MongoDB Atlas project.
// Requires the group ID, process ID, and parameters for measurement type, granularity, and period.
func FetchProcessMetrics(ctx context.Context, sdk admin.MonitoringAndLogsApi, p *admin.GetHostMeasurementsApiParams) (*admin.ApiMeasurementsGeneralViewAtlas, error) {
	req := sdk.GetHostMeasurements(ctx, p.GroupId, p.ProcessId)
	req = req.Granularity(*p.Granularity).Period(*p.Period).M(*p.M)

	r, _, err := req.Execute()
	if err != nil {
		return nil, errors.FormatError("fetch process metrics", p.ProcessId, err)
	}
	if r == nil || !r.HasMeasurements() || len(r.GetMeasurements()) == 0 {
		return nil, &errors.NotFoundError{Resource: "process metrics", ID: p.ProcessId}
	}
	return r, nil
}
