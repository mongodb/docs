The preceding index definition configures |fts| to: 

- Index the ``funding_rounds`` and ``funding_rounds.investments`` fields
  as the ``embeddedDocuments`` type. 
- Index all the dynamically indexable fields nested in the
  ``funding_rounds`` and ``funding_rounds.investments`` array of objects. 
- Store the following fields on ``mongot``:

  - ``funding_rounds.round_code``
  - ``funding_rounds.raised_currency_code``
  - ``funding_rounds.raised_amount``
  - ``funding_rounds.investments.person``
  - ``funding_rounds.investments.financial_org``

You can use the :ref:`embedded-document-ref` to perform element-wise
querying on both the ``funding_rounds`` and
``funding_rounds.investments`` fields. The following sections
demonstrate some sample queries that use the ``returnScope`` option to
retrieve the ``embeddedDocuments`` fields as individual documents. 