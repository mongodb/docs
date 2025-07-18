.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 20

   * - Sync Type
     - Minimum Destination Privileges

   * - Default
     - .. literalinclude:: /code-examples/includes/minimum-destination-privileges/1.js
          :language: javascript

   * - Write Blocking
     - Everything from the default destination privileges.
  
   * - Reversing
     - Everything from the default source privileges and the default destination
       privileges with the addition of:

       .. literalinclude:: /code-examples/includes/minimum-destination-privileges/2.js
          :language: javascript

   * - Multiple Reversals
     - Everything from the default source privileges and the default destination
       privileges with the addition of:

       .. literalinclude:: /code-examples/includes/minimum-destination-privileges/3.js
          :language: javascript

