.. list-table::
   :widths: 20 14 11 55
   :stub-columns: 1
   :header-rows: 1

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - providerName
     - string
     - Required     
     - Name of the cloud provider for which you want to create the private 
       endpoint service. |service| accepts **AWS** or **AZURE**.

   * - region
     - string
     - Required
     - Cloud provider region for which you want to create the private 
       endpoint service. To learn which values |service| accepts
       for each cloud provider, see:

       - :ref:`amazon-aws`
       - :ref:`microsoft-azure`

       .. include:: /includes/fact-privatelink-azure-az-limitations.rst
