.. option:: --dbName

   *Default*: ``test``

   The database name to use for unqualified table names in the SQL
   query.
   
   The following example uses a collection named ``fruit`` and the
   ``--dbName`` option to specify that ``fruit`` is in the ``groceries``
   database:
   
   .. code-block:: none
   
      mongotranslate "SELECT * FROM fruit WHERE _id > 100;" \
        --schema schema.drdl --dbName groceries
   
   If you do not use the ``--dbName`` option to specify a database,
   ``mongotranslate`` assumes that ``fruit`` is in the ``test``
   database. If the schema does not contain a database named ``test``,
   or a table name ``fruit`` in the ``test`` database,
   ``mongotranslate`` returns an error.
   
   The following example uses a fully-qualified table name, so it does
   not need the ``--dbName`` option.
   
   .. code-block:: sql
   
      mongotranslate "SELECT * FROM groceries.fruit WHERE _id > 100;" \
        --schema schema.drdl
   
   If you specify a database with each table name in your SQL query, the
   ``--dbName`` option is ignored if it is used.
   

