.. step:: Connect to your MongoDB instance.

   .. include:: /includes/drivers_connect.rst

.. step:: Switch to the ``test`` database.

   In this guide, you will delete documents in a collection in the
   ``test`` database.
   
   .. include:: /includes/bind_db.rst

.. step:: Delete a single document.

   The following operation deletes the **first** document with ``status``
   equal to ``D``:

   .. include:: /includes/driver-example-delete-58.rst

   .. include:: /includes/driver-example-delete-result.rst


.. step:: Delete multiple documents.

   The following operation deletes *all* of the documents in the
   specified ``inventory`` collection with ``status`` equal to ``A``:
     
   .. include:: /includes/driver-example-delete-57.rst

   .. include:: /includes/driver-example-delete-result.rst

   .. include:: /includes/drivers_close_connection.rst
