.. list-table::
   :header-rows: 1
   :widths: 15 10 10 65

   * - Parameter
     - Type
     - Necessity
     - Description

   * - ``containerId``
     - string
     - Required
     - Unique identifier of the |service| |vpc| container for |gcp|.
       
       You can create a |service| |vpc| container using the
       :doc:`Create Container </reference/api/vpc-create-container>`
       endpoint. You cannot create more than one |gcp| container per
       project.
       
       To retrieve a list of container IDs, use the 
       :doc:`Get list of VPC containers </reference/api/vpc-get-containers-list>` 
       endpoint.

   * - ``gcpProjectId``
     - string
     - Required
     - |gcp| project ID of the owner of the peer |vpc|.

   * - ``id``
     - string
     - Required
     - |service| assigned unique ID for the connection. Only specific
       to and used by |service|.

   * - ``networkName``
     - string
     - Required
     - Name of the peer |vpc|.

   * - ``providerName``
     - string
     - Optional
     - Cloud provider for this |vpc| peering connection.
       Accepted values are ``AWS`` and ``GCP``. If omitted,
       |service| set this parameter to ``AWS``.
