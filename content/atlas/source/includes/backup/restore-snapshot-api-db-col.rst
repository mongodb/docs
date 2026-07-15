The {+atlas-admin-api+} provides endpoints for restoring selected
databases or collections from a snapshot.

- To list the available databases within a snapshot, use the
  :oas-bump-atlas-op:`Return Databases in the One Snapshot
  <listgroupclusterbackupsnapshotdatabases>` endpoint.

- To list the available collections within a database, use the
  :oas-bump-atlas-op:`Return Collections in One Database in One Snapshot
  <listgroupgroupclusterbackupsnapshotdatabasecollections>` endpoint.

- To verify that a specific database exists, use the
  :oas-bump-atlas-op:`Return One Database in One Snapshot
  <getgroupclusterbackupsnapshotdatabase>` endpoint.

- To verify that a specific collection exists, use the
  :oas-bump-atlas-op:`Return One Collection in One Database in One Snapshot
  <getgroupclusterbackupsnapshotdatabasecollection>` endpoint.

- To initiate your restore job, use the
  :oas-bump-atlas-op:`Create One Collection Restore Job
  <creategroupclustercollectionrestorejob>` endpoint.

  For restore jobs using scheduled or on-demand snapshots, define the
  ``snapshotId`` field.
		
- To review all {+db-coll-restore+} jobs, use the
  :oas-bump-atlas-op:`Return All Collection Restore Jobs for One Cluster
  <listgroupclustercollectionrestorejobs>` endpoint.

- To review a specific {+db-coll-restore+} job, use the
  :oas-bump-atlas-op:`Return One Collection Restore Job for One Cluster
  <getgroupclustercollectionrestorejob>` endpoint.

- To review the states of all databases or collections targeted for
  restore, use the :oas-bump-atlas-op:`Return All Collection States for
  One Collection Restore Job <listgroupclustercollectionrestorejobcollections>`.

- To review the state of a specific database or collection targeted for restore,  use the :oas-bump-atlas-op:`Return One Collection State for One Collection
  Restore Job <getgroupclustercollectionrestorejobcollection>`.
