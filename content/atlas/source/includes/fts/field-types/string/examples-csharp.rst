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

      .. literalinclude:: /includes/fts/field-types/string/CreateIndexExample.cs
         :language: csharp
         :linenos:
         :copyable: true 

   .. tab:: Multi Example
      :tabid: multi

      .. include:: /includes/fts/field-types/string/multi-example-intro.rst

      .. literalinclude:: /includes/fts/field-types/string/CreateIndexExampleMulti.cs
         :language: csharp
         :linenos:
         :copyable: true