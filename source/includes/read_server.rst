.. step::  Connect to your MongoDB instance.

  .. include:: /includes/drivers_connect.rst

.. step::  Switch to the ``test`` database.

  Switch to the database you wish to query. In this case we will be
  using ``test``.

  .. include:: /includes/bind_db.rst

.. step::  Retrieve all documents in the ``inventory`` collection.

  .. include:: /includes/find_all.rst

.. step::  Iterate over the results.

  .. include:: /includes/iterate_all_noshellcursor.rst

.. step::  Check your results.

  If you loaded the data from :doc:`/server/insert`, you should
  see output that resembles the following:
  
  .. include:: /includes/results_read1.rst
  .. include:: /includes/drivers_close_connection.rst
