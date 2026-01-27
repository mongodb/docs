.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 30

   * - Sync Type
     - Minimum Source Privileges

   * - Default
     - .. literalinclude:: /code-examples/includes/minimum-source-privileges/1.js
          :language: javascript

   * - Write-blocking
     - Everything from the default source privileges with the addition of:
       
       .. literalinclude:: /code-examples/includes/minimum-source-privileges/2.js
          :language: javascript

   * - Reversing
     - Everything from the default source privileges and the default destination
       privileges. 

   * - Multiple Reversals
     - Everything from the default source privileges and the default destination
       privileges with the addition of:

       .. literalinclude:: /code-examples/includes/minimum-source-privileges/3.js
          :language: javascript

   * - V5.0 Migration
     - .. literalinclude:: /code-examples/includes/minimum-source-privileges/4.js
          :language: javascript

