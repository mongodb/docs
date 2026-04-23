The ``explain`` response is a |bson| document with keys and values 
describing the execution statistics for the query. The ``explain`` 
document in the result set contains the following fields: 

.. list-table:: 
   :header-rows: 1
   :widths: 15 15 10 60

   * - Field 
     - Type 
     - Necessity 
     - Purpose

   * - ``path``
     - string 
     - Optional 
     - Path to the queried embedding field, only if it isn't the root.

   * - ``type``
     - string 
     - Required 
     - Name of the type of vector search query. See 
       ``query`` for more information.

   * - ``args``
     - document 
     - Required
     - Vector search query information. See ``query`` for more information.

   * - ``stats``
     - document
     - Optional 
     - :ref:`avs-explain-timing-breakdown` for the query if ``explain`` 
       ran with ``executionStats`` or ``allPlansExecution`` 
       verbosity.
