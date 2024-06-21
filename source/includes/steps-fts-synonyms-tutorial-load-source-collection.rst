.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. include:: /includes/nav/steps-data-explorer.rst
      
   .. step:: Create one or more sample synonyms collections in the ``sample_mflix`` database.

      If you are running a free or shared tier {+cluster+}, follow the 
      steps in the *Transportation Synonyms* tab to create the collection 
      for a single synonym mapping definition in your index. If you have a 
      ``M10`` or higher cluster and wish to create multiple synonym 
      mappings in your index, follow the steps in both the tabs to create 
      both the *Transportation Synonyms* and *Attire Synonyms* collections.
      
      .. tabs::
      
        .. tab:: Transportation Synonyms
           :tabid: transport
      
           a. Expand the ``sample_mflix`` database and click the 
              :icon-fa5:`plus` icon to open the :guilabel:`Create 
              Collection`  modal.
           #. Type ``transport_synonyms`` in the :guilabel:`Collection 
              name` field.
           #. Click :guilabel:`Create` to create the collection in the 
              ``sample_mflix`` database.
      
        .. tab:: Attire Synonyms
           :tabid: attire
      
           a. Expand the ``sample_mflix`` database and click the 
              :icon-fa5:`plus` icon to open the :guilabel:`Create 
              Collection` modal.
           #. Type ``attire_synonyms`` in the :guilabel:`Collection name` 
              field.
           #. Click :guilabel:`Create` to create the collection in the 
              ``sample_mflix`` database.
      
   .. step:: Load the sample data into the synonyms collection.

      Follow the steps in the tabs to load data into the respective 
      collection.
      
      .. tabs::
      
        .. tab:: Transportation Synonyms
           :tabid: transport
      
           a. Select the ``transport_synonyms`` collection if it's not 
              selected.
         
           #. Click :guilabel:`Insert Document` for each of the sample 
              documents to add to the collection.
      
           #. Click the |json| view (:guilabel:`{}`) to replace the default 
              document.
         
           #. Copy and paste the following sample documents, one at a time, 
              and click :guilabel:`Insert` to add the documents, one at a 
              time, to the collection.
      
              .. code-block:: json 
       
                 {
                   "mappingType": "equivalent",
                   "synonyms": ["car", "vehicle", "automobile"]
                 }
       
              .. code-block:: json 
      
                 {
                   "mappingType": "explicit",
                   "input": ["boat"],
                   "synonyms": ["boat", "vessel", "sail"]
                 }
      
        .. tab:: Attire Synonyms
           :tabid: attire
      
           a. Select the ``attire_synonyms`` collection if it's not 
              selected.
         
           #. Click :guilabel:`Insert Document` for each of the sample 
              documents to add to the collection.
      
           #. Click the |json| view (:guilabel:`{}`) to replace the default 
              document.
         
           #. Copy and paste the following sample documents, one at a time, 
              and click :guilabel:`Insert` to add the documents, one at a 
              time, to the collection.
      
              .. code-block:: json 
       
                 {
                   "mappingType": "equivalent",
                   "synonyms": ["dress", "apparel", "attire"]
                 }
       
              .. code-block:: json 
      
                 {
                   "mappingType": "explicit",
                   "input": ["hat"],
                   "synonyms": ["hat", "fedora", "headgear"]
                 }
