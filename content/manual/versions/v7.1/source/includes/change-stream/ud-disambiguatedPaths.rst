.. _|idref|-ud-disambiguatedPaths:

A document that provides clarification of ambiguous
field descriptors in ``updateDescription``.  

When the ``update`` change event describes changes on a field where 
the path contains a period (``.``) or where the path includes 
a non-array numeric subfield, the ``disambiguatedPath`` field 
provides a document with an array that
lists each entry in the path to the modified field. 

Requires that you set the :ref:`showExpandedEvents 
<change-streams-expanded-events>` option to ``true``.

.. versionadded:: 6.1


