.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - keyVault
     - object
     - Conditional
     - Vault-backed credential source for this |s3ss|.
       When ``s3AuthMethod`` is ``KEYS``, provide either the
       ``keyVault`` object or both ``awsAccessKey`` and
       ``awsSecretKey``, but not both. To learn more, see
       :ref:`om-vault-snapshot-store-credentials`.

   * - keyVault.vaultId
     - string
     - Conditional
     - Unique identifier of the key vault configuration that stores the
       credentials. This value matches the ``id`` of a key vault
       configuration. Required when you provide ``keyVault``.

   * - keyVault.awsAccessKeyPath
     - string
     - Conditional
     - Path to the |aws| access key in the key vault, in the form
       ``<secret-path>/<key>``. |onprem| reads the value of the
       ``<key>`` field from the Vault KV version 2 secret at
       ``<secret-path>``. For example, ``secret/data/s3/aws-access-key``
       reads the ``aws-access-key`` field from the secret at
       ``secret/data/s3``. Include the ``/data/`` segment that KV
       version 2 requires. Don't include the ``/v1/`` |api| prefix.
       |onprem| adds the prefix automatically. Required when you provide
       ``keyVault``.

   * - keyVault.awsSecretKeyPath
     - string
     - Conditional
     - Path to the |aws| secret key in the key vault. Uses the same
       ``<secret-path>/<key>`` format as ``keyVault.awsAccessKeyPath``.
       Required when you provide ``keyVault``.
