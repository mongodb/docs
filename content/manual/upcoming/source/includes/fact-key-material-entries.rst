Starting in MongoDB 8.3, deployments that use disaggregated storage can
generate an internal key material oplog entry labeled ``op: "km"``.
``km`` entries record key-encryption-key (KEK) metadata that the server
and any tooling that decrypts the oplog need to decrypt future oplog
entries during point-in-time restore workflows. They do not represent
application-level CRUD or DDL operations.

If you run custom tooling that tails the oplog directly on a
disaggregated storage deployment, for example, for change capture,
auditing, or backup, you can either:

- Read ``op: "km"`` entries and use their KEK metadata to decrypt
  subsequent oplog entries if your tooling needs to decrypt or
  interpret those entries.
- Treat them as internal key-management metadata and not as
  logical data changes.
