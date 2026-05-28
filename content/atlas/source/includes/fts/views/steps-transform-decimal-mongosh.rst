.. procedure::
   :style: normal

   .. step:: Connect to your MongoDB Deployment using {+mongosh+}.

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_airbnb`` database.

      .. code-block:: sh

         use sample_airbnb

   .. step:: Create a ``listings_SearchablePrice`` View.

      The following View includes a field named ``totalPrice`` that contains 
      the sum of value of the ``price`` and ``cleaning-fee`` fields. Before 
      adding the values of these fields, the following code converts the values 
      of the ``price`` and ``cleaning-fee`` fields to ``double`` type.

      .. literalinclude:: /includes/fts/views/decimal-to-double-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. note:: 

         If your cluster is running MongoDB v8.0, use the {+atlas-ui+} or the 
         {+atlas-admin-api+} to create the index.

      .. literalinclude:: /includes/fts/views/decimal-to-double-create-index.sh
         :language: sh

   .. step:: Query the ``listingsSearchablePrice`` index. 

      The following query searches the index named ``listingsSearchablePrice`` 
      for properties that cost between ``100`` and ``200``, both inclusive.

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/fts/views/decimal-to-double-query-shell.sh 
            :language: javascript 

         .. output:: /includes/fts/views/decimal-to-double-query-shell-output.json 
            :language: javascript