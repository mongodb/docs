Create a Sample Collection and Load the Data 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You must begin by creating a collection named ``schools`` in an 
existing or new database on your cluster. After creating the 
collection, you must upload the sample data into your collection. To
learn more about the documents in the sample collection, see
:ref:`embedded-documents-tutorial-sample-collection`. 

The steps in this section walk you through creating a new database 
and collection, and loading the sample data into your collection.

.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-data-explorer.rst

   .. step:: Create a new collection. 

      a. Click :guilabel:`Create Database` to create a new database.
      #. Enter the database name and collection name.
         
         - In the :guilabel:`Database Name` field, specify
           ``local_school_district``.
         - For the :guilabel:`Collection Name` field, specify
           ``schools``.

   .. step:: Load the following documents into the collection. 

      a. Select the ``schools`` collection if it's not selected.
      #. Click :guilabel:`Insert Document` for each of the sample 
         documents to add to the collection.
      #. Click the |json| view (:guilabel:`{}`) to replace the default 
         document.
      #. Copy and paste the following sample documents, one at a time, 
         and click :guilabel:`Insert` to add the documents, one at a 
         time, to the collection.

         .. code-block:: json 

            {
              "_id": 0,
              "name": "Springfield High",
              "mascot": "Pumas",
              "teachers": [{
                "first": "Jane",
                "last": "Smith",
                "classes": [{
                  "subject": "art of science",
                  "grade": "12th"
                },
                {
                  "subject": "applied science and practical science",
                  "grade": "9th"
                },
                {
                  "subject": "remedial math",
                  "grade": "12th"
                },
                {
                  "subject": "science",
                  "grade": "10th"
                }]
              },
              {
                "first": "Bob",
                "last": "Green",
                "classes": [{
                  "subject": "science of art",
                  "grade": "11th"
                },
                {
                  "subject": "art art art",
                  "grade": "10th"
                }]
              }],
              "clubs": {
                "stem": [
                  {
                    "club_name": "chess",
                    "description": "provides students opportunity to play the board game of chess informally and competitively in tournaments."
                  },
                  {
                    "club_name": "kaboom chemistry",
                    "description": "provides students opportunity to experiment with chemistry that fizzes and explodes."
                  }
                ],
                "arts": [
                  {
                    "club_name": "anime",
                    "description": "provides students an opportunity to discuss, show, and collaborate on anime and broaden their Japanese cultural understanding."
                  },
                  {
                    "club_name": "visual arts",
                    "description": "provides students an opportunity to train, experiment, and prepare for internships and jobs as photographers, illustrators, graphic designers, and more."
                  }
                ]
              }
            }

         .. code-block:: json 

            {
              "_id": 1,
              "name": "Evergreen High",
              "mascot": "Jaguars",
              "teachers": [{
                "first": "Jane",
                "last": "Earwhacker",
                "classes": [{
                  "subject": "art",
                  "grade": "9th"
                },
                {
                  "subject": "science",
                  "grade": "12th"
                }]
              },
              {
                "first": "John",
                "last": "Smith",
                "classes": [{
                  "subject": "math",
                  "grade": "12th"
                },
                {
                  "subject": "art",
                  "grade": "10th"
                }]
              }],
              "clubs": {
                "sports": [
                  {
                    "club_name": "archery",
                    "description": "provides students an opportunity to practice and hone the skill of using a bow to shoot arrows in a fun and safe environment."
                  },
                  {
                    "club_name": "ultimate frisbee",
                    "description": "provides students an opportunity to play frisbee and learn the basics of holding the disc and complete passes."
                  }
                ],
                "stem": [
                  {
                    "club_name": "zapped",
                    "description": "provides students an opportunity to make exciting gadgets and explore electricity."
                  },
                  {
                    "club_name": "loose in the chem lab",
                    "description": "provides students an opportunity to put the scientific method to the test and get elbow deep in chemistry."
                  }
                ]
              }
            }

         .. code-block:: json 

            {
              "_id": 2,
              "name": "Lincoln High",
              "mascot": "Sharks",
              "teachers": [{
                "first": "Jane",
                "last": "Smith",
                "classes": [{
                  "subject": "science",
                  "grade": "9th"
                },
                {
                  "subject": "math",
                  "grade": "12th"
                }]
              },
              {
                "first": "John",
                "last": "Redman",
                "classes": [{
                  "subject": "art",
                  "grade": "12th"
                }]
              }],
              "clubs": {
                "arts": [
                  {
                    "club_name": "ceramics",
                    "description": "provides students an opportunity to acquire knowledge of form, volume, and space relationships by constructing hand-built and wheel-thrown forms of clay."
                  },
                  {
                    "club_name": "digital art",
                    "description": "provides students an opportunity to learn about design for entertainment, 3D animation, technical art, or 3D modeling."
                  }
                ],
                "sports": [
                  {
                    "club_name": "dodgeball",
                    "description": "provides students an opportunity to play dodgeball by throwing balls to eliminate the members of the opposing team while avoiding being hit themselves."
                  },
                  {
                    "club_name": "martial arts",
                    "description": "provides students an opportunity to learn self-defense or combat that utilize physical skill and coordination without weapons."
                  }
                ]
              }
            }

Create a |fts| Index 
~~~~~~~~~~~~~~~~~~~~~

In this section, you will create a |fts| index for the fields in the 
embedded documents in the ``local_school_district.schools`` collection. 

