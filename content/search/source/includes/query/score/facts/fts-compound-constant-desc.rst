- ``filter`` clause with the :ref:`range <range-ref>` operator to
  search for movies between the years ``2013`` to ``2015``.
- ``should`` clause with the :ref:`text <text-ref>` operator to query
  for the term ``snow`` in the ``title`` field and alter the
  ``score`` with the ``constant`` option. The ``constant`` option
  replaces all score results for the search term with ``5``.
