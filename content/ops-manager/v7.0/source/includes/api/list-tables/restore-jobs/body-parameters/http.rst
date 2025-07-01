.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ``delivery``
     - object
     - Required
     - Method and details of how the restored :manual:`snapshot </reference/glossary/#std-term-snapshot>` data
       is delivered.

   * - | ``delivery``
       | ``.expires``
     - string
     - Conditional
     - |iso8601-time| after which the |url| is no longer available.

       If you set ``delivery.expires``, you can't set
       ``delivery.expirationHours``.

   * - | ``delivery``
       | ``.expirationHours``
     - number
     - Conditional
     - Number of hours the download |url| is valid once the restore
       job is complete.

       If you set ``delivery.expirationHours``, you can't set
       ``delivery.expires``.

   * - | ``delivery``
       | ``.maxDownloads``
     - number
     - Required
     - Number of times the download |url| can be used. This must be
       ``1`` or greater.

   * - | ``delivery``
       | ``.methodName``
     - string
     - Required
     - Means by which |mms| delivers the data. Set to ``HTTP``.

   * - ``snapshotId``
     - string
     - Required
     - Unique identifier of the :manual:`snapshot </reference/glossary/#std-term-snapshot>` to restore.

