Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure:: 
   :style: normal

   .. step:: Connect to your |service| cluster using |compass|.

      Open {+Compass+} and connect to your |service| cluster. For
      detailed instructions, see :ref:`atlas-connect-via-compass`. 

   .. step:: Specify the database and collection.

      On the :guilabel:`Database` screen, click the name of the database, then click the name of the collection.

   .. step:: Create the |fts| index.

      a. Click the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

      #. Click :guilabel:`Create Atlas Search Index` to open the index creation dialog box.

      #. Specify a name for the index.

         .. include:: /includes/fts/facts/fact-default-index-name.rst

      #. Specify the |json| |fts| index definition. 

         .. literalinclude:: /includes/fts/field-types/objectId/create-index-basic-compass-placeholders.json
            :copyable: true
            :language: json
            :linenos:

      #. Click :guilabel:`Create Search Index`.