- ``org_id`` - Unique identifier of an organization.
- ``project_id`` - Unique identifier of a project.
- ``public_api_key`` - Public key for programmatic access.
- ``private_api_key`` - Private key for programmatic access. 
- ``ops_manager_url`` - **|onprem| only**  |mms| base URL.
- ``ops_manager_ca_certificate`` - **|onprem| only**
  If applicable, the full path on your local system to the PEM-encoded
  Certificate Authority (CA) certificate used to sign the client and
  |onprem| TLS certificates.
- ``ops_manager_skip_verify`` - **|onprem| only** When set to ``yes``,
  the ``ops_manager_ca_certificate`` TLS certificate is not verified.
  This prevents your connections from being rejected due to an invalid
  certificate.

  .. include:: /includes/admonitions/skip-verify-insecure.rst
