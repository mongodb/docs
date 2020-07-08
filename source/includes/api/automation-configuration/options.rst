The download base is the path to the directory where automatic version
downloads will be targeted and scripts for starting processes will be created.

.. code-block:: cfg

   "options" : {
       "downloadBase" : <string>,
       "downloadBaseWindows" : <string>
   }

.. list-table::
   :widths: 30 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``options``
     - object
     - The ``options`` object is required and must contain both the
       ``downloadBase`` and ``downloadBaseWindows`` fields.

   * - | ``options``
       | ``.downloadBase``
     - string
     - The directory on Linux and Unix (including Mac OS X) platforms for
       automatic version downloads and startup scripts.

   * - | ``options``
       | ``.downloadBaseWindows``
     - string
     - The directory on Windows platforms for automatic version downloads and startup scripts.
