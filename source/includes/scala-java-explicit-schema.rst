By default, reading from MongoDB in a ``SparkSession`` infers the
schema by sampling documents from the collection. You can also use a
|class| to define the schema explicitly, thus removing the extra
queries needed for sampling.

.. note::

   If you provide a case class for the schema, MongoDB returns **only
   the declared fields**. This helps minimize the data sent across the
   wire.
   
The following statement creates a ``Character`` |class| and then
uses it to define the schema for the ``DataFrame``:
