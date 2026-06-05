The following query uses the :ref:`range-ref` to query the
``funding_rounds.raised_amount`` field for amount greater than and
equal to ``5000000`` and less than and equal to ``10000000``. It sets
the query scope as ``funding_rounds`` field using the ``returnScope``
option. It groups the matching ``funding_rounds`` under each parent
company by using the ``searchRootDocumentId`` meta field as the group
key and computes the average ``raised_amount`` per company in the
``avgRaisedAmount`` field. It sorts the results by
``avgRaisedAmount`` in descending order and limits the number of
results to ``10`` companies.
