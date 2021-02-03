.. list-table::
   :header-rows: 1
   :widths: 15 10 75

   * - Response Element
     - Type
     - Description

   * - ``atlasCidrBlock``
     - string
     - |cidr| block that |service| uses for your clusters.

   * - ``gcpProjectId``
     - string
     - Unique identifier of the |gcp| project in which the network peer
       resides. Returns ``null`` until a peering connection is created.
       Maps to the :guilabel:`Atlas GCP Project ID` field returned when
       you create a |vpc| in the |service| console.

       You must provide this value when you create a |vpc| in |gcp|.

   * - ``id``
     - string
     - Unique identifier of the Network Peering container.

   * - ``providerName``
     - string
     - Cloud provider for this Network Peering connection.

   * - ``provisioned``
     - boolean
     - Flag that indicates if the project has clusters deployed in the
       Network Peering container.

   * - ``networkName``
     - string
     - Unique identifier of the Network Peering connection in the
       |service| project. Returns ``null`` until a peering connection
       is created. Maps to the :guilabel:`Atlas VPC Name` field
       returned when you create a |vpc| in the |service| console.

       You must provide this value when you create a |vpc| in |gcp|.

   * - ``regions``
     - array of strings
     - |service| regions where the container resides. |service| 
       returns values for this field only if you provided 
       them in the request when you :ref:`created the network peering
       container <atlas-create-peering-container-api>`.
