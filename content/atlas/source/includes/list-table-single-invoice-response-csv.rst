.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 80

   * - Name
     - Description

   * - ``Date``
     - |iso8601-time| when the period for which the line item applies
       ended.

   * - ``Description``
     - Description of the line item.

   * - ``Note``
     - Note regarding the line item.

   * - ``Project``
     - Name of the project with which the line item is associated.

   * - ``Project ID``
     - ID of the project with which the line item is associated.

   * - ``SKU``
     - Description of the line item. This could be the instance type, a
       support charge, advanced security, etc.

   * - ``Region``
     - Name of the region in which the charge was incurred.

   * - ``Cluster``
     - The name of the cluster that incurred the charge.

   * - ``Replica Set``
     - The name of the replica set that incurred the charge

   * - ``Config Server``
     - The name of the config server that incurred the charge

   * - ``Unit``
     - Unit of measure of the item (e.g. hours, GB, etc.)

   * - ``Unit Price``
     - Cost of the item, in dollars.

   * - ``Quantity``
     - Number of units of the line item (e.g. GB, hours, etc.).

   * - ``Discount Percent``
     - Percent of discount

   * - ``Amount``

     - Total price for the line item, in USD. Equal to
       ``unitPriceDollars * quantity * 100``.

