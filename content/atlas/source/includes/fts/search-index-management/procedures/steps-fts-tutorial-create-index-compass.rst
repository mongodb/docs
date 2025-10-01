.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster via |compass|.
      
      Open {+Compass+} and connect to your cluster. For
      detailed instructions, see :ref:`atlas-connect-via-compass`. 
   
   .. step:: Specify the database and collection.
      
      On the :guilabel:`Database` screen, click the |database|, then click the |collection|.

   .. step:: Create the |fts| index.
      
      a. Click the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 
      
      #. Click :guilabel:`Create Index` to open the index creation dialog box.
      
      #. Specify a name for the index.

         .. include:: /includes/fts/facts/fact-default-index-name.rst
      
      #. Specify the |json| |fts| index definition. 

         .. literalinclude:: /includes/fts/field-types/string/index-definition-compass.json
            :language: json
            :linenos:
            :copyable: true
            
      #. Click :guilabel:`Create Search Index`.
