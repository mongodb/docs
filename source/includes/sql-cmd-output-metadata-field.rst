The ``metadata.description`` field describes how the schema was set 
for the collection. Value can be one of the following: 

.. expression:: generated automatically by Atlas Data Lake

   Indicates that the schema was automatically generated 
   by {+adl+}.

.. expression:: set using sqlGenerateSchema with setSchemas = true

   Indicates that the schema was set by the :ref:`sqlgenerateschema-cmd` 
   command because the ``setSchema`` option was set to ``true``.

.. expression:: set using sqlSetSchema

   Indicates that the schema was set using the :ref:`sqlsetschema-cmd` 
   command.
