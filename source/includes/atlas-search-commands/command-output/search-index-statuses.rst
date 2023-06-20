The ``status`` field in the |method-name| output can be one of the
following:

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Status
     - Description

   * - ``BUILDING``
     - The following scenarios can cause an index to be in the
       ``BUILDING`` state:
     
       - Atlas is building the index or re-building the index after an
         edit.

       - Atlas Search cannot keep up with indexing changes to the
         collection. In this case, Atlas rebuilds the index in the
         background.

       When the index is in the ``BUILDING`` state:

       - For a new index, Atlas Search cannot use the index for queries
         until the index build is complete.

       - For an existing index, Atlas Search uses the old index
         definition for queries until the index rebuild is complete.

   * - ``FAILED``
     - The index build failed. Indexes can enter the ``FAILED`` state
       due to an invalid index definition.
   
   * - ``PENDING``
     - Atlas has not yet started building the index.

   * - ``READY``
     - The index is ready and can support queries.

   * - ``STALE``
     - The index is queryable but has stopped replicating data from the
       indexed collection. Searches on the index may return out-of-date
       data.

       Indexes can enter the ``STALE`` state due to replication errors.
