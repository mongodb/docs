Changelog
=========

Changes in Version 4.7
------------------------

PyMongo 4.7 brings a number of improvements including:

- Added the :py:class:`~pymongo.hello.Hello.server_connection_id`,
  :attr:`pymongo.monitoring.CommandStartedEvent.server_connection_id`,
  :attr:`pymongo.monitoring.CommandSucceededEvent.server_connection_id`, and
  :attr:`pymongo.monitoring.CommandFailedEvent.server_connection_id` properties.
- Fixed a bug where inflating a :py:class:`~bson.raw_bson.RawBSONDocument` containing a :py:class:`~bson.code.Code` would cause an error.
- Significantly improved the performance of encoding BSON documents to JSON.
- Support for named KMS providers for client side field level encryption.
  Previously supported KMS providers were only: aws, azure, gcp, kmip, and local.
  The KMS provider is now expanded to support name suffixes (e.g. local:myname).
  Named KMS providers enables more than one of each KMS provider type to be configured.
  See the docstring for :py:class:`~pymongo.encryption_options.AutoEncryptionOpts`.
  Note that named KMS providers requires pymongocrypt >=1.9 and libmongocrypt >=1.9.
- :py:meth:`~pymongo.encryption.ClientEncryption.encrypt` and
  :py:meth:`~pymongo.encryption.ClientEncryption.encrypt_expression` now allow ``key_id``
  to be passed in as a :py:class:`uuid.UUID`.
- Fixed a bug where :py:class:`~bson.int64.Int64` instances could not always be encoded by `orjson`_. The following now
  works:

.. code-block:: python

    >>> import orjson
    >>> from bson import json_util
    >>> orjson.dumps({'a': Int64(1)}, default=json_util.default, option=orjson.OPT_PASSTHROUGH_SUBCLASS)

.. _orjson: https://github.com/ijl/orjson

- Fixed a bug appearing in Python 3.12 where "RuntimeError: can't create new thread at interpreter shutdown"
  could be written to stderr when a MongoClient's thread starts as the python interpreter is shutting down.

Unavoidable breaking changes
............................

- Replaced usage of :py:class:`bson.son.SON` on all internal classes and commands to dict,
  :attr:`options.pool_options.metadata` is now of type ``dict`` as opposed to :py:class:`bson.son.SON`.
  Here's some examples of how this changes expected output as well as how to convert from :py:class:`dict` to :py:class:`bson.son.SON`:

.. code-block:: python

    # Before
    >>> from pymongo import MongoClient
    >>> client = MongoClient()
    >>> client.options.pool_options.metadata
    SON([('driver', SON([('name', 'PyMongo'), ('version', '4.7.0.dev0')])), ('os', SON([('type', 'Darwin'), ('name', 'Darwin'), ('architecture', 'arm64'), ('version', '14.3')])), ('platform', 'CPython 3.11.6.final.0')])

    # After
    >>> client.options.pool_options.metadata
    {'driver': {'name': 'PyMongo', 'version': '4.7.0.dev0'}, 'os': {'type': 'Darwin', 'name': 'Darwin', 'architecture': 'arm64', 'version': '14.3'}, 'platform': 'CPython 3.11.6.final.0'}

    # To convert from dict to SON
    # This will only convert the first layer of the dictionary
    >>> data_as_dict = client.options.pool_options.metadata
    >>> SON(data_as_dict)
    SON([('driver', {'name': 'PyMongo', 'version': '4.7.0.dev0'}), ('os', {'type': 'Darwin', 'name': 'Darwin', 'architecture': 'arm64', 'version': '14.3'}), ('platform', 'CPython 3.11.6.final.0')])

    # To convert from dict to SON on a nested dictionary
    >>> def dict_to_SON(data_as_dict: dict[Any, Any]):
    ...     data_as_SON = SON()
    ...     for key, value in data_as_dict.items():
    ...         data_as_SON[key] = dict_to_SON(value) if isinstance(value, dict) else value
    ...     return data_as_SON
    >>>
    >>> dict_to_SON(data_as_dict)
    SON([('driver', SON([('name', 'PyMongo'), ('version', '4.7.0.dev0')])), ('os', SON([('type', 'Darwin'), ('name', 'Darwin'), ('architecture', 'arm64'), ('version', '14.3')])), ('platform', 'CPython 3.11.6.final.0')])

Changes in Version 4.6.1
------------------------

PyMongo 4.6.1 fixes the following bug:

- Ensure retryable read ``OperationFailure`` errors re-raise exception when 0 or NoneType error code is provided.

Changes in Version 4.6
----------------------

PyMongo 4.6 brings a number of improvements including:

- Added the ``serverMonitoringMode`` URI and keyword argument to :py:class:`~pymongo.mongo_client.MongoClient`.
- Improved client performance and reduced connection requirements in Function-as-a-service (FaaS)
  environments like AWS Lambda, Google Cloud Functions, and Microsoft Azure Functions.
- Added the :attr:`pymongo.monitoring.CommandSucceededEvent.database_name` property.
- Added the :attr:`pymongo.monitoring.CommandFailedEvent.database_name` property.
- Allow passing a ``dict`` to sort/create_index/hint.
- Added :py:func:`repr` support to the write result classes:
  :py:class:`~pymongo.results.BulkWriteResult`,
  :py:class:`~pymongo.results.DeleteResult`,
  :py:class:`~pymongo.results.InsertManyResult`,
  :py:class:`~pymongo.results.InsertOneResult`,
  :py:class:`~pymongo.results.UpdateResult`, and
  :py:class:`~pymongo.encryption.RewrapManyDataKeyResult`. For example:

    >>> client.t.t.insert_one({})
    InsertOneResult(ObjectId('65319acdd55bb3a27ab5502b'), acknowledged=True)
    >>> client.t.t.insert_many([{} for _ in range(3)])
    InsertManyResult([ObjectId('6532f85e826f2b6125d6ce39'), ObjectId('6532f85e826f2b6125d6ce3a'), ObjectId('6532f85e826f2b6125d6ce3b')], acknowledged=True)

- :py:meth:`~pymongo.uri_parser.parse_uri` now considers the delimiting slash (``/``)
  between hosts and connection options optional. For example,
  "mongodb://example.com?tls=true" is now a valid URI.
- Fixed a bug where PyMongo would incorrectly promote all cursors to exhaust cursors
  when connected to load balanced MongoDB clusters or Serverless clusters.
- Added the :ref:`network-compression-example` documentation page.
- Added more timeout information to network errors.

Changes in Version 4.5
----------------------

PyMongo 4.5 brings a number of improvements including:

- Added new helper methods for Atlas Search Index (requires MongoDB Server 7.0+):
  :py:meth:`~pymongo.collection.Collection.list_search_indexes`,
  :py:meth:`~pymongo.collection.Collection.create_search_index`,
  :py:meth:`~pymongo.collection.Collection.create_search_indexes`,
  :py:meth:`~pymongo.collection.Collection.drop_search_index`,
  :py:meth:`~pymongo.collection.Collection.update_search_index`
- Added :py:meth:`~pymongo.database.Database.cursor_command`
  and :py:meth:`~pymongo.command_cursor.CommandCursor.try_next` to support
  executing an arbitrary command that returns a cursor.
- ``cryptography`` 2.5 or later is now required for :ref:`OCSP` support.
- Improved bson encoding and decoding performance by up to 134%(`PYTHON-3729`_, `PYTHON-3797`_, `PYTHON-3816`_, `PYTHON-3817`_, `PYTHON-3820`_, `PYTHON-3824`_, and `PYTHON-3846`_).

.. warning:: PyMongo no longer supports PyPy3 versions older than 3.8. Users
  must upgrade to PyPy3.8+.

Issues Resolved
...............

See the `PyMongo 4.5 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 4.5 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=35492

.. _PYTHON-3729: https://jira.mongodb.org/browse/PYTHON-3729
.. _PYTHON-3797: https://jira.mongodb.org/browse/PYTHON-3797
.. _PYTHON-3816: https://jira.mongodb.org/browse/PYTHON-3816
.. _PYTHON-3817: https://jira.mongodb.org/browse/PYTHON-3817
.. _PYTHON-3820: https://jira.mongodb.org/browse/PYTHON-3820
.. _PYTHON-3824: https://jira.mongodb.org/browse/PYTHON-3824
.. _PYTHON-3846: https://jira.mongodb.org/browse/PYTHON-3846

Changes in Version 4.4.1
------------------------

Version 4.4.1 fixes the following bugs:

- Fixed a bug where pymongo would raise a ``ConfigurationError: Invalid SRV host``
  error when connecting to a "mongodb+srv://" URI that included capital letters
  in the SRV hosts returned from DNS. (`PYTHON-3800`_).
- Fixed a minor reference counting bug in the C extension (`PYTHON-3798`_).

Issues Resolved
...............

See the `PyMongo 4.4.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PYTHON-3798: https://jira.mongodb.org/browse/PYTHON-3798
.. _PYTHON-3800: https://jira.mongodb.org/browse/PYTHON-3800
.. _PyMongo 4.4.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=36329

Changes in Version 4.4
-----------------------

PyMongo 4.4 brings a number of improvements including:

- Added support for MongoDB 7.0.
- Added support for Python 3.11.
- Added support for passing a list containing (key, direction) pairs
  or keys to :py:meth:`~pymongo.collection.Collection.create_index`.
- Improved bson encoding performance (`PYTHON-3717`_ and `PYTHON-3718`_).
- Improved support for Pyright to improve typing support for IDEs like Visual Studio Code
  or Visual Studio.
- Improved support for type-checking with MyPy "strict" mode (`--strict`).
- Added :py:meth:`~pymongo.encryption.ClientEncryption.create_encrypted_collection`,
  :py:class:`~pymongo.errors.EncryptedCollectionError`,
  :py:meth:`~pymongo.encryption.ClientEncryption.encrypt_expression`,
  :py:class:`~pymongo.encryption_options.RangeOpts`,
  and :attr:`~pymongo.encryption.Algorithm.RANGEPREVIEW` as part of the experimental
  Queryable Encryption beta.
- pymongocrypt 1.6.0 or later is now required for :ref:`In-Use Encryption` support. MongoDB
  Server 7.0 introduced a backwards breaking change to the QE protocol. Users taking
  advantage of the Queryable Encryption beta must now upgrade to MongoDB 7.0+ and
  PyMongo 4.4+.
- Previously, PyMongo's docs recommended using :py:meth:`datetime.datetime.utcnow` and
  :py:meth:`datetime.datetime.utcfromtimestamp`. utcnow and utcfromtimestamp are deprecated
  in Python 3.12, for reasons explained `in this Github issue`_. Instead, users should
  use :py:meth:`datetime.datetime.now(tz=timezone.utc)` and
  :py:meth:`datetime.datetime.fromtimestamp(tz=timezone.utc)` instead.

.. _in this Github issue: https://github.com/python/cpython/issues/103857

Issues Resolved
...............

See the `PyMongo 4.4 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 4.4 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=34354

.. _PYTHON-3717: https://jira.mongodb.org/browse/PYTHON-3717
.. _PYTHON-3718: https://jira.mongodb.org/browse/PYTHON-3718

Changes in Version 4.3.3
------------------------

Version 4.3.3 documents support for the following:

- :ref:`CSFLE on-demand credentials` for cloud KMS providers.
- Authentication support for :ref:`EKS Clusters`.
- Added the :ref:`timeout-example` example page to improve the documentation
  for :py:func:`pymongo.timeout`.

Bug Fixes
.........
- Fixed a performance regression in :py:meth:`~gridfs.GridFSBucket.download_to_stream`
  and :py:meth:`~gridfs.GridFSBucket.download_to_stream_by_name` by reading in chunks
  instead of line by line (`PYTHON-3502`_).
- Improved performance of :py:meth:`gridfs.grid_file.GridOut.read` and
  :py:meth:`gridfs.grid_file.GridOut.readline` (`PYTHON-3508`_).

Issues Resolved
...............

See the `PyMongo 4.3.3 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PYTHON-3502: https://jira.mongodb.org/browse/PYTHON-3502
.. _PYTHON-3508: https://jira.mongodb.org/browse/PYTHON-3508
.. _PyMongo 4.3.3 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=34709

Changes in Version 4.3 (4.3.2)
------------------------------

Note: We withheld uploading tags 4.3.0 and 4.3.1 to PyPI due to a
version handling error and a necessary documentation update.

`dnspython <https://pypi.python.org/pypi/dnspython>`_ is now a required
dependency. This change makes PyMongo easier to install for use with "mongodb+srv://"
connection strings and `MongoDB Atlas <https://www.mongodb.com/cloud>`_.

PyMongo 4.3 brings a number of improvements including:

- Added support for decoding BSON datetimes outside of the range supported
  by Python's :py:class:`~datetime.datetime` builtin. See
  :ref:`handling-out-of-range-datetimes` for examples, as well as
  :py:class:`bson.datetime_ms.DatetimeMS`,
  :py:class:`bson.codec_options.DatetimeConversion`, and
  :py:class:`bson.codec_options.CodecOptions`'s ``datetime_conversion``
  parameter for more details (`PYTHON-1824`_).
- PyMongo now resets its locks and other shared state in the child process
  after a :py:func:`os.fork` to reduce the frequency of deadlocks. Note that
  deadlocks are still possible because libraries that PyMongo depends like
  OpenSSL cannot be made fork() safe in multithreaded applications.
  (`PYTHON-2484`_). For more info see :ref:`pymongo-fork-safe`.
- When used with MongoDB 6.0+, :py:class:`~pymongo.change_stream.ChangeStream` s
  now allow for new types of events (such as DDL and C2C replication events)
  to be recorded with the new parameter ``show_expanded_events``
  that can be passed to methods such as :py:meth:`~pymongo.collection.Collection.watch`.
- PyMongo now internally caches AWS credentials that it fetches from AWS
  endpoints, to avoid rate limitations.  The cache is cleared when the
  credentials expire or an error is encountered.
- When using the ``MONGODB-AWS`` authentication mechanism with the
  ``aws`` extra, the behavior of credential fetching has changed with
  ``pymongo_auth_aws>=1.1.0``.  Please see :doc:`examples/authentication` for
  more information.

Bug fixes
.........

- Fixed a bug where  :py:class:`~pymongo.change_stream.ChangeStream`
  would allow an app to retry calling ``next()`` or ``try_next()`` even
  after non-resumable errors (`PYTHON-3389`_).
- Fixed a bug where the client could be unable to discover the new primary
  after a simultaneous replica set election and reconfig (`PYTHON-2970`_).

Issues Resolved
...............

See the `PyMongo 4.3 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PYTHON-1824: https://jira.mongodb.org/browse/PYTHON-1824
.. _PYTHON-2484: https://jira.mongodb.org/browse/PYTHON-2484
.. _PYTHON-2970: https://jira.mongodb.org/browse/PYTHON-2970
.. _PYTHON-3389: https://jira.mongodb.org/browse/PYTHON-3389
.. _PyMongo 4.3 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=33425

Changes in Version 4.2
----------------------

.. warning:: PyMongo 4.2 drops support for Python 3.6: Python 3.7+ is now required.

PyMongo 4.2 brings a number of improvements including:

- Support for MongoDB 6.0.
- Support for the Queryable Encryption beta with MongoDB 6.0. Note that backwards-breaking
  changes may be made before the final release.  See :ref:`automatic-queryable-client-side-encryption` for example usage.
- Provisional (beta) support for :py:func:`pymongo.timeout` to apply a single timeout
  to an entire block of pymongo operations. See :ref:`timeout-example` for examples.
- Added the ``timeoutMS`` URI and keyword argument to :py:class:`~pymongo.mongo_client.MongoClient`.
- Added the :attr:`pymongo.errors.PyMongoError.timeout` property which is ``True`` when
  the error was caused by a timeout.
- Added the ``check_exists`` argument to :py:meth:`~pymongo.database.Database.create_collection`
  that when True (the default)  runs an additional ``listCollections`` command to verify that the
  collection does not exist already.
- Added the following key management APIs to :py:class:`~pymongo.encryption.ClientEncryption`:

  - :py:meth:`~pymongo.encryption.ClientEncryption.get_key`
  - :py:meth:`~pymongo.encryption.ClientEncryption.get_keys`
  - :py:meth:`~pymongo.encryption.ClientEncryption.delete_key`
  - :py:meth:`~pymongo.encryption.ClientEncryption.add_key_alt_name`
  - :py:meth:`~pymongo.encryption.ClientEncryption.get_key_by_alt_name`
  - :py:meth:`~pymongo.encryption.ClientEncryption.remove_key_alt_name`
  - :py:meth:`~pymongo.encryption.ClientEncryption.rewrap_many_data_key`
  - :py:class:`~pymongo.encryption.RewrapManyDataKeyResult`

- Support for the ``crypt_shared`` library to replace ``mongocryptd`` using the new
  ``crypt_shared_lib_path`` and ``crypt_shared_lib_required`` arguments to
  :py:class:`~pymongo.encryption_options.AutoEncryptionOpts`.

Bug fixes
.........

- Fixed a bug where :py:meth:`~pymongo.collection.Collection.estimated_document_count`
  would fail with a "CommandNotSupportedOnView" error on views (`PYTHON-2885`_).
- Fixed a bug where invalid UTF-8 strings could be passed as patterns for :py:class:`~bson.regex.Regex`
  objects. :py:func:`bson.encode` now correctly raises :py:class:`bson.errors.InvalidStringData` (`PYTHON-3048`_).
- Fixed a bug that caused ``AutoReconnect("connection pool paused")`` errors in the child
  process after fork (`PYTHON-3257`_).
- Fixed a bug where  :py:meth:`~pymongo.collection.Collection.count_documents` and
  :py:meth:`~pymongo.collection.Collection.distinct` would fail in a transaction with
  ``directConnection=True`` (`PYTHON-3333`_).
- GridFS no longer uploads an incomplete files collection document after encountering an
  error in the middle of an upload fork. This results in fewer
  :py:class:`~gridfs.errors.CorruptGridFile` errors (`PYTHON-1552`_).
- Renamed PyMongo's internal C extension methods to avoid crashing due to name conflicts
  with mpi4py and other shared libraries (`PYTHON-2110`_).
- Fixed tight CPU loop for network I/O when using PyOpenSSL (`PYTHON-3187`_).

Unavoidable breaking changes
............................

- pymongocrypt 1.3.0 or later is now required for client side field level
  encryption support.
- :py:meth:`~pymongo.collection.Collection.estimated_document_count` now always uses
  the `count`_ command. Due to an oversight in versions 5.0.0-5.0.8 of MongoDB,
  the count command was not included in V1 of the :ref:`versioned-api-ref`.
  Users of the Stable API with estimated_document_count are recommended to upgrade
  their server version to 5.0.9+ or set :attr:`pymongo.server_api.ServerApi.strict`
  to ``False`` to avoid encountering errors (`PYTHON-3167`_).
- Removed generic typing from :py:class:`~pymongo.client_session.ClientSession` to improve
  support for Pyright (`PYTHON-3283`_).
- Added ``__all__`` to the bson, pymongo, and gridfs packages. This could be a breaking
  change for apps that relied on ``from bson import *`` to import APIs not present in
  ``__all__`` (`PYTHON-3311`_).

.. _count: https://mongodb.com/docs/manual/reference/command/count/

Issues Resolved
...............

See the `PyMongo 4.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PYTHON-3048: https://jira.mongodb.org/browse/PYTHON-3048
.. _PYTHON-2885: https://jira.mongodb.org/browse/PYTHON-2885
.. _PYTHON-3167: https://jira.mongodb.org/browse/PYTHON-3167
.. _PYTHON-3257: https://jira.mongodb.org/browse/PYTHON-3257
.. _PYTHON-3333: https://jira.mongodb.org/browse/PYTHON-3333
.. _PYTHON-1552: https://jira.mongodb.org/browse/PYTHON-1552
.. _PYTHON-2110: https://jira.mongodb.org/browse/PYTHON-2110
.. _PYTHON-3283: https://jira.mongodb.org/browse/PYTHON-3283
.. _PYTHON-3311: https://jira.mongodb.org/browse/PYTHON-3311
.. _PYTHON-3187: https://jira.mongodb.org/browse/PYTHON-3187
.. _PyMongo 4.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=33196

Changes in Version 4.1.1
-------------------------

Version 4.1.1 fixes a number of bugs:

- Fixed a memory leak bug when calling :py:func:`~bson.decode_all` without a
  ``codec_options`` argument (`PYTHON-3222`_).
- Fixed a bug where :py:func:`~bson.decode_all` did not accept ``codec_options``
  as a keyword argument (`PYTHON-3222`_).
- Fixed an oversight where type markers (py.typed files) were not included
  in our release distributions (`PYTHON-3214`_).
- Fixed a bug where pymongo would raise a "NameError: name sys is not defined"
  exception when attempting to parse a "mongodb+srv://" URI when the dnspython
  dependency was not installed (`PYTHON-3198`_).

Issues Resolved
...............

