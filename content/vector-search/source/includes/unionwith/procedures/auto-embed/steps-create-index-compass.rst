.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster using |compass|.

      To learn more, see :ref:`atlas-connect-via-compass`. 

   .. step:: Specify the database and collection.

      On the :guilabel:`Database` screen, expand the name of the
      database, ``sample_mflix``, then click the name of the collection,
      ``embedded_movies``.

   .. step:: Create the {+avs+} indexes.

      a. Click the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

      #. Click :guilabel:`Create`, then select :guilabel:`Search Index` from the dropdown.

      #. Enter ``multiple-auto-embed-search`` as the name of the index.

      #. Select :guilabel:`Vector Search` to define the {+avs+} index. 

         .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/json/create-index-auto-embed.json
            :copyable: true
            :language: json
            :caption: multiple-vector-search
            :linenos:

         .. include:: /includes/unionwith/facts/auto-embed/index-definition-auto-embed.rst

      #. Click :guilabel:`Create`, then select :guilabel:`Search Index` from the dropdown.

      #. Enter ``multiple-models-search`` as the name of the index.

      #. Select :guilabel:`Vector Search` to define the {+avs+} index.

         .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/json/create-index-vector.json
            :copyable: true
            :language: json
            :caption: multiple-vector-search
            :linenos:

         .. include:: /includes/unionwith/facts/auto-embed/index-definition-vector.rst

      #. Click :guilabel:`Create Search Index`.
