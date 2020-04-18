.. _data-lake-v20191210:

10 December 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Includes several performance and stability improvements.

- Supports partition definition for the following:

  - ``epoch_secs``, which is seconds since the Unix Epoch
  - ``epoch_millis``, which is milliseconds since the Unix Epoch
  - ``UUID``, which is binary subtype 4

.. _data-lake-v20191111:

11 November 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Includes several performance and stability improvements.

- Adds support for reading Apache ORC files.

.. _data-lake-v20191029:

29 October 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Supports filtering partitions by `Parquet file row group 
  <https://parquet.apache.org/documentation/latest/>`_ statistics.

- Supports :manual:`ObjectIds </reference/method/ObjectId/>` in the 
  path when specifying partition 
  :datalakeconf:`~databases.<database>.<collection>.[n].definition`.

.. _data-lake-v20191008:

08 October 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Returns an error if a query produces a document larger than 16 MiB.

- The :pipeline:`$indexStats` stage now produces an empty list of indexes instead 
  of an error.

- Supports :pipeline:`$out` to S3 storage format in JSON.

- :pipeline:`$match` now implicitly treats all terms as conjunctions.

- No longer parses empty files.

- Fixes an issue that caused the ``{$match: {$expr: {$and: []}}}`` expression 
  to terminate the connection.

.. _data-lake-v20190917:

17 September 2019 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Allows nested fields in partition :ref:`definitions <datalake-path-syntax>`.

- No longer enumerates directories on S3 when a single subdirectory containing 
  all the partitions matching the query is identified.

- Fixes an issue where the new storage configuration did not appear 
  on the issuing connection after running 
  :xml:`<mono><ref target="datalake-setstorageconfig">setStorageConfig</ref></mono>`.

.. _data-lake-v20190821:

21 August 2019 Release
~~~~~~~~~~~~~~~~~~~~~~

- Adds support for the :dbcommand:`getLastError` database command.

- Fixes a bug with how union types are handled in Avro.

- Supports :pipeline:`$out` aggregation pipeline stage to S3.

- :dbcommand:`listIndexes` now always returns an empty list.

- Translates dot-delimited CSV and TSV keys into subdocuments.

- Storage configuration error message now includes a link to the 
  documentation.

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

Initial public beta release of :ref:`atlas-data-lake`.
