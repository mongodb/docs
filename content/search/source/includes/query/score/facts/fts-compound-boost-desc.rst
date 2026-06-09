- ``must`` clause with the :ref:`range <range-ref>` operator to search
  for movies between the years ``2013`` to ``2015``.
- ``should`` clause with the :ref:`text <text-ref>` operator to query
  for the term ``snow`` in the ``title`` field and alter the
  ``score`` with the ``boost`` option. The ``boost`` option
  multiplies the base score in the results for the search term by ``2``.
