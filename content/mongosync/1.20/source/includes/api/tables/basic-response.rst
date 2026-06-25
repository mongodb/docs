.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 66

   * - Field
     - Type
     - Description

   * - ``success``
     - boolean
     - When the request is successful, this value is ``true``.

   * - ``error``
     - string
     - If an error occurred, indicates the name of the error. This field
       is omitted from the response when ``success`` is ``true``.

   * - ``errorDescription``
     - string
     - Detailed description of the error that occurred. This field is
       omitted from the response when ``success`` is ``true``.
