.. list-table::
   :widths: 15 10 65 10
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description
     - Default

   * - ``pretty``
     - boolean
     - Flag indicating whether the response body should be in a
       :wikipedia:`prettyprint </Prettyprint?oldid=791126873>` format.
     - ``false``

   * - ``envelope``
     - boolean
     - Flag indicating whether or not to wrap the response in an
       envelope.

       Some API clients cannot access the HTTP response headers or
       status code. To remediate this, set ``envelope=true`` in the
       query.

       For endpoints that return one result, the response body
       includes:

       .. list-table::
          :widths: 15 85
          :header-rows: 1
          :stub-columns: 1

          * - Name
            - Description

          * - ``status``
            - |http| response code
          * - ``envelope``
            - Expected response body

     - ``false``

   * - ``includeDeletedOrgs``
     - boolean
     - Flag indicating whether the response body contains deleted
       organizations.

       |mms| honors the value of this parameter only if the user who
       makes the request has a :ref:`global role <global-roles>`. 
      
       If set to ``true`` or omitted, users assigned a :ref:`global
       role <global-roles>` receive deleted projects in the response.
       If set to ``false`` or if the user does not have a global owner
       role, the response does not contain deleted organizations.
     - ``true``