See the `PyMongo 4.1.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PYTHON-3198: https://jira.mongodb.org/browse/PYTHON-3198
.. _PYTHON-3214: https://jira.mongodb.org/browse/PYTHON-3214
.. _PYTHON-3222: https://jira.mongodb.org/browse/PYTHON-3222
.. _PyMongo 4.1.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=33290

Changes in Version 4.1
----------------------

.. warning:: PyMongo 4.1 drops support for Python 3.6.0 and 3.6.1, Python 3.6.2+ is now required.

PyMongo 4.1 brings a number of improvements including:

- Type Hinting support (formerly provided by `pymongo-stubs`_).  See :doc:`examples/type_hints` for more information.
- Added support for the ``comment`` parameter to all helpers. For example see
  :py:meth:`~pymongo.collection.Collection.insert_one`.
- Added support for the ``let`` parameter to
  :py:meth:`~pymongo.collection.Collection.update_one`,
  :py:meth:`~pymongo.collection.Collection.update_many`,
  :py:meth:`~pymongo.collection.Collection.delete_one`,
  :py:meth:`~pymongo.collection.Collection.delete_many`,
  :py:meth:`~pymongo.collection.Collection.replace_one`,
  :py:meth:`~pymongo.collection.Collection.aggregate`,
  :py:meth:`~pymongo.collection.Collection.find_one_and_delete`,
  :py:meth:`~pymongo.collection.Collection.find_one_and_replace`,
  :py:meth:`~pymongo.collection.Collection.find_one_and_update`,
  :py:meth:`~pymongo.collection.Collection.find`,
  :py:meth:`~pymongo.collection.Collection.find_one`,
  and :py:meth:`~pymongo.collection.Collection.bulk_write`.
  ``let`` is a map of parameter names and values.
  Parameters can then be accessed as variables in an aggregate expression
  context.
- :py:meth:`~pymongo.collection.Collection.aggregate` now supports
  $merge and $out executing on secondaries on MongoDB >=5.0.
  aggregate() now always obeys the collection's :attr:`read_preference` on
  MongoDB >= 5.0.
- :py:meth:`gridfs.grid_file.GridOut.seek` now returns the new position in the file, to
  conform to the behavior of :py:meth:`io.IOBase.seek`.
- Improved reuse of implicit sessions (`PYTHON-2956`_).

Bug fixes
.........

- Fixed bug that would cause SDAM heartbeat timeouts and connection churn on
  AWS Lambda and other FaaS environments (`PYTHON-3186`_).
- Fixed bug where :py:class:`~pymongo.mongo_client.MongoClient`,
  :py:class:`~pymongo.database.Database`, and :py:class:`~pymongo.collection.Collection`
  mistakenly implemented :py:class:`typing.Iterable` (`PYTHON-3084`_).

Issues Resolved
...............

See the `PyMongo 4.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 4.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=30619
.. _PYTHON-2956: https://jira.mongodb.org/browse/PYTHON-2956
.. _PYTHON-3084: https://jira.mongodb.org/browse/PYTHON-3084
.. _PYTHON-3186: https://jira.mongodb.org/browse/PYTHON-3186
.. _pymongo-stubs: https://github.com/mongodb-labs/pymongo-stubs

Changes in Version 4.0
----------------------

.. warning:: PyMongo 4.0 drops support for Python 2.7, 3.4, and 3.5.

.. warning:: PyMongo 4.0 drops support for MongoDB 2.6, 3.0, 3.2, and 3.4.

.. warning:: PyMongo 4.0 changes the default value of the ``directConnection`` URI option and
  keyword argument to :py:class:`~pymongo.mongo_client.MongoClient`
  to ``False`` instead of ``None``, allowing for the automatic
  discovery of replica sets. This means that if you
  want a direct connection to a single server you must pass
  ``directConnection=True`` as a URI option or keyword argument.
  For more details, see the relevant section of the PyMongo 4.x migration
  guide: :ref:`pymongo4-migration-direct-connection`.

PyMongo 4.0 brings a number of improvements as well as some backward breaking
changes. For example, all APIs deprecated in PyMongo 3.X have been removed.
Be sure to read the changes listed below and the :doc:`migrate-to-pymongo4`
before upgrading from PyMongo 3.x.

Breaking Changes in 4.0
.......................

- Removed support for Python 2.7, 3.4, and 3.5. Python 3.6.2+ is now required.
- The default uuid_representation for :py:class:`~bson.codec_options.CodecOptions`,
  :py:class:`~bson.json_util.JSONOptions`, and
  :py:class:`~pymongo.mongo_client.MongoClient` has been changed from
  :data:`bson.binary.UuidRepresentation.PYTHON_LEGACY` to
  :data:`bson.binary.UuidRepresentation.UNSPECIFIED`. Attempting to encode a
  :py:class:`uuid.UUID` instance to BSON or JSON now produces an error by default.
  See :ref:`handling-uuid-data-example` for details.
- Removed the ``waitQueueMultiple`` keyword argument to
  :py:class:`~pymongo.mongo_client.MongoClient` and removed
  ``pymongo.errors.ExceededMaxWaiters``.
- Removed the ``socketKeepAlive`` keyword argument to
  :py:class:`~pymongo.mongo_client.MongoClient`.
- Removed :py:meth:`pymongo.mongo_client.MongoClient.fsync`,
  :py:meth:`pymongo.mongo_client.MongoClient.unlock`, and
  :attr:`pymongo.mongo_client.MongoClient.is_locked`.
- Removed :py:meth:`pymongo.mongo_client.MongoClient.database_names`.
- Removed :attr:`pymongo.mongo_client.MongoClient.max_bson_size`.
- Removed :attr:`pymongo.mongo_client.MongoClient.max_message_size`.
- Removed :attr:`pymongo.mongo_client.MongoClient.max_write_batch_size`.
- Removed :attr:`pymongo.mongo_client.MongoClient.event_listeners`.
- Removed :attr:`pymongo.mongo_client.MongoClient.max_pool_size`.
- Removed :attr:`pymongo.mongo_client.MongoClient.max_idle_time_ms`.
- Removed :attr:`pymongo.mongo_client.MongoClient.local_threshold_ms`.
- Removed :attr:`pymongo.mongo_client.MongoClient.server_selection_timeout`.
- Removed :attr:`pymongo.mongo_client.MongoClient.retry_writes`.
- Removed :attr:`pymongo.mongo_client.MongoClient.retry_reads`.
- Removed :py:meth:`pymongo.database.Database.eval`,
  :data:`pymongo.database.Database.system_js` and
  :py:class:`pymongo.database.SystemJS`.
- Removed :py:meth:`pymongo.database.Database.collection_names`.
- Removed :py:meth:`pymongo.database.Database.current_op`.
- Removed :py:meth:`pymongo.database.Database.authenticate` and
  :py:meth:`pymongo.database.Database.logout`.
- Removed :py:meth:`pymongo.database.Database.error`,
  :py:meth:`pymongo.database.Database.last_status`,
  :py:meth:`pymongo.database.Database.previous_error`,
  :py:meth:`pymongo.database.Database.reset_error_history`.
- Removed :py:meth:`pymongo.database.Database.add_user` and
  :py:meth:`pymongo.database.Database.remove_user`.
- Removed support for database profiler helpers
  :py:meth:`~pymongo.database.Database.profiling_level`,
  :py:meth:`~pymongo.database.Database.set_profiling_level`,
  and :py:meth:`~pymongo.database.Database.profiling_info`. Instead, users
  should run the `profile command`_ with the
  :py:meth:`~pymongo.database.Database.command` helper directly.
- Removed :attr:`pymongo.OFF`, :attr:`pymongo.SLOW_ONLY`, and
  :attr:`pymongo.ALL`.
- Removed :py:meth:`pymongo.collection.Collection.parallel_scan`.
- Removed :py:meth:`pymongo.collection.Collection.ensure_index`.
- Removed :py:meth:`pymongo.collection.Collection.reindex`.
- Removed :py:meth:`pymongo.collection.Collection.save`.
- Removed :py:meth:`pymongo.collection.Collection.insert`.
- Removed :py:meth:`pymongo.collection.Collection.update`.
- Removed :py:meth:`pymongo.collection.Collection.remove`.
- Removed :py:meth:`pymongo.collection.Collection.find_and_modify`.
- Removed :py:meth:`pymongo.collection.Collection.count`.
- Removed :py:meth:`pymongo.collection.Collection.initialize_ordered_bulk_op`,
  :py:meth:`pymongo.collection.Collection.initialize_unordered_bulk_op`, and
  :py:class:`pymongo.bulk.BulkOperationBuilder`. Use
  :py:meth:`pymongo.collection.Collection.bulk_write` instead.
- Removed :py:meth:`pymongo.collection.Collection.group`.
- Removed :py:meth:`pymongo.collection.Collection.map_reduce` and
  :py:meth:`pymongo.collection.Collection.inline_map_reduce`.
- Removed the ``useCursor`` option for
  :py:meth:`~pymongo.collection.Collection.aggregate`.
- Removed :py:meth:`pymongo.mongo_client.MongoClient.close_cursor`. Use
  :py:meth:`pymongo.cursor.Cursor.close` instead.
- Removed :py:meth:`pymongo.mongo_client.MongoClient.kill_cursors`.
- Removed :py:class:`pymongo.cursor_manager.CursorManager` and
  ``pymongo.cursor_manager``.
- Removed :py:meth:`pymongo.mongo_client.MongoClient.set_cursor_manager`.
- Removed :py:meth:`pymongo.cursor.Cursor.count`.
- Removed ``pymongo.thread_util``.
- Removed :py:class:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient`.
- Removed :py:class:`~pymongo.ismaster.IsMaster`.
  Use :py:class:`~pymongo.hello.Hello` instead.
- Removed ``pymongo.son_manipulator``,
  :py:class:`pymongo.son_manipulator.SONManipulator`,
  :py:class:`pymongo.son_manipulator.ObjectIdInjector`,
  :py:class:`pymongo.son_manipulator.ObjectIdShuffler`,
  :py:class:`pymongo.son_manipulator.AutoReference`,
  :py:class:`pymongo.son_manipulator.NamespaceInjector`,
  :py:meth:`pymongo.database.Database.add_son_manipulator`,
  :attr:`pymongo.database.Database.outgoing_copying_manipulators`,
  :attr:`pymongo.database.Database.outgoing_manipulators`,
  :attr:`pymongo.database.Database.incoming_copying_manipulators`, and
  :attr:`pymongo.database.Database.incoming_manipulators`.
- Removed the ``manipulate`` and ``modifiers`` parameters from
  :py:meth:`~pymongo.collection.Collection.find`,
  :py:meth:`~pymongo.collection.Collection.find_one`,
  :py:meth:`~pymongo.collection.Collection.find_raw_batches`, and
  :py:meth:`~pymongo.cursor.Cursor`.
- Removed :py:meth:`pymongo.message.delete`, :py:meth:`pymongo.message.get_more`,
  :py:meth:`pymongo.message.insert`, :py:meth:`pymongo.message.kill_cursors`,
  :py:meth:`pymongo.message.query`, and :py:meth:`pymongo.message.update`.
- Removed ``pymongo.errors.NotMasterError``.
  Use ``pymongo.errors.NotPrimaryError`` instead.
- Removed ``pymongo.errors.CertificateError``.
- Removed :attr:`pymongo.GEOHAYSTACK`.
- Removed :py:class:`bson.binary.UUIDLegacy`.
- Removed :const:`bson.json_util.STRICT_JSON_OPTIONS`. Use
  :const:`~bson.json_util.RELAXED_JSON_OPTIONS` or
  :const:`~bson.json_util.CANONICAL_JSON_OPTIONS` instead.
- Changed the default JSON encoding representation from legacy to relaxed.
  The json_mode parameter for :const:`bson.json_util.dumps` now defaults to
  :const:`~bson.json_util.RELAXED_JSON_OPTIONS`.
- Changed the BSON and JSON decoding behavior of :py:class:`~bson.dbref.DBRef`
  to match the behavior outlined in the `DBRef specification`_ version 1.0.
  Specifically, PyMongo now only decodes a subdocument into a
  :py:class:`~bson.dbref.DBRef` if and only if, it contains both ``$ref`` and
  ``$id`` fields and the ``$ref``, ``$id``, and ``$db`` fields are of the
  correct type. Otherwise the document is returned as normal. Previously, any
  subdocument containing a ``$ref`` field would be decoded as a
  :py:class:`~bson.dbref.DBRef`.
- The "tls" install extra is no longer necessary or supported and will be
  ignored by pip.
- The ``tz_aware`` argument to :py:class:`~bson.json_util.JSONOptions`
  now defaults to ``False`` instead of ``True``. :py:meth:`bson.json_util.loads` now
  decodes datetime as naive by default. See :ref:`tz_aware_default_change` for more info.
- ``directConnection`` URI option and keyword argument to :py:class:`~pymongo.mongo_client.MongoClient`
  defaults to ``False`` instead of ``None``, allowing for the automatic
  discovery of replica sets. This means that if you
  want a direct connection to a single server you must pass
  ``directConnection=True`` as a URI option or keyword argument.
- The ``hint`` option is now required when using ``min`` or ``max`` queries
  with :py:meth:`~pymongo.collection.Collection.find`.
- ``name`` is now a required argument for the :py:class:`pymongo.driver_info.DriverInfo` class.
- When providing a "mongodb+srv://" URI to
  :py:class:`~pymongo.mongo_client.MongoClient` constructor you can now use the
  ``srvServiceName`` URI option to specify your own SRV service name.
- :py:meth:`~bson.son.SON.items` now returns a ``dict_items`` object rather
  than a list.
- Removed :py:meth:`bson.son.SON.iteritems`.
- :py:class:`~pymongo.collection.Collection` and :py:class:`~pymongo.database.Database`
  now raises an error upon evaluating as a Boolean, please use the
  syntax ``if collection is not None:`` or ``if database is not None:`` as
  opposed to
  the previous syntax which was simply ``if collection:`` or ``if database:``.
  You must now explicitly compare with None.
- :py:class:`~pymongo.mongo_client.MongoClient` cannot execute any operations
  after being closed. The previous behavior would simply reconnect. However,
  now you must create a new instance.
- Classes :py:class:`~bson.int64.Int64`, :py:class:`~bson.min_key.MinKey`,
  :py:class:`~bson.max_key.MaxKey`, :py:class:`~bson.timestamp.Timestamp`,
  :py:class:`~bson.regex.Regex`, and :py:class:`~bson.dbref.DBRef` all implement
  ``__slots__`` now. This means that their attributes are fixed, and new
  attributes cannot be added to them at runtime.
- Empty projections (eg {} or []) for
  :py:meth:`~pymongo.collection.Collection.find`, and
  :py:meth:`~pymongo.collection.Collection.find_one`
  are passed to the server as-is rather than the previous behavior which
  substituted in a projection of ``{"_id": 1}``. This means that an empty
  projection will now return the entire document, not just the ``"_id"`` field.
- :py:class:`~pymongo.mongo_client.MongoClient` now raises a
  ``~pymongo.errors.ConfigurationError`` when more than one URI is passed
  into the ``hosts`` argument.
- :py:class:`~pymongo.mongo_client.MongoClient`` now raises an
  ``~pymongo.errors.InvalidURI`` exception
  when it encounters unescaped percent signs in username and password when
  parsing MongoDB URIs.
- Comparing two :py:class:`~pymongo.mongo_client.MongoClient` instances now
  uses a set of immutable properties rather than
  :attr:`~pymongo.mongo_client.MongoClient.address` which can change.
- Removed the ``disable_md5`` parameter for :py:class:`~gridfs.GridFSBucket` and
  :py:class:`~gridfs.GridFS`. See :ref:`removed-gridfs-checksum` for details.
- pymongocrypt 1.2.0 or later is now required for client side field level
  encryption support.

Notable improvements
....................

- Enhanced connection pooling to create connections more efficiently and
  avoid connection storms.
- Added the ``maxConnecting`` URI and
  :py:class:`~pymongo.mongo_client.MongoClient` keyword argument.
- :py:class:`~pymongo.mongo_client.MongoClient` now accepts a URI and keyword
  argument ``srvMaxHosts`` that limits the number of mongos-like hosts a client
  will connect to. More specifically, when a mongodb+srv:// connection string
  resolves to more than ``srvMaxHosts`` number of hosts, the client will randomly
  choose a ``srvMaxHosts`` sized subset of hosts.
- Added :attr:`pymongo.mongo_client.MongoClient.options` for read-only access
  to a client's configuration options.
- Support for the "kmip" KMS provider for client side field level encryption.
  See the docstring for :py:class:`~pymongo.encryption_options.AutoEncryptionOpts`
  and ``~pymongo.encryption``.

Issues Resolved
...............

See the `PyMongo 4.0 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 4.0 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=18463
.. _DBRef specification: https://github.com/mongodb/specifications/blob/5a8c8d7/source/dbref.rst

Changes in Version 3.13.0
-------------------------

Version 3.13 provides an upgrade path to PyMongo 4.x. Most of the API changes
from PyMongo 4.0 have been backported in a backward compatible way, allowing
applications to be written against PyMongo >= 3.13, rather then PyMongo 3.x or
PyMongo 4.x. See the `PyMongo 4 Migration Guide`_ for detailed examples.

Notable improvements
....................
- Added :attr:`pymongo.mongo_client.MongoClient.options` for read-only access
  to a client's configuration options.


Issues Resolved
...............

PyMongo 3.13 drops support for Python 3.4.

Bug fixes
.........

- Fixed a memory leak bug when calling :py:func:`~bson.decode_all` without a
  ``codec_options`` argument (`PYTHON-3222`_).
- Fixed a bug where :py:func:`~bson.decode_all` did not accept ``codec_options``
  as a keyword argument (`PYTHON-3222`_).

Deprecations
............
- Deprecated :py:meth:`~pymongo.collection.Collection.map_reduce` and
  :py:meth:`~pymongo.collection.Collection.inline_map_reduce`.
  Use :py:meth:`~pymongo.collection.Collection.aggregate` instead.
- Deprecated :attr:`pymongo.mongo_client.MongoClient.event_listeners`.
  Use :attr:`~pymongo.mongo_client.options.event_listeners` instead.
- Deprecated :attr:`pymongo.mongo_client.MongoClient.max_pool_size`.
  Use :attr:`~pymongo.mongo_client.options.pool_options.max_pool_size` instead.
- Deprecated :attr:`pymongo.mongo_client.MongoClient.max_idle_time_ms`.
  Use :attr:`~pymongo.mongo_client.options.pool_options.max_idle_time_seconds` instead.
- Deprecated :attr:`pymongo.mongo_client.MongoClient.local_threshold_ms`.
  Use :attr:`~pymongo.mongo_client.options.local_threshold_ms` instead.
- Deprecated :attr:`pymongo.mongo_client.MongoClient.server_selection_timeout`.
  Use :attr:`~pymongo.mongo_client.options.server_selection_timeout` instead.
- Deprecated :attr:`pymongo.mongo_client.MongoClient.retry_writes`.
  Use :attr:`~pymongo.mongo_client.options.retry_writes` instead.
- Deprecated :attr:`pymongo.mongo_client.MongoClient.retry_reads`.
  Use :attr:`~pymongo.mongo_client.options.retry_reads` instead.
- Deprecated :attr:`pymongo.mongo_client.MongoClient.max_bson_size`,
  :attr:`pymongo.mongo_client.MongoClient.max_message_size`, and
  :attr:`pymongo.mongo_client.MongoClient.max_write_batch_size`. These helpers
  were incorrect when in ``loadBalanced=true mode`` and ambiguous in clusters
  with mixed versions. Use the `hello command`_ to get the authoritative
  value from the remote server instead. Code like this:

.. code-block:: python

    max_bson_size = client.max_bson_size
    max_message_size = client.max_message_size
    max_write_batch_size = client.max_write_batch_size

can be changed to this:

.. code-block:: python

    doc = client.admin.command('hello')
    max_bson_size = doc['maxBsonObjectSize']
    max_message_size = doc['maxMessageSizeBytes']
    max_write_batch_size = doc['maxWriteBatchSize']

.. _hello command: https://docs.mongodb.com/manual/reference/command/hello/

See the `PyMongo 3.13.0 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 4 Migration Guide: https://pymongo.readthedocs.io/en/stable/migrate-to-pymongo4.html
.. _PYTHON-3222: https://jira.mongodb.org/browse/PYTHON-3222
.. _PyMongo 3.13.0 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=31570

Changes in Version 3.12.3
-------------------------

Issues Resolved
...............

Version 3.12.3 fixes a bug that prevented :py:meth:`bson.json_util.loads` from
decoding a document with a non-string "$regex" field (`PYTHON-3028`_).

See the `PyMongo 3.12.3 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PYTHON-3028: https://jira.mongodb.org/browse/PYTHON-3028
.. _PyMongo 3.12.3 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=32505

Changes in Version 3.12.2
-------------------------

Issues Resolved
...............

Version 3.12.2 fixes a number of bugs:

- Fixed a bug that prevented PyMongo from retrying bulk writes
  after a ``writeConcernError`` on MongoDB 4.4+ (`PYTHON-2984`_).
- Fixed a bug that could cause the driver to hang during automatic
  client side field level encryption (`PYTHON-3017`_).

See the `PyMongo 3.12.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PYTHON-2984: https://jira.mongodb.org/browse/PYTHON-2984
.. _PYTHON-3017: https://jira.mongodb.org/browse/PYTHON-3017
.. _PyMongo 3.12.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=32310

