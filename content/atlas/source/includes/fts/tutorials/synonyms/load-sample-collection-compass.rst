Load the Sample Synonyms Source Collection with Compass
-------------------------------------------------------

Each document in the synonyms source collection describe how one or more
words map to one or more synonyms of those words. To learn more about the
fields and word mapping types in the synonyms source collection documents,
see :ref:`synonyms-coll-format`. 

To begin, you create the synonyms source collection and then add the
collection to the database where you intend to use the synonyms source
collection. In this section, you create one or two sample synonyms source
collections in the ``sample_mflix`` database using the MongoDB C++ driver, and then use 
the synonyms source collections with an index of the ``movies`` collection in the same
database.

If you are running a free tier {+cluster+} or a {+Flex-cluster+},
follow the steps in the :guilabel:`Transportation Synonyms` tab to create the collection
for a single synonym mapping definition in your index. If you have a
``M10`` or higher cluster and wish to create multiple synonym
mappings in your index, follow the steps in both the tabs to create
both the :guilabel:`Transportation Synonyms` and :guilabel:`Attire Synonyms` collections.

.. tabs::

  .. tab:: Transport Synonyms
     :tabid: transport

     Create and populate the ``transport_synonyms`` collection:

     .. procedure:: 
        :style: normal

        .. step:: Connect to your cluster using |compass|.

           Open {+Compass+} and connect to your cluster. For
           detailed instructions, see :ref:`atlas-connect-via-compass`. 

        .. step:: Create the collection.

           On the :guilabel:`Database` screen, select the database ``sample_mflix``, then select
           :guilabel:`Create Collection`. 

        .. step:: Specify the collection name. 

           Enter ``transport_synonyms`` as the collection name and select :guilabel:`Create Collection`.

        .. step:: Load sample data into the collection.

           a. Select the ``transport_synonyms`` collection if it's not already
              selected.
         
           #. Click :guilabel:`Add Data` for each of the sample 
              documents to add to the collection.
      
           #. Click :guilabel:`Insert Document` to replace the default 
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

     Create and populate the ``attire_synonyms`` collection:
     
     .. procedure:: 
        :style: normal

        .. step:: Connect to your cluster using |compass|.

           Open {+Compass+} and connect to your cluster. For
           detailed instructions, see :ref:`atlas-connect-via-compass`. 

        .. step:: Create the collection.

           On the :guilabel:`Database` screen, select the database ``sample_mflix``, then select
           :guilabel:`Create Collection`. 

        .. step:: Specify the collection name. 

           Enter ``attire_synonyms`` as the collection name and select :guilabel:`Create Collection`.

        .. step:: Load sample data into the collection.

           a. Select the ``attire_synonyms`` collection if it's not already
              selected.
         
           #. Click :guilabel:`Add Data` for each of the sample 
              documents to add to the collection.
      
           #. Click :guilabel:`Insert Document` to replace the default 
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