.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 80

   * - Name
     - Description

   * - ``Date``
     - Timestamp in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date and
       time format in :abbr:`UTC (Coordinated Universal Time)` when the
       period for which the line item applies ended.

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

   * - ``Application``

     - Name of the `MongoDB Stitch <https://docs.mongodb.com/stitch/>`_ app
       associated with the line item.

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