Changes in Version 3.12.1
-------------------------

Issues Resolved
...............

Version 3.12.1 fixes a number of bugs:

- Fixed a bug that caused a multi-document transaction to fail when the first
  operation was large bulk write (>48MB) that required splitting a batched
  write command (`PYTHON-2915`_).
- Fixed a bug that caused the ``tlsDisableOCSPEndpointCheck`` URI option to
  be applied incorrectly (`PYTHON-2866`_).

See the `PyMongo 3.12.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PYTHON-2915: https://jira.mongodb.org/browse/PYTHON-2915
.. _PYTHON-2866: https://jira.mongodb.org/browse/PYTHON-2866
.. _PyMongo 3.12.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=31527

Changes in Version 3.12.0
-------------------------

.. warning:: PyMongo 3.12.0 deprecates support for Python 2.7, 3.4 and 3.5.
   These Python versions will not be supported by PyMongo 4.

.. warning:: PyMongo now allows insertion of documents with keys that include
   dots ('.') or start with dollar signs ('$').

- pymongocrypt 1.1.0 or later is now required for client side field level
  encryption support.
- Iterating over :py:class:`gridfs.grid_file.GridOut` now moves through
  the file line by line instead of chunk by chunk, and does not
  restart at the top for subsequent iterations on the same object.
  Call ``seek(0)`` to reset the iterator.

Notable improvements
....................

- Added support for MongoDB 5.0.
- Support for MongoDB Stable API, see :py:class:`~pymongo.server_api.ServerApi`.
- Support for snapshot reads on secondaries (see :ref:`snapshot-reads-ref`).
- Support for Azure and GCP KMS providers for client side field level
  encryption. See the docstring for :py:class:`~pymongo.mongo_client.MongoClient`,
  :py:class:`~pymongo.encryption_options.AutoEncryptionOpts`,
  and ``~pymongo.encryption``.
- Support AWS authentication with temporary credentials when connecting to KMS
  in client side field level encryption.
- Support for connecting to load balanced MongoDB clusters via the new
  ``loadBalanced`` URI option.
- Support for creating timeseries collections via the ``timeseries`` and
  ``expireAfterSeconds`` arguments to
  :py:meth:`~pymongo.database.Database.create_collection`.
- Added :attr:`pymongo.mongo_client.MongoClient.topology_description`.
- Added hash support to :py:class:`~pymongo.mongo_client.MongoClient`,
  :py:class:`~pymongo.database.Database` and
  :py:class:`~pymongo.collection.Collection` (`PYTHON-2466`_).
- Improved the error message returned by
  :py:meth:`~pymongo.collection.Collection.insert_many` when supplied with an
  argument of incorrect type (`PYTHON-1690`_).
- Added session and read concern support to
  :py:meth:`~pymongo.collection.Collection.find_raw_batches`
  and :py:meth:`~pymongo.collection.Collection.aggregate_raw_batches`.

Bug fixes
.........

- Fixed a bug that could cause the driver to deadlock during automatic
  client side field level encryption (`PYTHON-2472`_).
- Fixed a potential deadlock when garbage collecting an unclosed exhaust
  :py:class:`~pymongo.cursor.Cursor`.
- Fixed an bug where using gevent.Timeout to timeout an operation could
  lead to a deadlock.
- Fixed the following bug with Atlas Data Lake. When closing cursors,
  pymongo now sends killCursors with the namespace returned the cursor's
  initial command response.
- Fixed a bug in :py:class:`~pymongo.cursor.RawBatchCursor` that caused it to
  return an empty bytestring when the cursor contained no results. It now
  raises ``StopIteration`` instead.

Deprecations
............

- Deprecated support for Python 2.7, 3.4 and 3.5.
- Deprecated support for database profiler helpers
  :py:meth:`~pymongo.database.Database.profiling_level`,
  :py:meth:`~pymongo.database.Database.set_profiling_level`,
  and :py:meth:`~pymongo.database.Database.profiling_info`. Instead, users
  should run the `profile command`_ with the
  :py:meth:`~pymongo.database.Database.command` helper directly.
- Deprecated ``~pymongo.errors.NotMasterError``. Users should
  use ``~pymongo.errors.NotPrimaryError`` instead.
- Deprecated :py:class:`~pymongo.ismaster.IsMaster` and ``~pymongo.ismaster``
  which will be removed in PyMongo 4.0 and are replaced by
  :py:class:`~pymongo.hello.Hello` and ``~pymongo.hello`` which provide the
  same API.
- Deprecated the ``pymongo.messeage`` module.
- Deprecated the ``ssl_keyfile`` and ``ssl_certfile`` URI options in favor
  of ``tlsCertificateKeyFile`` (see :doc:`examples/tls`).

.. _PYTHON-2466: https://jira.mongodb.org/browse/PYTHON-2466
.. _PYTHON-1690: https://jira.mongodb.org/browse/PYTHON-1690
.. _PYTHON-2472: https://jira.mongodb.org/browse/PYTHON-2472
.. _profile command: https://mongodb.com/docs/manual/reference/command/profile/

Issues Resolved
...............

See the `PyMongo 3.12.0 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.12.0 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=29594

Changes in Version 3.11.3
-------------------------

Issues Resolved
...............

Version 3.11.3 fixes a bug that prevented PyMongo from retrying writes after
a ``writeConcernError`` on MongoDB 4.4+ (`PYTHON-2452`_)

See the `PyMongo 3.11.3 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PYTHON-2452: https://jira.mongodb.org/browse/PYTHON-2452
.. _PyMongo 3.11.3 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=30355

Changes in Version 3.11.2
-------------------------

Issues Resolved
...............

Version 3.11.2 includes a number of bugfixes. Highlights include:

- Fixed a memory leak caused by failing SDAM monitor checks on Python 3 (`PYTHON-2433`_).
- Fixed a regression that changed the string representation of
  ``~pymongo.errors.BulkWriteError`` (`PYTHON-2438`_).
- Fixed a bug that made it impossible to use
  :py:meth:`bson.codec_options.CodecOptions.with_options` and
  :py:meth:`~bson.json_util.JSONOptions.with_options` on some early versions of
  Python 3.4 and Python 3.5 due to a bug in the standard library implementation
  of :py:meth:`collections.namedtuple._asdict` (`PYTHON-2440`_).
- Fixed a bug that resulted in a ``TypeError`` exception when a PyOpenSSL
  socket was configured with a timeout of ``None`` (`PYTHON-2443`_).

See the `PyMongo 3.11.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PYTHON-2433: https://jira.mongodb.org/browse/PYTHON-2433
.. _PYTHON-2438: https://jira.mongodb.org/browse/PYTHON-2438
.. _PYTHON-2440: https://jira.mongodb.org/browse/PYTHON-2440
.. _PYTHON-2443: https://jira.mongodb.org/browse/PYTHON-2443
.. _PyMongo 3.11.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=30315

Changes in Version 3.11.1
-------------------------

Version 3.11.1 adds support for Python 3.9 and includes a number of bugfixes.
Highlights include:

- Support for Python 3.9.
- Initial support for Azure and GCP KMS providers for client side field level
  encryption is in beta. See the docstring for
  :py:class:`~pymongo.mongo_client.MongoClient`,
  :py:class:`~pymongo.encryption_options.AutoEncryptionOpts`,
  and ``~pymongo.encryption``. **Note: Backwards-breaking changes may be
  made before the final release.**
- Fixed a bug where the :py:class:`bson.json_util.JSONOptions` API did not match
  the :py:class:`bson.codec_options.CodecOptions` API due to the absence of
  a :py:meth:`bson.json_util.JSONOptions.with_options` method. This method has now
  been added.
- Fixed a bug which made it impossible to serialize
  :py:class:`~pymongo.errors.BulkWriteError` instances using ``pickle``.
- Fixed a bug wherein PyMongo did not always discard an implicit session after
  encountering a network error.
- Fixed a bug where connections created in the background were not
  authenticated.
- Fixed a memory leak in the ``bson`` module when using a
  :py:class:`~bson.codec_options.TypeRegistry`.

Issues Resolved
...............

See the `PyMongo 3.11.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.11.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=29997

Changes in Version 3.11.0
-------------------------

Version 3.11 adds support for MongoDB 4.4 and includes a number of bug fixes.
Highlights include:

- Support for :ref:`OCSP` (Online Certificate Status Protocol).
- Support for `PyOpenSSL <https://pypi.org/project/pyOpenSSL/>`_ as an
  alternative TLS implementation. PyOpenSSL is required for :ref:`OCSP`
  support. It will also be installed when using the "tls" extra if the
  version of Python in use is older than 2.7.9.
- Support for the :ref:`MONGODB-AWS` authentication mechanism.
- Support for the ``directConnection`` URI option and kwarg to
  :py:class:`~pymongo.mongo_client.MongoClient`.
- Support for speculative authentication attempts in connection handshakes
  which reduces the number of network roundtrips needed to authenticate new
  connections on MongoDB 4.4+.
- Support for creating collections in multi-document transactions with
  :py:meth:`~pymongo.database.Database.create_collection` on MongoDB 4.4+.
- Added index hinting support to the
  :py:meth:`~pymongo.collection.Collection.replace_one`,
  :py:meth:`~pymongo.collection.Collection.update_one`,
  :py:meth:`~pymongo.collection.Collection.update_many`,
  :py:meth:`~pymongo.collection.Collection.find_one_and_replace`,
  :py:meth:`~pymongo.collection.Collection.find_one_and_update`,
  :py:meth:`~pymongo.collection.Collection.delete_one`,
  :py:meth:`~pymongo.collection.Collection.delete_many`, and
  :py:meth:`~pymongo.collection.Collection.find_one_and_delete` commands.
- Added index hinting support to the
  :py:class:`~pymongo.operations.ReplaceOne`,
  :py:class:`~pymongo.operations.UpdateOne`,
  :py:class:`~pymongo.operations.UpdateMany`,
  :py:class:`~pymongo.operations.DeleteOne`, and
  :py:class:`~pymongo.operations.DeleteMany` bulk operations.
- Added support for :data:`bson.binary.UuidRepresentation.UNSPECIFIED` and
  ``MongoClient(uuidRepresentation='unspecified')`` which will become the
  default UUID representation starting in PyMongo 4.0. See
  :ref:`handling-uuid-data-example` for details.
- New methods :py:meth:`bson.binary.Binary.from_uuid` and
  :py:meth:`bson.binary.Binary.as_uuid`.
- Added the ``background`` parameter to
  :py:meth:`pymongo.database.Database.validate_collection`. For a description
  of this parameter see the MongoDB documentation for the `validate command`_.
- Added the ``allow_disk_use`` parameters to
  :py:meth:`pymongo.collection.Collection.find`.
- Added the ``hedge`` parameter to
  :py:class:`~pymongo.read_preferences.PrimaryPreferred`,
  :py:class:`~pymongo.read_preferences.Secondary`,
  :py:class:`~pymongo.read_preferences.SecondaryPreferred`,
  :py:class:`~pymongo.read_preferences.Nearest` to support disabling
  (or explicitly enabling) hedged reads in MongoDB 4.4+.
- Fixed a bug in change streams that could cause PyMongo to miss some change
  documents when resuming a stream that was started without a resume token and
  whose first batch did not contain any change documents.
- Fixed an bug where using gevent.Timeout to timeout an operation could
  lead to a deadlock.

Deprecations:

- Deprecated the ``oplog_replay`` parameter to
  :py:meth:`pymongo.collection.Collection.find`. Starting in MongoDB 4.4, the
  server optimizes queries against the oplog collection without requiring
  the user to set this flag.
- Deprecated :py:meth:`pymongo.collection.Collection.reindex`. Use
  :py:meth:`~pymongo.database.Database.command` to run the ``reIndex`` command
  instead.
- Deprecated :py:meth:`pymongo.mongo_client.MongoClient.fsync`. Use
  :py:meth:`~pymongo.database.Database.command` to run the ``fsync`` command
  instead.
- Deprecated :py:meth:`pymongo.mongo_client.MongoClient.unlock`. Use
  :py:meth:`~pymongo.database.Database.command` to run the ``fsyncUnlock`` command
  instead. See the documentation for more information.
- Deprecated :attr:`pymongo.mongo_client.MongoClient.is_locked`. Use
  :py:meth:`~pymongo.database.Database.command` to run the ``currentOp`` command
  instead. See the documentation for more information.
- Deprecated :py:class:`bson.binary.UUIDLegacy`. Use
  :py:meth:`bson.binary.Binary.from_uuid` instead.

Unavoidable breaking changes:

- :py:class:`~gridfs.GridFSBucket` and :py:class:`~gridfs.GridFS` do not support
  multi-document transactions. Running a GridFS operation in a transaction
  now always raises the following error:
  ``InvalidOperation: GridFS does not support multi-document transactions``

.. _validate command: https://mongodb.com/docs/manual/reference/command/validate/

Issues Resolved
...............

See the `PyMongo 3.11.0 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.11.0 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=24799

Changes in Version 3.10.1
-------------------------

Version 3.10.1 fixes the following issues discovered since the release of
3.10.0:

- Fix a TypeError logged to stderr that could be triggered during server
  maintenance or during :py:meth:`pymongo.mongo_client.MongoClient.close`.
- Avoid creating new connections during
  :py:meth:`pymongo.mongo_client.MongoClient.close`.

Issues Resolved
...............

See the `PyMongo 3.10.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.10.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=25039

Changes in Version 3.10.0
-------------------------

Version 3.10 includes a number of improvements and bug fixes. Highlights
include:

- Support for Client-Side Field Level Encryption with MongoDB 4.2. See
  :doc:`examples/encryption` for examples.
- Support for Python 3.8.
- Added :attr:`pymongo.client_session.ClientSession.in_transaction`.
- Do not hold the Topology lock while creating connections in a MongoClient's
  background thread. This change fixes a bug where application operations would
  block while the background thread ensures that all server pools have
  minPoolSize connections.
- Fix a UnicodeDecodeError bug when coercing a PyMongoError with a non-ascii
  error message to unicode on Python 2.
- Fix an edge case bug where PyMongo could exceed the server's
  maxMessageSizeBytes when generating a compressed bulk write command.

Issues Resolved
...............

See the `PyMongo 3.10 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.10 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=23944

Changes in Version 3.9.0
------------------------

Version 3.9 adds support for MongoDB 4.2. Highlights include:

- Support for MongoDB 4.2 sharded transactions. Sharded transactions have
  the same API as replica set transactions. See :ref:`transactions-ref`.
- New method :py:meth:`pymongo.client_session.ClientSession.with_transaction` to
  support conveniently running a transaction in a session with automatic
  retries and at-most-once semantics.
- Initial support for client side field level encryption. See the docstring for
  :py:class:`~pymongo.mongo_client.MongoClient`,
  :py:class:`~pymongo.encryption_options.AutoEncryptionOpts`,
  and ``~pymongo.encryption`` for details. **Note: Support for client side
  encryption is in beta. Backwards-breaking changes may be made before the
  final release.**
- Added the ``max_commit_time_ms`` parameter to
  :py:meth:`~pymongo.client_session.ClientSession.start_transaction`.
- Implement the `URI options specification`_ in the
  :py:meth:`~pymongo.mongo_client.MongoClient` constructor. Consequently, there are
  a number of changes in connection options:

    - The ``tlsInsecure`` option has been added.
    - The ``tls`` option has been added. The older ``ssl`` option has been retained
      as an alias to the new ``tls`` option.
    - ``wTimeout`` has been deprecated in favor of ``wTimeoutMS``.
    - ``wTimeoutMS`` now overrides ``wTimeout`` if the user provides both.
    - ``j`` has been deprecated in favor of ``journal``.
    - ``journal`` now overrides ``j`` if the user provides both.
    - ``ssl_cert_reqs`` has been deprecated in favor of ``tlsAllowInvalidCertificates``.
      Instead of ``ssl.CERT_NONE``, ``ssl.CERT_OPTIONAL`` and ``ssl.CERT_REQUIRED``, the
      new option expects a boolean value - ``True`` is equivalent to ``ssl.CERT_NONE``,
      while ``False`` is equivalent to ``ssl.CERT_REQUIRED``.
    - ``ssl_match_hostname`` has been deprecated in favor of ``tlsAllowInvalidHostnames``.
    - ``ssl_ca_certs`` has been deprecated in favor of ``tlsCAFile``.
    - ``ssl_certfile`` has been deprecated in favor of ``tlsCertificateKeyFile``.
    - ``ssl_pem_passphrase`` has been deprecated in favor of ``tlsCertificateKeyFilePassword``.
    - ``waitQueueMultiple`` has been deprecated without replacement. This option
      was a poor solution for putting an upper bound on queuing since it didn't
      affect queuing in other parts of the driver.
- The ``retryWrites`` URI option now defaults to ``True``. Supported write
  operations that fail with a retryable error will automatically be retried one
  time, with at-most-once semantics.
- Support for retryable reads and the ``retryReads`` URI option which is
  enabled by default. See the :py:class:`~pymongo.mongo_client.MongoClient`
  documentation for details. Now that supported operations are retried
  automatically and transparently, users should consider adjusting any custom
  retry logic to prevent an application from inadvertently retrying for too
  long.
- Support zstandard for wire protocol compression.
- Support for periodically polling DNS SRV records to update the mongos proxy
  list without having to change client configuration.
- New method :py:meth:`pymongo.database.Database.aggregate` to support running
  database level aggregations.
- Support for publishing Connection Monitoring and Pooling events via the new
  :py:class:`~pymongo.monitoring.ConnectionPoolListener` class. See
  ``~pymongo.monitoring`` for an example.
- :py:meth:`pymongo.collection.Collection.aggregate` and
  :py:meth:`pymongo.database.Database.aggregate` now support the ``$merge`` pipeline
  stage and use read preference
  :attr:`~pymongo.read_preferences.ReadPreference.PRIMARY` if the ``$out`` or
  ``$merge`` pipeline stages are used.
- Support for specifying a pipeline or document in
  :py:meth:`~pymongo.collection.Collection.update_one`,
  :py:meth:`~pymongo.collection.Collection.update_many`,
  :py:meth:`~pymongo.collection.Collection.find_one_and_update`,
  :py:meth:`~pymongo.operations.UpdateOne`, and
  :py:meth:`~pymongo.operations.UpdateMany`.
- New BSON utility functions :py:func:`~bson.encode` and :py:func:`~bson.decode`
- :py:class:`~bson.binary.Binary` now supports any bytes-like type that implements
  the buffer protocol.
- Resume tokens can now be accessed from a ``ChangeStream`` cursor using the
  :attr:`~pymongo.change_stream.ChangeStream.resume_token` attribute.
- Connections now survive primary step-down when using MongoDB 4.2+.
  Applications should expect less socket connection turnover during
  replica set elections.

Unavoidable breaking changes:

- Applications that use MongoDB with the MMAPv1 storage engine must now
  explicitly disable retryable writes via the connection string
  (e.g. ``MongoClient("mongodb://my.mongodb.cluster/db?retryWrites=false")``) or
  the :py:class:`~pymongo.mongo_client.MongoClient` constructor's keyword argument
  (e.g. ``MongoClient("mongodb://my.mongodb.cluster/db", retryWrites=False)``)
  to avoid running into :py:class:`~pymongo.errors.OperationFailure` exceptions
  during write operations. The MMAPv1 storage engine is deprecated and does
  not support retryable writes which are now turned on by default.
- In order to ensure that the ``connectTimeoutMS`` URI option is honored when
  connecting to clusters with a ``mongodb+srv://`` connection string, the
  minimum required version of the optional ``dnspython`` dependency has been
  bumped to 1.16.0. This is a breaking change for applications that use
  PyMongo's SRV support with a version of ``dnspython`` older than 1.16.0.

.. _URI options specification: https://github.com/mongodb/specifications/blob/master/source/uri-options/uri-options.rst


Issues Resolved
...............

See the `PyMongo 3.9 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.9 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=21787

Changes in Version 3.8.0
------------------------

.. warning:: PyMongo no longer supports Python 2.6. RHEL 6 users should install
  Python 2.7 or newer from `Red Hat Software Collections
  <https://developers.redhat.com/products/softwarecollections/overview>`_.
  CentOS 6 users should install Python 2.7 or newer from `SCL
  <https://wiki.centos.org/AdditionalResources/Repositories/SCL>`_

.. warning:: PyMongo no longer supports PyPy3 versions older than 3.5. Users
  must upgrade to PyPy3.5+.

- :py:class:`~bson.objectid.ObjectId` now implements the `ObjectID specification
  version 0.2 <https://github.com/mongodb/specifications/blob/master/source/objectid.rst>`_.
- For better performance and to better follow the GridFS spec,
  :py:class:`~gridfs.grid_file.GridOut` now uses a single cursor to read all the
  chunks in the file. Previously, each chunk in the file was queried
  individually using :py:meth:`~pymongo.collection.Collection.find_one`.
