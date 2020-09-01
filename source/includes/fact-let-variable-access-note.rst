.. note::

   To reference variables in :ref:`pipeline <lookup-join-pipeline>`
   stages, use the ``"$$<variable>"`` syntax. 

   The :ref:`let <lookup-join-let>` variables can be accessed by the
   stages in the :ref:`pipeline <lookup-join-pipeline>`, including
   additional :pipeline:`$lookup` stages nested in the ``pipeline``.
   
   - A :pipeline:`$match` stage requires the use of an
     :query:`$expr` operator to access the variables.
     :query:`$expr` allows the use of aggregation expressions
     inside of the :pipeline:`$match` syntax.

     Without the use of the :query:`$expr` operator, :pipeline:`$match`
     can refer to fields in a document but cannot access variables
     defined by a :pipeline:`$lookup` :ref:`let <lookup-join-let>`
     clause.

     The :query:`$expr` operator only uses indexes on the ``from``
     collection for equality matches. Non-equality match queries, such
     as range queries, cannot use indexes on the ``from`` collection.

   - Other (non-:pipeline:`$match`) stages in the :ref:`pipeline
     <lookup-join-pipeline>` do not
     require an :query:`$expr` operator to access the variables.
