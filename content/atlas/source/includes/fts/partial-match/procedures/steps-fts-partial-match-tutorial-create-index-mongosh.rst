a. Connect to the cluster using {+mongosh+}.

   Open {+mongosh+} in a terminal window and connect to your |service|
   {+cluster+}. For detailed instructions on connecting, see
   :ref:`Connect via mongosh <connect-mongo-shell>`.

#. Switch to the ``sample_mflix`` database.

   .. code-block:: shell

      use sample_mflix

#. Run the :method:`db.collection.createSearchIndex()` method to create the search index.

.. tabs::

   .. tab:: autocomplete
      :tabid: autocomplete

      The following command creates an autocomplete index on the ``plot`` field.

      .. code-block:: shell

         db.movies.createSearchIndex(
           "partial-match-tutorial",
           {
             "mappings": {
               "fields": {
                 "plot": {
                   "type": "autocomplete"
                 }
               }
             }
           }
         )

   .. tab:: string
      :tabid: string

      The following command creates a string index on the ``plot`` field.

      .. code-block:: shell

        db.movies.createSearchIndex(
          "partial-match-tutorial",
          {
            "mappings": {
              "fields": {
                "plot": {
                  "type": "string"
                }
              }
            }
          }
        )