- :py:meth:`gridfs.grid_file.GridOut.read` now only checks for extra chunks after
  reading the entire file. Previously, this method would check for extra
  chunks on every call.
- :py:meth:`~pymongo.database.Database.current_op` now always uses the
  ``Database``'s  :attr:`~pymongo.database.Database.codec_options`
  when decoding the command response. Previously the codec_options
  was only used when the MongoDB server version was <= 3.0.
- Undeprecated :py:meth:`~pymongo.mongo_client.MongoClient.get_default_database`
  and added the ``default`` parameter.
- TLS Renegotiation is now disabled when possible.
- Custom types can now be directly encoded to, and decoded from MongoDB using
  the :py:class:`~bson.codec_options.TypeCodec` and
  :py:class:`~bson.codec_options.TypeRegistry` APIs. For more information, see
  the :doc:`custom type example <examples/custom_type>`.
- Attempting a multi-document transaction on a sharded cluster now raises a
  ``~pymongo.errors.ConfigurationError``.
- :py:meth:`pymongo.cursor.Cursor.distinct` and
  :py:meth:`pymongo.cursor.Cursor.count` now send the Cursor's
  :py:meth:`~pymongo.cursor.Cursor.comment` as the "comment" top-level
  command option instead of "$comment". Also, note that "comment" must be a
  string.
- Add the ``filter`` parameter to
  :py:meth:`~pymongo.database.Database.list_collection_names`.
- Changes can now be requested from a ``ChangeStream`` cursor without blocking
  indefinitely using the new
  :py:meth:`pymongo.change_stream.ChangeStream.try_next` method.
- Fixed a reference leak bug when splitting a batched write command based on
  maxWriteBatchSize or the max message size.
- Deprecated running find queries that set :py:meth:`~pymongo.cursor.Cursor.min`
  and/or :py:meth:`~pymongo.cursor.Cursor.max` but do not also set a
  :py:meth:`~pymongo.cursor.Cursor.hint` of which index to use. The find command
  is expected to require a :py:meth:`~pymongo.cursor.Cursor.hint` when using
  min/max starting in MongoDB 4.2.
- Documented support for the uuidRepresentation URI option, which has been
  supported since PyMongo 2.7. Valid values are ``pythonLegacy`` (the default),
  ``javaLegacy``, ``csharpLegacy`` and ``standard``. New applications should consider
  setting this to ``standard`` for cross language compatibility.
- :py:class:`~bson.raw_bson.RawBSONDocument` now validates that the ``bson_bytes``
  passed in represent a single bson document. Earlier versions would mistakenly
  accept multiple bson documents.
- Iterating over a :py:class:`~bson.raw_bson.RawBSONDocument` now maintains the
  same field order of the underlying raw BSON document.
- Applications can now register a custom server selector. For more information
  see the :doc:`server selector example <examples/server_selection>`.
- The connection pool now implements a LIFO policy.

Unavoidable breaking changes:

- In order to follow the ObjectID Spec version 0.2, an ObjectId's 3-byte
  machine identifier and 2-byte process id have been replaced with a single
  5-byte random value generated per process. This is a breaking change for any
  application that attempts to interpret those bytes.

Issues Resolved
...............

See the `PyMongo 3.8 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.8 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=19904

Changes in Version 3.7.2
------------------------

Version 3.7.2 fixes a few issues discovered since the release of 3.7.1.

- Fixed a bug in retryable writes where a previous command's "txnNumber"
  field could be sent leading to incorrect results.
- Fixed a memory leak of a few bytes on some insert, update, or delete
  commands when running against MongoDB 3.6+.
- Fixed a bug that caused :py:meth:`pymongo.collection.Collection.ensure_index`
  to only cache a single index per database.
- Updated the documentation examples to use
  :py:meth:`pymongo.collection.Collection.count_documents` instead of
  :py:meth:`pymongo.collection.Collection.count` and
  :py:meth:`pymongo.cursor.Cursor.count`.

Issues Resolved
...............

See the `PyMongo 3.7.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.7.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=21519

Changes in Version 3.7.1
------------------------

Version 3.7.1 fixes a few issues discovered since the release of 3.7.0.

- Calling :py:meth:`~pymongo.database.Database.authenticate` more than once
  with the same credentials results in OperationFailure.
- Authentication fails when SCRAM-SHA-1 is used to authenticate users with
  only MONGODB-CR credentials.
- A millisecond rounding problem when decoding datetimes in the pure Python
  BSON decoder on 32 bit systems and AWS lambda.

Issues Resolved
...............

See the `PyMongo 3.7.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.7.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=21096

Changes in Version 3.7.0
------------------------

Version 3.7 adds support for MongoDB 4.0. Highlights include:

- Support for single replica set multi-document ACID transactions.
  See :ref:`transactions-ref`.
- Support for wire protocol compression via the new ``compressors`` URI and keyword argument to
  :py:meth:`~pymongo.mongo_client.MongoClient`. See :ref:`network-compression-example` for details.
- Support for Python 3.7.
- New count methods, :py:meth:`~pymongo.collection.Collection.count_documents`
  and :py:meth:`~pymongo.collection.Collection.estimated_document_count`.
  :py:meth:`~pymongo.collection.Collection.count_documents` is always
  accurate when used with MongoDB 3.6+, or when used with older standalone
  or replica set deployments. With older sharded clusters is it always
  accurate when used with Primary read preference. It can also be used in
  a transaction, unlike the now deprecated
  :py:meth:`pymongo.collection.Collection.count` and
  :py:meth:`pymongo.cursor.Cursor.count` methods.
- Support for watching changes on all collections in a database using the
  new :py:meth:`pymongo.database.Database.watch` method.
- Support for watching changes on all collections in all databases using the
  new :py:meth:`pymongo.mongo_client.MongoClient.watch` method.
- Support for watching changes starting at a user provided timestamp using the
  new ``start_at_operation_time`` parameter for the ``watch()`` helpers.
- Better support for using PyMongo in a FIPS 140-2 environment. Specifically,
  the following features and changes allow PyMongo to function when MD5 support
  is disabled in OpenSSL by the FIPS Object Module:

  - Support for the :ref:`SCRAM-SHA-256 <scram_sha_256>`
    authentication mechanism. The :ref:`GSSAPI <gssapi>`,
    :ref:`PLAIN <sasl_plain>`, and :ref:`MONGODB-X509 <mongodb_x509>`
    mechanisms can also be used to avoid issues with OpenSSL in FIPS
    environments.
  - MD5 checksums are now optional in GridFS. See the ``disable_md5`` option
    of :py:class:`~gridfs.GridFS` and :py:class:`~gridfs.GridFSBucket`.
  - :py:class:`~bson.objectid.ObjectId` machine bytes are now hashed using
    `FNV-1a
    <https://en.wikipedia.org/wiki/Fowler-Noll-Vo_hash_function>`_
    instead of MD5.

- The :py:meth:`~pymongo.database.Database.list_collection_names` and
  :py:meth:`~pymongo.database.Database.collection_names` methods use
  the nameOnly option when supported by MongoDB.
- The :py:meth:`pymongo.collection.Collection.watch` method now returns an
  instance of the :py:class:`~pymongo.change_stream.CollectionChangeStream`
  class which is a subclass of :py:class:`~pymongo.change_stream.ChangeStream`.
- SCRAM client and server keys are cached for improved performance, following
  `RFC 5802 <https://tools.ietf.org/html/rfc5802>`_.
- If not specified, the authSource for the :ref:`PLAIN <sasl_plain>`
  authentication mechanism defaults to $external.
- wtimeoutMS is once again supported as a URI option.
- When using unacknowledged write concern and connected to MongoDB server
  version 3.6 or greater, the ``bypass_document_validation`` option is now
  supported in the following write helpers:
  :py:meth:`~pymongo.collection.Collection.insert_one`,
  :py:meth:`~pymongo.collection.Collection.replace_one`,
  :py:meth:`~pymongo.collection.Collection.update_one`,
  :py:meth:`~pymongo.collection.Collection.update_many`.

Deprecations:

- Deprecated :py:meth:`pymongo.collection.Collection.count` and
  :py:meth:`pymongo.cursor.Cursor.count`. These two methods use the ``count``
  command and `may or may not be accurate
  <https://mongodb.com/docs/manual/reference/command/count/#behavior>`_,
  depending on the options used and connected MongoDB topology. Use
  :py:meth:`~pymongo.collection.Collection.count_documents` instead.
- Deprecated the snapshot option of :py:meth:`~pymongo.collection.Collection.find`
  and :py:meth:`~pymongo.collection.Collection.find_one`. The option was
  deprecated in MongoDB 3.6 and removed in MongoDB 4.0.
- Deprecated the max_scan option of :py:meth:`~pymongo.collection.Collection.find`
  and :py:meth:`~pymongo.collection.Collection.find_one`. The option was
  deprecated in MongoDB 4.0. Use ``maxTimeMS`` instead.
- Deprecated :py:meth:`~pymongo.mongo_client.MongoClient.close_cursor`. Use
  :py:meth:`~pymongo.cursor.Cursor.close` instead.
- Deprecated :py:meth:`~pymongo.mongo_client.MongoClient.database_names`. Use
  :py:meth:`~pymongo.mongo_client.MongoClient.list_database_names` instead.
- Deprecated :py:meth:`~pymongo.database.Database.collection_names`. Use
  :py:meth:`~pymongo.database.Database.list_collection_names` instead.
- Deprecated :py:meth:`~pymongo.collection.Collection.parallel_scan`. MongoDB 4.2
  will remove the parallelCollectionScan command.

Unavoidable breaking changes:

- Commands that fail with server error codes 10107, 13435, 13436, 11600,
  11602, 189, 91 (NotMaster, NotMasterNoSlaveOk, NotMasterOrSecondary,
  InterruptedAtShutdown, InterruptedDueToReplStateChange,
  PrimarySteppedDown, ShutdownInProgress respectively) now always raise
  :py:class:`~pymongo.errors.NotMasterError` instead of
  :py:class:`~pymongo.errors.OperationFailure`.
- :py:meth:`~pymongo.collection.Collection.parallel_scan` no longer uses an
  implicit session. Explicit sessions are still supported.
- Unacknowledged writes (``w=0``) with an explicit ``session`` parameter now
  raise a client side error. Since PyMongo does not wait for a response for an
  unacknowledged write, two unacknowledged writes run serially by the client
  may be executed simultaneously on the server. However, the server requires a
  single session must not be used simultaneously by more than one operation.
  Therefore explicit sessions cannot support unacknowledged writes.
  Unacknowledged writes without a ``session`` parameter are still supported.


Issues Resolved
...............

See the `PyMongo 3.7 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.7 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=19287

Changes in Version 3.6.1
------------------------

Version 3.6.1 fixes bugs reported since the release of 3.6.0:

- Fix regression in PyMongo 3.5.0 that causes idle sockets to be closed almost
  instantly when ``maxIdleTimeMS`` is set. Idle sockets are now closed after
  ``maxIdleTimeMS`` milliseconds.
- :attr:`pymongo.mongo_client.MongoClient.max_idle_time_ms` now returns
  milliseconds instead of seconds.
- Properly import and use the
  `monotonic <https://pypi.python.org/pypi/monotonic>`_
  library for monotonic time when it is installed.
- :py:meth:`~pymongo.collection.Collection.aggregate` now ignores the
  ``batchSize`` argument when running a pipeline with a ``$out`` stage.
- Always send handshake metadata for new connections.

Issues Resolved
...............

See the `PyMongo 3.6.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.6.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=19438


Changes in Version 3.6.0
------------------------

Version 3.6 adds support for MongoDB 3.6, drops support for CPython 3.3 (PyPy3
is still supported), and drops support for MongoDB versions older than 2.6. If
connecting to a MongoDB 2.4 server or older, PyMongo now throws a
``~pymongo.errors.ConfigurationError``.

Highlights include:

- Support for change streams. See the
  :py:meth:`~pymongo.collection.Collection.watch` method for details.
- Support for array_filters in
  :py:meth:`~pymongo.collection.Collection.update_one`,
  :py:meth:`~pymongo.collection.Collection.update_many`,
  :py:meth:`~pymongo.collection.Collection.find_one_and_update`,
  :py:meth:`~pymongo.operations.UpdateOne`, and
  :py:meth:`~pymongo.operations.UpdateMany`.
- New Session API, see :py:meth:`~pymongo.mongo_client.MongoClient.start_session`.
- New methods :py:meth:`~pymongo.collection.Collection.find_raw_batches` and
  :py:meth:`~pymongo.collection.Collection.aggregate_raw_batches` for use with
  external libraries that can parse raw batches of BSON data.
- New methods :py:meth:`~pymongo.mongo_client.MongoClient.list_databases` and
  :py:meth:`~pymongo.mongo_client.MongoClient.list_database_names`.
- New methods :py:meth:`~pymongo.database.Database.list_collections` and
  :py:meth:`~pymongo.database.Database.list_collection_names`.
- Support for mongodb+srv:// URIs. See
  :py:class:`~pymongo.mongo_client.MongoClient` for details.
- Index management helpers
  (:py:meth:`~pymongo.collection.Collection.create_index`,
  :py:meth:`~pymongo.collection.Collection.create_indexes`,
  :py:meth:`~pymongo.collection.Collection.drop_index`,
  :py:meth:`~pymongo.collection.Collection.drop_indexes`,
  :py:meth:`~pymongo.collection.Collection.reindex`) now support maxTimeMS.
- Support for retryable writes and the ``retryWrites`` URI option.  See
  :py:class:`~pymongo.mongo_client.MongoClient` for details.

Deprecations:

- The ``useCursor`` option for :py:meth:`~pymongo.collection.Collection.aggregate`
  is deprecated. The option was only necessary when upgrading from MongoDB
  2.4 to MongoDB 2.6. MongoDB 2.4 is no longer supported.
- The :py:meth:`~pymongo.database.Database.add_user` and
  :py:meth:`~pymongo.database.Database.remove_user` methods are deprecated. See
  the method docstrings for alternatives.

Unavoidable breaking changes:

- Starting in MongoDB 3.6, the deprecated methods
  :py:meth:`~pymongo.database.Database.authenticate` and
  :py:meth:`~pymongo.database.Database.logout` now invalidate all cursors created
  prior. Instead of using these methods to change credentials, pass credentials
  for one user to the :py:class:`~pymongo.mongo_client.MongoClient` at construction
  time, and either grant access to several databases to one user account, or use
  a distinct client object for each user.
- BSON binary subtype 4 is decoded using RFC-4122 byte order regardless
  of the UUID representation. This is a change in behavior for applications
  that use UUID representation :data:`bson.binary.JAVA_LEGACY` or
  :data:`bson.binary.CSHARP_LEGACY` to decode BSON binary subtype 4. Other
  UUID representations, :data:`bson.binary.PYTHON_LEGACY` (the default) and
  :data:`bson.binary.STANDARD`, and the decoding of BSON binary subtype 3
  are unchanged.


Issues Resolved
...............

See the `PyMongo 3.6 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.6 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=18043

Changes in Version 3.5.1
------------------------

Version 3.5.1 fixes bugs reported since the release of 3.5.0:

- Work around socket.getsockopt issue with NetBSD.
- :py:meth:`pymongo.command_cursor.CommandCursor.close` now closes
  the cursor synchronously instead of deferring to a background
  thread.
- Fix documentation build warnings with Sphinx 1.6.x.

Issues Resolved
...............

See the `PyMongo 3.5.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.5.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=18721

Changes in Version 3.5
----------------------

Version 3.5 implements a number of improvements and bug fixes:

Highlights include:

- Username and password can be passed to
  :py:class:`~pymongo.mongo_client.MongoClient` as keyword arguments. Before, the
  only way to pass them was in the URI.
- Increased the performance of using :py:class:`~bson.raw_bson.RawBSONDocument`.
- Increased the performance of
  :py:meth:`~pymongo.mongo_client.MongoClient.database_names` by using the
  ``nameOnly`` option for listDatabases when available.
- Increased the performance of
  :py:meth:`~pymongo.collection.Collection.bulk_write` by reducing the memory
  overhead of :py:class:`~pymongo.operations.InsertOne`,
  :py:class:`~pymongo.operations.DeleteOne`, and
  :py:class:`~pymongo.operations.DeleteMany`.
- Added the ``collation`` option to :py:class:`~pymongo.operations.DeleteOne`,
  :py:class:`~pymongo.operations.DeleteMany`,
  :py:class:`~pymongo.operations.ReplaceOne`,
  :py:class:`~pymongo.operations.UpdateOne`, and
  :py:class:`~pymongo.operations.UpdateMany`.
- Implemented the `MongoDB Extended JSON
  <https://github.com/mongodb/specifications/blob/master/source/extended-json.rst>`_
  specification.
- :py:class:`~bson.decimal128.Decimal128` now works when cdecimal is installed.
- PyMongo is now tested against a wider array of operating systems and CPU
  architectures (including s390x, ARM64, and POWER8).

Changes and Deprecations:

- :py:meth:`~pymongo.collection.Collection.find` has new options ``return_key``,
  ``show_record_id``, ``snapshot``, ``hint``, ``max_time_ms``, ``max_scan``, ``min``, ``max``,
  and ``comment``. Deprecated the option ``modifiers``.
- Deprecated :py:meth:`~pymongo.collection.Collection.group`. The group command
  was deprecated in MongoDB 3.4 and is expected to be removed in MongoDB 3.6.
  Applications should use :py:meth:`~pymongo.collection.Collection.aggregate`
  with the ``$group`` pipeline stage instead.
- Deprecated :py:meth:`~pymongo.database.Database.authenticate`. Authenticating
  multiple users conflicts with support for logical sessions in MongoDB 3.6.
  To authenticate as multiple users, create multiple instances of
  :py:class:`~pymongo.mongo_client.MongoClient`.
- Deprecated :py:meth:`~pymongo.database.Database.eval`. The eval command
  was deprecated in MongoDB 3.0 and will be removed in a future server version.
- Deprecated :py:class:`~pymongo.database.SystemJS`.
- Deprecated :py:meth:`~pymongo.mongo_client.MongoClient.get_default_database`.
  Applications should use
  :py:meth:`~pymongo.mongo_client.MongoClient.get_database` without the ```name```
  parameter instead.
- Deprecated the MongoClient option ``socketKeepAlive```. It now defaults to true
  and disabling it is not recommended, see `does TCP keepalive time affect
  MongoDB Deployments?
  <https://mongodb.com/docs/manual/faq/diagnostics/#does-tcp-keepalive-time-affect-mongodb-deployments->`_
- Deprecated :py:meth:`~pymongo.collection.Collection.initialize_ordered_bulk_op`,
  :py:meth:`~pymongo.collection.Collection.initialize_unordered_bulk_op`, and
  :py:class:`~pymongo.bulk.BulkOperationBuilder`. Use
  :py:meth:`~pymongo.collection.Collection.bulk_write` instead.
- Deprecated :const:`~bson.json_util.STRICT_JSON_OPTIONS`. Use
  :const:`~bson.json_util.RELAXED_JSON_OPTIONS` or
  :const:`~bson.json_util.CANONICAL_JSON_OPTIONS` instead.
- If a custom :py:class:`~bson.codec_options.CodecOptions` is passed to
  :py:class:`RawBSONDocument`, its ``document_class``` must be
  :py:class:`RawBSONDocument`.
- :py:meth:`~pymongo.collection.Collection.list_indexes` no longer raises
  OperationFailure when the collection (or database) does not exist on
  MongoDB >= 3.0. Instead, it returns an empty
  :py:class:`~pymongo.command_cursor.CommandCursor` to make the behavior
  consistent across all MongoDB versions.
- In Python 3, :py:meth:`~bson.json_util.loads` now automatically decodes JSON
  $binary with a subtype of 0 into :py:class:`bytes` instead of
  :py:class:`~bson.binary.Binary`. See the :doc:`/python3` for more details.
- :py:meth:`~bson.json_util.loads` now raises ``TypeError`` or ``ValueError``
  when parsing JSON type wrappers with values of the wrong type or any
  extra keys.
- :py:meth:`pymongo.cursor.Cursor.close` and
  :py:meth:`pymongo.mongo_client.MongoClient.close`
  now kill cursors synchronously instead of deferring to a background thread.
- :py:meth:`~pymongo.uri_parser.parse_uri` now returns the original value
  of the ``readPreference`` MongoDB URI option instead of the validated read
  preference mode.

Issues Resolved
...............

See the `PyMongo 3.5 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.5 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=17590

Changes in Version 3.4
----------------------

Version 3.4 implements the new server features introduced in MongoDB 3.4
and a whole lot more:

Highlights include:

