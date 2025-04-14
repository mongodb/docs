.. warning::

   MongoDB uses the third party `timelib
   <https://github.com/derickr/timelib>`_ library to provide accurate
   conversions between timezones. Due to a recent update, ``timelib``
   could create inaccurate time zone conversions in older versions of
   MongoDB.

   To explicitly link to the time zone database in versions of MongoDB
   prior to 5.0, download the `time zone database
   <https://downloads.mongodb.org/olson_tz_db/timezonedb-latest.zip>`_.
   and use the :option:`timeZoneInfo <mongod --timeZoneInfo>` parameter.

