Starting in MongoDB 5.1, when a document fails :ref:`schema validation
<schema-validation-overview>`, MongoDB includes the validation ``title``
and ``description`` in the error response. You can use these fields to
provide an explanation of the validation when the rules are not
immediately clear, such as when using regular expressions.
