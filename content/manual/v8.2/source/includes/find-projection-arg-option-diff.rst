You can specify projection in two ways for :method:`~db.collection.find()` 
and :method:`~db.collection.findOne()`:

- Setting the ``projection`` parameter
- Setting the ``options`` parameter to ``projection``

If you specify both parameters, the ``projection`` parameter takes precedence. To use 
``options.projection``, set the ``projection`` parameter to ``null`` or 
``undefined``.