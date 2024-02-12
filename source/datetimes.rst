Datetimes and Timezones
=======================

.. code-block:: python

   import datetime
   from pymongo import MongoClient
   from bson.codec_options import CodecOptions

   client = MongoClient()
   client.drop_database("dt_example")
   db = client.dt_example

These examples show how to handle Python :py:class:`datetime.datetime` objects
correctly in PyMongo.

Basic Usage
-----------

PyMongo uses :py:class:`datetime.datetime` objects for representing dates and times
in MongoDB documents. Because MongoDB assumes that dates and times are in UTC,
care should be taken to ensure that dates and times written to the database
reflect UTC. For example, the following code stores the current UTC date and
time into MongoDB:

.. code-block:: python

   >>> result = db.objects.insert_one(
   ...     {"last_modified": datetime.datetime.now(tz=datetime.timezone.utc)}
   ... )

Always use :py:meth:`datetime.datetime.now(tz=datetime.timezone.utc)`, which explicitly returns the current time in
UTC, instead of :py:meth:`datetime.datetime.now`, with no arguments, which returns the current local
time. Avoid doing this:

.. code-block:: python

   >>> result = db.objects.insert_one({"last_modified": datetime.datetime.now()})

The value for ``last_modified`` is very different between these two examples, even
though both documents were stored at around the same local time. This will be
confusing to the application that reads them:

.. code-block:: python

   >>> [doc["last_modified"] for doc in db.objects.find()]
   [datetime.datetime(2015, 7, 8, 18, 17, 28, 324000),
    datetime.datetime(2015, 7, 8, 11, 17, 42, 911000)]

:py:class:`bson.codec_options.CodecOptions` has a ``tz_aware`` option that enables
"aware" :py:class:`datetime.datetime` objects, i.e., datetimes that know what
timezone they're in. By default, PyMongo retrieves naive datetimes:

.. code-block:: python

   >>> result = db.tzdemo.insert_one({"date": datetime.datetime(2002, 10, 27, 6, 0, 0)})
   >>> db.tzdemo.find_one()["date"]
   datetime.datetime(2002, 10, 27, 6, 0)
   >>> options = CodecOptions(tz_aware=True)
   >>> db.get_collection("tzdemo", codec_options=options).find_one()["date"]
   datetime.datetime(2002, 10, 27, 6, 0,
                     tzinfo=<bson.tz_util.FixedOffset object at 0x10583a050>)

Saving Datetimes with Timezones
-------------------------------

