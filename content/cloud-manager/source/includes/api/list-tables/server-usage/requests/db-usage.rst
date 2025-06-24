.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - serverType
     - object
     - Required
     - Server Type of the physical host.

   * - | serverType
       | .name
     - object
     - Required
     - Server Type value for the physical host.

       You can set this to one of the following values:

       - ``DEV_SERVER``
       - ``TEST_SERVER``
       - ``PRODUCTION_SERVER``
       - ``RAM_POOL``

       .. seealso::

          :ref:`admin-console-general-mongodb-usage`

   * - | serverType
       | .label
     - object
     - Optional
     - Server Type label for the physical host.

       You can set this to one of the following values:

       - **Dev Server**
       - **Test Server**
       - **Production Server**
       - **Ram Pool**

       .. seealso::

          :ref:`admin-console-general-mongodb-usage`
