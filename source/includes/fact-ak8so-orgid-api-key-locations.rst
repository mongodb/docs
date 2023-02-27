To connect to the {+atlas-admin-api+}, |ak8so| reads the organization 
ID and |api| keys from one of the following locations:

- :setting:`spec.connectionSecretRef.name` (if specified in 
  the :ref:`atlasproject-custom-resource`).

- ``global`` |ak8so| |k8s-secret| 
  ``<operator-deployment-name>-api-key`` 
  (if :setting:`spec.connectionSecretRef.name` is not specified).