- Complete support for MongoDB 3.4:

  - Unicode aware string comparison using :doc:`examples/collations`.
  - Support for the new :py:class:`~bson.decimal128.Decimal128` BSON type.
  - A new maxStalenessSeconds read preference option.
  - A username is no longer required for the MONGODB-X509 authentication
    mechanism when connected to MongoDB >= 3.4.
  - :py:meth:`~pymongo.collection.Collection.parallel_scan` supports maxTimeMS.
  - :attr:`~pymongo.write_concern.WriteConcern` is automatically
    applied by all helpers for commands that write to the database when
    connected to MongoDB 3.4+. This change affects the following helpers:

    - :py:meth:`~pymongo.mongo_client.MongoClient.drop_database`
    - :py:meth:`~pymongo.database.Database.create_collection`
    - :py:meth:`~pymongo.database.Database.drop_collection`
    - :py:meth:`~pymongo.collection.Collection.aggregate` (when using $out)
    - :py:meth:`~pymongo.collection.Collection.create_indexes`
    - :py:meth:`~pymongo.collection.Collection.create_index`
    - :py:meth:`~pymongo.collection.Collection.drop_indexes`
    - :py:meth:`~pymongo.collection.Collection.drop_indexes`
    - :py:meth:`~pymongo.collection.Collection.drop_index`
    - :py:meth:`~pymongo.collection.Collection.map_reduce` (when output is not
      "inline")
    - :py:meth:`~pymongo.collection.Collection.reindex`
    - :py:meth:`~pymongo.collection.Collection.rename`

- Improved support for logging server discovery and monitoring events. See
  ``~pymongo.monitoring`` for examples.
- Support for matching iPAddress subjectAltName values for TLS certificate
  verification.
- TLS compression is now explicitly disabled when possible.
- The Server Name Indication (SNI) TLS extension is used when possible.
- Finer control over JSON encoding/decoding with
  :py:class:`~bson.json_util.JSONOptions`.
- Allow :py:class:`~bson.code.Code` objects to have a scope of ``None``,
  signifying no scope. Also allow encoding Code objects with an empty scope
  (i.e. ``{}``).

.. warning:: Starting in PyMongo 3.4, :attr:`bson.code.Code.scope` may return
  ``None``, as the default scope is ``None`` instead of ``{}``.

.. note:: PyMongo 3.4+ attempts to create sockets non-inheritable when possible
  (i.e. it sets the close-on-exec flag on socket file descriptors). Support
  is limited to a subset of POSIX operating systems (not including Windows) and
  the flag usually cannot be set in a single atomic operation. CPython 3.4+
  implements `PEP 446`_, creating all file descriptors non-inheritable by
  default. Users that require this behavior are encouraged to upgrade to
  CPython 3.4+.

Since 3.4rc0, the max staleness option has been renamed from ``maxStalenessMS``
to ``maxStalenessSeconds``, its smallest value has changed from twice
``heartbeatFrequencyMS`` to 90 seconds, and its default value has changed from
``None`` or 0 to -1.

.. _PEP 446: https://www.python.org/dev/peps/pep-0446/

Issues Resolved
...............

See the `PyMongo 3.4 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.4 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=16594

Changes in Version 3.3.1
------------------------

Version 3.3.1 fixes a memory leak when decoding elements inside of a
:py:class:`~bson.raw_bson.RawBSONDocument`.

Issues Resolved
...............

See the `PyMongo 3.3.1 release notes in Jira`_ for the list of resolved issues
in this release.

.. _PyMongo 3.3.1 release notes in Jira: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=17636

Changes in Version 3.3
----------------------

Version 3.3 adds the following major new features:

- C extensions support on big endian systems.
- Kerberos authentication support on Windows using `WinKerberos
  <https://pypi.python.org/pypi/winkerberos>`_.
- A new ``ssl_clrfile`` option to support certificate revocation lists.
- A new ``ssl_pem_passphrase`` option to support encrypted key files.
- Support for publishing server discovery and monitoring events. See
  ``~pymongo.monitoring`` for details.
- New connection pool options ``minPoolSize`` and ``maxIdleTimeMS``.
- New ``heartbeatFrequencyMS`` option controls the rate at which background
  monitoring threads re-check servers. Default is once every 10 seconds.

.. warning:: PyMongo 3.3 drops support for MongoDB versions older than 2.4.
  It also drops support for python 3.2 (pypy3 continues to be supported).

Issues Resolved
...............

See the `PyMongo 3.3 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.3 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=16005

Changes in Version 3.2.2
------------------------

Version 3.2.2 fixes a few issues reported since the release of 3.2.1, including
a fix for using the ``connect`` option in the MongoDB URI and support for setting
the batch size for a query to 1 when using MongoDB 3.2+.

Issues Resolved
...............

See the `PyMongo 3.2.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.2.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=16538


Changes in Version 3.2.1
------------------------

Version 3.2.1 fixes a few issues reported since the release of 3.2, including
running the mapreduce command twice when calling the
:py:meth:`~pymongo.collection.Collection.inline_map_reduce` method and a
``TypeError`` being raised when calling
:py:meth:`~gridfs.GridFSBucket.download_to_stream`. This release also
improves error messaging around BSON decoding.

Issues Resolved
...............

See the `PyMongo 3.2.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.2.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=16312

Changes in Version 3.2
----------------------

Version 3.2 implements the new server features introduced in MongoDB 3.2.

Highlights include:

- Full support for MongoDB 3.2 including:

  - Support for :py:class:`~pymongo.read_concern.ReadConcern`
  - :py:class:`~pymongo.write_concern.WriteConcern` is now applied to
    :py:meth:`~pymongo.collection.Collection.find_one_and_replace`,
    :py:meth:`~pymongo.collection.Collection.find_one_and_update`, and
    :py:meth:`~pymongo.collection.Collection.find_one_and_delete`.
  - Support for the new ``bypassDocumentValidation`` option in write
    helpers.

- Support for reading and writing raw BSON with
  :py:class:`~bson.raw_bson.RawBSONDocument`

.. note:: Certain :py:class:`~pymongo.mongo_client.MongoClient` properties now
  block until a connection is established or raise
  ``~pymongo.errors.ServerSelectionTimeoutError`` if no server is available.
  See :py:class:`~pymongo.mongo_client.MongoClient` for details.

Issues Resolved
...............

See the `PyMongo 3.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=15612

Changes in Version 3.1.1
------------------------

Version 3.1.1 fixes a few issues reported since the release of 3.1, including a
regression in error handling for oversize command documents and interrupt
handling issues in the C extensions.

Issues Resolved
...............

See the `PyMongo 3.1.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.1.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=16211

Changes in Version 3.1
----------------------

Version 3.1 implements a few new features and fixes bugs reported since the release
of 3.0.3.

Highlights include:

- Command monitoring support. See ``~pymongo.monitoring`` for details.
- Configurable error handling for ``UnicodeDecodeError``. See the
  ``unicode_decode_error_handler`` option of
  :py:class:`~bson.codec_options.CodecOptions`.
- Optional automatic timezone conversion when decoding BSON datetime. See the
  ``tzinfo`` option of :py:class:`~bson.codec_options.CodecOptions`.
- An implementation of :py:class:`~gridfs.GridFSBucket` from the new GridFS spec.
- Compliance with the new Connection String spec.
- Reduced idle CPU usage in Python 2.

Changes in internal classes
...........................

The private ``PeriodicExecutor`` class no longer takes a ``condition_class``
option, and the private ``thread_util.Event`` class is removed.

Issues Resolved
...............

See the `PyMongo 3.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=14796

Changes in Version 3.0.3
------------------------

Version 3.0.3 fixes issues reported since the release of 3.0.2, including a
feature breaking bug in the GSSAPI implementation.

Issues Resolved
...............

See the `PyMongo 3.0.3 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.0.3 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=15528

Changes in Version 3.0.2
------------------------

Version 3.0.2 fixes issues reported since the release of 3.0.1, most
importantly a bug that could route operations to replica set members
that are not in primary or secondary state when using
:py:class:`~pymongo.read_preferences.PrimaryPreferred` or
:py:class:`~pymongo.read_preferences.Nearest`. It is a recommended upgrade for
all users of PyMongo 3.0.x.

Issues Resolved
...............

See the `PyMongo 3.0.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.0.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=15430

Changes in Version 3.0.1
------------------------

Version 3.0.1 fixes issues reported since the release of 3.0, most
importantly a bug in GridFS.delete that could prevent file chunks from
actually being deleted.

Issues Resolved
...............

See the `PyMongo 3.0.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.0.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=15322

Changes in Version 3.0
----------------------

PyMongo 3.0 is a partial rewrite of PyMongo bringing a large number of
improvements:

- A unified client class. MongoClient is the one and only client class for
  connecting to a standalone mongod, replica set, or sharded cluster. Migrating
  from a standalone, to a replica set, to a sharded cluster can be accomplished
  with only a simple URI change.
- MongoClient is much more responsive to configuration changes in your MongoDB
  deployment. All connected servers are monitored in a non-blocking manner.
  Slow to respond or down servers no longer block server discovery, reducing
  application startup time and time to respond to new or reconfigured
  servers and replica set failovers.
- A unified CRUD API. All official MongoDB drivers now implement a standard
  CRUD API allowing polyglot developers to move from language to language
  with ease.
- Single source support for Python 2.x and 3.x. PyMongo no longer relies on
  2to3 to support Python 3.
- A rewritten pure Python BSON implementation, improving performance
  with pypy and cpython deployments without support for C extensions.
- Better support for greenlet based async frameworks including eventlet.
- Immutable client, database, and collection classes, avoiding a host of thread
  safety issues in client applications.

PyMongo 3.0 brings a large number of API changes. Be sure to read the changes
listed below before upgrading from PyMongo 2.x.

.. warning:: PyMongo no longer supports Python 2.4, 2.5, or 3.1. If you
  must use PyMongo with these versions of Python the 2.x branch of PyMongo
  will be minimally supported for some time.

SONManipulator changes
......................

The :py:class:`~pymongo.son_manipulator.SONManipulator` API has limitations as a
technique for transforming your data. Instead, it is more flexible and
straightforward to transform outgoing documents in your own code before passing
them to PyMongo, and transform incoming documents after receiving them from
PyMongo.

Thus the :py:meth:`~pymongo.database.Database.add_son_manipulator` method is
deprecated. PyMongo 3's new CRUD API does **not** apply SON manipulators to
documents passed to :py:meth:`~pymongo.collection.Collection.bulk_write`,
:py:meth:`~pymongo.collection.Collection.insert_one`,
:py:meth:`~pymongo.collection.Collection.insert_many`,
:py:meth:`~pymongo.collection.Collection.update_one`, or
:py:meth:`~pymongo.collection.Collection.update_many`. SON manipulators are **not**
applied to documents returned by the new methods
:py:meth:`~pymongo.collection.Collection.find_one_and_delete`,
:py:meth:`~pymongo.collection.Collection.find_one_and_replace`, and
:py:meth:`~pymongo.collection.Collection.find_one_and_update`.

SSL/TLS changes
...............

When ``ssl`` is ``True`` the ``ssl_cert_reqs`` option now defaults to
:attr:`ssl.CERT_REQUIRED` if not provided. PyMongo will attempt to load OS
provided CA certificates to verify the server, raising
``~pymongo.errors.ConfigurationError`` if it cannot.

Gevent Support
..............

In previous versions, PyMongo supported Gevent in two modes: you could call
``gevent.monkey.patch_socket()`` and pass ``use_greenlets=True`` to
:py:class:`~pymongo.mongo_client.MongoClient`, or you could simply call
``gevent.monkey.patch_all()`` and omit the ``use_greenlets`` argument.

In PyMongo 3.0, the ``use_greenlets`` option is gone. To use PyMongo with
Gevent simply call ``gevent.monkey.patch_all()``.

For more information,
see :doc:`PyMongo's Gevent documentation <examples/gevent>`.

:py:class:`~pymongo.mongo_client.MongoClient` changes
..................................................

:py:class:`~pymongo.mongo_client.MongoClient` is now the one and only
client class for a standalone server, mongos, or replica set.
It includes the functionality that had been split into
``MongoReplicaSetClient``: it can connect to a replica set, discover all its
members, and monitor the set for stepdowns, elections, and reconfigs.
:py:class:`~pymongo.mongo_client.MongoClient` now also supports the full
:py:class:`~pymongo.read_preferences.ReadPreference` API.

The obsolete classes ``MasterSlaveConnection``, ``Connection``, and
``ReplicaSetConnection`` are removed.

The :py:class:`~pymongo.mongo_client.MongoClient` constructor no
longer blocks while connecting to the server or servers, and it no
longer raises :py:class:`~pymongo.errors.ConnectionFailure` if they
are unavailable, nor :py:class:`~pymongo.errors.ConfigurationError`
if the user's credentials are wrong. Instead, the constructor
returns immediately and launches the connection process on
background threads. The ``connect`` option is added to control whether
these threads are started immediately, or when the client is first used.

Therefore the ``alive`` method is removed since it no longer provides meaningful
information; even if the client is disconnected, it may discover a server in
time to fulfill the next operation.

In PyMongo 2.x, :py:class:`~pymongo.mongo_client.MongoClient` accepted a list of
standalone MongoDB servers and used the first it could connect to:

.. code-block:: python

    MongoClient(['host1.com:27017', 'host2.com:27017'])

A list of multiple standalones is no longer supported; if multiple servers
are listed they must be members of the same replica set, or mongoses in the
same sharded cluster.

The behavior for a list of mongoses is changed from "high availability" to
"load balancing". Before, the client connected to the lowest-latency mongos in
the list, and used it until a network error prompted it to re-evaluate all
mongoses' latencies and reconnect to one of them. In PyMongo 3, the client
monitors its network latency to all the mongoses continuously, and distributes
operations evenly among those with the lowest latency.
See :ref:`mongos-load-balancing` for more information.

The client methods ``start_request``, ``in_request``, and ``end_request``
are removed, and so is the ``auto_start_request`` option. Requests were
designed to make read-your-writes consistency more likely with the ``w=0``
write concern. Additionally, a thread in a request used the same member for
all secondary reads in a replica set. To ensure read-your-writes consistency
in PyMongo 3.0, do not override the default write concern with ``w=0``, and
do not override the default :ref:`read preference <secondary-reads>` of
PRIMARY.

Support for the ``slaveOk`` (or ``slave_okay``), ``safe``, and
``network_timeout`` options has been removed. Use
:attr:`~pymongo.read_preferences.ReadPreference.SECONDARY_PREFERRED` instead of
slave_okay. Accept the default write concern, acknowledged writes, instead of
setting safe=True. Use socketTimeoutMS in place of network_timeout (note that
network_timeout was in seconds, where as socketTimeoutMS is milliseconds).

The ``max_pool_size`` option has been removed. It is replaced by the
``maxPoolSize`` MongoDB URI option. ``maxPoolSize`` is now a supported URI
option in PyMongo and can be passed as a keyword argument.

The ``copy_database`` method is removed, see the
:doc:`copy_database examples </examples/copydb>` for alternatives.

The ``disconnect`` method is removed. Use
:py:meth:`~pymongo.mongo_client.MongoClient.close` instead.

The ``get_document_class`` method is removed. Use
:attr:`~pymongo.mongo_client.MongoClient.codec_options` instead.

The ``get_lasterror_options``, ``set_lasterror_options``, and
``unset_lasterror_options`` methods are removed. Write concern options
can be passed to :py:class:`~pymongo.mongo_client.MongoClient` as keyword
arguments or MongoDB URI options.

The :py:meth:`~pymongo.mongo_client.MongoClient.get_database` method is added for
getting a Database instance with its options configured differently than the
MongoClient's.

The following read-only attributes have been added:

- :attr:`~pymongo.mongo_client.MongoClient.codec_options`

The following attributes are now read-only:

- :attr:`~pymongo.mongo_client.MongoClient.read_preference`
- :attr:`~pymongo.mongo_client.MongoClient.write_concern`

The following attributes have been removed:

- :attr:`~pymongo.mongo_client.MongoClient.document_class`
  (use :attr:`~pymongo.mongo_client.MongoClient.codec_options` instead)
- :attr:`~pymongo.mongo_client.MongoClient.host`
  (use :attr:`~pymongo.mongo_client.MongoClient.address` instead)
- :attr:`~pymongo.mongo_client.MongoClient.min_wire_version`
- :attr:`~pymongo.mongo_client.MongoClient.max_wire_version`
- :attr:`~pymongo.mongo_client.MongoClient.port`
  (use :attr:`~pymongo.mongo_client.MongoClient.address` instead)
- :attr:`~pymongo.mongo_client.MongoClient.safe`
  (use :attr:`~pymongo.mongo_client.MongoClient.write_concern` instead)
- :attr:`~pymongo.mongo_client.MongoClient.slave_okay`
  (use :attr:`~pymongo.mongo_client.MongoClient.read_preference` instead)
- :attr:`~pymongo.mongo_client.MongoClient.tag_sets`
  (use :attr:`~pymongo.mongo_client.MongoClient.read_preference` instead)
- :attr:`~pymongo.mongo_client.MongoClient.tz_aware`
  (use :attr:`~pymongo.mongo_client.MongoClient.codec_options` instead)

The following attributes have been renamed:

- :attr:`~pymongo.mongo_client.MongoClient.secondary_acceptable_latency_ms` is
  now :attr:`~pymongo.mongo_client.MongoClient.local_threshold_ms` and is now
  read-only.

:py:class:`~pymongo.cursor.Cursor` changes
.......................................

The ``conn_id`` property is renamed to :attr:`~pymongo.cursor.Cursor.address`.

Cursor management changes
.........................

:py:class:`~pymongo.cursor_manager.CursorManager` and
:py:meth:`~pymongo.mongo_client.MongoClient.set_cursor_manager` are no longer
deprecated. If you subclass :py:class:`~pymongo.cursor_manager.CursorManager`
your implementation of :py:meth:`~pymongo.cursor_manager.CursorManager.close`
must now take a second parameter, ``address``. The ``BatchCursorManager`` class
is removed.

The second parameter to :py:meth:`~pymongo.mongo_client.MongoClient.close_cursor`
is renamed from ``_conn_id`` to ``address``.
:py:meth:`~pymongo.mongo_client.MongoClient.kill_cursors` now accepts an ``address``
parameter.

:py:class:`~pymongo.database.Database` changes
...........................................

The ``connection`` property is renamed to
:attr:`~pymongo.database.Database.client`.

The following read-only attributes have been added:

- :attr:`~pymongo.database.Database.codec_options`

The following attributes are now read-only:

- :attr:`~pymongo.database.Database.read_preference`
- :attr:`~pymongo.database.Database.write_concern`

Use :py:meth:`~pymongo.mongo_client.MongoClient.get_database` for getting a
Database instance with its options configured differently than the
MongoClient's.

The following attributes have been removed:

- :attr:`~pymongo.database.Database.safe`
- :attr:`~pymongo.database.Database.secondary_acceptable_latency_ms`
- :attr:`~pymongo.database.Database.slave_okay`
- :attr:`~pymongo.database.Database.tag_sets`

The following methods have been added:

- :py:meth:`~pymongo.database.Database.get_collection`

The following methods have been changed:

- :py:meth:`~pymongo.database.Database.command`. Support for ``as_class``,
  ``uuid_subtype``, ``tag_sets``, and ``secondary_acceptable_latency_ms`` have been
  removed. You can instead pass an instance of
  :py:class:`~bson.codec_options.CodecOptions` as ``codec_options`` and an instance
  of a read preference class from ``~pymongo.read_preferences`` as
  ``read_preference``. The ``fields`` and ``compile_re`` options are also removed.
  The ``fields`` options was undocumented and never really worked. Regular
  expressions are always decoded to :py:class:`~bson.regex.Regex`.

The following methods have been deprecated:

- :py:meth:`~pymongo.database.Database.add_son_manipulator`

The following methods have been removed:

The ``get_lasterror_options``, ``set_lasterror_options``, and
``unset_lasterror_options`` methods have been removed. Use
:py:class:`~pymongo.write_concern.WriteConcern` with
:py:meth:`~pymongo.mongo_client.MongoClient.get_database` instead.

:py:class:`~pymongo.collection.Collection` changes
...............................................

The following read-only attributes have been added:

- :attr:`~pymongo.collection.Collection.codec_options`

The following attributes are now read-only:

- :attr:`~pymongo.collection.Collection.read_preference`
- :attr:`~pymongo.collection.Collection.write_concern`

Use :py:meth:`~pymongo.database.Database.get_collection` or
:py:meth:`~pymongo.collection.Collection.with_options` for getting a Collection
instance with its options configured differently than the Database's.

The following attributes have been removed:

- :attr:`~pymongo.collection.Collection.safe`
- :attr:`~pymongo.collection.Collection.secondary_acceptable_latency_ms`
- :attr:`~pymongo.collection.Collection.slave_okay`
- :attr:`~pymongo.collection.Collection.tag_sets`

The following methods have been added:

- :py:meth:`~pymongo.collection.Collection.bulk_write`
- :py:meth:`~pymongo.collection.Collection.insert_one`
- :py:meth:`~pymongo.collection.Collection.insert_many`
- :py:meth:`~pymongo.collection.Collection.update_one`
- :py:meth:`~pymongo.collection.Collection.update_many`
- :py:meth:`~pymongo.collection.Collection.replace_one`
- :py:meth:`~pymongo.collection.Collection.delete_one`
- :py:meth:`~pymongo.collection.Collection.delete_many`
- :py:meth:`~pymongo.collection.Collection.find_one_and_delete`
- :py:meth:`~pymongo.collection.Collection.find_one_and_replace`
- :py:meth:`~pymongo.collection.Collection.find_one_and_update`
- :py:meth:`~pymongo.collection.Collection.with_options`
- :py:meth:`~pymongo.collection.Collection.create_indexes`
- :py:meth:`~pymongo.collection.Collection.list_indexes`

