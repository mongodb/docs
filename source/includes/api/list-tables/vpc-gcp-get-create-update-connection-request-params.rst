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
     - Unique identifier of the |service| Network Peering container for
       |gcp|.

       You can create a |service| |vpc| container using the
       :doc:`Create Container </reference/api/vpc-create-container>`
       endpoint. You cannot create more than one |gcp| container per
       project.

       To retrieve a list of container IDs, use the
       :doc:`Get list of Network Peering containers </reference/api/vpc-get-containers-list>`
       endpoint.

   * - ``gcpProjectId``
     - string
     - Required
     - |gcp| project ID of the owner of the network peer.

   * - ``networkName``
     - string
     - Required
     - Name of the network peer to which |service| connects.

   * - ``providerName``
     - string
     - Required
     - Cloud provider for this Network Peering connection.
       Set this value to ``GCP``.
