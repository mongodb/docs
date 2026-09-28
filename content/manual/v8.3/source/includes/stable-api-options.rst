.. list-table::
   :widths: 20,10,70
   :header-rows: 1

   * - |param|
     - Type
     - Description

   * - |apiVersion|
     - string
     - Specifies the API Version. ``"1"`` is
       currently the only supported version.
          
   * - |strict|
     - boolean 
     - If ``true``:
          - Using a command that is not part of the declared API 
            version returns an :ref:`APIStrictError <api-strict-resp>` 
            error.

          - Indexes that are :ref:`unsupported<create-indexes-stable-api>` 
            by the Stable API are ignored by the 
            :ref:`query planner<query-plans-query-optimization>`.
            
       If you specify |strict|, you must also specify |apiVersion|.  

       If not specified, defaults to ``false``. 

   * - |deprecation|
     - boolean
     - If ``true``, using a command or behavior that is deprecated 
       in the specified API version returns an 
       :ref:`APIDeprecationError <api-deprecation-resp>`. If you specify
       |deprecation|, you must also specify |apiVersion|.

       If not specified, defaults to ``false``. 