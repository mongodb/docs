If you pickled an ``ObjectId`` in Python 2 and want to unpickle it in Python 3, you must
pass ``encoding='latin-1'`` as an argument to the ``pickle.loads()`` method.

The following example shows how to use Python 3 to unpickle an ``ObjectId`` that was
pickled in Python 2:

.. code-block:: python
   :emphasize-lines: 2

   import pickle
   pickle.loads(b'<ObjectId byte stream>', encoding='latin-1')

If a Python 3 application uses a compatible serialization protocol to pickle an ``ObjectId``,
you can use Python 2 to unpickle it. To specify a compatible protocol in Python 3, pass
a value of 0, 1, or 2 for the ``protocol`` parameter of the ``pickle.dumps()`` method.

The following example pickles an ``ObjectId`` in Python 3, then prints the ``ObjectId``
and resulting ``bytes`` instance:

.. io-code-block::
   :copyable: true

   .. input::
      :language: python

      import pickle
      from bson.objectid import ObjectId

      oid = ObjectId()
      oid_bytes = pickle.dumps(oid, protocol=2)
      print("ObjectId: {}".format(oid))
      print("ObjectId bytes: {}".format(oid_bytes))
   
   .. output::
      :language: shell

      ObjectId: 67af9b1fae9260c0e97eb9eb
      ObjectId bytes: b'\x80\x02cbson.objectid\nObjectId\nq\x00...

The following example unpickles the ``ObjectId`` from the previous example, and then
prints the ``bytes`` and ``ObjectId`` instances:

.. io-code-block::
   :copyable: true

   .. input::
      :language: python

      import pickle
      from bson.objectid import ObjectId

      oid_bytes = b'\x80\x02cbson.objectid\nObjectId\nq\x00...' 
      oid = pickle.loads(oid_bytes)
      print("ObjectId bytes: {}".format(oid_bytes))
      print("ObjectId: {}".format(oid))
   
   .. output::
      :language: shell

      ObjectId bytes: b'\x80\x02cbson.objectid\nObjectId\nq\x00)...
      ObjectId: 67af9b1fae9260c0e97eb9eb