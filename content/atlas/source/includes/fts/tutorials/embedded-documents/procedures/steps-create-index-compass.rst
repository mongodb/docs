Create the |fts| Index  
~~~~~~~~~~~~~~~~~~~~~~

.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster using |compass|.

      Open {+Compass+} and connect to your cluster. For
      detailed instructions, see :ref:`atlas-connect-via-compass`. 

   .. step:: Specify the database and collection.

      On the :guilabel:`Database` screen, click the name of the database, then click the name of the collection.

   .. step:: Create the |fts| index.

      a. Click the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

      #. Click :guilabel:`Create Atlas Search Index` to open the index creation dialog box.

      #. Name the index, ``embedded-documents-tutorial``.

      #. Specify the |json| |fts| index definition. 

         .. literalinclude:: /includes/fts/tutorials/embedded-documents/index-definition-compass.json
            :copyable: true
            :language: json
            :linenos:

      #. Click :guilabel:`Create Search Index`.
