The following query uses the :ref:`range-ref` to query the
``funding_rounds.raised_amount`` field for amount greater than and
equal to ``5000000`` and less than and equal to ``10000000``. It sets
the query scope as ``funding_rounds`` field using the ``returnScope``
option. It returns all the stored fields inside the ``funding_rounds``
array of objects, including fields in the
``funding_rounds.investments`` array of objects that were stored using
the ``returnStoredSource`` option. It limits the number of results to
only ``5`` ``funding_rounds`` documents. 