The following methods have changed:

- :py:meth:`~pymongo.collection.Collection.aggregate` now **always** returns an
  instance of :py:class:`~pymongo.command_cursor.CommandCursor`. See the
  documentation for all options.
- :py:meth:`~pymongo.collection.Collection.count` now optionally takes a filter
  argument, as well as other options supported by the count command.
- :py:meth:`~pymongo.collection.Collection.distinct` now optionally takes a filter
  argument.
- :py:meth:`~pymongo.collection.Collection.create_index` no longer caches
  indexes, therefore the ``cache_for`` parameter has been removed. It also
  no longer supports the ``bucket_size`` and ``drop_dups`` aliases for ``bucketSize``
  and ``dropDups``.

The following methods are deprecated:

- :py:meth:`~pymongo.collection.Collection.save`
- :py:meth:`~pymongo.collection.Collection.insert`
- :py:meth:`~pymongo.collection.Collection.update`
- :py:meth:`~pymongo.collection.Collection.remove`
- :py:meth:`~pymongo.collection.Collection.find_and_modify`
- :py:meth:`~pymongo.collection.Collection.ensure_index`

The following methods have been removed:

The ``get_lasterror_options``, ``set_lasterror_options``, and
``unset_lasterror_options`` methods have been removed. Use
:py:class:`~pymongo.write_concern.WriteConcern` with
:py:meth:`~pymongo.collection.Collection.with_options` instead.

Changes to :py:meth:`~pymongo.collection.Collection.find` and :py:meth:`~pymongo.collection.Collection.find_one`
``````````````````````````````````````````````````````````````````````````````````````````````````````````

The following find/find_one options have been renamed:

These renames only affect your code if you passed these as keyword arguments,
like find(fields=['fieldname']). If you passed only positional parameters these
changes are not significant for your application.

- spec -> filter
- fields -> projection
- partial -> allow_partial_results

The following find/find_one options have been added:

- cursor_type (see :py:class:`~pymongo.cursor.CursorType` for values)
- oplog_replay
- modifiers

The following find/find_one options have been removed:

- network_timeout (use :py:meth:`~pymongo.cursor.Cursor.max_time_ms` instead)
- slave_okay (use one of the read preference classes from
  ``~pymongo.read_preferences`` and
  :py:meth:`~pymongo.collection.Collection.with_options` instead)
- read_preference (use :py:meth:`~pymongo.collection.Collection.with_options`
  instead)
- tag_sets (use one of the read preference classes from
  ``~pymongo.read_preferences`` and
  :py:meth:`~pymongo.collection.Collection.with_options` instead)
- secondary_acceptable_latency_ms (use the ``localThresholdMS`` URI option
  instead)
- max_scan (use the new ``modifiers`` option instead)
- snapshot (use the new ``modifiers`` option instead)
- tailable (use the new ``cursor_type`` option instead)
- await_data (use the new ``cursor_type`` option instead)
- exhaust (use the new ``cursor_type`` option instead)
- as_class (use :py:meth:`~pymongo.collection.Collection.with_options` with
  :py:class:`~bson.codec_options.CodecOptions` instead)
- compile_re (BSON regular expressions are always decoded to
  :py:class:`~bson.regex.Regex`)

The following find/find_one options are deprecated:

- manipulate

The following renames need special handling.

- timeout -> no_cursor_timeout -
  The default for ``timeout`` was True. The default for ``no_cursor_timeout`` is
  False. If you were previously passing False for ``t`imeout`` you must pass
  **True** for ``no_cursor_timeout`` to keep the previous behavior.

``~pymongo.errors`` changes
..............................

The exception classes ``UnsupportedOption`` and ``TimeoutError`` are deleted.

``~gridfs`` changes
......................

Since PyMongo 1.6, methods ``open`` and ``close`` of :py:class:`~gridfs.GridFS`
raised an ``UnsupportedAPI`` exception, as did the entire ``GridFile`` class.
The unsupported methods, the class, and the exception are all deleted.

``~bson`` changes
....................

The ``compile_re`` option is removed from all methods
that accepted it in ``~bson`` and ``~bson.json_util``. Additionally, it
is removed from :py:meth:`~pymongo.collection.Collection.find`,
:py:meth:`~pymongo.collection.Collection.find_one`,
:py:meth:`~pymongo.collection.Collection.aggregate`,
:py:meth:`~pymongo.database.Database.command`, and so on.
PyMongo now always represents BSON regular expressions as
:py:class:`~bson.regex.Regex` objects. This prevents errors for incompatible
patterns, see `PYTHON-500`_. Use :py:meth:`~bson.regex.Regex.try_compile` to
attempt to convert from a BSON regular expression to a Python regular
expression object.

PyMongo now decodes the int64 BSON type to :py:class:`~bson.int64.Int64`, a
trivial wrapper around long (in python 2.x) or int (in python 3.x). This
allows BSON int64 to be round tripped without losing type information in
python 3. Note that if you store a python long (or a python int larger than
4 bytes) it will be returned from PyMongo as :py:class:`~bson.int64.Int64`.

The ``as_class``, ``tz_aware``, and ``uuid_subtype`` options are removed from all
BSON encoding and decoding methods. Use
:py:class:`~bson.codec_options.CodecOptions` to configure these options. The
APIs affected are:

- :py:func:`~bson.decode_all`
- :py:func:`~bson.decode_iter`
- :py:func:`~bson.decode_file_iter`
- :py:meth:`~bson.BSON.encode`
- :py:meth:`~bson.BSON.decode`

This is a breaking change for any application that uses the BSON API directly
and changes any of the named parameter defaults. No changes are required for
applications that use the default values for these options. The behavior
remains the same.

.. _PYTHON-500: https://jira.mongodb.org/browse/PYTHON-500

Issues Resolved
...............

See the `PyMongo 3.0 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 3.0 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=12501

Changes in Version 2.9.5
------------------------

Version 2.9.5 works around ssl module deprecations in Python 3.6, and expected
future ssl module deprecations. It also fixes bugs found since the release of
2.9.4.

- Use ssl.SSLContext and ssl.PROTOCOL_TLS_CLIENT when available.
- Fixed a C extensions build issue when the interpreter was built with -std=c99
- Fixed various build issues with MinGW32.
- Fixed a write concern bug in :py:meth:`~pymongo.database.Database.add_user` and
  :py:meth:`~pymongo.database.Database.remove_user` when connected to MongoDB 3.2+
- Fixed various test failures related to changes in gevent, MongoDB, and our CI
  test environment.

Issues Resolved
...............

See the `PyMongo 2.9.5 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.9.5 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=17605

Changes in Version 2.9.4
------------------------

Version 2.9.4 fixes issues reported since the release of 2.9.3.

- Fixed __repr__ for closed instances of :py:class:`~pymongo.mongo_client.MongoClient`.
- Fixed :py:class:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient` handling of
  uuidRepresentation.
- Fixed building and testing the documentation with python 3.x.
- New documentation for :doc:`examples/tls` and :doc:`atlas`.

Issues Resolved
...............

See the `PyMongo 2.9.4 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.9.4 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=16885

Changes in Version 2.9.3
------------------------

Version 2.9.3 fixes a few issues reported since the release of 2.9.2 including
thread safety issues in :py:meth:`~pymongo.collection.Collection.ensure_index`,
:py:meth:`~pymongo.collection.Collection.drop_index`, and
:py:meth:`~pymongo.collection.Collection.drop_indexes`.

Issues Resolved
...............

See the `PyMongo 2.9.3 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.9.3 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=16539

Changes in Version 2.9.2
------------------------

Version 2.9.2 restores Python 3.1 support, which was broken in PyMongo 2.8. It
improves an error message when decoding BSON as well as fixes a couple other
issues including :py:meth:`~pymongo.collection.Collection.aggregate` ignoring
:attr:`~pymongo.collection.Collection.codec_options` and
:py:meth:`~pymongo.database.Database.command` raising a superfluous
``DeprecationWarning``.

Issues Resolved
...............

See the `PyMongo 2.9.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.9.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=16303

Changes in Version 2.9.1
------------------------

Version 2.9.1 fixes two interrupt handling issues in the C extensions and
adapts a test case for a behavior change in MongoDB 3.2.

Issues Resolved
...............

See the `PyMongo 2.9.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.9.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=16208

Changes in Version 2.9
----------------------

Version 2.9 provides an upgrade path to PyMongo 3.x. Most of the API changes
from PyMongo 3.0 have been backported in a backward compatible way, allowing
applications to be written against PyMongo >= 2.9, rather then PyMongo 2.x or
PyMongo 3.x. See the `PyMongo 3 Migration Guide
<https://pymongo.readthedocs.io/en/3.12.1/migrate-to-pymongo3.html>`_ for
detailed examples.

.. note:: There are a number of new deprecations in this release for features
  that were removed in PyMongo 3.0.

  :py:class:`~pymongo.mongo_client.MongoClient`:
    - :attr:`~pymongo.mongo_client.MongoClient.host`
    - :attr:`~pymongo.mongo_client.MongoClient.port`
    - :attr:`~pymongo.mongo_client.MongoClient.use_greenlets`
    - :attr:`~pymongo.mongo_client.MongoClient.document_class`
    - :attr:`~pymongo.mongo_client.MongoClient.tz_aware`
    - :attr:`~pymongo.mongo_client.MongoClient.secondary_acceptable_latency_ms`
    - :attr:`~pymongo.mongo_client.MongoClient.tag_sets`
    - :attr:`~pymongo.mongo_client.MongoClient.uuid_subtype`
    - :py:meth:`~pymongo.mongo_client.MongoClient.disconnect`
    - :py:meth:`~pymongo.mongo_client.MongoClient.alive`

  :py:class:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient`:
    - :attr:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient.use_greenlets`
    - :attr:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient.document_class`
    - :attr:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient.tz_aware`
    - :attr:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient.secondary_acceptable_latency_ms`
    - :attr:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient.tag_sets`
    - :attr:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient.uuid_subtype`
    - :py:meth:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient.alive`

  :py:class:`~pymongo.database.Database`:
    - :attr:`~pymongo.database.Database.secondary_acceptable_latency_ms`
    - :attr:`~pymongo.database.Database.tag_sets`
    - :attr:`~pymongo.database.Database.uuid_subtype`

  :py:class:`~pymongo.collection.Collection`:
    - :attr:`~pymongo.collection.Collection.secondary_acceptable_latency_ms`
    - :attr:`~pymongo.collection.Collection.tag_sets`
    - :attr:`~pymongo.collection.Collection.uuid_subtype`

.. warning::
  In previous versions of PyMongo, changing the value of
  :attr:`~pymongo.mongo_client.MongoClient.document_class` changed
  the behavior of all existing instances of
  :py:class:`~pymongo.collection.Collection`:

.. code-block:: python

    >>> coll = client.test.test
    >>> coll.find_one()
    {u'_id': ObjectId('5579dc7cfba5220cc14d9a18')}
    >>> from bson.son import SON
    >>> client.document_class = SON
    >>> coll.find_one()
    SON([(u'_id', ObjectId('5579dc7cfba5220cc14d9a18'))])

  The document_class setting is now configurable at the client,
  database, collection, and per-operation level. This required breaking
  the existing behavior. To change the document class per operation in a
  forward compatible way use
  :py:meth:`~pymongo.collection.Collection.with_options`:

.. code-block:: python

    >>> coll.find_one()
    {u'_id': ObjectId('5579dc7cfba5220cc14d9a18')}
    >>> from bson.codec_options import CodecOptions
    >>> coll.with_options(CodecOptions(SON)).find_one()
    SON([(u'_id', ObjectId('5579dc7cfba5220cc14d9a18'))])

Issues Resolved
...............

See the `PyMongo 2.9 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.9 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=14795

Changes in Version 2.8.1
------------------------

Version 2.8.1 fixes a number of issues reported since the release of PyMongo
2.8. It is a recommended upgrade for all users of PyMongo 2.x.

Issues Resolved
...............

See the `PyMongo 2.8.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.8.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=15324

Changes in Version 2.8
----------------------

Version 2.8 is a major release that provides full support for MongoDB 3.0 and
fixes a number of bugs.

Special thanks to Don Mitchell, Ximing, Can Zhang, Sergey Azovskov, and Heewa
Barfchin for their contributions to this release.

Highlights include:

- Support for the SCRAM-SHA-1 authentication mechanism (new in MongoDB 3.0).
- JSON decoder support for the new $numberLong and $undefined types.
- JSON decoder support for the $date type as an ISO-8601 string.
- Support passing an index name to :py:meth:`~pymongo.cursor.Cursor.hint`.
- The :py:meth:`~pymongo.cursor.Cursor.count` method will use a hint if one
  has been provided through :py:meth:`~pymongo.cursor.Cursor.hint`.
- A new socketKeepAlive option for the connection pool.
- New generator based BSON decode functions, :py:func:`~bson.decode_iter`
  and :py:func:`~bson.decode_file_iter`.
- Internal changes to support alternative storage engines like wiredtiger.

.. note:: There are a number of deprecations in this release for features that
  will be removed in PyMongo 3.0. These include:

  - :py:meth:`~pymongo.mongo_client.MongoClient.start_request`
  - :py:meth:`~pymongo.mongo_client.MongoClient.in_request`
  - :py:meth:`~pymongo.mongo_client.MongoClient.end_request`
  - :py:meth:`~pymongo.mongo_client.MongoClient.copy_database`
  - :py:meth:`~pymongo.database.Database.error`
  - :py:meth:`~pymongo.database.Database.last_status`
  - :py:meth:`~pymongo.database.Database.previous_error`
  - :py:meth:`~pymongo.database.Database.reset_error_history`
  - :py:class:`~pymongo.master_slave_connection.MasterSlaveConnection`

  The JSON format for :py:class:`~bson.timestamp.Timestamp` has changed from
  '{"t": <int>, "i": <int>}' to '{"$timestamp": {"t": <int>, "i": <int>}}'.
  This new format will be decoded to an instance of
  :py:class:`~bson.timestamp.Timestamp`. The old format will continue to be
  decoded to a python dict as before. Encoding to the old format is no
  longer supported as it was never correct and loses type information.

Issues Resolved
...............

See the `PyMongo 2.8 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.8 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=14223

Changes in Version 2.7.2
------------------------

Version 2.7.2 includes fixes for upsert reporting in the bulk API for MongoDB
versions previous to 2.6, a regression in how son manipulators are applied in
:py:meth:`~pymongo.collection.Collection.insert`, a few obscure connection pool
semaphore leaks, and a few other minor issues. See the list of issues resolved
for full details.

Issues Resolved
...............

See the `PyMongo 2.7.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.7.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=14005

Changes in Version 2.7.1
------------------------

Version 2.7.1 fixes a number of issues reported since the release of 2.7,
most importantly a fix for creating indexes and manipulating users through
mongos versions older than 2.4.0.

Issues Resolved
...............

See the `PyMongo 2.7.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.7.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=13823

Changes in Version 2.7
----------------------

PyMongo 2.7 is a major release with a large number of new features and bug
fixes. Highlights include:

- Full support for MongoDB 2.6.
- A new :doc:`bulk write operations API </examples/bulk>`.
- Support for server side query timeouts using
  :py:meth:`~pymongo.cursor.Cursor.max_time_ms`.
- Support for writing :py:meth:`~pymongo.collection.Collection.aggregate`
  output to a collection.
- A new :py:meth:`~pymongo.collection.Collection.parallel_scan` helper.
- :py:class:`~pymongo.errors.OperationFailure` and its subclasses now include
  a :attr:`~pymongo.errors.OperationFailure.details` attribute with complete
  error details from the server.
- A new GridFS :py:meth:`~gridfs.GridFS.find` method that returns a
  :py:class:`~gridfs.grid_file.GridOutCursor`.
- Greatly improved :doc:`support for mod_wsgi </examples/mod_wsgi>` when using
  PyMongo's C extensions. Read `Jesse's blog post
  <http://emptysqua.re/blog/python-c-extensions-and-mod-wsgi/>`_ for details.
- Improved C extension support for ARM little endian.

Breaking changes
................

Version 2.7 drops support for replica sets running MongoDB versions older
than 1.6.2.

Issues Resolved
...............

See the `PyMongo 2.7 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.7 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=12892

Changes in Version 2.6.3
------------------------

Version 2.6.3 fixes issues reported since the release of 2.6.2, most
importantly a semaphore leak when a connection to the server fails.

Issues Resolved
...............

See the `PyMongo 2.6.3 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.6.3 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=13098

Changes in Version 2.6.2
------------------------

Version 2.6.2 fixes a ``TypeError`` problem when max_pool_size=None
is used in Python 3.

Issues Resolved
...............

See the `PyMongo 2.6.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.6.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=12910

Changes in Version 2.6.1
------------------------

Version 2.6.1 fixes a reference leak in
the :py:meth:`~pymongo.collection.Collection.insert` method.

Issues Resolved
...............

See the `PyMongo 2.6.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.6.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=12905

Changes in Version 2.6
----------------------

Version 2.6 includes some frequently requested improvements and adds
support for some early MongoDB 2.6 features.

Special thanks go to Justin Patrin for his work on the connection pool
in this release.

Important new features:

- The ``max_pool_size`` option for :py:class:`~pymongo.mongo_client.MongoClient`
  and :py:class:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient` now
  actually caps the number of sockets the pool will open concurrently.
  Once the pool has reaches max_pool_size
  operations will block waiting for a socket to become available. If
  ``waitQueueTimeoutMS`` is set, an operation that blocks waiting for a socket
  will raise ``~pymongo.errors.ConnectionFailure`` after the timeout. By
  default ``waitQueueTimeoutMS`` is not set.
  See :ref:`connection-pooling` for more information.
- The :py:meth:`~pymongo.collection.Collection.insert` method automatically splits
  large batches of documents into multiple insert messages based on
  :attr:`~pymongo.mongo_client.MongoClient.max_message_size`
- Support for the exhaust cursor flag.
  See :py:meth:`~pymongo.collection.Collection.find` for details and caveats.
- Support for the PLAIN and MONGODB-X509 authentication mechanisms.
  See :doc:`the authentication docs </examples/authentication>` for more
  information.
- Support aggregation output as a :py:class:`~pymongo.cursor.Cursor`. See
  :py:meth:`~pymongo.collection.Collection.aggregate` for details.

.. warning:: SIGNIFICANT BEHAVIOR CHANGE in 2.6. Previously, ``max_pool_size``
  would limit only the idle sockets the pool would hold onto, not the
  number of open sockets. The default has also changed, from 10 to 100.
  If you pass a value for ``max_pool_size`` make sure it is large enough for
  the expected load. (Sockets are only opened when needed, so there is no cost
  to having a ``max_pool_size`` larger than necessary. Err towards a larger
  value.) If your application accepts the default, continue to do so.

  See :ref:`connection-pooling` for more information.

Issues Resolved
...............

See the `PyMongo 2.6 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.6 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=12380

Changes in Version 2.5.2
------------------------

Version 2.5.2 fixes a NULL pointer dereference issue when decoding
an invalid :py:class:`~bson.dbref.DBRef`.

Issues Resolved
...............

See the `PyMongo 2.5.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.5.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=12581

Changes in Version 2.5.1
------------------------

Version 2.5.1 is a minor release that fixes issues discovered after the
release of 2.5. Most importantly, this release addresses some race
conditions in replica set monitoring.

Issues Resolved
...............

See the `PyMongo 2.5.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.5.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=12484

Changes in Version 2.5
----------------------

Version 2.5 includes changes to support new features in MongoDB 2.4.

Important new features:

- Support for :ref:`GSSAPI (Kerberos) authentication <gssapi>`.
- Support for SSL certificate validation with hostname matching.
- Support for delegated and role based authentication.
- New GEOSPHERE (2dsphere) and HASHED index constants.

.. note:: :py:meth:`~pymongo.database.Database.authenticate` now raises a
    subclass of :py:class:`~pymongo.errors.PyMongoError` if authentication
    fails due to invalid credentials or configuration issues.

Issues Resolved
...............

See the `PyMongo 2.5 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.5 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=11981

Changes in Version 2.4.2
------------------------

Version 2.4.2 is a minor release that fixes issues discovered after the
release of 2.4.1. Most importantly, PyMongo will no longer select a replica
set member for read operations that is not in primary or secondary state.

Issues Resolved
...............

See the `PyMongo 2.4.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.4.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=12299

Changes in Version 2.4.1
------------------------

Version 2.4.1 is a minor release that fixes issues discovered after the
release of 2.4. Most importantly, this release fixes a regression using
:py:meth:`~pymongo.collection.Collection.aggregate`, and possibly other commands,
with mongos.

Issues Resolved
...............

