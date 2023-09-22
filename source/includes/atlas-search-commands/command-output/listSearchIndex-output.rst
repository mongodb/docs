|method-name| returns an array of documents. Each document in the array
contains the following fields:

.. list-table::
   :header-rows: 1
   :widths: 10 10 20

   * - Field
     - Type
     - Description

   * - ``id``
     - string
     - Unique identifier for the Atlas Search index.

   * - ``name``
     - string
     - Name of the Atlas Search index.

   * - ``status``
     - string
     - Status of the Atlas Search index. For more information, see
       |status-link|.

   * - ``queryable``
     - boolean
     - Indicates whether the index is ready to be queried.

   * - ``latestDefinition``
     - document
     - The most recent index definition set for this index. For more
       information, see :ref:`search-index-definition-create`.
