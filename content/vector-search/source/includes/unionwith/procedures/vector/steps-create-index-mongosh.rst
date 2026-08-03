.. procedure:: 
   :style: normal

   .. step:: Connect to the cluster using {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your |service|
      cluster. For detailed instructions on connecting, see
      :ref:`Connect via mongosh <connect-mongo-shell>`.

   .. step:: Switch to the database that contains the collection for which you want to create the index. 

      .. example:: 

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell
                
               use sample_mflix 

            .. output:: 
               :language: shell 

               switched to db sample_mflix

   .. step:: Run the ``db.collection.createSearchIndex()`` method.

      .. literalinclude:: /includes/unionwith/code-snippets/vector/shell/index-definition.sh
         :language: shell
         :copyable: true 
         :linenos:

      .. include:: /includes/unionwith/facts/vector/index-definition.rst
