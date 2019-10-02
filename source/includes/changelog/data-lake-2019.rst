.. _data-lake-v20190917:

17 September 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Allows nested fields in partition :ref:`definitions <datalake-definition-syntax>`.

- No longer enumerates directories on S3 when a single subdirectory containing 
  all the partitions matching the query is identified.

- Fixes an issue where the new storage configuration did not appear 
  on the issuing connection after running 
  :xml:`<mono><ref target="datalake-setstorageconfig">setStorageConfig</ref></mono>`.

.. _data-lake-v20190821:

21 August 2019 Release
~~~~~~~~~~~~~~~~~~~~~~

- Adds support for the :dbcommand:`getLastError` database command.

- Supports :pipeline:`$out` aggregation pipeline stage to S3.

- :dbcommand:`listIndexes` now always returns an empty list.

- Supports the XLSX file format.

- Includes the correlation ID in query execution error messages.

- Returns an error to the client when the cursor storage limit is reached.

- Returns an error to the client on the last :dbcommand:`getMore` if the cursor 
  storage limit is exceeded.

.. _data-lake-v20190730:

30 July 2019
~~~~~~~~~~~~

- Supports :dbcommand:`listCommands`. For example: ``db.runCommand({"listCommands": 1})``

- Includes partition size information in the output of :method:`~db.collection.explain()`.

.. _data-lake-v20190708:

08 July 2019
~~~~~~~~~~~~

- Returns the first batch of cursor results more quickly.

- Improves performance of :pipeline:`$lookup` when combined with :pipeline:`$unwind`.

- Automatically supports ``SCRAM-SHA-1`` credentials without requiring drivers 
  to specify this authentication mechanism.

- Provides a descriptive error message when the file format is unknown.

- Provides additional validation on 
  :xml:`<mono><ref target="datalake-setstorageconfig">setStorageConfig</ref></mono>`.

.. _data-lake-v201900618:

18 June 2019
~~~~~~~~~~~~

Initial public beta release of :doc:`{+data-lake+} </data-lake>`.
