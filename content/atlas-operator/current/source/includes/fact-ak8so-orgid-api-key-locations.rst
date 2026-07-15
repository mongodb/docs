To connect to the {+atlas-admin-api+}, |ak8so| reads the organization 
ID and credentials (|api| keys or Service Account) from one of the 
following locations:

- :ref:`spec.connectionSecretRef.name <atlasproject-spec-connectionsecretref>` (if specified in 
  the :ref:`atlasproject-custom-resource`).

  .. include:: /includes/fact-ak8so-connection-secret-namespace.rst

- ``global`` |ak8so| |k8s-secret| 
  ``<operator-deployment-name>-api-key`` 
  (if :ref:`spec.connectionSecretRef.name <atlasproject-spec-connectionsecretref>` is not specified).
