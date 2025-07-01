.. procedure:: 
   :style: normal

   .. step:: Connect to the |service| {+cluster+} using {+mongosh+}.

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the database that contains the collection for which you want to create the index.

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: shell
               
            use sample_mflix 

         .. output:: 
            :language: shell 

            switched to db sample_mflix

   .. step:: Define the {+avs+} index.

      Run the following command. This index definition indexes the ``plot_embedding`` field as
      the {+avs+} field when querying the collection.

      .. literalinclude:: /includes/avs/rrf-tutorial/create-avs-index-mongosh.sh
         :language: shell
         :copyable: true 
         :linenos:

   .. step:: Define the |fts| index. 

      The following index definition automatically indexes all the
      dynamically indexable fields in the collection.

      .. literalinclude:: /includes/avs/rrf-tutorial/create-fts-index-mongosh.sh
         :language: shell
         :copyable: true 
         :linenos:
