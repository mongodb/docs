If you select :guilabel:`CSV`, you can expand the
:guilabel:`Advanced CSV Format` dropdown and toggle the
following option:

.. list-table::
   :header-rows: 1
   :widths: 30, 70

   * - Option
     - Description

   * - :guilabel:`Escape formulae in data`
     - Adds a leading single quote (``'``) to any string value that
       begins with ``=``, ``+``, ``-``, or ``@``. Escaping
       these characters keeps the values as literal text.

       |compass-short| selects this option by default. MongoDB
       recommends that you keep it selected for datasets that contain
       user-provided data.
