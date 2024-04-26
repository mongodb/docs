ValueError: cannot encode native uuid.UUID with UuidRepresentation.UNSPECIFIED
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This error results from trying to encode a native ``UUID`` object to a ``Binary`` object
when the UUID representation is ``UNSPECIFIED``, as shown in the following code
example:

.. code-block:: python

  unspecified_collection.insert_one({'_id': 'bar', 'uuid': uuid4()})
  Traceback (most recent call last):
  ...
  ValueError: cannot encode native uuid.UUID with UuidRepresentation.UNSPECIFIED.
  UUIDs can be manually converted to bson.Binary instances using bson.Binary.from_uuid()
  or a different UuidRepresentation can be configured. See the documentation for
  UuidRepresentation for more information.

Instead, you must explicitly convert a native UUID to a ``Binary`` object by using the
``Binary.from_uuid()`` method, as shown in the following example:

.. code-block:: python

  explicit_binary = Binary.from_uuid(uuid4(), UuidRepresentation.STANDARD)
  unspec_collection.insert_one({'_id': 'bar', 'uuid': explicit_binary})