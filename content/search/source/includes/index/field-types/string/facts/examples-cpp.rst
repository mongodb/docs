Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/index/shared/facts/try-an-example.rst

.. include:: /includes/index/shared/facts/configure-and-run.rst 

.. tabs::

   .. tab:: Basic Example 
      :tabid: basic

      The following index definition for the 
      ``sample_mflix.movies`` collection in the :ref:`sample 
      dataset <available-sample-datasets>` indexes the 
      ``title`` field with string values.

      .. literalinclude:: /includes/index/field-types/string/code-snippets/cpp/CreateIndexExample.cpp
         :language: cpp
         :linenos:
         :copyable: true 

   .. tab:: Multi Example
      :tabid: multi

      .. include:: /includes/index/field-types/string/facts/multi-example-intro.rst

      .. literalinclude:: /includes/index/field-types/string/code-snippets/cpp/CreateIndexExampleMulti.cpp
         :language: cpp
         :linenos:
         :copyable: true