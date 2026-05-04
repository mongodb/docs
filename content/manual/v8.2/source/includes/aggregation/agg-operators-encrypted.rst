Encrypted string expressions evaluate an argument against an encrypted
field in a collection with :ref:`{+qe+} <qe-manual-feature-qe>` enabled, and
return a boolean.

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Name
     - Description

   * - :expression:`$encStrContains`

     - Returns ``true`` if a subset of characters in the encrypted string
       match the specified string.

   * - :expression:`$encStrEndsWith`

     - Returns ``true`` if the last characters of the encrypted string match 
       the specified string.

   * - :expression:`$encStrNormalizedEq`

     - Returns ``true`` if the :term:`normalized string` form of the 
       encrypted string matches normalized string form of the specified string.

   * - :expression:`$encStrStartsWith`

     - Returns ``true`` if the first characters of the encrypted string match 
       the specified string.