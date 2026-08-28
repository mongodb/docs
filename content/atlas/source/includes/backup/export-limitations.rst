You can't perform the following actions:

- Export :ref:`fallback snapshots <cps-fallback-snapshots>`.
- Have more than one active export per snapshot.
- Export :manual:`view collections </core/views>`, or
  :manual:`system collections </reference/system-collections>`,
  except for ``<database>.system.js`` collections.
- Export snapshots from {+clusters+} in |a-service| project that has
  :ref:`Encryption at Rest using Customer Key Management
  <security-kms-encryption>` enabled with network access restricted to
  specific IP addresses. This restriction doesn't apply if |service|
  reaches your |kms| through a private endpoint. To learn how to
  configure a private endpoint to your |kms|, see the :ref:`AWS
  instructions <security-aws-kms-pvt-endpoint>` or the :ref:`Azure
  instructions <security-azure-kms-pvt-endpoint>`.
- Export snapshots over :ref:`Private Endpoints
  <atlas-configure-private-endpoint>` (private exports) for |azure| or
  |gcp| clusters.
- Export snapshots taken from MongoDB versions that have reached end of
  life (EOL). See the :legal:`MongoDB Software Lifecycle Schedules
  </support-policy/lifecycles>` for version EOL dates.
- Export snapshots to an |azure| storage account if its firewall rules
  block public access.