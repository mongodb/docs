.. list-table::
   :header-rows: 1
   :widths: 25 13 14 47

   * - Key
     - Type
     - Default
     - Description

   * - ``disableLogging``
     - boolean
     - ``false``
     - Specifies whether |mdb-shell| writes log entries.

   * - ``displayBatchSize``
     - integer
     - 20
     - The number of items displayed per cursor iteration

   * - ``enableTelemetry``
     - boolean
     - ``true``
     - Enables sending anonymized tracking and diagnostic data to
       MongoDB. 

   * - ``editor``
     - string
     - ``null``
     - Designates an editor to use within the :binary:`~bin.mongosh`
       console. Overrides the ``EDITOR`` environment variable if set.

   * - ``forceDisableTelemetry``
     - boolean
     - ``false``
     - Only available in the global configuration file. When true,
       users cannot enable telemetry manually.

   * - ``historyLength``
     - integer
     - 1000
     - The number of items to store in :binary:`~bin.mongosh` REPL's
       history file.

   * - ``inspectCompact``
     - integer or boolean
     - 3
     - The level of inner elements that :binary:`~bin.mongosh` outputs
       on a single line. Short array elements are also grouped together
       on a single line.
       
       If set to ``false``, :binary:`~bin.mongosh` outputs each field
       on its own line.

   * - ``inspectDepth``
     - integer or Infinity
     - 6
     - The depth to which objects are printed. Setting ``inspectDepth``
       to ``Infinity`` (the javascript object) prints all nested
       objects to their full depth. 
   
   * - ``logCompressionEnabled``
     - boolean
     - false
     - Specifies whether |mdb-shell| compresses log files. When this
       value is ``true``, |mdb-shell| uses gzip to compress logs. See
       :ref:`mongosh-log-compression`.

   * - ``logLocation``
     - string
     - Depends on your operating system. See :ref:`mdb-shell-view-logs`.
     - Directory where MongoDB Shell writes log files. Specify an
       absolute filepath. See :ref:`mongosh-log-location`.

   * - ``redactHistory``
     - string
     - ``remove``
     - Controls what information is recorded in the shell history.
       Must be one of:

       - ``keep``: Retain all history.
       - ``remove``: Remove lines which contain sensitive information.
       - ``remove-redact``: Redact sensitive information.

   * - ``showStackTraces``
     - boolean
     - ``false``
     - Controls display of a stack trace along with error messages.

   * - ``snippetAutoload``
     - boolean
     - ``true``
     - If ``true``, automatically load installed
       :ref:`snippets <snip-overview>` at startup.

   * - ``snippetIndexSourceURLs``
     - string
     - `MongoDB Repository
       <https://compass.mongodb.com/mongosh/snippets-index.bson.br>`__
     - A semicolon-separated list of URLs that link to a
       :ref:`snippet <snip-overview>` registry.

   * - ``snippetRegistryURL``
     - string
     - `npm Registry <https://registry.npmjs.org>`__
     - The npm registry used by the :binary:`~bin.mongosh` npm client
       that installs :ref:`snippet <snip-overview>`.