When storing :py:class:`datetime.datetime` objects that specify a timezone
(i.e. they have a ``tzinfo`` property that isn't ``None``), PyMongo will convert
those datetimes to UTC automatically:

.. code-block:: python

   >>> import pytz
   >>> pacific = pytz.timezone("US/Pacific")
   >>> aware_datetime = pacific.localize(datetime.datetime(2002, 10, 27, 6, 0, 0))
   >>> result = db.times.insert_one({"date": aware_datetime})
   >>> db.times.find_one()["date"]
   datetime.datetime(2002, 10, 27, 14, 0)

Reading Time
------------

As previously mentioned, by default all :py:class:`datetime.datetime` objects
returned by PyMongo will be naive but reflect UTC (i.e. the time as stored in
MongoDB). By setting the ``tz_aware`` option on
:py:class:`~bson.codec_options.CodecOptions`, :py:class:`datetime.datetime` objects
will be timezone-aware and have a ``tzinfo`` property that reflects the UTC
timezone.

PyMongo 3.1 introduced a ``tzinfo`` property that can be set on
:py:class:`~bson.codec_options.CodecOptions` to convert :py:class:`datetime.datetime`
objects to local time automatically. For example, if we wanted to read all times
out of MongoDB in US/Pacific time:

   >>> from bson.codec_options import CodecOptions
   >>> db.times.find_one()['date']
   datetime.datetime(2002, 10, 27, 14, 0)
   >>> aware_times = db.times.with_options(codec_options=CodecOptions(
   ...     tz_aware=True,
   ...     tzinfo=pytz.timezone('US/Pacific')))
   >>> result = aware_times.find_one()
   datetime.datetime(2002, 10, 27, 6, 0,
                     tzinfo=<DstTzInfo 'US/Pacific' PST-1 day, 16:00:00 STD>)

.. _handling-out-of-range-datetimes:

Handling out of range datetimes
-------------------------------

Python's :py:class:`~datetime.datetime` can only represent datetimes within the
range allowed by
:attr:`~datetime.datetime.min` and :attr:`~datetime.datetime.max`, whereas
the range of datetimes allowed in BSON can represent any 64-bit number
of milliseconds from the Unix epoch. To deal with this, we can use the
:py:class:`bson.datetime_ms.DatetimeMS` object, which is a wrapper for the
:py:class:`int` built-in.

To decode UTC datetime values as :py:class:`~bson.datetime_ms.DatetimeMS`,
:py:class:`~bson.codec_options.CodecOptions` should have its
``datetime_conversion`` parameter set to one of the options available in
:py:class:`bson.datetime_ms.DatetimeConversion`. These include
:attr:`~bson.datetime_ms.DatetimeConversion.DATETIME`,
:attr:`~bson.datetime_ms.DatetimeConversion.DATETIME_MS`,
:attr:`~bson.datetime_ms.DatetimeConversion.DATETIME_AUTO`,
:attr:`~bson.datetime_ms.DatetimeConversion.DATETIME_CLAMP`.
:attr:`~bson.datetime_ms.DatetimeConversion.DATETIME` is the default
option and has the behavior of raising an :py:class:`~builtin.OverflowError` upon
attempting to decode an out-of-range date.
:attr:`~bson.datetime_ms.DatetimeConversion.DATETIME_MS` will only return
:py:class:`~bson.datetime_ms.DatetimeMS` objects, regardless of whether the
represented datetime is in- or out-of-range:

.. code-block:: python

    >>> from datetime import datetime
    >>> from bson import encode, decode
    >>> from bson.datetime_ms import DatetimeMS
    >>> from bson.codec_options import CodecOptions, DatetimeConversion
    >>> x = encode({"x": datetime(1970, 1, 1)})
    >>> codec_ms = CodecOptions(datetime_conversion=DatetimeConversion.DATETIME_MS)
    >>> decode(x, codec_options=codec_ms)
    {'x': DatetimeMS(0)}

:attr:`~bson.datetime_ms.DatetimeConversion.DATETIME_AUTO` will return
:py:class:`~datetime.datetime` if the underlying UTC datetime is within range,
or :py:class:`~bson.datetime_ms.DatetimeMS` if the underlying datetime
cannot be represented using the builtin Python :py:class:`~datetime.datetime`:

.. code-block:: python

    >>> x = encode({"x": datetime(1970, 1, 1)})
    >>> y = encode({"x": DatetimeMS(-(2**62))})
    >>> codec_auto = CodecOptions(datetime_conversion=DatetimeConversion.DATETIME_AUTO)
    >>> decode(x, codec_options=codec_auto)
    {'x': datetime.datetime(1970, 1, 1, 0, 0)}
    >>> decode(y, codec_options=codec_auto)
    {'x': DatetimeMS(-4611686018427387904)}

:attr:`~bson.datetime_ms.DatetimeConversion.DATETIME_CLAMP` will clamp
resulting :py:class:`~datetime.datetime` objects to be within
:attr:`~datetime.datetime.min` and :attr:`~datetime.datetime.max`
(trimmed to ``999000`` microseconds):

.. code-block:: python

    >>> x = encode({"x": DatetimeMS(2**62)})
    >>> y = encode({"x": DatetimeMS(-(2**62))})
    >>> codec_clamp = CodecOptions(datetime_conversion=DatetimeConversion.DATETIME_CLAMP)
    >>> decode(x, codec_options=codec_clamp)
    {'x': datetime.datetime(9999, 12, 31, 23, 59, 59, 999000)}
    >>> decode(y, codec_options=codec_clamp)
    {'x': datetime.datetime(1, 1, 1, 0, 0)}

:py:class:`~bson.datetime_ms.DatetimeMS` objects have support for rich comparison
methods against other instances of :py:class:`~bson.datetime_ms.DatetimeMS`.
They can also be converted to :py:class:`~datetime.datetime` objects with
:py:meth:`~bson.datetime_ms.DatetimeMS.to_datetime()`.
