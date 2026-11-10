To define the document order for |method| with the:

- :pipeline:`$group` stage, add a :pipeline:`$sort` stage before the
  :pipeline:`$group` stage.

- :pipeline:`$setWindowFields` stage, set the :ref:`sortBy
  <setWindowFields-sortBy>` field.

.. note::

   Although the :pipeline:`$sort` stage passes ordered documents as
   input to the :pipeline:`$group` and :pipeline:`$setWindowFields`
   stages, those stages are not guaranteed to maintain the sort order in
   their own output.

When used with :pipeline:`$setWindowFields`, |method| returns ``null``
for empty :ref:`windows <setWindowFields-window>`. An example empty
window is a ``{ documents: [ -1, -1 ] }`` :ref:`documents
<setWindowFields-documents>` window on the first document of a
:ref:`partition <setWindowFields-partitionBy>`.
