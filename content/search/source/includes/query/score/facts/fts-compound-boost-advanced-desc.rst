- ``must`` clause with the :ref:`text <text-ref>` operator to prioritize
  the genre ``comedy`` the most, followed by the term ``snow`` in the
  ``title`` field. The ``boost`` option applies weights to the fields.
- ``should`` clause with the :ref:`range <range-ref>` operator to search
  for movies between the years ``2013`` to ``2015``.

.. note::

   The ``boost`` option applies different weights to the fields to
   prioritize the fields.