Procedure 
`````````

.. |search-type| replace:: :guilabel:`Atlas Search`
.. |index-name| replace:: ``embedded-documents-tutorial``
.. |database-name| replace:: ``local_school_district`` database
.. |collection-name| replace:: ``schools`` collection

.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Specify an index configuration that indexes embedded documents.

      To learn more about the index definition, see
      :ref:`embedded-documents-tutorial-index`. 

      .. tabs:: 

         .. tab:: Visual Editor 
            :tabid: vib

            a. Click :guilabel:`Refine Your Index`.
            #. Click :guilabel:`Add Field` in the :guilabel:`Field Mappings`
               section and add the following fields in the
               :guilabel:`Customized Configuration` tab by clicking
               :guilabel:`Add` after configuring the settings for each
               field, one at a time, in the :guilabel:`Add Field Mapping` 
               window. 

               .. list-table:: 
                  :header-rows: 1 
                  :widths: 40 40 20

                  * - :guilabel:`Field Name`
                    - :guilabel:`Data Type`
                    - :guilabel:`Enable Dynamic Mapping`

                  * - ``teachers``
                    - :guilabel:`EmbeddedDocuments`
                    - On

                  * - ``teachers.classes``
                    - :guilabel:`EmbeddedDocuments`
                    - On
                    
                  * - ``teachers``
                    - :guilabel:`Document`
                    - On
                    
                  * - ``teachers.classes``
                    - :guilabel:`Document`
                    - On
                    
                  * - ``teachers.classes.grade``
                    - :guilabel:`Token` 
                    - N/A

                  * - ``clubs.sports``
                    - :guilabel:`EmbeddedDocuments`
                    - On

            #. Click :guilabel:`Add Field Mappings` to open the
               :guilabel:`Add Field Mapping` window.
            #. Select the following from the dropdown.
            #. Click :guilabel:`Add Field Mappings` to open the
               :guilabel:`Add Field Mapping` window.
            #. Select the following from the dropdown. 
            #. Toggle to enable :guilabel:`Enable Dynamic Mapping` if it
               isn't already enabled and click :guilabel:`Add`
            #. Click :guilabel:`Save`.
            #. Click :guilabel:`Save Changes`.

         .. tab:: JSON Editor 
            :tabid: jsonib

            a. Replace the default index definition with the following 
               index definition.

               .. code-block:: json 
                  :linenos: 

                  {
                    "mappings": {
                      "dynamic": true,
                      "fields": {
                        "clubs": {
                          "dynamic": true,
                          "fields": {
                            "sports": {
                              "dynamic": true,
                              "type": "embeddedDocuments"
                            }
                          },
                          "type": "document"
                        },
                        "teachers": [
                          {
                            "dynamic": true,
                            "fields": {
                              "classes": {
                                "dynamic": true,
                                "type": "embeddedDocuments"
                              }
                            },
                            "type": "embeddedDocuments"
                          },
                          {
                            "dynamic": true,
                            "fields": {
                              "classes": {
                                "dynamic": true,
                                "fields": {
                                  "grade": {
                                    "type": "token"
                                  }
                                },
                                "type": "document"
                              }
                            },
                            "type": "document"
                          }
                        ]
                      }
                    }
                  }

            #. Click :guilabel:`Next`.
            
   .. include:: /includes/fts/search-index-management/procedures/steps-fts-finish-index-creation.rst 

Run ``$search`` Queries Against Embedded Document Fields 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can run queries against the embedded document fields. This 
tutorial uses :ref:`embeddedDocument <embedded-document-ref>` and :ref:`text <text-ref>` 
operators inside the :ref:`compound <compound-ref>` operator in the queries. 

In this section, you will connect to your cluster and run 
the sample queries using the operators against the fields in the 
``schools`` collection. 

.. tabs-selector:: drivers

----------

.. |arrow| unicode:: U+27A4

|arrow| Use the **Select your language** drop-down menu on this page to 
set the language of the examples in this section.

----------

.. tabs-drivers::

   .. tab::
      :tabid: atlas-ui

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-query-atlas-ui.txt

   .. tab::
      :tabid: shell

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-query-mongosh.txt 

   .. tab::
      :tabid: compass

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-query-compass.txt

   .. tab::
      :tabid: csharp

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-query-csharp.txt

   .. tab:: 
      :tabid: go

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-query-go.txt

   .. tab:: 
      :tabid: java-sync 

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-query-java.txt

   .. tab:: 
      :tabid: kotlin-coroutine

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-query-kotlin.txt

   .. tab::
      :tabid: nodejs

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-query-nodejs.txt

   .. tab::
      :tabid: python

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-query-python.txt

Run ``$searchMeta`` Query Against Embedded Document Fields
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can run :pipeline:`$searchMeta` queries against the embedded
document fields. In this section, you will connect to your |service|
{+cluster+} and run a sample query using the ``$searchMeta`` stage and
facet on an embedded document field. 

.. tabs-drivers::

   .. tab::
      :tabid: atlas-ui

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-facet-query-atlas-ui.rst

   .. tab::
      :tabid: shell

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-facet-query-mongosh.rst 

   .. tab::
      :tabid: compass

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-facet-query-compass.rst

   .. tab::
      :tabid: csharp

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-facet-query-cs.rst

   .. tab:: 
      :tabid: go

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-facet-query-go.rst

   .. tab:: 
      :tabid: java-sync 

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-facet-query-java.rst

   .. tab:: 
      :tabid: kotlin-coroutine

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-facet-query-kotlin.rst

   .. tab::
      :tabid: nodejs

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-facet-query-nodejs.rst

   .. tab::
      :tabid: python

      .. include:: /includes/fts/embedded-documents/procedures/steps-fts-embedded-document-facet-query-python.rst
