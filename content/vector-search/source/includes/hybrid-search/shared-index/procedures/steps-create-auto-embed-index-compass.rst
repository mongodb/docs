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

      #. Under :guilabel:`Vector Search`, specify the |json| {+avs+}
         index definition.  

         .. literalinclude:: /includes/hybrid-search/shared-index/code-snippets/json/create-auto-embed-index.json
            :copyable: true
            :language: json
            :linenos:

         This index definition indexes the ``fullplot`` field as the 
         ``autoEmbed`` field, for which {+avs+} automatically generates 
         embeddings using the ``voyage-4`` embedding model. 

      #. Click :guilabel:`Create Search Index`.

   .. step:: Create the {+fts+} index.

      a. In the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

      #. From the :guilabel:`Create` dropdown, select :guilabel:`Search Index`.

      #. In the :guilabel:`Name of Search Index` field, enter ``hybrid-full-text-search``.

         .. include:: /includes/shared/facts/fact-default-index-name.rst

      #. Under :guilabel:`Search`, specify the |json| {+avs+}
         index definition.  

         .. literalinclude:: /includes/hybrid-search/shared-index/code-snippets/json/create-fts-index.json
            :copyable: true
            :language: json
            :linenos:

      #. Click :guilabel:`Create Search Index`. 
