Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

The following example creates a {+fts+} index on the ``sample_analytics.customers`` 
collection and indexes the ``active`` field as the ``boolean`` type:

.. literalinclude:: /includes/fts/field-types/boolean/create-index-basic.java
   :language: java
   :linenos:
   :copyable: true 
