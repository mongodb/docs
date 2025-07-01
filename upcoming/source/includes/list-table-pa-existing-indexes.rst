.. list-table::
   :header-rows: 1
   :widths: 30 10 60

   * - Field
     - Type
     - Description
       
   * - ``collectedIndexes``
     - array
     - Each array element represents one index.
       
   * - ``collectedIndexes[i].index``
     - array
     - Each array element is a document that specifies a key in the
       index and its sort order, ascending or descending. 

       * A value of ``1`` indicates an ascending sort order.
         
       *  A value of ``-1`` indicates a descending sort order.

       Keys in indexes with multiple keys appear in the same order that
       they appear in the index.
       
   * - ``collectedIndex[i].namespace``
     - string
     - The namespace corresponding to the collection to which the index
       belongs. Namespaces appear in the following format: ``{database.collection}``