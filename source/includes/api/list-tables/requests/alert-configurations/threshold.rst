.. list-table::
   :widths: 20 14 11 55
   :stub-columns: 1


   * - | ``threshold``
       | ``.operator``
     - string
     - Conditional
     - Operator to apply when checking the current condition against
       the ``threshold`` value. |service| accepts the following values:

       - ``GREATER_THAN``
       - ``LESS_THAN``

   * - | ``threshold``
       | ``.threshold``
     - integer
     - Conditional
     - Value of the ``threshold`` outside of which triggers an alert.
