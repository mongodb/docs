Python 3
~~~~~~~~

The following compatibility tables show {+driver-short+}'s compatibility with different
versions of CPython and PyPy.

For more information about how to read the compatibility tables, see
:ref:`MongoDB Compatibility Tables. <about-driver-compatibility>`

CPython
```````

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - {+driver-short+} Version
     - CPython 3.13
     - CPython 3.12
     - CPython 3.11
     - CPython 3.10 [#ssl-4.0-issue]_
     - CPython 3.9
     - CPython 3.8
     - CPython 3.7
     - CPython 3.6
     - CPython 3.5
     - CPython 3.4

   * - 4.11
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     - 
     -
     -
     -
     -

   * - 4.9 to 4.10
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     -
     -
     -
     -

   * - 4.8
     -
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     -
     -
     -
     -

   * - 4.5 to 4.7
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -

   * - 4.3 to 4.4
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -

   * - 4.2
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -

   * - 4.1 [#three-six-compat]_
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -

   * - 4.0
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -

   * - 3.13
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.12
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.11
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.10
     -
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.7 to 3.9
     -
     -
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓

PyPy
````

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - {+driver-short+} Version
     - PyPy3.10
     - PyPy3.9
     - PyPy3.8
     - PyPy3.7
     - PyPy3.6
     - PyPy3.5

   * - 4.11
     - ✓ 
     -
     -
     -
     -
     -

   * - 4.8 to 4.10
     - ✓ 
     - ✓ 
     -
     -
     -
     -

   * - 4.5 to 4.7
     - ✓ 
     - ✓ 
     - ✓ 
     -
     -
     -

   * - 4.2 to 4.4
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -

   * - 4.1 [#three-six-compat]_
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - 4.0
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - 3.12
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.11
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.10
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.7 to 3.9
     -
     -
     -
     - ✓
     - ✓
     - ✓

.. [#ssl-4.0-issue] Versions of Python 3.10 and later are not compatible with
   TLS/SSL for versions of MongoDB 4.0 and earlier. For more information, see the
   :ref:`TLS <pymongo-troubleshoot-tls>` section of the Troubleshooting guide.
.. [#three-six-compat] {+driver-short+} 4.1 requires Python 3.6.2 or later.

Python 2
~~~~~~~~

{+driver-short+} versions 3.7 through 3.12 are compatible with Python 2.7 and PyPy2.7.
However, in some cases, {+driver-short+}
applications behave differently when running in a Python 2 environment.

The following sections describe the differences in behavior between Python 2 and Python 3
when using {+driver-short+}.

Binary Data
```````````

In all versions of Python, {+driver-short+} encodes instances of the
`bytes <https://docs.python.org/3/library/stdtypes.html#bytes>`__ class
as binary data with subtype 0, the default subtype for binary data. In Python 3,
{+driver-short+} decodes these values to instances of the ``bytes`` class. In Python 2,
the driver decodes them to instances of the
`Binary <https://pymongo.readthedocs.io/en/4.11/api/bson/binary.html#bson.binary.Binary>`__
class with subtype 0.

The following code examples show how {+driver-short+} decodes instances of the ``bytes``
class. Select the :guilabel:`Python 2` or :guilabel:`Python 3` tab to view the corresponding
code.

.. tabs::

   .. tab:: Python 2
      :tabid: python2

      .. io-code-block::
         :copyable: true

         .. input::
            :language: python

            from pymongo import MongoClient

            client = MongoClient()
            client.test.test.insert_one({'binary': b'this is a byte string'})
            doc = client.test.test.find_one()
            print(doc)
          
         .. output::

            {u'_id': ObjectId('67afb78298f604a28f0247b4'), u'binary': Binary('this is a byte string', 0)}

   .. tab:: Python 3
      :tabid: python3

      .. io-code-block::
         :copyable: true

         .. input::
            :language: python

            from pymongo import MongoClient

            client = MongoClient()
            client.test.test.insert_one({'binary': b'this is a byte string'})
            doc = client.test.test.find_one()
            print(doc)

         .. output::

            {'_id': ObjectId('67afb78298f604a28f0247b4'), 'binary': b'this is a byte string'}

The driver behaves the same way when decoding JSON binary values with subtype 0. In
Python 3, it decodes these values to instances of the ``bytes`` class. In Python 2,
the driver decodes them to instances of the ``Binary`` class with subtype 0. For code
examples that show the differences, see the
:ref:`Extended JSON <pymongo-extended-json-binary-values>` page.
            
Pickled ObjectIds
`````````````````

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