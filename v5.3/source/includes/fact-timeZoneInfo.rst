The full path from which to load the time zone database. If this option
is not provided, then MongoDB will use its built-in time zone database.

The configuration file included with Linux and macOS packages sets the
time zone database path to ``/usr/share/zoneinfo`` by default.

The built-in time zone database is a copy of the `Olson/IANA time zone
database <https://www.iana.org/time-zones>`_. It is updated along with
MongoDB releases, but the time zone database release cycle
differs from the MongoDB release cycle. The most recent release of
the time zone database is available on our `download site
<https://downloads.mongodb.org/olson_tz_db/timezonedb-latest.zip>`_.

