|service| provides a :abbr:`GUI (Graphical user interface)`
to interact with data in your cluster. 

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-data-explorer.rst

   .. step:: Create a ``people`` collection in the ``gettingStarted`` database.

      a. Click the :guilabel:`+ Create Database` button. 
      #. For the :guilabel:`Database Name` enter ``gettingStarted``.
      #. For the :guilabel:`Collection Name`,  enter ``people``.
      #. Click :guilabel:`Create` to create the 
         database and its first collection.

   .. step:: Insert documents into the collection.

      a. Select the ``people`` collection if it's not selected.
      #. Click :guilabel:`Insert Document`.
      #. Click the |json| view (:guilabel:`{}`) to replace the default 
         document.
      #. Paste the following code:

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
      #. Click :guilabel:`Insert Document`.
      #. Click the |json| view (:guilabel:`{}`) to replace the default 
         document.
      #. Paste the following code:

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

      Click :guilabel:`Apply` to run the query and view the 
      document that you inserted. You should see the following
      document in your query results:

      .. code-block::

         _id: ObjectId('64d52c3c3db2144fc00791b9'},
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

   To learn more, see :ref:`atlas-ui-docs`.
