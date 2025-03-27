To create an |fts| index through {+mongosh+}:

.. procedure::
   :style: normal

   .. step:: Connect using ``mongosh``.

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Create an |fts| index.

      Use the :method:`db.collection.createSearchIndex() 
      <db.collection.createSearchIndex()>` method.

      The command has the following syntax.
      If you omit the index name, |fts| names the index 
      ``default``. To learn more, see :ref:`ref-index-definitions`.

      .. code-block:: javascript

         db.<collection>.createSearchIndex(
              "<index-name>",
              {
                  /* search index definition */
              }
         )

      .. example::

         To create an index named ``example-index`` that 
         dynamically indexes the fields in the ``movies`` 
         collection, run the following command:

         .. io-code-block::
            :copyable: true

            .. input::
               :language: shell

               db.movies.createSearchIndex(
                   "example-index",
                   { mappings: { dynamic: true } }
               )

            .. output::

               example-index
    