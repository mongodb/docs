.. procedure::
   :style: normal

   .. step:: Connect to your cluster in |compass|.

      Open |compass| and connect to your {+cluster+}. 
      For detailed instructions on connecting, see
      :ref:`atlas-connect-via-compass`.

   .. step:: Create a ``people`` collection in the ``gettingStarted`` database.

      a. From the :guilabel:`Databases` section in the left navigation, 
         click :icon-fa4:`plus`. 
      #. For the :guilabel:`Database Name` enter ``gettingStarted``.
      #. For the :guilabel:`Collection Name`,  enter ``people``.
      #. Click :guilabel:`Create Database` to create the 
         database and its first collection.

   .. step:: Insert documents into the collection.

      a. In the left navigation, click the ``gettingStarted`` database.
      #. Select the ``people`` collection.
      #. In the :guilabel:`Documents` tab for the collection, 
         click :guilabel:`Add Data`.
      #. Click :guilabel:`Insert Document` and paste the following code:

         .. code-block:: 

            {
                "name": {
                    "first": "Alan",
                    "last": "Turing"
            },
                "birth": { "$date": "1912-06-23" }, 
                "death": { "$date": "1954-06-07" }, 
                "contribs": [
                    "Turing machine",
                    "Turing test",
                    "Turingery"
                ],
                "views": 1250000
            }

      #. Click :guilabel:`Insert` to add the document.
      #. In the :guilabel:`Documents` tab for the collection, 
         click :guilabel:`Add Data`.
      #. Click :guilabel:`Insert Document` and paste the following code:

         .. code-block:: 

            {
                "name": {
                    "first": "Grace",
                    "last": "Hopper"
            },
                "birth": { "$date": "1906-12-09" }, 
                "death": { "$date": "1992-01-01" }, 
                "contribs": [
                    "Mark I",
                    "UNIVAC",
                    "COBOL"
                ],
                "views": 3860000
            }

      #. Click :guilabel:`Insert` to add the document.

   .. step:: Create a document filter.

      In the :guilabel:`Filter` field, enter the following filter 
      document to search the ``people`` collection for documents that 
      have a ``name.last`` value of ``Turing``:

      .. code-block::

         { "name.last": "Turing" }

   .. step:: View the document.

      Click :guilabel:`Find` to run the query and view the 
      document that you inserted. You should see the following
      document in your query results:


      .. code-block::

         _id: ObjectId('65c28c938dfecbc5fb1bd220'},
         name: Object
             first: "Alan"
             last: "Turing"
         birth: 1912-06-23T06:00:00.000+00:00
         death: 1954-06-07T05:00:00.000+00:00
         contribs: Array
             0: "Turing machine"
             1: "Turing test"
             2: "Turingery"
         views: 1250000

.. note::

    You might see a different value for
    :manual:`ObjectId </reference/bson-types/#objectid>`,
    because it is a system-generated value.
    
.. tip::

   To learn more, see the :compass:`Compass documentation </>`.
