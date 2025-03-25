.. procedure:: 
   :style: normal

   .. step:: Define the {+avs+} index.

      The following index definition indexes the ``plot_embedding`` field as
      the {+avs+} field when querying the collection.

      To create an {+avs+} index for a collection using {+mongosh+}
      v2.1.2 or later, perform the following steps:
      
      .. include:: /includes/avs/rrf-tutorial/avs-rrf-tutorial-create-vector-index-mongosh.rst

   .. step:: Define the |fts| index. 

      The following index definition indexes the ``title`` field as the 
      :ref:`string <bson-data-types-string>` type for querying the
      field.

      To create a |fts| index for a collection using {+mongosh+}
      v2.1.2 or later, perform the following steps:
      
      .. include:: /includes/avs/rrf-tutorial/avs-rrf-tutorial-create-fts-index-mongosh.rst
