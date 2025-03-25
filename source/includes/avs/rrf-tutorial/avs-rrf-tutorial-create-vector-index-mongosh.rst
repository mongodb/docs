A. Connect to the |service| {+cluster+} using {+mongosh+}.

   To learn more, see :ref:`connect-mongo-shell`.

#. Switch to the database that contains the collection for which you want to create the index.

   .. io-code-block:: 
      :copyable: true 

      .. input:: 
         :language: shell
              
         use sample_mflix 

      .. output:: 
         :language: shell 

         switched to db sample_mflix

#. Run the :method:`db.collection.createSearchIndex()` method.

   .. literalinclude:: /includes/avs/rrf-tutorial/create-avs-index-mongosh.sh
      :language: shell
      :copyable: true 
      :linenos:
