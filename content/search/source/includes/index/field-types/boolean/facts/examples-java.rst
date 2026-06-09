Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/index/shared/facts/try-an-example.rst

.. include:: /includes/index/shared/facts/configure-and-run.rst

The following example creates a {+fts+} index on the ``sample_analytics.customers`` 
collection and indexes the ``active`` field as the ``boolean`` type:

.. literalinclude:: /includes/index/field-types/boolean/code-snippets/java/create-index-basic.java
   :language: java
   :linenos:
   :copyable: true 
