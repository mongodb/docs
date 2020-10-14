.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - ``providerName``
     - string
     - Required     
     - Name of the cloud provider you want to create the private 
       endpoint connection for. 

       Must be ``AWS``.

   * - ``region``
     - string
     - Required
     - Cloud provider region in which you want to create the private 
       endpoint connection. Accepted values are:

       - ``us-east-1``
       - ``us-east-2``
       - ``us-west-1``
       - ``us-west-2``
       - ``ca-central-1``
       - ``sa-east-1``
       - ``eu-north-1``
       - ``eu-west-1``
       - ``eu-west-2``
       - ``eu-west-3``
       - ``eu-central-1``
       - ``me-south-1``
       - ``ap-northeast-1``
       - ``ap-northeast-2``
       - ``ap-south-1``
       - ``ap-southeast-1``
       - ``ap-southeast-2``
       - ``ap-east-1``