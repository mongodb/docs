GridFS Example
==============

.. code-block:: python

  from pymongo import MongoClient

  client = MongoClient()
  client.drop_database("gridfs_example")

This example shows how to use ``gridfs`` to store large binary
objects (e.g. files) in MongoDB.

.. seealso:: The API docs for ``gridfs``.

.. seealso:: `This blog post
   <http://dirolf.com/2010/03/29/new-gridfs-implementation-for-pymongo.html>`_
   for some motivation behind this API.

Setup
-----

We start by creating a :py:class:`~gridfs.GridFS` instance to use:

.. code-block:: python

  >>> from pymongo import MongoClient
  >>> import gridfs
  >>>
  >>> db = MongoClient().gridfs_example
  >>> fs = gridfs.GridFS(db)

Every :py:class:`~gridfs.GridFS` instance is created with and will
operate on a specific :py:class:`~pymongo.database.Database` instance.

Saving and Retrieving Data
--------------------------

The simplest way to work with ``gridfs`` is to use its key/value
interface (the :py:meth:`~gridfs.GridFS.put` and
:py:meth:`~gridfs.GridFS.get` methods). To write data to GridFS, use
:py:meth:`~gridfs.GridFS.put`:

.. code-block:: python

  >>> a = fs.put(b"hello world")

:py:meth:`~gridfs.GridFS.put` creates a new file in GridFS, and returns
the value of the file document's ``"_id"`` key. Given that ``"_id"``
we can use :py:meth:`~gridfs.GridFS.get` to get back the contents of the
file:

.. code-block:: python

  >>> fs.get(a).read()
  b'hello world'

:py:meth:`~gridfs.GridFS.get` returns a file-like object, so we get the
file's contents by calling :py:meth:`~gridfs.grid_file.GridOut.read`.

In addition to putting a :py:class:`str` as a GridFS file, we can also
put any file-like object (an object with a :py:meth:`read`
method). GridFS will handle reading the file in chunk-sized segments
automatically. We can also add additional attributes to the file as
keyword arguments:

.. code-block:: python

  >>> b = fs.put(fs.get(a), filename="foo", bar="baz")
  >>> out = fs.get(b)
  >>> out.read()
  b'hello world'
  >>> out.filename
  'foo'
  >>> out.bar
  'baz'
  >>> out.upload_date
  datetime.datetime(...)

The attributes we set in :py:meth:`~gridfs.GridFS.put` are stored in the
file document, and retrievable after calling
:py:meth:`~gridfs.GridFS.get`. Some attributes (like ``"filename"``) are
special and are defined in the GridFS specification - see that
document for more details.
