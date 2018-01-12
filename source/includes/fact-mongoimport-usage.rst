Simple Usage
````````````

:binary:`~bin.mongoimport` restores a database from a backup taken with
:binary:`~bin.mongoexport`. Most of the arguments to :binary:`~bin.mongoexport` also
exist for :binary:`~bin.mongoimport`.

In the following example, :binary:`~bin.mongoimport` imports the data in
the :term:`JSON` data from the ``contacts.json`` file into the collection
``contacts`` in the ``users`` database.

.. code-block:: sh

   mongoimport --db users --collection contacts --file contacts.json

Import ``JSON`` to Remote Host Running with Authentication
``````````````````````````````````````````````````````````

In the following example, :binary:`~bin.mongoimport` imports data from the
file ``/opt/backups/mdb1-examplenet.json`` into the ``contacts`` collection
within the database ``marketing`` on a remote MongoDB
database with authentication enabled.

:binary:`~bin.mongoimport` connects to the :binary:`~bin.mongod` instance running on
the host ``mongodb1.example.net`` over port ``37017``. It authenticates with the
username ``user`` and the password ``pass``.

.. code-block:: sh

   mongoimport --host mongodb1.example.net --port 37017 --username user --password pass --collection contacts --db marketing --file /opt/backups/mdb1-examplenet.json

``CSV`` Import
``````````````

In the following example, :binary:`~bin.mongoimport` imports the :term:`csv`
formatted data in the ``/opt/backups/contacts.csv`` file into the
collection ``contacts`` in the ``users`` database on the MongoDB
instance running on the localhost port numbered
``27017``.

Specifying :option:`--headerline <mongoimport --headerline>` instructs
:binary:`~bin.mongoimport` to determine the name of the fields using the first
line in the CSV file.

.. code-block:: sh

   mongoimport --db users --collection contacts --type csv --headerline --file /opt/backups/contacts.csv

:binary:`~bin.mongoimport` uses the input file name, without the
extension, as the collection name if ``-c`` or ``--collection`` is
unspecified. The following example is therefore equivalent:

.. code-block:: none

   mongoimport --db users --type csv --headerline --file /opt/backups/contacts.csv

Use the ":option:`--ignoreBlanks <mongoimport --ignoreBlanks>`" option
to ignore blank fields. For :term:`CSV` and :term:`TSV` imports, this
option provides the desired functionality in most cases because it avoids
inserting fields with null values into your collection.
