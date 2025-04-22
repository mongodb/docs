
.. versionadded:: 8.0

A document that contains query settings previously set using
:dbcommand:`setQuerySettings`:

.. code-block:: javascript
   :copyable: false

   querySettings: {
      indexHints: [ { 
         ns: { db: <string>, coll: <string> },
         allowedIndexes: <array>
      }, ... ],
      queryFramework: <string>
   }

``querySettings`` fields:

.. list-table::
   :header-rows: 1
   :widths: 5 35 60

   * - Field
     - Type
     - Description

   * - ``indexHints.ns``
     - document
     - Namespace for index hints.

       .. list-table::
          :widths: 5 35 50

          * - ``db`` 
            - string
            - Name of the database for index hints.

          * - ``coll``
            - string
            - Name of the collection for index hints.

   * - ``indexHints.allowedIndexes``
     - array
     - Array of indexes for index hints. For more details, see
       :ref:`indexes` and :method:`~cursor.hint()`.

   * - ``queryFramework`` 
     - string
     - :term:`Query framework <query framework>` string can be:

       - ``classic`` for the classic engine.
       - ``sbe`` for {+sbe+}. For details, see :ref:`sbe-landing`.
