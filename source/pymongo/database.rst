:mod:`database` -- Database level operations
============================================

.. automodule:: pymongo.database
   :synopsis: Database level operations

   .. autodata:: pymongo.auth.MECHANISMS

   .. autoclass:: pymongo.database.Database
      :members:

      .. describe:: db[collection_name] || db.collection_name

         Get the `collection_name` :py:class`~pymongo.collection.Collection` of
         :py:class`Database` `db`.

         Raises :py:class`~pymongo.errors.InvalidName` if an invalid collection
         name is used.

         .. note::  Use dictionary style access if `collection_name` is an
            attribute of the :py:class`Database` class eg: db[`collection_name`].

      .. autoattribute:: codec_options
      .. autoattribute:: read_preference
      .. autoattribute:: write_concern
      .. autoattribute:: read_concern
