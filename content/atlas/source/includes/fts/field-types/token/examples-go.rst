Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

.. tabs::  

   .. tab:: Index as token Type Only Example
      :tabid: token-type-only

      The following index definition indexes string values in the  
      ``title`` field as |fts| |fts-field-type| type and converts the
      field value to ``lowercase``, which allows you to do the
      following: 
      
      - Perform case-insensitive sort, as specified by the
        ``normalizer``, on the ``title`` field.
      - Run exact match queries on the ``title`` field using the
        following operators:  

        - :ref:`equals <equals-ref>`
        - :ref:`in <in-ref>`
        - :ref:`range <range-ref>`

      .. literalinclude:: /includes/fts/field-types/token/create_index_token.go
         :language: go
         :linenos:
         :copyable: true 

   .. tab:: Index as Multiple Types Example
      :tabid: multiple-types

      The following index definition indexes the ``genres`` field as  
      ``string`` and ``token`` types to return the following: 
      
      - Search results for queries using |fts| operators like
        :ref:`text <text-ref>`, :ref:`phrase <phrase-ref>`, and other operators that
        perform text search on the ``genres`` field. 
      - Sorted results for queries using the :pipeline:`$search`
        :ref:`sort <sort-ref>` option on the ``genres`` field.
      - Exact matches for queries using |fts| operators like
        :ref:`equals <equals-ref>`, :ref:`in <in-ref>`, and :ref:`range <range-ref>`.  

      .. literalinclude:: /includes/fts/field-types/token/create_index_token_multi.go
         :language: go
         :linenos:
         :copyable: true