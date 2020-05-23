.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - ``hosts``
     - array of strings
     - Required
     - List of virtual hosts bound to the provided physical host.

   * - | ``hosts``
       | ``.groupId``
     - string
     - Optional
     - Unique identifier of the project into which |onprem| places this
       virtual host.

   * - | ``hosts``
       | ``.hostname``
     - string
     - Optional
     - |fqdn| of the virtual host bound to the physical host.

   * - ``name``
     - string
     - Required
     - Label you gave to the physical host. This value must be unique.

   * - ``serverType``
     - string
     - Required
     - Server Type of the physical host. You can set this to one of the
       following values:

       - ``DEV_SERVER``
       - ``TEST_SERVER``
       - ``PRODUCTION_SERVER``

       .. seealso::

          :ref:`admin-console-general-mongodb-usage`
