.. procedure::
   :style: normal

   .. step:: Connect to your MongoDB Deployment using {+mongosh+}.

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_airbnb`` database.

      .. code-block:: sh

         use sample_airbnb

   .. step:: Create a ``listings_SearchableTypes`` View.

      The following View includes the following two fields:

      - ``idString`` that contains the value of the ``_id`` field after 
        converting it to ``string`` type.
      - ``superHostString`` that contains the value of the 
        ``host.host_is_superhost`` field after converting it to ``string`` 
        type.

      .. literalinclude:: /includes/view/code-snippets/shell/facet-fields-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      The following index definition indexes the ``idString`` and ``superHostString`` 
      fields as the ``token`` type to support faceting on these fields.

      .. literalinclude:: /includes/view/code-snippets/shell/facet-fields-create-index.sh
         :language: sh

   .. step:: Query the ``listingsSearchableTypes`` partial index. 


      The following query searches the ``listings_SearchableTypes`` index for ``ocean view`` in the ``summary`` field. The 
      query retrieves the count of the number of properties that belong to each distinct  ``_id``  and ``host.host_is_superhost``. 

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/view/code-snippets/shell/facet-fields-query-shell.sh
            :language: javascript

         .. output:: /includes/view/code-snippets/output/facet-fields-query-shell-output.json
            :language: javascript