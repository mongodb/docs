package metrics

import (
	"context"

	"atlas-sdk-examples/internal/errors"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// FetchDiskMetrics returns measurements for a specified disk partition in a MongoDB Atlas project.
// Requires the group ID, process ID, partition name, and parameters for measurement type, granularity, and period.
func FetchDiskMetrics(ctx context.Context, sdk admin.MonitoringAndLogsApi, p *admin.GetDiskMeasurementsApiParams) (*admin.ApiMeasurementsGeneralViewAtlas, error) {
	req := sdk.GetDiskMeasurements(ctx, p.GroupId, p.PartitionName, p.ProcessId)
	req = req.Granularity(*p.Granularity).Period(*p.Period).M(*p.M)

	r, _, err := req.Execute()
	if err != nil {
		return nil, errors.FormatError("fetch disk metrics", p.ProcessId+"/"+p.PartitionName, err)
	}

	if r == nil || !r.HasMeasurements() || len(r.GetMeasurements()) == 0 {
		return nil, &errors.NotFoundError{Resource: "disk metrics", ID: p.ProcessId + "/" + p.PartitionName}
	}
	return r, nil
}
