.. list-table:: 
   :header-rows: 1
   :widths: 15 10 75

   * - Name
     - Type
     - Description

   * - ``comment``
     - string
     - Human-readable string associated with this private endpoint.

   * - ``endpointId``
     - string
     - Unique 22-character alphanumeric string that identifies the 
       private endpoint. {+adf+} supports |aws| private endpoints using 
       the `{aws-pl+}
       <https://aws.amazon.com/privatelink/>`__ feature.

   * - ``provider``
     - string
     - Human-readable label that identifies the cloud provider for this 
       endpoint. Value is |aws|. 

   * - ``type``
     - string
     - Human-readable label that identifies the resource associated 
       with this private endpoint. Value is ``DATA_LAKE``. 
       