See the `PyMongo 2.4.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.4.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=12286

Changes in Version 2.4
----------------------

Version 2.4 includes a few important new features and a large number of bug
fixes.

Important new features:

- New :py:class:`~pymongo.mongo_client.MongoClient` and
  :py:class:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient` classes -
  these connection classes do acknowledged write operations (previously referred
  to as 'safe' writes) by default. :py:class:`~pymongo.connection.Connection` and
  :py:class:`~pymongo.replica_set_connection.ReplicaSetConnection` are deprecated
  but still support the old default fire-and-forget behavior.
- A new write concern API implemented as a
  :attr:`~pymongo.collection.Collection.write_concern` attribute on the connection,
  :py:class:`~pymongo.database.Database`, or :py:class:`~pymongo.collection.Collection`
  classes.
- :py:class:`~pymongo.mongo_client.MongoClient` (and :py:class:`~pymongo.connection.Connection`)
  now support Unix Domain Sockets.
- :py:class:`~pymongo.cursor.Cursor` can be copied with functions from the ``copy``
  module.
- The :py:meth:`~pymongo.database.Database.set_profiling_level` method now supports
  a ``slow_ms`` option.
- The replica set monitor task (used by
  :py:class:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient` and
  :py:class:`~pymongo.replica_set_connection.ReplicaSetConnection`) is a daemon thread
  once again, meaning you won't have to call
  :py:meth:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient.close` before
  exiting the python interactive shell.

.. warning:

.. code-block:: python

    The constructors for :py:class:`~pymongo.mongo_client.MongoClient`,
    :py:class:`~pymongo.mongo_replica_set_client.MongoReplicaSetClient`,
    :py:class:`~pymongo.connection.Connection`, and
    :py:class:`~pymongo.replica_set_connection.ReplicaSetConnection` now raise
    ``~pymongo.errors.ConnectionFailure`` instead of its subclass
    ``~pymongo.errors.AutoReconnect`` if the server is unavailable. Applications
    that expect to catch ``~pymongo.errors.AutoReconnect`` should now catch
    ``~pymongo.errors.ConnectionFailure`` while creating a new connection.

Issues Resolved
...............

See the `PyMongo 2.4 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.4 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=11485

Changes in Version 2.3
----------------------

Version 2.3 adds support for new features and behavior changes in MongoDB
2.2.

Important New Features:

- Support for expanded read preferences including directing reads to tagged
  servers - See :ref:`secondary-reads` for more information.
- Support for mongos failover.
- A new :py:meth:`~pymongo.collection.Collection.aggregate` method to support
  MongoDB's new `aggregation framework
  <http://mongodb.com/docs/manual/applications/aggregation/>`_.
- Support for legacy Java and C# byte order when encoding and decoding UUIDs.
- Support for connecting directly to an arbiter.

.. warning:

.. code-block:: python

    Starting with MongoDB 2.2 the getLastError command requires authentication
    when the server's `authentication features
    <https://www.mongodb.com/docs/manual/core/authentication/>`_ are enabled.
    Changes to PyMongo were required to support this behavior change. Users of
    authentication must upgrade to PyMongo 2.3 (or newer) for "safe" write operations
    to function correctly.

Issues Resolved
...............

See the `PyMongo 2.3 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.3 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=11146

Changes in Version 2.2.1
------------------------

Version 2.2.1 is a minor release that fixes issues discovered after the
release of 2.2. Most importantly, this release fixes an incompatibility
with mod_wsgi 2.x that could cause connections to leak. Users of mod_wsgi
2.x are strongly encouraged to upgrade from PyMongo 2.2.

Issues Resolved
...............

See the `PyMongo 2.2.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.2.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=11185

Changes in Version 2.2
----------------------

Version 2.2 adds a few more frequently requested features and fixes a
number of bugs.

Special thanks go to Alex Grönholm for his contributions to Python 3
support and maintaining the original pymongo3 port. Christoph Simon,
Wouter Bolsterlee, Mike O'Brien, and Chris Tompkinson also contributed
to this release.

Important New Features:

- Support for Python 3 -
  See the :doc:`python3` for more information.
- Support for Gevent -
  See :doc:`examples/gevent` for more information.
- Improved connection pooling.
  See `PYTHON-287 <https://jira.mongodb.org/browse/PYTHON-287>`_.

.. warning:

.. code-block:: python

    A number of methods and method parameters that were deprecated in
    PyMongo 1.9 or older versions have been removed in this release.
    The full list of changes can be found in the following JIRA ticket:

    https://jira.mongodb.org/browse/PYTHON-305

    BSON module aliases from the pymongo package that were deprecated in
    PyMongo 1.9 have also been removed in this release. See the following
    JIRA ticket for details:

    https://jira.mongodb.org/browse/PYTHON-304

    As a result of this cleanup some minor code changes may be required
    to use this release.

Issues Resolved
...............

See the `PyMongo 2.2 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.2 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=10584

Changes in Version 2.1.1
------------------------

Version 2.1.1 is a minor release that fixes a few issues
discovered after the release of 2.1. You can now use
:py:class:`~pymongo.replica_set_connection.ReplicaSetConnection`
to run inline map reduce commands on secondaries. See
:py:meth:`~pymongo.collection.Collection.inline_map_reduce` for details.

Special thanks go to Samuel Clay and Ross Lawley for their contributions
to this release.

Issues Resolved
...............

See the `PyMongo 2.1.1 release notes in JIRA`_ for the list of resolved issues
in this release.

.. _PyMongo 2.1.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?version=11081&styleName=Html&projectId=10004

Changes in Version 2.1
----------------------

Version 2.1 adds a few frequently requested features and includes the usual
round of bug fixes and improvements.

Special thanks go to Alexey Borzenkov, Dan Crosta, Kostya Rybnikov,
Flavio Percoco Premoli, Jonas Haag, and Jesse Davis for their contributions
to this release.

Important New Features:

- ReplicaSetConnection -
  :py:class:`~pymongo.replica_set_connection.ReplicaSetConnection`
  can be used to distribute reads to secondaries in a replica set. It supports
  automatic failover handling and periodically checks the state of the
  replica set to handle issues like primary stepdown or secondaries
  being removed for backup operations. Read preferences are defined through
  :py:class:`~pymongo.read_preferences.ReadPreference`.
- PyMongo supports the new BSON binary subtype 4 for UUIDs. The default
  subtype to use can be set through
  :attr:`~pymongo.collection.Collection.uuid_subtype`
  The current default remains :attr:`~bson.binary.OLD_UUID_SUBTYPE` but will
  be changed to :attr:`~bson.binary.UUID_SUBTYPE` in a future release.
- The getLastError option 'w' can be set to a string, allowing for options
  like "majority" available in newer version of MongoDB.
- Added support for the MongoDB URI options socketTimeoutMS and connectTimeoutMS.
- Added support for the ContinueOnError insert flag.
- Added basic SSL support.
- Added basic support for Jython.
- Secondaries can be used for :py:meth:`~pymongo.cursor.Cursor.count`,
  :py:meth:`~pymongo.cursor.Cursor.distinct`, :py:meth:`~pymongo.collection.Collection.group`,
  and querying :py:class:`~gridfs.GridFS`.
- Added document_class and tz_aware options to
  :py:class:`~pymongo.master_slave_connection.MasterSlaveConnection`

Issues Resolved
...............

See the `PyMongo 2.1 release notes in JIRA`_ for the list of resolved issues in this release.

.. _PyMongo 2.1 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=10583

Changes in Version 2.0.1
------------------------

Version 2.0.1 fixes a regression in :py:class:`~gridfs.grid_file.GridIn` when
writing pre-chunked strings. Thanks go to Alexey Borzenkov for reporting the
issue and submitting a patch.

Issues Resolved
...............

- `PYTHON-271 <https://jira.mongodb.org/browse/PYTHON-271>`_:
  Regression in GridFS leads to serious loss of data.

Changes in Version 2.0
----------------------

Version 2.0 adds a large number of features and fixes a number of issues.

Special thanks go to James Murty, Abhay Vardhan, David Pisoni, Ryan Smith-Roberts,
Andrew Pendleton, Mher Movsisyan, Reed O'Brien, Michael Schurter, Josip Delic
and Jonas Haag for their contributions to this release.

Important New Features:

- PyMongo now performs automatic per-socket database authentication. You no
  longer have to re-authenticate for each new thread or after a replica set
  failover. Authentication credentials are cached by the driver until the
  application calls :py:meth:`~pymongo.database.Database.logout`.
- slave_okay can be set independently at the connection, database, collection
  or query level. Each level will inherit the slave_okay setting from the
  previous level and each level can override the previous level's setting.
- safe and getLastError options (e.g. w, wtimeout, etc.) can be set
  independently at the connection, database, collection or query level. Each
  level will inherit settings from the previous level and each level can
  override the previous level's setting.
- PyMongo now supports the ``await_data`` and ``partial`` cursor flags. If the
  ``await_data`` flag is set on a ``tailable`` cursor the server will block for
  some extra time waiting for more data to return. The ``partial`` flag tells
  a mongos to return partial data for a query if not all shards are available.
- :py:meth:`~pymongo.collection.Collection.map_reduce` will accept a ``dict`` or
  instance of :py:class:`~bson.son.SON` as the ``out`` parameter.
- The URI parser has been moved into its own module and can be used directly
  by application code.
- AutoReconnect exception now provides information about the error that
  actually occurred instead of a generic failure message.
- A number of new helper methods have been added with options for setting and
  unsetting cursor flags, re-indexing a collection, fsync and locking a server,
  and getting the server's current operations.

API changes:

- If only one host:port pair is specified :py:class:`~pymongo.connection.Connection`
  will make a direct connection to only that host. Please note that ``slave_okay``
  must be ``True`` in order to query from a secondary.
- If more than one host:port pair is specified or the ``replicaset`` option is
  used PyMongo will treat the specified host:port pair(s) as a seed list and
  connect using replica set behavior.

.. warning:

.. code-block:: python

    The default subtype for :py:class:`~bson.binary.Binary` has changed
    from :const:`~bson.binary.OLD_BINARY_SUBTYPE` (2) to
    :const:`~bson.binary.BINARY_SUBTYPE` (0).

Issues Resolved
...............

See the `PyMongo 2.0 release notes in JIRA`_ for the list of resolved issues in this release.

.. _PyMongo 2.0 release notes in JIRA: https://jira.mongodb.org/secure/ReleaseNote.jspa?projectId=10004&version=10274

Changes in Version 1.11
-----------------------

Version 1.11 adds a few new features and fixes a few more bugs.

New Features:

- Basic IPv6 support: pymongo prefers IPv4 but will try IPv6. You can
  also specify an IPv6 address literal in the ``host`` parameter or a
  MongoDB URI provided it is enclosed in '[' and ']'.
- max_pool_size option: previously pymongo had a hard coded pool size
  of 10 connections. With this change you can specify a different pool
  size as a parameter to :py:class:`~pymongo.connection.Connection`
  (max_pool_size=<integer>) or in the MongoDB URI (maxPoolSize=<integer>).
- Find by metadata in GridFS: You can know specify query fields as
  keyword parameters for :py:meth:`~gridfs.GridFS.get_version` and
  :py:meth:`~gridfs.GridFS.get_last_version`.
- Per-query slave_okay option: slave_okay=True is now a valid keyword
  argument for :py:meth:`~pymongo.collection.Collection.find` and
  :py:meth:`~pymongo.collection.Collection.find_one`.

API changes:

- :py:meth:`~pymongo.database.Database.validate_collection` now returns a
  dict instead of a string. This change was required to deal with an
  API change on the server. This method also now takes the optional
  ``scandata`` and ``full`` parameters. See the documentation for more
  details.

.. warning::  The ``pool_size``, ``auto_start_request```, and ``timeout`` parameters
              for :py:class:`~pymongo.connection.Connection` have been completely
              removed in this release. They were deprecated in pymongo-1.4 and
              have had no effect since then. Please make sure that your code
              doesn't currently pass these parameters when creating a
              Connection instance.

Issues resolved
...............

- `PYTHON-241 <https://jira.mongodb.org/browse/PYTHON-241>`_:
  Support setting slaveok at the cursor level.
- `PYTHON-240 <https://jira.mongodb.org/browse/PYTHON-240>`_:
  Queries can sometimes permanently fail after a replica set fail over.
- `PYTHON-238 <https://jira.mongodb.org/browse/PYTHON-238>`_:
  error after few million requests
- `PYTHON-237 <https://jira.mongodb.org/browse/PYTHON-237>`_:
  Basic IPv6 support.
- `PYTHON-236 <https://jira.mongodb.org/browse/PYTHON-236>`_:
  Restore option to specify pool size in Connection.
- `PYTHON-212 <https://jira.mongodb.org/browse/PYTHON-212>`_:
  pymongo does not recover after stale config
- `PYTHON-138 <https://jira.mongodb.org/browse/PYTHON-138>`_:
  Find method for GridFS

Changes in Version 1.10.1
-------------------------

Version 1.10.1 is primarily a bugfix release. It fixes a regression in
version 1.10 that broke pickling of ObjectIds. A number of other bugs
have been fixed as well.

There are two behavior changes to be aware of:

- If a read slave raises :py:class:`~pymongo.errors.AutoReconnect`
  :py:class:`~pymongo.master_slave_connection.MasterSlaveConnection` will now
  retry the query on each slave until it is successful or all slaves have
  raised :py:class:`~pymongo.errors.AutoReconnect`. Any other exception will
  immediately be raised. The order that the slaves are tried is random.
  Previously the read would be sent to one randomly chosen slave and
  :py:class:`~pymongo.errors.AutoReconnect` was immediately raised in case
  of a connection failure.
- A Python ``long`` is now always BSON encoded as an int64. Previously the
  encoding was based only on the value of the field and a ``long`` with a
  value less than ``2147483648`` or greater than ``-2147483649`` would always
  be BSON encoded as an int32.

Issues resolved
...............

- `PYTHON-234 <https://jira.mongodb.org/browse/PYTHON-234>`_:
  Fix setup.py to raise exception if any when building extensions
- `PYTHON-233 <https://jira.mongodb.org/browse/PYTHON-233>`_:
  Add information to build and test with extensions on windows
- `PYTHON-232 <https://jira.mongodb.org/browse/PYTHON-232>`_:
  Traceback when hashing a DBRef instance
- `PYTHON-231 <https://jira.mongodb.org/browse/PYTHON-231>`_:
  Traceback when pickling a DBRef instance
- `PYTHON-230 <https://jira.mongodb.org/browse/PYTHON-230>`_:
  Pickled ObjectIds are not compatible between pymongo 1.9 and 1.10
- `PYTHON-228 <https://jira.mongodb.org/browse/PYTHON-228>`_:
  Cannot pickle bson.ObjectId
- `PYTHON-227 <https://jira.mongodb.org/browse/PYTHON-227>`_:
  Traceback when calling find() on system.js
- `PYTHON-216 <https://jira.mongodb.org/browse/PYTHON-216>`_:
  MasterSlaveConnection is missing disconnect() method
- `PYTHON-186 <https://jira.mongodb.org/browse/PYTHON-186>`_:
  When storing integers, type is selected according to value instead of type
- `PYTHON-173 <https://jira.mongodb.org/browse/PYTHON-173>`_:
  as_class option is not propagated by Cursor.clone
- `PYTHON-113 <https://jira.mongodb.org/browse/PYTHON-113>`_:
  Redunducy in MasterSlaveConnection

Changes in Version 1.10
-----------------------

Version 1.10 includes changes to support new features in MongoDB 1.8.x.
Highlights include a modified map/reduce API including an inline map/reduce
helper method, a new find_and_modify helper, and the ability to query the
server for the maximum BSON document size it supports.

- added :py:meth:`~pymongo.collection.Collection.find_and_modify`.
- added :py:meth:`~pymongo.collection.Collection.inline_map_reduce`.
- changed :py:meth:`~pymongo.collection.Collection.map_reduce`.

.. warning:: MongoDB versions greater than 1.7.4 no longer generate temporary
   collections for map/reduce results. An output collection name must be
   provided and the output will replace any existing output collection with
   the same name. :py:meth:`~pymongo.collection.Collection.map_reduce` now
   requires the ``out`` parameter.

Issues resolved
...............

- PYTHON-225: :py:class:`~pymongo.objectid.ObjectId` class definition should use __slots__.
- PYTHON-223: Documentation fix.
- PYTHON-220: Documentation fix.
- PYTHON-219: KeyError in :py:meth:`~pymongo.collection.Collection.find_and_modify`
- PYTHON-213: Query server for maximum BSON document size.
- PYTHON-208: Fix :py:class:`~pymongo.connection.Connection` __repr__.
- PYTHON-207: Changes to Map/Reduce API.
- PYTHON-205: Accept slaveOk in the URI to match the URI docs.
- PYTHON-203: When slave_okay=True and we only specify one host don't autodetect other set members.
- PYTHON-194: Show size when whining about a document being too large.
- PYTHON-184: Raise :py:class:`~pymongo.errors.DuplicateKeyError` for duplicate keys in capped collections.
- PYTHON-178: Don't segfault when trying to encode a recursive data structure.
- PYTHON-177: Don't segfault when decoding dicts with broken iterators.
- PYTHON-172: Fix a typo.
- PYTHON-170: Add :py:meth:`~pymongo.collection.Collection.find_and_modify`.
- PYTHON-169: Support deepcopy of DBRef.
- PYTHON-167: Duplicate of PYTHON-166.
- PYTHON-166: Fixes a concurrency issue.
- PYTHON-158: Add code and err string to ``db assertion`` messages.

Changes in Version 1.9
----------------------

Version 1.9 adds a new package to the PyMongo distribution,
``bson``. ``bson`` contains all of the `BSON
<http://bsonspec.org>`_ encoding and decoding logic, and the BSON
types that were formerly in the ``pymongo`` package. The following
modules have been renamed:

  - ``pymongo.bson`` -> ``bson``
  - ``pymongo._cbson`` -> ``bson._cbson`` and
    ``pymongo._cmessage``
  - ``pymongo.binary`` -> ``bson.binary``
  - ``pymongo.code`` -> ``bson.code``
  - ``pymongo.dbref`` -> ``bson.dbref``
  - ``pymongo.json_util`` -> ``bson.json_util``
  - ``pymongo.max_key`` -> ``bson.max_key``
  - ``pymongo.min_key`` -> ``bson.min_key``
  - ``pymongo.objectid`` -> ``bson.objectid``
  - ``pymongo.son`` -> ``bson.son``
  - ``pymongo.timestamp`` -> ``bson.timestamp``
  - ``pymongo.tz_util`` -> ``bson.tz_util``

In addition, the following exception classes have been renamed:

  - :py:class:`pymongo.errors.InvalidBSON` ->
    :py:class:`bson.errors.InvalidBSON`
  - :py:class:`pymongo.errors.InvalidStringData` ->
    :py:class:`bson.errors.InvalidStringData`
  - :py:class:`pymongo.errors.InvalidDocument` ->
    :py:class:`bson.errors.InvalidDocument`
  - :py:class:`pymongo.errors.InvalidId` ->
    :py:class:`bson.errors.InvalidId`

The above exceptions now inherit from :py:class:`bson.errors.BSONError`
rather than :py:class:`pymongo.errors.PyMongoError`.

.. note::  All of the renamed modules and exceptions above have aliases
           created with the old names, so these changes should not break
           existing code. The old names will eventually be deprecated and then
           removed, so users should begin migrating towards the new names now.

.. warning:

.. code-block:: python

  The change to the exception hierarchy mentioned above is
  possibly breaking. If your code is catching
  :py:class:`~pymongo.errors.PyMongoError`, then the exceptions raised
  by ``bson`` will not be caught, even though they would have been
  caught previously. Before upgrading, it is recommended that users
  check for any cases like this.

- the C extension now shares buffer.c/h with the Ruby driver
- ``bson`` no longer raises :py:class:`~pymongo.errors.InvalidName`,
  all occurrences have been replaced with
  :py:class:`~bson.errors.InvalidDocument`.
- renamed :py:meth:`bson._to_dicts` to :py:meth:`~bson.decode_all`.
- renamed :py:meth:`~bson.BSON.from_dict` to :py:meth:`~bson.BSON.encode`
  and :py:meth:`~bson.BSON.to_dict` to :py:meth:`~bson.BSON.decode`.
- added :py:meth:`~pymongo.cursor.Cursor.batch_size`.
- allow updating (some) file metadata after a
  :py:class:`~gridfs.grid_file.GridIn` instance has been closed.
- performance improvements for reading from GridFS.
- special cased slice with the same start and stop to return an empty
  cursor.
- allow writing :py:class:`unicode` to GridFS if an :attr:`encoding`
  attribute has been specified for the file.
- added :py:meth:`gridfs.GridFS.get_version`.
- scope variables for :py:class:`~bson.code.Code` can now be specified as
  keyword arguments.
- added :py:meth:`~gridfs.grid_file.GridOut.readline` to
  :py:class:`~gridfs.grid_file.GridOut`.
- make a best effort to transparently auto-reconnect if a
  :py:class:`~pymongo.connection.Connection` has been idle for a while.
- added :py:meth:`~pymongo.database.SystemJS.list` to
  :py:class:`~pymongo.database.SystemJS`.
- added ``file_document`` argument to :py:meth:`~gridfs.grid_file.GridOut`
  to allow initializing from an existing file document.
- raise :py:class:`~pymongo.errors.TimeoutError` even if the
  ``getLastError`` command was run manually and not through "safe"
  mode.
- added :py:class:`uuid` support to ``~bson.json_util``.

Changes in Version 1.8.1
------------------------

- fixed a typo in the C extension that could cause safe-mode
  operations to report a failure (:py:class:`SystemError`) even when none
  occurred.
- added a :py:meth:`__ne__` implementation to any class where we define
  :py:meth:`__eq__`.

Changes in Version 1.8
----------------------

Version 1.8 adds support for connecting to replica sets, specifying
per-operation values for ``w`` and ``wtimeout``, and decoding to
timezone-aware datetimes.

- fixed a reference leak in the C extension when decoding a
  :py:class:`~bson.dbref.DBRef`.
- added support for ``w``, ``wtimeout``, and ``fsync`` (and any other
  options for ``getLastError``) to "safe mode" operations.
- added :attr:`~pymongo.connection.Connection.nodes` property.
- added a maximum pool size of 10 sockets.
- added support for replica sets.
- DEPRECATED :py:meth:`~pymongo.connection.Connection.from_uri` and
  :py:meth:`~pymongo.connection.Connection.paired`, both are supplanted
  by extended functionality in :py:meth:`~pymongo.connection.Connection`.
- added tz aware support for datetimes in
  :py:class:`~bson.objectid.ObjectId`,
  :py:class:`~bson.timestamp.Timestamp` and ``~bson.json_util``
  methods.
- added :py:meth:`~pymongo.collection.Collection.drop` helper.
- reuse the socket used for finding the master when a
  :py:class:`~pymongo.connection.Connection` is first created.
- added support for :py:class:`~bson.min_key.MinKey`,
  :py:class:`~bson.max_key.MaxKey` and
  :py:class:`~bson.timestamp.Timestamp` to ``~bson.json_util``.
- added support for decoding datetimes as aware (UTC) - it is highly
  recommended to enable this by setting the ``tz_aware`` parameter to
  :py:meth:`~pymongo.connection.Connection` to ``True``.
- added ``network_timeout`` option for individual calls to
  :py:meth:`~pymongo.collection.Collection.find` and
  :py:meth:`~pymongo.collection.Collection.find_one`.
- added :py:meth:`~gridfs.GridFS.exists` to check if a file exists in
  GridFS.
- added support for additional keys in :py:class:`~bson.dbref.DBRef`
  instances.
- added :attr:`~pymongo.errors.OperationFailure.code` attribute to
  :py:class:`~pymongo.errors.OperationFailure` exceptions.
- fixed serialization of int and float subclasses in the C extension.

Changes in Version 1.7
----------------------

Version 1.7 is a recommended upgrade for all PyMongo users. The full
release notes are below, and some more in depth discussion of the
highlights is `here
<http://dirolf.com/2010/06/17/pymongo-1.7-released.html>`_.

- no longer attempt to build the C extension on big-endian systems.
- added :py:class:`~bson.min_key.MinKey` and
  :py:class:`~bson.max_key.MaxKey`.
- use unsigned for :py:class:`~bson.timestamp.Timestamp` in BSON
  encoder/decoder.
- support ``True`` as ``"ok"`` in command responses, in addition to
  ``1.0`` - necessary for server versions **>= 1.5.X**
- BREAKING change to
  :py:meth:`~pymongo.collection.Collection.index_information` to add
  support for querying unique status and other index information.
- added :attr:`~pymongo.connection.Connection.document_class`, to
  specify class for returned documents.
- added ``as_class`` argument for
  :py:meth:`~pymongo.collection.Collection.find`, and in the BSON decoder.
- added support for creating :py:class:`~bson.timestamp.Timestamp`
  instances using a :py:class:`~datetime.datetime`.
- allow ``dropTarget`` argument for
  :py:class:`~pymongo.collection.Collection.rename`.
- handle aware :py:class:`~datetime.datetime` instances, by converting to
  UTC.
- added support for :py:class:`~pymongo.cursor.Cursor.max_scan`.
- raise :py:class:`~gridfs.errors.FileExists` exception when creating a
  duplicate GridFS file.
- use `y2038 <https://github.com/evalEmpire/y2038/>`_ for time handling in
  the C extension - eliminates 2038 problems when extension is
  installed.
- added ``sort`` parameter to
  :py:meth:`~pymongo.collection.Collection.find`
- finalized deprecation of changes from versions **<= 1.4**
- take any non-:py:class:`dict` as an ``"_id"`` query for
  :py:meth:`~pymongo.collection.Collection.find_one` or
  :py:meth:`~pymongo.collection.Collection.remove`
- added ability to pass a :py:class:`dict` for ``fields`` argument to
  :py:meth:`~pymongo.collection.Collection.find` (supports ``"$slice"``
  and field negation)
- simplified code to find master, since paired setups don't always have
  a remote
- fixed bug in C encoder for certain invalid types (like
  :py:class:`~pymongo.collection.Collection` instances).
- don't transparently map ``"filename"`` key to :attr:`name` attribute
  for GridFS.

Changes in Version 1.6
----------------------

The biggest change in version 1.6 is a complete re-implementation of
``gridfs`` with a lot of improvements over the old
implementation. There are many details and examples of using the new
API in `this blog post
<http://dirolf.com/2010/03/29/new-gridfs-implementation-for-pymongo.html>`_. The
old API has been removed in this version, so existing code will need
to be modified before upgrading to 1.6.

- fixed issue where connection pool was being shared across
  :py:class:`~pymongo.connection.Connection` instances.
- more improvements to Python code caching in C extension - should
  improve behavior on mod_wsgi.
- added :py:meth:`~bson.objectid.ObjectId.from_datetime`.
- complete rewrite of ``gridfs`` support.
- improvements to the :py:meth:`~pymongo.database.Database.command` API.
- fixed :py:meth:`~pymongo.collection.Collection.drop_indexes` behavior
  on non-existent collections.
- disallow empty bulk inserts.

Changes in Version 1.5.2
------------------------
- fixed response handling to ignore unknown response flags in queries.
- handle server versions containing '-pre-'.

Changes in Version 1.5.1
------------------------
- added :data:`~gridfs.grid_file.GridFile._id` property for
  :py:class:`~gridfs.grid_file.GridFile` instances.
- fix for making a :py:class:`~pymongo.connection.Connection` (with
  ``slave_okay`` set) directly to a slave in a replica pair.
- accept kwargs for
  :py:meth:`~pymongo.collection.Collection.create_index` and
  :py:meth:`~pymongo.collection.Collection.ensure_index` to support all
  indexing options.
- add :data:`pymongo.GEO2D` and support for geo indexing.
- improvements to Python code caching in C extension - should improve
  behavior on mod_wsgi.

Changes in Version 1.5
----------------------
- added subtype constants to ``~bson.binary`` module.
- DEPRECATED ``options`` argument to
  :py:meth:`~pymongo.collection.Collection` and
  :py:meth:`~pymongo.database.Database.create_collection` in favor of
  kwargs.
- added :py:meth:`~pymongo.has_c` to check for C extension.
- added :py:meth:`~pymongo.connection.Connection.copy_database`.
- added :data:`~pymongo.cursor.Cursor.alive` to tell when a cursor
  might have more data to return (useful for tailable cursors).
- added :py:class:`~bson.timestamp.Timestamp` to better support
  dealing with internal MongoDB timestamps.
- added ``name`` argument for
  :py:meth:`~pymongo.collection.Collection.create_index` and
  :py:meth:`~pymongo.collection.Collection.ensure_index`.
- fixed connection pooling w/ fork
- :py:meth:`~pymongo.connection.Connection.paired` takes all kwargs that
  are allowed for :py:meth:`~pymongo.connection.Connection`.
- :py:meth:`~pymongo.collection.Collection.insert` returns list for bulk
  inserts of size one.
- fixed handling of :py:class:`datetime.datetime` instances in
  ``~bson.json_util``.
- added :py:meth:`~pymongo.connection.Connection.from_uri` to support
  MongoDB connection uri scheme.
- fixed chunk number calculation when unaligned in ``gridfs``.
- :py:meth:`~pymongo.database.Database.command` takes a string for simple
  commands.
- added :data:`~pymongo.database.Database.system_js` helper for
  dealing with server-side JS.
- don't wrap queries containing ``"$query"`` (support manual use of
  ``"$min"``, etc.).
