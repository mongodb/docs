.. include:: /includes/read_server.rst

.. step:: Switch to the ``test`` Database

   Switch to the database you wish
   to query. In this case we will be using
   ``test``.
  
   .. include:: /includes/bind_db.rst
 
.. step:: Select documents using the less-than operator.

   The following example retrieves all documents from the inventory
   collection where the ``size.h`` field is less than 15. MongoDB uses
   :  .. include:: /includes/driver-example-query-18.rst

.. step:: Iterate over the results.

   .. include:: /includes/iterate_all.rst 

.. step:: Check your results.
  
   If you have loaded data into your test database, you will see one or
   more JSON documents returned. Note that the records have a height ("size.h") of
   less than 15.
  
   .. include:: /includes/results_read5.rst
