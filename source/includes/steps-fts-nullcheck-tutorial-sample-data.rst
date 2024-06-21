.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. include:: /includes/nav/steps-data-explorer.rst
      
   .. step:: Insert documents into the ``sample_mflix.users`` collection.
      
      a. In the ``sample_mflix`` database, select the ``users`` collection.
      
      #. Click :guilabel:`Insert Document`.
      
      #. Click the |json| view (:guilabel:`{}`) to replace the default 
         document.
      
      #. One at a time, copy and paste the following sample documents 
         and click :guilabel:`Insert` to add the documents to the collection.
      
         .. code-block:: json
      
            { "name": "Andre Robinson", "email": "andre.robinson@example.com", "password": null }
      
         .. code-block:: json
      
            { "name": "Laura Garcia", "email": "lgarcia@example.net" }  
