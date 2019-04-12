.. list-table::
   :header-rows: 1
   :widths: 75 25

   * - Parameter
     - Requirement
   * - | ``providerSettings``
       | ``.instanceSizeName``
     - ``M10`` or greater
   * - ``backupEnabled``
     - ``false`` or omitted

For complete documentation on Encryption at Rest
restrictions, see :ref:`security-aws-kms-restrictions`.

You must configure encryption at rest for the |service|
project before enabling it on any cluster in the
project. For complete documentation on configuring
Encryption at Rest, see :ref:`security-kms-encryption`.