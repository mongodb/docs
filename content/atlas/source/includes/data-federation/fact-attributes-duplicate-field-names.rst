{+adf+} adds partition attributes to documents even when a field
with the same name already exists in the document, which creates
duplicate field names. MongoDB doesn't support :manual:`duplicate
field names </reference/limits/#mongodb-does-not-support-duplicate-field-names>`.
To avoid duplicate field names, set ``omitAttributes`` to ``true``
or use partition attribute names that don't appear in your
documents.
