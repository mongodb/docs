Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst 

.. tabs::

   .. tab:: Basic Example 
      :tabid: basic

      The following index definition for the 
      ``sample_mflix.movies`` collection in the :ref:`sample 
      dataset <available-sample-datasets>` indexes the 
      ``title`` field with string values.

      .. literalinclude:: /includes/fts/field-types/string/create-index-example-mongosh.js
         :language: js
         :linenos:
         :copyable: true 

   .. tab:: Multi Example
      :tabid: multi

      The following index definition for the 
      ``sample_mflix.movies`` collection in the :ref:`sample 
      dataset <available-sample-datasets>` indexes the 
      ``title`` field with string values. It also specifies the analyzers
      :ref:`lucene.english <ref-language-analyzers>` and :ref:`lucene.french
      <ref-language-analyzers>` as alternate analyzers for the ``title`` field.

      .. literalinclude:: /includes/fts/field-types/string/create-index-example-multi-mongosh.js
         :language: js
         :linenos:
         :copyable: true