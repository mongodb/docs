.. code-block:: javascript

   {
     "name": "<Filter Name>",
     "apply_when": { Expression },
     "query": { MongoDB Query },
     "projection": { MongoDB Projection }
   }

.. list-table::
   :header-rows: 1
   :widths: 15 40

   * - Field
     - Description

   * - | ``name``
       | ``string``
     - Required. The name of the filter. Filter names are
       useful for identifying and distinguishing between filters.
       Limited to 100 characters or fewer.

   * - | ``apply_when``
       | ``object``
     - An :ref:`expression <expressions>` that determines when this filter
       applies to an incoming MongoDB operation.

       .. include:: /includes/note-filters-no-mongodb-expansions.rst

   * - | ``query``
       | ``object``
       | *Default:* ``{}``
     - A :manual:`MongoDB query </tutorial/query-documents/>` that App Services merges
       into a filtered operation's existing query.

       .. example::

          A filter withholds documents that have a ``score`` below ``20`` using
          the following query:

          .. code-block:: json

             { "score": { "$gte": 20 } }

   * - | ``projection``
       | ``object``
       | *Default:* ``{}``
     - A :manual:`MongoDB projection </tutorial/project-fields-from-query-results/>`
       that App Services merges into a filtered operation's existing projection.

       .. important:: Projection Conflicts
          
          MongoDB projections can be either inclusive or exclusive, i.e.
          they can either return only specified fields or withhold
          fields that are not specified. If multiple filters apply to a
          query, the filters must all specify the same type of
          projection, or the query will fail.

       .. example::
          
          A filter withholds the ``_internal`` field from all documents using
          the following projection:

          .. code-block:: json
             
             { "_internal": 0 }
