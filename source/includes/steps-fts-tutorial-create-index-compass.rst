.. procedure:: 
   :style: normal 

   .. step:: Connect to your |service| {+cluster+} in |compass|.

      Open {+Compass+} and connect to your |service| {+cluster+}. For
      detailed instructions on connecting, see
      :ref:`atlas-connect-via-compass`. 

   .. step:: Specify the database and collection.

      On the :guilabel:`Database` screen, click the |database|, then
      click the |collection|.  

   .. step:: Create the index.

      a. Click the :guilabel:`Indexes` tab, then select
         :guilabel:`Search Indexes`. 
      #. Click :guilabel:`Create Index` to open the index creation dialog box.
      #. Specify a name for the index and then the search index
         definition. 

         .. list-table:: 
            :widths: 15 85

            * - Index Name 
              - |index-name|
 
            * - Index Definition 
              - .. code-block:: json 
                   :copyable: true 

                   {
                     mappings: { dynamic: true }
                   }

      #. Click :guilabel:`Create Search Index`.
