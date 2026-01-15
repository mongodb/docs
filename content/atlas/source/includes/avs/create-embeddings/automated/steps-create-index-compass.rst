.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster using |compass|.

      To learn more, see :ref:`atlas-connect-via-compass`. 

   .. step:: Specify the database and collection.

      On the :guilabel:`Database` screen, expand the name of the
      database, ``sample_airbnb``, then click the name of the collection,
      ``listingsAndReviews``.

   .. step:: Create the {+avs+} index.

      a. Click the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

      #. Click :guilabel:`Create Atlas Search Index` to open the index creation dialog box.

      #. Enter ``vector_index`` as the name of the index.

      #. Define the {+avs+} index. 

         .. literalinclude:: /includes/avs/create-embeddings/automated/create-index.json
            :copyable: true
            :language: json
            :caption: vector_index
            :linenos:

      #. Click :guilabel:`Create Search Index`.
