|onprem| no longer supports the creation of cluster snapshots from
database deployments that use :ref:`local key encryption <encrypt-local-key-mgmt>`.
If you encrypt a database deployment with local key encryption,
the snapshot fails.
To encrypt snapshots, use |kmip|-based encryption with your database deployments.
If you are unable to use |kmip|-based encryption, 
please contact MongoDB Support for assistance.
