.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster using |compass|.

      To learn more, see :ref:`atlas-connect-via-compass`. 

   .. step:: Specify the database and collection.

      On the :guilabel:`Database` screen, expand the name of the
      database, ``sample_mflix``, then click the name of the collection,
      ``movies``.

   .. step:: Create the {+avs+} index.

      a. Click the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

      #. Click :guilabel:`Create Search Index` to open the index creation dialog box.

      #. Enter ``autoembed_index`` as the name of the index.

      #. Define the {+avs+} index. 

         .. include:: /includes/quick-start/facts/avs-quick-start-auto-embed-index-description.rst

         .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/json/create-index.json
            :copyable: true
            :language: json
            :caption: vector_index
            :linenos:

         For details on all the {+avs+} index settings for Automated Embedding, see 
         :ref:`avs-types-vector-search-options`.

      #. Click :guilabel:`Create Search Index`.
