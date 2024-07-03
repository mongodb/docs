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

       An index in the ``BUILDING`` state may be queryable or
       non-queryable. 

   * - ``DOES_NOT_EXIST``
     - The index does not exist. 

       An index in the ``DOES_NOT_EXIST`` state is always non-queryable. 

   * - ``DELETING``
     - Atlas is deleting the index.

       An index in the ``DELETING`` state is always non-queryable. 

   * - ``FAILED``
     - The index build failed. Indexes can enter the ``FAILED`` state
       due to an invalid index definition.

       An index in the ``FAILED`` state may be queryable or
       non-queryable. 
   
   * - ``PENDING``
     - Atlas has not yet started building the index.

       An index in the ``PENDING`` state is always non-queryable. 

   * - ``READY``
     - The index is ready and can support queries.

       An index in the ``READY`` state is always queryable. 

   * - ``STALE``
     - The index is queryable but has stopped replicating data from the
       indexed collection. Searches on the index may return out-of-date
       data.

       Indexes can enter the ``STALE`` state due to replication errors.

       An index in the ``STALE`` state is always queryable. 
