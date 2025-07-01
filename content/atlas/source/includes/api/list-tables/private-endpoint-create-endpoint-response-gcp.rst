.. _ref-status-field:
.. list-table::
  :header-rows: 1
  :stub-columns: 1
  :widths: 20 14 66 

  * - Response Parameter
    - Type
    - Description

  * - id
    - string
    - Unique identifier for the endpoint group.

  * - deleteRequested
    - boolean
    - Flag that indicates whether |service| received a request to remove
      the private endpoint group.

  * - errorMessage
    - string
    - Error message pertaining to the private endpoint group. |service|
      returns **null** if there are no errors.

  * - status
    - string
    - Status of the endpoint group. |service| returns one of the
      following values:

      .. list-table::
         :header-rows: 1
         :stub-columns: 1
         :widths: 20 80

         * - Status
           - Description

         * - FAILED
           - |service| failed to accept the connection to your private
             endpoint group.

         * - INITIATING
           - |service| has not yet accepted the connection to your
             private endpoint group.

         * - AVAILABLE
           - |service| approved the connection to your private endpoint group.

         * - DELETING
           - |service| is removing the connection to your private
             endpoint group from Private Service Connect.

         * - VERIFIED
           - |service| successfully mapped the endpoints for the
             endpoint group to the service attachments.

  * - endpoints
    - array
    - Collection of individual private endpoints that comprise your network
      endpoint group. Each object in the array includes the following fields:

      .. list-table::
         :header-rows: 1
         :stub-columns: 1
         :widths: 20 14 66

         * - Response Parameter
           - Type
           - Description
         
         * - status
           - string
           - Status of the endpoint. |service| returns one of the
             :ref:`values shown above <ref-status-field>`.

         * - endpointName
           - string
           - Forwarding rule that corresponds to the endpoint you created in |gcp|.
         
         * - ipAddress
           - string
           - Private IP address of the network endpoint group you created in |gcp|.

         * - serviceAttachmentName
           - string
           - Unique alphanumeric and special character strings that identify the
             service attachment associated with the endpoint.