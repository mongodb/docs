|mms| downloads automatic versions and runs starting scripts in the directory set in **options.downloadBase**.

.. code-block:: json

   "options" : {
     "downloadBase" : "<string>",
   }

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - options
     - object
     - Required
     - Path for automatic downloads of new versions.

   * - options.downloadBase
     - string
     - Required
     - Directory on Linux and UNIX (including macOS) platforms for
       automatic version downloads and startup scripts.

