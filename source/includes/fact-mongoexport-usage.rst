Export in CSV Format
~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-3.0-mongoexport-drop-csv-option.rst

In the following example, :binary:`~bin.mongoexport` exports data from the
collection ``contacts`` collection in the ``users`` database in :term:`CSV`
format to the file ``/opt/backups/contacts.csv``.

The :binary:`~bin.mongod` instance that :binary:`~bin.mongoexport` connects to is
running on the localhost port number ``27017``.

When you export in CSV format, you must specify the fields in the documents
to export. The operation specifies the ``name`` and ``address`` fields
to export.

.. code-block:: sh

   mongoexport --db users --collection contacts --type=csv --fields name,address --out /opt/backups/contacts.csv

For CSV exports only, you can also specify the fields in a file
containing the line-separated list of fields to export. The file must
have only one field per line.

For example, you can specify the ``name`` and ``address`` fields in a
file ``fields.txt``:

.. code-block:: none

   name
   address

Then, using the :option:`--fieldFile` option, specify the fields to export with
the file:

.. code-block:: sh

   mongoexport --db users --collection contacts --type=csv --fieldFile fields.txt --out /opt/backups/contacts.csv

.. versionchanged:: 3.0.0
   :binary:`~bin.mongoexport` removed the ``--csv`` option and replaced with
   the :option:`--type` option.

Export in JSON Format
~~~~~~~~~~~~~~~~~~~~~

This example creates an export of the ``contacts`` collection from the
MongoDB instance running on the localhost port number ``27017``. This
writes the export to the ``contacts.json`` file in :term:`JSON` format.

.. code-block:: sh

   mongoexport --db sales --collection contacts --out contacts.json

Export from Remote Host Running with Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example exports the ``contacts`` collection from the
``marketing`` database, which requires authentication.

This data resides on the MongoDB instance located on the host
``mongodb1.example.net`` running on port ``37017``, which requires the username
``user`` and the password ``pass``.

.. code-block:: sh

   mongoexport --host mongodb1.example.net --port 37017 --username user --password pass --collection contacts --db marketing --out mdb1-examplenet.json

Export Query Results
~~~~~~~~~~~~~~~~~~~~
You can export only the results of a query by supplying a query filter with
the :option:`--query <mongoexport --query>` option, and limit the results to a single
database using the ":option:`--db <mongoexport --db>`" option.

For instance, this command returns all documents in the ``sales`` database's
``contacts`` collection that contain a field named ``field`` with a value
of ``1``.

.. code-block:: sh

   mongoexport --db sales --collection contacts --query '{"field": 1}'

.. include:: /includes/fact-quote-command-line-query.rst
