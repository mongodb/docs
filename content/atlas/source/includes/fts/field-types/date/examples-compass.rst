Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. tabs::  

   .. tab:: Basic Example
      :tabid: basic

      The following example index definition indexes the  ``released``
      field as the |fts| ``date`` type to support queries against that
      field using |fts| operators such as :ref:`near <near-ref>`,
      :ref:`range <range-ref>`, and :ref:`equals <equals-ref>`.  

      .. literalinclude:: /includes/fts/field-types/date/create_index_compass.json
         :language: json
         :linenos:
         :copyable: true 

   .. tab:: Multiple Types Example
      :tabid: multitype 

      The following example index definition indexes the  ``released``
      field as the ``date`` and ``dateFacet`` types to return the
      following types of results for your queries: 
      
      - Search results for queries using |fts| operators like
        :ref:`near <near-ref>`, :ref:`equals <equals-ref>`, and :ref:`range <range-ref>`.  
      - Metadata results for queries using |fts| :ref:`fts-facet-ref`. 

      .. literalinclude:: /includes/fts/field-types/date/create_index_multiple_compass.json
         :language: json
         :linenos:
         :copyable: true 

.. include:: /includes/fts/field-types/configure-and-run.rst 
