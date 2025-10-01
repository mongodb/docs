.. procedure:: 
   :style: normal

   .. step:: Connect to your deployment by using |compass|.

      Open {+Compass+} and connect to your cluster. For
      detailed instructions, see :ref:`atlas-connect-via-compass`. 

   .. step:: Specify the database and create a new collection.

      a. On the :guilabel:`Databases` screen, click the ``sample_supplies`` database.

      #. Click :guilabel:`Create Collection`.

      #. In the :guilabel:`Create Collection` dialog, enter ``purchaseOrders`` in the 
         :guilabel:`Collection Name` field.

      #. Click :guilabel:`Create Collection`.

   .. step:: Add documents to the collection.

      a. Click the newly created ``purchaseOrders`` collection.

      #. Click :guilabel:`Add Data` and select :guilabel:`Insert document`.

      #. In the :guilabel:`Insert Document` dialog, enter the following document:

         .. code-block:: json
            
            {
              "saleDate": {
                "$date": "2018-01-23T21:06:49.506Z"
              },
              "items": [
                {
                  "name": "printer paper",
                  "tags": ["office", "stationary"],
                  "price": 40.01,
                  "quantity": 2
                },
                {
                  "name": "notepad",
                  "tags": ["office", "writing", "school"],
                  "price": 35.29,
                  "quantity": 2
                },
                {
                  "name": "pens",
                  "tags": ["writing", "office", "school", "stationary"],
                  "price": 56.12,
                  "quantity": 5
                },
                {
                  "name": "backpack",
                  "tags": ["school", "travel", "kids"],
                  "price": 77.71,
                  "quantity": 2
                },
                {
                  "name": "notepad",
                  "tags": ["office", "writing", "school"],
                  "price": 18.47,
                  "quantity": 2
                },
                {
                  "name": "envelopes",
                  "tags": ["stationary", "office", "general"],
                  "price": 19.95,
                  "quantity": 8
                },
                {
                  "name": "envelopes",
                  "tags": ["stationary", "office", "general"],
                  "price": 8.08,
                  "quantity": 3
                },
                {
                  "name": "binder",
                  "tags": ["school", "general", "organization"],
                  "price": 14.16,
                  "quantity": 3
                }
              ],
              "storeLocation": "Denver",
              "customer": {
                "gender": "M",
                "age": 42,
                "email": "cauho@witwuta.sv",
                "satisfaction": 4
              },
              "couponUsed": true,
              "purchaseMethod": "Phone"
            }
      #. Click :guilabel:`Insert`.

      #. Click :guilabel:`Add Data` and select :guilabel:`Insert Document` again.

      #. In the :guilabel:`Insert Document` dialog, enter the following document:

         .. code-block:: json
            
            {
              "saleDate": {
                "$date": "2018-01-25T10:01:02.918Z"
              },
              "items": [
                {
                  "name": "envelopes",
                  "tags": ["stationary", "office", "general"],
                  "price": 8.05,
                  "quantity": 10
                },
                {
                  "name": "binder",
                  "tags": ["school", "general", "organization"],
                  "price": 28.31,
                  "quantity": 9
                },
                {
                  "name": "notepad",
                  "tags": ["office", "writing", "school"],
                  "price": 20.95,
                  "quantity": 3
                },
                {
                  "name": "laptop",
                  "tags": ["electronics", "school", "office"],
                  "price": 866.5,
                  "quantity": 4
                },
                {
                  "name": "notepad",
                  "tags": ["office", "writing", "school"],
                  "price": 33.09,
                  "quantity": 4
                },
                {
                  "name": "printer paper",
                  "tags": ["office", "stationary"],
                  "price": 37.55,
                  "quantity": 1
                },
                {
                  "name": "backpack",
                  "tags": ["school", "travel", "kids"],
                  "price": 83.28,
                  "quantity": 2
                },
                {
                  "name": "pens",
                  "tags": ["writing", "office", "school", "stationary"],
                  "price": 42.9,
                  "quantity": 4
                },
                {
                  "name": "envelopes",
                  "tags": ["stationary", "office", "general"],
                  "price": 16.68,
                  "quantity": 2
                }
              ],
              "storeLocation": "Seattle",
              "customer": {
                "gender": "M",
                "age": 50,
                "email": "keecade@hem.uy",
                "satisfaction": 5
              },
              "couponUsed": false,
              "purchaseMethod": "Phone"
            }
      #. Click :guilabel:`Insert`.

   .. step:: Verify the inserted documents.

      a. Click the :guilabel:`Documents` tab if you're not already on it.

      #. Navigate to the search bar and select the :guilabel:`Options` dropdown.

      #. In the :guilabel:`Sort` field, enter:

         .. code-block:: json
            
            { "saleDate": -1 }
      #. Click :guilabel:`Find`.

      The query results should display the two purchase order documents, with
      the most recent (January 25, 2018) displayed first.