a. Connect to the cluster using {+mongosh+}.

   Open {+mongosh+} in a terminal window and connect to your |service|
   {+cluster+}. For detailed instructions on connecting, see
   :ref:`Connect via mongosh <connect-mongo-shell>`.

#. Switch to the database that contains the collection for which you want to create the index. 

   .. example:: 

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: shell
              
            use sample_mflix 

         .. output:: 
            :language: shell 

            switched to db sample_mflix

#. Run the :method:`db.collection.createSearchIndex()` method.

   .. io-code-block::
      :copyable: true

      .. input::
         :language: shell

         db.movies.createSearchIndex(
            "default",
            { mappings: { dynamic: true } }
         )

      .. output::

         default
