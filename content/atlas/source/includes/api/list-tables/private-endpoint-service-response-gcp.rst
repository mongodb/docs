.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 66

   * - Response Parameter
     - Type
     - Description

   * - endpointGroupNames
     - array of strings
     - |gcp| network endpoint groups corresponding to the {+google-psc+} endpoint service.
     
   * - errorMessage
     - string
     - Error message pertaining to the |gcp| {+google-psc+} endpoint service. Returns
       ``null`` if there are no errors.

   * - id
     - string
     - Unique 24-hexadecimal character string that identifies the {+google-psc+}
       endpoint service.

   * - regionName
     - string
     - |gcp| region for the {+google-psc+} endpoint service.

   * - serviceAttachmentNames
     - array of strings
     - Unique alphanumeric and special character strings that identify the
       service attachments associated with the |gcp| {+google-psc+} endpoint
       service. Returns an empty list while |service| creates the service attachments.

   * - status
     - string
     - Status of the {+google-psc+} service. Returns one of the following values:

       .. list-table::
          :header-rows: 1
          :stub-columns: 1
          :widths: 20 80

          * - Status
            - Description

          * - AVAILABLE
            - |service| created the load balancer and the |gcp|
              {+google-psc+} service.

          * - INITIATING
            - |service| is creating the load balancer and the |gcp|
              {+google-psc+} service.

          * - FAILED
            - |service| failed to create the load balancer and the
              |gcp| {+google-psc+} service.

          * - DELETING
            - |service| is deleting the |gcp| {+google-psc+} service.
     

