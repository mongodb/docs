.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 50 50

   * - Parameter
     - Requirement
   * - providerSettings.instanceSizeName
     - ``M10`` or greater
   * - backupEnabled
     - **false** or omitted

You must configure encryption at rest for the |service|
project before enabling it on any cluster in the
project.

.. seealso::

   - :ref:`security-kms-encryption`.
   - :ref:`security-aws-kms-restrictions`.

