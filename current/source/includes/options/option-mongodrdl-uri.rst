.. option:: --uri <mongodb-uri>

   .. versionadded:: 2.12
   
   MongoDB URI connection string.
   
   .. important::
    
      The following command-line options cannot be used in conjunction
      with :option:`--uri` option:
    
      - :option:`--host`
      - :option:`--port`
      - :option:`--db`
      - :option:`--username`
      - :option:`--password` (if the URI connection string also includes
        the password)
      - :option:`--authenticationDatabase`
      - :option:`--authenticationMechanism`
    
      Instead, specify these options as part of your :option:`--uri` 
      connection string.
   

