.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster using |compass|.

      Open {+Compass+} and connect to your cluster. For
      detailed instructions, see :ref:`atlas-connect-via-compass`. 

   .. step:: Specify the database and collection.

      On the :guilabel:`Database` screen, click the name of the
      database, then click the name of the collection.

   .. step:: Create the {+avs+} index.

      a. In the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

      #. From the :guilabel:`Create` dropdown, select :guilabel:`Search Index`.

      #. In the :guilabel:`Name of Search Index` field, enter ``hybrid-vector-search``.

         Your {+avs+} index is named ``vector_index`` by default. If you
         use this name, then your index will be the default {+avs+}
         index for any {+avs+} query that does not specify a different
         index name in the pipeline. If you are creating multiple
         indexes, we recommend that you maintain a consistent,
         descriptive naming convention across your indexes.

      #. Under :guilabel:`Vector Search`, specify the |json| {+avs+}
         index definition.  

         .. literalinclude:: /includes/avs/hybrid-search/shared-index/create-avs-index.json
            :copyable: true
            :language: json
            :linenos:

      #. Click :guilabel:`Create Search Index`.

   .. step:: Create the |fts| index.

      a. In the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

      #. From the :guilabel:`Create` dropdown, select :guilabel:`Search Index`.

      #. In the :guilabel:`Name of Search Index` field, enter ``hybrid-full-text-search``.

         .. include:: /includes/fts/facts/fact-default-index-name.rst

      #. Under :guilabel:`Search`, specify the |json| {+avs+}
         index definition.  

         .. literalinclude:: /includes/avs/hybrid-search/shared-index/create-fts-index.json
            :copyable: true
            :language: json
            :linenos:

      #. Click :guilabel:`Create Search Index`. 
