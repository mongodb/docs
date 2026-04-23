The ``metadata`` contains helpful metadata, such as the following:

.. list-table:: 
   :header-rows: 1
   :widths: 15 15 10 60

   * - Field 
     - Type 
     - Necessity 
     - Purpose

   * - ``mongotVersion``
     - String
     - Optional
     - Current version of ``mongot``.

   * - ``mongotHostName``
     - String
     - Optional
     - Human readable label that identifies the ``mongot`` host.

   * - ``indexName``
     - String
     - Optional
     - {+avs+} index used in the query.

   * - ``cursorOptions``
     - Document
     - Optional
     - Cursor options given to ``mongot``.

   * - ``totalLuceneDocs``
     - Integer
     - Optional
     - Total number of documents in the index including deleted
       documents.
