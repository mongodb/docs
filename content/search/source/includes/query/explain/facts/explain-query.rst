
The ``query`` |bson| document describes the execution statistics for
the query. It contains the following fields:

.. list-table::
   :header-rows: 1
   :widths: 15 15 10 60

   * - Field
     - Type
     - Necessity
     - Purpose

   * - ``path``
     - string
     - Optional
     - Path to the operator, only if it isn't the root.

   * - ``type``
     - string
     - Required
     - Name of the Lucene Query that the |fts| operator created. See
       ``query`` for more information.

   * - ``analyzer``
     - string
     - Optional
     - |fts| :ref:`analyzer <analyzers-ref>` used with the query.

   * - ``args``
     - document
     - Required
     - Lucene query information. See ``query`` for more information.

   * - ``stats``
     - document
     - Optional
     - :ref:`explain-timing-breakdown` for the query if ``explain``
       ran with ``executionStats`` or ``allPlansExecution``
       verbosity.
