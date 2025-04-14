If you have :ref:`{+csfle+} <manual-csfle-feature>` or :ref:`{+qe+} 
<qe-manual-feature-qe>` enabled on a collection, validation is
subject to the following restrictions:

* For {+csfle-abbrev+}, when running :dbcommand:`collMod`, the 
  :ref:`libmongocrypt<qe-reference-libmongocrypt>` library prefers the the JSON
  :ref:`{+enc-schema+} <csfle-fundamentals-create-schema>` specified in the
  command. This enables setting a schema on a collection that does not yet
  have one.

* For {+qe+}, any JSON schema that includes an encrypted field results in a
  query analysis error.