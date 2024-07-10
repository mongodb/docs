Allows you to sort an embedded array and limit the amount of entries 
in that array. You can apply only a sort, only a limit, or both. When 
limiting to a single entry, there is the option to embed as a document 
instead of a single-element array by selecting the 
:guilabel:`Create an array of primitive values` :icon-fa5:`check-square`.

a. On the :guilabel:`Mappings` pane, click the :icon-fa5:`chevron-left` 
   icon next to :guilabel:`Advanced settings`.
#. Select the :guilabel:`Add array conditions` :icon-fa5:`check-square`
   icon.
#. Enter a filter in the :guilabel:`Value expression` text box.
#. In the :guilabel:`Sort by and order` heading, select the source 
   field to sort on and toggle between :icon-lg:`SortAscending` for 
   ascending and :icon-lg:`SortDescending` for descending order.
#. Select a :guilabel:`Limit` option: 

   - :guilabel:`No limit`: No limit
   - :guilabel:`Limit number of rows`: Enter the maximum number of 
     elements returned in the array. Default vaulue is ``10``.
      
.. note::

   - Excluded fields cannot be sorted on. If a previously selected 
     sorting field is excluded at a later point in time, the array 
     condition is removed.

   - If an array is modified during the CDC stage of a continuous 
     job, sorting and limiting considers only the newly modified row
     and the pre-existing array elements, not the other values from 
     the table which are not in the array.
