.. include:: /includes/fact-connection-info-atlas-sql.rst

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Field
     - Description

   * - ``Password``
     - Database user's password.

   * - ``Driver``
     - Path to the ``libatsql.so`` ODBC driver library.

   * - ``Database``
     - Name of the database to which to connect.

   * - ``User``
     - Database username to use to connect to your 
       database.

   * - ``Uri``
     - MongoDB deployment URI.

   * - ``UnicodeTranslationOption``
     - Unicode encoding for {+asql+}. Set to ``utf16``.

   * - ``enable_max_string_length``
     - *Optional.* Flag to enforce maximum string length of 4000
       characters. To enable, set value to ``1`` and to disable, set
       value to ``0``. If omitted, defaults to ``0``. You must enable
       this option to work with BI tools like Microsoft SQL Server
       Management Studio that can't support variable length string data
       with unknown maximum length. 

**Example:**

.. code-block:: sh

   [ODBC Data Sources]
   MongoDB_Atlas_SQL = "MongoDB Atlas SQL ODBC Driver"

   [MongoDB_Atlas_SQL]
   Password = your_password
   Driver = /usr/local/lib/mongoodbc/bin/libatsql.so
   Database = sample_mflix
   User = your_username
   Uri = mongodb://datalake.region.a.query.mongodb.net/?ssl=true
   UnicodeTranslationOption = utf16
