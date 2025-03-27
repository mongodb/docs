.. procedure::
   :style: normal

   .. step:: Connect to your {+cluster+} in {+mongosh+}.

      Open {+mongosh+} in a terminal window and
      connect to your {+cluster+}. For detailed instructions on 
      connecting, see :ref:`connect-mongo-shell`.
   
   .. step:: Use the ``sample_mflix`` database.

      Run the following command in the {+mongosh+} prompt:

      .. code-block:: javascript

         use sample_mflix
   
   .. step:: Create an |fts| index on the ``movies`` collection.

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
