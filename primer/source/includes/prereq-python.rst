From a Python Shell or IDLE, use
:py:class:`~pymongo.mongo_client.MongoClient()` to connect to the
running :program:`mongod` instance, and switch to the ``test`` database.

.. code-block:: python

   from pymongo import MongoClient

   client = MongoClient()
   db = client.test
