You can't perform the following actions:

- Export :ref:`fallback snapshots <cps-fallback-snapshots>`.
- Have more than one active export per snapshot.
- Export :manual:`view collections </core/views>`, or
  :manual:`system collections </reference/system-collections>`,
  except for ``<database>.system.js`` collections.
- Export snapshots from {+clusters+} in |a-service| project
  with IP-restricted :ref:`Encryption at Rest
  <security-kms-encryption>` enabled.
- Export snapshots over :ref:`Private Endpoints
  <atlas-configure-private-endpoint>` (private exports) for |azure| or
  |gcp| clusters.
