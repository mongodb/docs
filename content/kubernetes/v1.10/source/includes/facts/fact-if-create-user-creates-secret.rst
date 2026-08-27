When you create a new MongoDB database user, |k8s-op-short| automatically
creates a new |k8s| |k8s-secret|. The |k8s| |k8s-secret|
contains the following information about the new database user:

- ``username``: Username for the database user
- ``password``: Password for the database user
- ``connectionString.standard``: :ref:`Standard connection string <connections-standard-connection-string-format>`
  that can connect you to the database as this database user.
- ``connectionString.standardSrv``: :ref:`DNS seed list connection string <dns-seed-list-connection-format>` that can
  connect you to the database as this database user.

.. note::

   Alternatively, you can specify an optional 
   ``spec.connectionStringSecretName`` field in the 
   :ref:`mongodbuser-specification` to specify 
   the name of the connection string secret that the 
   |k8s-op-short| creates.
