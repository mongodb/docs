You can create multiple App client instances to connect to multiple
Apps. All App client instances that share the same App ID use the same 
underlying connection.

.. important:: Changing an App Config After Initializing the App
   
   .. versionchanged:: ``realm@12.6.0`` 
      ``baseUrl`` is not cached

   When you initialize the App client, the configuration is cached internally. 
   Attempting to "close" and then re-open an App with a changed configuration
   within the same process has no effect. The client continues to use the 
   cached configuration. 

   Starting with React Native SDK version 12.6.0, the ``baseUrl`` in the ``AppConfiguration``
   is *not* cached. This means that you can change the ``baseUrl``
   and the App client will use the updated configuration. In earlier SDK 
   versions, changes to the ``baseUrl`` in a cached App configuration have no 
   effect.
