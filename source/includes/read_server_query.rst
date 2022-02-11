.. include:: /includes/read_server.rst

.. step:: Switch to the ``test`` Database

  .. include:: /includes/bind_db.rst

.. step:: Load more data into MongoDB.

   .. tip:: 
     
      If you have already :doc:`imported data into your database
      </server/import>` using :program:`mongoimport`, you can skip
      this step.

   Before you can write queries to extract data in a meaningful way, you'll need
   to add more data to your database. You can do that by running the ``insertMany()``
   nethod:

   .. include:: /includes/driver-example-query-14.rst

.. step:: Retrieve specific documents in a collection.

   You can retrieve specific documents from a collection by applying
   filter criteria.

   To specify filter criteria, pass a JSON document containing the
   criteria you are searching for to the ``find`` method.

   The following example illustrate using a status of "D" as criteria
   for narrowing a find on a collection.

   .. include:: /includes/driver-example-query-9.rst

.. step:: Iterate over the results.

   .. include:: /includes/iterate_all.rst

.. step:: Check your results.

  If you have loaded data into your test database, you will see one or
  more JSON documents returned. Note that all records return have a status of "D".

  .. include:: /includes/results_read2.rst
