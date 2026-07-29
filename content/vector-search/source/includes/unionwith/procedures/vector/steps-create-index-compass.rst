.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster using |compass|.

      To learn more, see :ref:`atlas-connect-via-compass`. 

   .. step:: Specify the database and collection.

      On the :guilabel:`Database` screen, expand the name of the
      database, ``sample_mflix``, then click the name of the collection,
      ``embedded_movies``.

   .. step:: Create the {+avs+} index.

      a. Click the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

      #. Click :guilabel:`Create`, then select :guilabel:`Search Index` from the dropdown.

      #. Enter ``multiple-vector-search`` as the name of the index.

      #. Select :guilabel:`Vector Search` to define the {+avs+} index. 

         .. literalinclude:: /includes/unionwith/code-snippets/vector/json/create-index.json
            :copyable: true
            :language: json
            :caption: multiple-vector-search
            :linenos:

         .. include:: /includes/unionwith/facts/vector/index-definition.rst

      #. Click :guilabel:`Create Search Index`.
