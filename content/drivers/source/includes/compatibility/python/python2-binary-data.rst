In all versions of Python, PyMongo encodes instances of the
`bytes <https://docs.python.org/3/library/stdtypes.html#bytes>`__ class
as binary data with subtype 0, the default subtype for binary data. In Python 3,
PyMongo decodes these values to instances of the ``bytes`` class. In Python 2,
the driver decodes them to instances of the
`Binary <https://pymongo.readthedocs.io/en/4.11/api/bson/binary.html#bson.binary.Binary>`__
class with subtype 0.

The following code examples show how PyMongo decodes instances of the ``bytes``
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
`Extended JSON <https://www.mongodb.com/docs/languages/python/pymongo-driver/current/data-formats/extended-json/#std-label-pymongo-extended-json-binary-values>`__
page.