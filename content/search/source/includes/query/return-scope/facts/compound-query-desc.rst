The following query uses the :ref:`compound-ref` to search multiple
levels of nested ``embeddedDocuments`` fields in the same query: 

- Must match``funding_rounds.raised_currency_code`` with ``USD``
- Should match ``funding_rounds.investments.financial_org.name`` with
  ``Trinity Ventures`` 

It returns all the stored fields inside the ``funding_rounds`` array
of objects, including fields in the ``funding_rounds.investments``. It
limits the number of results to only ``5`` ``funding_rounds`` documents. 