- added :py:class:`~gridfs.errors.GridFSError` as base class for
  ``gridfs`` exceptions.

Changes in Version 1.4
----------------------

Perhaps the most important change in version 1.4 is that we have
decided to **no longer support Python 2.3**. The most immediate reason
for this is to allow some improvements to connection pooling. This
will also allow us to use some new (as in Python 2.4 ;) idioms and
will help begin the path towards supporting Python 3.0. If you need to
use Python 2.3 you should consider using version 1.3 of this driver,
although that will no longer be actively supported.

Other changes:

- move ``"_id"`` to front only for top-level documents (fixes some
  corner cases).
- :py:meth:`~pymongo.collection.Collection.update` and
  :py:meth:`~pymongo.collection.Collection.remove` return the entire
  response to the *lastError* command when safe is ``True``.
- completed removal of things that were deprecated in version 1.2 or
  earlier.
- enforce that collection names do not contain the NULL byte.
- fix to allow using UTF-8 collection names with the C extension.
- added :py:class:`~pymongo.errors.PyMongoError` as base exception class
  for all ``~pymongo.errors``. this changes the exception hierarchy
  somewhat, and is a BREAKING change if you depend on
  :py:class:`~pymongo.errors.ConnectionFailure` being a :py:class:`IOError`
  or :py:class:`~bson.errors.InvalidBSON` being a :py:class:`ValueError`,
  for example.
- added :py:class:`~pymongo.errors.DuplicateKeyError` for calls to
  :py:meth:`~pymongo.collection.Collection.insert` or
  :py:meth:`~pymongo.collection.Collection.update` with ``safe`` set to
  ``True``.
- removed ``~pymongo.thread_util``.
- added :py:meth:`~pymongo.database.Database.add_user` and
  :py:meth:`~pymongo.database.Database.remove_user` helpers.
- fix for :py:meth:`~pymongo.database.Database.authenticate` when using
  non-UTF-8 names or passwords.
- minor fixes for
  :py:class:`~pymongo.master_slave_connection.MasterSlaveConnection`.
- clean up all cases where :py:class:`~pymongo.errors.ConnectionFailure`
  is raised.
- simplification of connection pooling - makes driver ~2x faster for
  simple benchmarks. see :ref:`connection-pooling` for more information.
- DEPRECATED ``pool_size``, ``auto_start_request`` and ``timeout``
  parameters to :py:class:`~pymongo.connection.Connection`. DEPRECATED
  :py:meth:`~pymongo.connection.Connection.start_request`.
- use :py:meth:`socket.sendall`.
- removed :py:meth:`~bson.son.SON.from_xml` as it was only being used
  for some internal testing - also eliminates dependency on
  ``elementtree``.
- implementation of :py:meth:`~pymongo.message.update` in C.
- deprecate :py:meth:`~pymongo.database.Database._command` in favor of
  :py:meth:`~pymongo.database.Database.command`.
- send all commands without wrapping as ``{"query": ...}``.
- support string as ``key`` argument to
  :py:meth:`~pymongo.collection.Collection.group` (keyf) and run all
  groups as commands.
- support for equality testing for :py:class:`~bson.code.Code`
  instances.
- allow the NULL byte in strings and disallow it in key names or regex
  patterns

Changes in Version 1.3
----------------------
- DEPRECATED running :py:meth:`~pymongo.collection.Collection.group` as
  :py:meth:`~pymongo.database.Database.eval`, also changed default for
  :py:meth:`~pymongo.collection.Collection.group` to running as a command
- remove :py:meth:`pymongo.cursor.Cursor.__len__`, which was deprecated
  in 1.1.1 - needed to do this aggressively due to it's presence
  breaking **Django** template *for* loops
- DEPRECATED :py:meth:`~pymongo.connection.Connection.host`,
  :py:meth:`~pymongo.connection.Connection.port`,
  :py:meth:`~pymongo.database.Database.connection`,
  :py:meth:`~pymongo.database.Database.name`,
  :py:meth:`~pymongo.collection.Collection.database`,
  :py:meth:`~pymongo.collection.Collection.name` and
  :py:meth:`~pymongo.collection.Collection.full_name` in favor of
  :attr:`~pymongo.connection.Connection.host`,
  :attr:`~pymongo.connection.Connection.port`,
  :attr:`~pymongo.database.Database.connection`,
  :attr:`~pymongo.database.Database.name`,
  :attr:`~pymongo.collection.Collection.database`,
  :attr:`~pymongo.collection.Collection.name` and
  :attr:`~pymongo.collection.Collection.full_name`, respectively. The
  deprecation schedule for this change will probably be faster than
  usual, as it carries some performance implications.
- added :py:meth:`~pymongo.connection.Connection.disconnect`

Changes in Version 1.2.1
------------------------
- added :doc:`changelog` to docs
- added ``setup.py doc --test`` to run doctests for tutorial, examples
- moved most examples to Sphinx docs (and remove from *examples/*
  directory)
- raise :py:class:`~bson.errors.InvalidId` instead of
  :py:class:`TypeError` when passing a 24 character string to
  :py:class:`~bson.objectid.ObjectId` that contains non-hexadecimal
  characters
- allow :py:class:`unicode` instances for :py:class:`~bson.objectid.ObjectId` init

Changes in Version 1.2
----------------------
- ``spec`` parameter for :py:meth:`~pymongo.collection.Collection.remove` is
  now optional to allow for deleting all documents in a
  :py:class:`~pymongo.collection.Collection`
- always wrap queries with ``{query: ...}`` even when no special options -
  get around some issues with queries on fields named ``query``
- enforce 4MB document limit on the client side
- added :py:meth:`~pymongo.collection.Collection.map_reduce` helper - see
  :doc:`example <examples/aggregation>`
- added :py:meth:`~pymongo.cursor.Cursor.distinct` method on
  :py:class:`~pymongo.cursor.Cursor` instances to allow distinct with
  queries
- fix for :py:meth:`~pymongo.cursor.Cursor.__getitem__` after
  :py:meth:`~pymongo.cursor.Cursor.skip`
- allow any UTF-8 string in :py:class:`~bson.BSON` encoder, not
  just ASCII subset
- added :attr:`~bson.objectid.ObjectId.generation_time`
- removed support for legacy :py:class:`~bson.objectid.ObjectId`
  format - pretty sure this was never used, and is just confusing
- DEPRECATED :py:meth:`~bson.objectid.ObjectId.url_encode` and
  :py:meth:`~bson.objectid.ObjectId.url_decode` in favor of :py:meth:`str`
  and :py:meth:`~bson.objectid.ObjectId`, respectively
- allow *oplog.$main* as a valid collection name
- some minor fixes for installation process
- added support for datetime and regex in ``~bson.json_util``

Changes in Version 1.1.2
------------------------
- improvements to :py:meth:`~pymongo.collection.Collection.insert` speed
  (using C for insert message creation)
- use random number for request_id
- fix some race conditions with :py:class:`~pymongo.errors.AutoReconnect`

Changes in Version 1.1.1
------------------------
- added ``multi`` parameter for
  :py:meth:`~pymongo.collection.Collection.update`
- fix unicode regex patterns with C extension
- added :py:meth:`~pymongo.collection.Collection.distinct`
- added ``database`` support for :py:class:`~bson.dbref.DBRef`
- added ``~bson.json_util`` with helpers for encoding / decoding
  special types to JSON
- DEPRECATED :py:meth:`pymongo.cursor.Cursor.__len__` in favor of
  :py:meth:`~pymongo.cursor.Cursor.count` with ``with_limit_and_skip`` set
  to ``True`` due to performance regression
- switch documentation to Sphinx

Changes in Version 1.1
----------------------
- added :py:meth:`__hash__` for :py:class:`~bson.dbref.DBRef` and
  :py:class:`~bson.objectid.ObjectId`
- bulk :py:meth:`~pymongo.collection.Collection.insert` works with any
  iterable
- fix :py:class:`~bson.objectid.ObjectId` generation when using
  ``multiprocessing``
- added :attr:`~pymongo.cursor.Cursor.collection`
- added ``network_timeout`` parameter for
  :py:meth:`~pymongo.connection.Connection`
- DEPRECATED ``slave_okay`` parameter for individual queries
- fix for ``safe`` mode when multi-threaded
- added ``safe`` parameter for :py:meth:`~pymongo.collection.Collection.remove`
- added ``tailable`` parameter for :py:meth:`~pymongo.collection.Collection.find`

Changes in Version 1.0
----------------------
- fixes for
  :py:class:`~pymongo.master_slave_connection.MasterSlaveConnection`
- added ``finalize`` parameter for :py:meth:`~pymongo.collection.Collection.group`
- improvements to :py:meth:`~pymongo.collection.Collection.insert` speed
- improvements to ``gridfs`` speed
- added :py:meth:`~pymongo.cursor.Cursor.__getitem__` and
  :py:meth:`~pymongo.cursor.Cursor.__len__` for
  :py:class:`~pymongo.cursor.Cursor` instances

Changes in Version 0.16
-----------------------
- support for encoding/decoding :py:class:`uuid.UUID` instances
- fix for :py:meth:`~pymongo.cursor.Cursor.explain` with limits

Changes in Version 0.15.2
-------------------------
- documentation changes only

Changes in Version 0.15.1
-------------------------
- various performance improvements
- API CHANGE no longer need to specify direction for
  :py:meth:`~pymongo.collection.Collection.create_index` and
  :py:meth:`~pymongo.collection.Collection.ensure_index` when indexing a
  single key
- support for encoding :py:class:`tuple` instances as :py:class:`list`
  instances

Changes in Version 0.15
-----------------------
- fix string representation of :py:class:`~bson.objectid.ObjectId`
  instances
- added ``timeout`` parameter for
  :py:meth:`~pymongo.collection.Collection.find`
- allow scope for ``reduce`` function in
  :py:meth:`~pymongo.collection.Collection.group`

Changes in Version 0.14.2
-------------------------
- minor bugfixes

Changes in Version 0.14.1
-------------------------
- :py:meth:`~gridfs.grid_file.GridFile.seek` and
  :py:meth:`~gridfs.grid_file.GridFile.tell` for (read mode)
  :py:class:`~gridfs.grid_file.GridFile` instances

Changes in Version 0.14
-----------------------
- support for long in :py:class:`~bson.BSON`
- added :py:meth:`~pymongo.collection.Collection.rename`
- added ``snapshot`` parameter for
  :py:meth:`~pymongo.collection.Collection.find`

Changes in Version 0.13
-----------------------
- better
  :py:class:`~pymongo.master_slave_connection.MasterSlaveConnection`
  support
- API CHANGE :py:meth:`~pymongo.collection.Collection.insert` and
  :py:meth:`~pymongo.collection.Collection.save` both return inserted
  ``_id``
- DEPRECATED passing an index name to
  :py:meth:`~pymongo.cursor.Cursor.hint`

Changes in Version 0.12
-----------------------
- improved :py:class:`~bson.objectid.ObjectId` generation
- added :py:class:`~pymongo.errors.AutoReconnect` exception for when
  reconnection is possible
- make ``gridfs`` thread-safe
- fix for ``gridfs`` with non :py:class:`~bson.objectid.ObjectId` ``_id``

Changes in Version 0.11.3
-------------------------
- don't allow NULL bytes in string encoder
- fixes for Python 2.3

Changes in Version 0.11.2
-------------------------
- PEP 8
- updates for :py:meth:`~pymongo.collection.Collection.group`
- VS build

Changes in Version 0.11.1
-------------------------
- fix for connection pooling under Python 2.5

Changes in Version 0.11
-----------------------
- better build failure detection
- driver support for selecting fields in sub-documents
- disallow insertion of invalid key names
- added ``timeout`` parameter for :py:meth:`~pymongo.connection.Connection`

Changes in Version 0.10.3
-------------------------
- fix bug with large :py:meth:`~pymongo.cursor.Cursor.limit`
- better exception when modules get reloaded out from underneath the C
  extension
- better exception messages when calling a
  :py:class:`~pymongo.collection.Collection` or
  :py:class:`~pymongo.database.Database` instance

Changes in Version 0.10.2
-------------------------
- support subclasses of :py:class:`dict` in C encoder

Changes in Version 0.10.1
-------------------------
- alias :py:class:`~pymongo.connection.Connection` as
  :attr:`pymongo.Connection`
- raise an exception rather than silently overflowing in encoder

Changes in Version 0.10
-----------------------
- added :py:meth:`~pymongo.collection.Collection.ensure_index`

Changes in Version 0.9.7
------------------------
- allow sub-collections of *$cmd* as valid
  :py:class:`~pymongo.collection.Collection` names
- add version as :attr:`pymongo.version`
- add ``--no_ext`` command line option to *setup.py*
