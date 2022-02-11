.. procedure::
   :style: normal

   .. step:: Connect to your MongoDB instance.

      .. include:: /includes/drivers_connect.rst

   .. step:: Switch to the ``test`` database.

     In this guide, you will update documents in a collection in the
     ``test`` database.

     .. include:: /includes/bind_db.rst

   .. step:: Update a single document in the ``inventory`` collection.

     To change a field value, MongoDB provides update operators
     to modify values. Some update operators, including
     will create the specified field if the field does not exist
     in the document.

     .. include:: /includes/driver-example-update-52.rst

   .. step:: Update multiple documents.

     The following operation updates all of the documents with
     ``quantity`` value less than 50.

     .. include:: /includes/driver-example-update-53.rst

     .. include:: /includes/driver-example-update-result.rst

     .. include:: /includes/drivers_close_connection.rst
