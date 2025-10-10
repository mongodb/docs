package archive

import (
	"context"
	"fmt"

	"atlas-sdk-examples/internal/errors"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// ConfigureOnlineArchive configures online archive for a collection in a MongoDB Atlas cluster.
// It assumes the candidate has been pre-validated by the caller.
// It sets up partition fields and creates the archive request. If data expiration is enabled,
// it also configures the data expiration rule based on retention days.
func ConfigureOnlineArchive(ctx context.Context, sdk *admin.APIClient,
	projectID, clusterName string, candidate Candidate, opts Options) error {

	// Create partition fields configuration
	var partitionFields []admin.PartitionField
	for idx, field := range candidate.PartitionFields {
		partitionFields = append(partitionFields, admin.PartitionField{
			FieldName: field,
			Order:     idx + 1,
		})
	}

	// Setup data expiration if enabled
	var dataExpiration *admin.OnlineArchiveSchedule
	if opts.EnableDataExpiration && opts.DefaultRetentionMultiplier > 0 {
		expirationDays := candidate.RetentionDays * opts.DefaultRetentionMultiplier
		dataExpiration = &admin.OnlineArchiveSchedule{
			Type: opts.ArchiveSchedule,
		}

		// Define request body
		archiveReq := &admin.BackupOnlineArchiveCreate{
			CollName:        candidate.CollectionName,
			DbName:          candidate.DatabaseName,
			PartitionFields: &partitionFields,
		}

		// Set expiration if configured
		if dataExpiration != nil {
			archiveReq.DataExpirationRule = &admin.DataExpirationRule{
				ExpireAfterDays: admin.PtrInt(expirationDays),
			}
		}

		// Configure date criteria if present
		if candidate.DateField != "" {
			archiveReq.Criteria = admin.Criteria{
				DateField:       admin.PtrString(candidate.DateField),
				DateFormat:      admin.PtrString(candidate.DateFormat),
				ExpireAfterDays: admin.PtrInt(candidate.RetentionDays),
			}
		}

		// Execute the request
		_, _, err := sdk.OnlineArchiveApi.CreateOnlineArchive(ctx, projectID, clusterName, archiveReq).Execute()

		if err != nil {
			return errors.FormatError("create online archive",
				fmt.Sprintf("%s.%s", candidate.DatabaseName, candidate.CollectionName),
				err)
		}
	}

	return nil
}
