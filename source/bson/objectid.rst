``objectid`` -- Tools for working with MongoDB ObjectIds
===========================================================

.. automodule:: bson.objectid
   :synopsis: Tools for working with MongoDB ObjectIds

   .. autoclass:: bson.objectid.ObjectId(oid=None)
      :members:

      .. describe:: str(o)

         Get a hex encoded version of :py:class:`ObjectId` `o`.

         The following property always holds:

         .. code-block:: python

           from bson.objectid import ObjectId

         .. code-block:: python

           >>> o = ObjectId()
           >>> o == ObjectId(str(o))
           True

         This representation is useful for urls or other places where
         ``o.binary`` is inappropriate.
