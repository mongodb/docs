.. list-table::
   :header-rows: 1
   :widths: 15 10 75

   * - Body Parameter
     - Type
     - Description

   * - ``containerId``
     - string
     - Unique identifier of the |service| Network Peering container for |gcp|.

   * - ``gcpProjectId``
     - string
     - |gcp| project ID of the owner of the network peer.

   * - ``errorMessage``
     - string
     - When ``"status" : "FAILED"``, |service| provides a description
       of the error.

   * - ``id``
     - string
     - |service| assigned unique ID for the connection. Only specific
       to and used by |service|.

   * - ``networkName``
     - string
     - Name of the network peer to which |service| connects.

   * - ``status``
     - string
     -
       .. include:: /includes/vpc-peering-status-gcp.rst
