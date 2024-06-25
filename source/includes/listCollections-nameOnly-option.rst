Optional. A flag to indicate whether the command should return just the
name and type or return both the name and other information.

Returning just the name and type (``view``, ``collection``, or 
``timeseries``) does not take collection-level locks whereas 
returning full collection information locks each collection in the 
database.

The default value is ``false``.

.. note::

    When ``nameOnly`` is ``true``, your ``filter`` expression can only
    filter based on a collection's name and type. No other fields are
    available.