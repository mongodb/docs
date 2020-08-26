.. option:: --auth

   Requires authentication for incoming client requests.
   
   .. important::
   
     .. versionchanged:: 2.4.0
   
     When authentication is enabled, admin credentials must be provided
     with the :option:`--mongo-username <mongosqld --mongo-username>`
     and :option:`--mongo-password <mongosqld --mongo-password>`
     options or the :setting:`mongodb.net.auth.username` and
     :setting:`mongodb.net.auth.password` settings in the
     :ref:`configuration file <config-format>`.
   
     ``mongosqld`` uses the admin credentials to gather metadata on the
     sampled namespaces and uses the credentials of the connecting client
     to restrict data to only what the client is authorized to read. For
     more information on the required permissions for the admin user, see
     :ref:`cached-sampling-user-permissions`.
   

