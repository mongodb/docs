
The user specified in the connection string must have, at a minimum, the
:authrole:`readAnyDatabase`, :authrole:`clusterMonitor`, and
:authrole:`backup` roles.

.. note:: 

   To use ``mongosync`` in the :ref:`reverse direction <c2c-api-reverse>`,
   you must create a custom role (using the :dbcommand:`createRole` command)
   that grants the following ActionTypes:
   
   - :authaction:`setUserWriteBlockMode`
   - :authaction:`bypassWriteBlockingMode`
   
   The ``setUserWriteBlockMode`` and ``bypassWriteBlockingMode``
   ActionTypes are available starting in MongoDB 6.0. To create the custom
   roles, all clusters in a project must be on MongoDB 6.0 or higher.
