.. _data-lake-v202020309:

09 March 2020 Release
~~~~~~~~~~~~~~~~~~~~~

- Supports optionally granting {+data-lake+} write access to S3 buckets,
  enabling use of :pipeline:`$out` semantics to write directly to those
  buckets.

- Adds incremental :ref:`store <manage-stores-cli>`, :ref:`database
  <dl-manage-db-cli>`, :ref:`collection <manage-collections-cli>`, and
  :manual:`view </reference/method/db.createView/#db.createView>` 
  commands for storage configuration management.

- Limits collections returned for wildcard collections to 1,000.

- Updates the :ref:`storage configuration format
  <datalake-configuration-format>`. 

.. _data-lake-v20200211:

11 February 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports cross-database :pipeline:`$lookup` queries.
- Supports lowercase and uppercase file extensions. 
- Template segments now support dot-separated attribute names that 
  correspond to nested fields.

.. _data-lake-v20200121:

21 January 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Allows the :ref:`defaultFormat <datalake-databases-reference>` 
  to be specified without a leading dot.
- Supports filtering based on stripes for files in ORC format.
- Allows query attributes to be extracted after the first stage.
