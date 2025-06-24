.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Response Element
     - Type
     - Description

   * - serverType
     - object
     - Server Type of the physical host.

   * - | serverType
       | .name
     - object
     - Server Type value for the physical host.

       |mms| returns one of following values:

       - ``DEV_SERVER``
       - ``TEST_SERVER``
       - ``PRODUCTION_SERVER``
       - ``RAM_POOL``

       .. seealso::

          :ref:`admin-console-general-mongodb-usage`

   * - | serverType
       | .label
     - object
     - Server Type label for the physical host.

       |mms| returns one of following values:

       - **Dev Server**
       - **Test Server**
       - **Production Server**
       - **Ram Pool**

       .. seealso::

          :ref:`admin-console-general-mongodb-usage`
