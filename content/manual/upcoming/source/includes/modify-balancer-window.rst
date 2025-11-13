-  Set the ``activeWindow`` parameter.

   Using ``activeWindow`` sets the balancing window to be the same everyday.
   Set the ``activeWindow`` using :method:`~db.collection.updateOne()`:

   .. literalinclude:: /code-examples/tested/command-line/mongosh/cluster/balancer/set-daily-window.js
      :language: shell
      :copyable: true
      :category: syntax examples

   Replace ``<start-time>`` and ``<end-time>`` with time values using
   two digit hour and minute values (i.e. ``HH:MM``) that specify the
   beginning and end boundaries of the balancing window.

   -  For ``HH`` values, use hour values ranging from ``00`` - ``23``.
   -  For ``MM`` value, use minute values ranging from ``00`` - ``59``.

-  Set the ``activeWindowDOW`` parameter.

   ``activeWindowDOW`` allows you to specify balancing windows for different 
   days of the week. Set the ``activeWindowDOW`` using :method:`~db.collection.updateOne()`.

   For example, to set the balancing window to be from 9:00am to 5:00pm from
   Monday to Friday, and all day on Saturday and Sunday, you would run the
   following:

   .. literalinclude:: /code-examples/tested/command-line/mongosh/cluster/balancer/set-weekday-window.js
      :language: shell
      :copyable: true
      :category: syntax examples

   To set the balancing window to be overnight from 10:00pm to 6:00am everyday,
   you would set multiple windows per day:

   .. literalinclude:: /code-examples/tested/command-line/mongosh/cluster/balancer/set-overnight-window.js
      :language: shell
      :copyable: true
      :category: syntax examples

   If you set both ``activeWindow`` and ``activeWindowDOW``, the balancer will
   only be active for the windows configured using ``activeWindowDOW``.
   The balancer ignores ``activeWindow``.

