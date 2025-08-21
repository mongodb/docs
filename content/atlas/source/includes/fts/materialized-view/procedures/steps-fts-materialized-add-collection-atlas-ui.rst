.. procedure:: 
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. step:: Go to the :guilabel:`Browse Collections` page.
      
      Click the :guilabel:`Browse Collections` button for your
      {+cluster+}. 
      
   .. step:: Select the database and create a new collection.

      a. Select the ``sample_supplies`` database from the dropdown menu.

      #. Click the :guilabel:`+` button to the right of the database name.

      #. In the :guilabel:`Create Collection` dialog, enter ``purchaseOrders`` in the 
         :guilabel:`Collection Name` field.

      #. Click :guilabel:`Create`.

   .. step:: Add documents to the collection.

      a. Select the newly created ``purchaseOrders`` collection.

      #. Click :guilabel:`Insert Document`.

      #. In the :guilabel:`Insert Document` dialog, select the :guilabel:`{}` view
         and enter the following document:

         .. code-block:: json
            
            {
              "saleDate": {
                "$date": "2018-01-23T21:06:49.506Z"
              },
              "items": [
                {
                  "name": "printer paper",
                  "tags": ["office", "stationary"],
                  "price": {
                    "$numberDecimal": "40.01"
                  },
                  "quantity": 2
                },
                {
                  "name": "notepad",
                  "tags": ["office", "writing", "school"],
                  "price": {
                    "$numberDecimal": "35.29"
                  },
                  "quantity": 2
                },
                {
                  "name": "pens",
                  "tags": ["writing", "office", "school", "stationary"],
                  "price": {
                    "$numberDecimal": "56.12"
                  },
                  "quantity": 5
                },
                {
                  "name": "backpack",
                  "tags": ["school", "travel", "kids"],
                  "price": {
                    "$numberDecimal": "77.71"
                  },
                  "quantity": 2
                },
                {
                  "name": "notepad",
                  "tags": ["office", "writing", "school"],
                  "price": {
                    "$numberDecimal": "18.47"
                  },
                  "quantity": 2
                },
                {
                  "name": "envelopes",
                  "tags": ["stationary", "office", "general"],
                  "price": {
                    "$numberDecimal": "19.95"
                  },
                  "quantity": 8
                },
                {
                  "name": "envelopes",
                  "tags": ["stationary", "office", "general"],
                  "price": {
                    "$numberDecimal": "8.08"
                  },
                  "quantity": 3
                },
                {
                  "name": "binder",
                  "tags": ["school", "general", "organization"],
                  "price": {
                    "$numberDecimal": "14.16"
                  },
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

      #. Click :guilabel:`Insert Document` again.

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
                  "price": {
                    "$numberDecimal": "8.05"
                  },
                  "quantity": 10
                },
                {
                  "name": "binder",
                  "tags": ["school", "general", "organization"],
                  "price": {
                    "$numberDecimal": "28.31"
                  },
                  "quantity": 9
                },
                {
                  "name": "notepad",
                  "tags": ["office", "writing", "school"],
                  "price": {
                    "$numberDecimal": "20.95"
                  },
                  "quantity": 3
                },
                {
                  "name": "laptop",
                  "tags": ["electronics", "school", "office"],
                  "price": {
                    "$numberDecimal": "866.5"
                  },
                  "quantity": 4
                },
                {
                  "name": "notepad",
                  "tags": ["office", "writing", "school"],
                  "price": {
                    "$numberDecimal": "33.09"
                  },
                  "quantity": 4
                },
                {
                  "name": "printer paper",
                  "tags": ["office", "stationary"],
                  "price": {
                    "$numberDecimal": "37.55"
                  },
                  "quantity": 1
                },
                {
                  "name": "backpack",
                  "tags": ["school", "travel", "kids"],
                  "price": {
                    "$numberDecimal": "83.28"
                  },
                  "quantity": 2
                },
                {
                  "name": "pens",
                  "tags": ["writing", "office", "school", "stationary"],
                  "price": {
                    "$numberDecimal": "42.9"
                  },
                  "quantity": 4
                },
                {
                  "name": "envelopes",
                  "tags": ["stationary", "office", "general"],
                  "price": {
                    "$numberDecimal": "16.68"
                  },
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

      a. Click :guilabel:`Find` to view the documents in the collection.

      #. In the search bar, select the :guilabel:`Options` dropdown and enter the
         following code in the :guilabel:`Sort` field to sort the documents
         by sale date in descending order:

         .. code-block:: json
            
            { "saleDate": -1 } 

      #. Click :guilabel:`Apply`.

      The query results should display the two purchase order documents, with
      the most recent (January 25, 2018) displayed first.
