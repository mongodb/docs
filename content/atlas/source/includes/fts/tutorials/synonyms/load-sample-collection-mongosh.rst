Load the Sample Synonyms Source Collection using the Mongo Shell
----------------------------------------------------------------

Each document in the synonyms source collection describe how one or more
words map to one or more synonyms of those words. To learn more about the
fields and word mapping types in the synonyms source collection documents,
see :ref:`synonyms-coll-format`. 

To begin, you create the synonyms source collection and then add the
collection to the database where you intend to use the synonyms source
collection. In this section, you create one or two sample synonyms source
collections in the ``sample_mflix`` database, and then use the synonyms
source collections with an index of the ``movies`` collection in the same
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

        .. step:: Connect to the deployment using mongosh. 

           In your terminal, connect to your {+service+} cloud-hosted 
           deployment or local deployment from {+mongosh+}. For detailed 
           instructions on how to connect, see 
           :mongosh:`Connect to a Deployment </connect/>`.

        .. step:: Switch to the ``sample_mflix`` database.

           .. io-code-block:: 
              :copyable: true 

              .. input:: 
                 :language: shell

                  use sample_mflix

              .. output:: 
                 :visible: false
                 :language: shell 

                 switched to db sample_mflix

        .. step:: Create the ``transport_synonyms`` collection.

           .. io-code-block:: 
              :copyable: true 

              .. input:: 
                 :language: shell

                  db.createCollection("transport_synonyms")

              .. output:: 
                 :visible: false
                 :language: shell

                 { "ok" : 1 }

        .. step:: Insert documents into the ``transport_synonyms`` collection.

           Insert the following documents that define synonym mappings:

           .. io-code-block:: 
              :copyable: true 

              .. input:: 
                 :language: shell

                  db.transport_synonyms.insertMany([
                    {
                      "mappingType": "equivalent",
                      "synonyms": ["car", "vehicle", "automobile"]
                    },
                    {
                      "mappingType": "explicit",
                      "input": ["boat"],
                      "synonyms": ["boat", "vessel", "sail"]
                    }
                  ])

              .. output:: 
                 :visible: false
                 :language: shell

                 {
                   "acknowledged" : true,
                   "insertedIds" : [
                     ObjectId("..."),
                     ObjectId("...")
                   ]
                 }

  .. tab:: Attire Synonyms
     :tabid: attire

     Create and populate the ``attire_synonyms`` collection:

     .. procedure::
        :style: normal

        .. step:: Connect to the deployment using mongosh. 

           In your terminal, connect to your {+service+} cloud-hosted 
           deployment or local deployment from {+mongosh+}. For detailed 
           instructions on how to connect, see 
           :mongosh:`Connect to a Deployment </connect/>`.

        .. step:: Switch to the ``sample_mflix`` database.

           .. io-code-block:: 
              :copyable: true 

              .. input:: 
                 :language: shell

                  use sample_mflix

              .. output:: 
                 :visible: false
                 :language: shell 

                 switched to db sample_mflix

        .. step:: Create the ``attire_synonyms`` collection.

           .. io-code-block:: 
              :copyable: true 

              .. input:: 
                 :language: shell

                  db.createCollection("attire_synonyms")

              .. output:: 
                 :visible: false
                 :language: shell

                 { "ok" : 1 }

        .. step:: Insert documents into the ``attire_synonyms`` collection.

           Insert the following documents that define synonym mappings:

           .. io-code-block:: 
              :copyable: true 

              .. input:: 
                 :language: shell

                  db.attire_synonyms.insertMany([
                    {
                      "mappingType": "equivalent",
                      "synonyms": ["dress", "apparel", "attire"]
                    },
                    {
                      "mappingType": "explicit",
                      "input": ["hat"],
                      "synonyms": ["hat", "fedora", "headgear"]
                    }
                  ])

              .. output:: 
                 :visible: false
                 :language: shell

                 {
                   "acknowledged" : true,
                   "insertedIds" : [
                     ObjectId("..."),
                     ObjectId("...")
                   ]
                 }