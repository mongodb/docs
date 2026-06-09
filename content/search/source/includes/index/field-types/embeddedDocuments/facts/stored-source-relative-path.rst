The following index definition automatically indexes all the fields in
the ``funding_rounds`` array of objects for querying. It also uses the
``storedSource`` field to store the ``round_code``,
``raised_currency_code``, and ``raised_amount`` fields on ``mongot``.
This allows you to query these stored fields using any operator that
supports queries against these field types and retrieve these stored
fields inside the parent object (``funding_rounds``) as individual
documents. For a sample query that demonstrates this, see the
:ref:`range-ref`
:ref:`Embedded Documents Example <range-embedded-documents-eg>`. To
query and retrieve other fields in the parent object
(``funding_rounds``), you must use the ``embeddedDocument`` operator.
