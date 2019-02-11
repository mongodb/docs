.. list-table::
   :header-rows: 1
   :widths: 15 10 75

   * - Body Parameter
     - Type
     - Description

   * - ``containerId``
     - string
     - Unique identifier of the |service| |vpc| container for |gcp|.

   * - ``gcpProjectId``
     - string
     - |gcp| project ID of the owner of the peer |vpc|.

   * - ``id``
     - string
     - |service| assigned unique ID for the connection. Only specific
       to and used by |service|.

   * - ``networkName``
     - string
     - Name of the peer |vpc|.

   * - ``status``
     - string
     - 
       .. include:: /includes/vpc-peering-status-gcp.rst
