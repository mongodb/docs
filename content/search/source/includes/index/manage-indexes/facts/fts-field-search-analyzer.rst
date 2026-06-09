Specifies the :ref:`analyzer <analyzers-ref>` to apply to query
text before searching the text. If you omit this field, the index
inherits an analyzer by default in the following order:

a. The ``analyzer`` option for this field if specified.

#. The ``searchAnalyzer`` option for the :ref:`index
   <ref-index-definitions>` if specified.

#. The ``analyzer`` option for the :ref:`index
   <ref-index-definitions>` if specified.

#. The ``lucene.standard`` analyzer.
