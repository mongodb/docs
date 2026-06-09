Create a Sample Collection and Load the Data 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You must begin by creating a collection named ``schools`` in an 
existing or new database on your cluster. After creating the 
collection, you must upload the sample data into your collection. To
learn more about the documents in the sample collection, see
:ref:`embedded-documents-tutorial-sample-collection`. 

The steps in this section walk you through creating a new database 
and collection, and loading the sample data into your collection.

Create and populate the ``schools`` collection:

.. procedure:: 
  :style: normal

  .. step:: Connect to your cluster using |compass|.

     Open {+Compass+} and connect to your cluster. For
     detailed instructions, see :ref:`atlas-connect-via-compass`. 

  .. step:: Create the collection.

     On the :guilabel:`Database` screen, create a database named ``local_school_district``, then select
     :guilabel:`Create Collection`. 

  .. step:: Specify the collection name. 

     Enter ``schools`` as the collection name and select :guilabel:`Create Collection`.

  .. step:: Load sample data into the collection.

     a. Select the ``schools`` collection if it's not already
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
