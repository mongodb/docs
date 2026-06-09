The following query uses the :ref:`range-ref` to query the
``funding_rounds.raised_amount`` field for amount greater than and
equal to ``5000000`` and less than and equal to ``10000000``. It sets
the query scope as ``funding_rounds`` field using the ``returnScope``
option. It sorts the matching ``funding_rounds`` by ``raised_amount``
in descending order and limits the results to the top ``10`` funding
rounds. It then uses the ``searchRootDocumentId`` meta field to join
each funding round back to its parent company in the ``companies``
collection and returns the company's ``name`` alongside the funding
round's ``round_code``, ``raised_amount``, and ``raised_currency_code``
fields.
