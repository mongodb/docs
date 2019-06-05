.. list-table::
   :widths: 20 20 40 20
   :header-rows: 1

   * - Key
     - Type
     - Description
     - Example

   * - ``data.authenticationMode``
     - string
     - Requires all agents to use X.509 client authentication when
       communicating with MongoDB deployments.
     - ``x509``

   * - ``data.credentials``
     - string
     - Name of the |k8s| secret containing the |com| username and Public
       API key. If you have not created these credentials yet,
       see :ref:`create-k8s-secret`.

     - ``mycredentials``
