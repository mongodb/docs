The user specified in the connection string must have, at a minimum, the
:atlasrole:`atlasAdmin` role.

.. note:: 

   To use ``mongosync`` in the :ref:`reverse direction <c2c-api-reverse>`,
   you must :atlas:`create a custom role 
   </reference/api/custom-roles-create-a-role>` that grants the
   following ActionTypes:
   
   - :authaction:`setUserWriteBlockMode`
   - :authaction:`bypassWriteBlockingMode`
   
   The ``setUserWriteBlockMode`` and ``bypassWriteBlockingMode``
   ActionTypes are available starting in MongoDB 6.0. To create the custom
   roles, all clusters in a project must be on MongoDB 6.0 or higher.

