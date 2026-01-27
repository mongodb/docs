.. procedure::
   :style: normal

   .. step:: Connect to your MongoDB Deployment using {+mongosh+}.

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_airbnb`` database.

      .. code-block:: sh

         use sample_airbnb

   .. step:: Create a ``listings_SearchableTypes`` View.

      .. literalinclude:: /includes/fts/views/regex-naming-pattern-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      The following index definition on the ``View`` named
      ``listingsSearchableTypes`` configures a ``typeSet`` to 
      automatically index all fields in the ``searchable_types`` document as 
      the ``string`` type. If you add new fields that match this pattern,
      |fts| will automatically index those fields also.

      .. literalinclude:: /includes/fts/views/regex-naming-pattern-create-index.sh
         :language: javascript

   .. step:: Run a query on the ``totalPriceIndex`` index.

      .. include:: /includes/search-shared/fact-partial-indexing-query.rst

      The following query searches the View named ``listings_SearchableTypes`` 
      for ``house`` with a ``private room``.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/fts/views/regex-naming-pattern-query-shell.sh
            :language: sh

         .. output:: /includes/fts/views/regex-naming-pattern-query-output.js
            :visible: false
            :language: json
