You can manually test your application's client reset handling by 
:ref:`terminating and re-enabling Device Sync <terminating-realm-sync>`.

When you terminate and re-enable Sync, clients that have previously connected 
with Sync are unable to connect until after they perform a client reset. 
Terminating Sync deletes the metadata from the server that allows the 
client to synchronize. The client must download a new 
copy of the realm from the server. The server sends a client reset error 
to these clients. So, when you terminate Sync, you trigger the client reset condition.

To test client reset handling: 

1. Write data from a client application and wait for it to synchronize.
#. Terminate and re-enable Device Sync. 
#. Run the client app again. The app should get a client reset 
   error when it tries to connect to the server.

.. warning::

    While you iterate on client reset handling in your client application,
    you may need to terminate and re-enable Sync repeatedly. Terminating and 
    re-enabling Sync renders all existing clients unable to 
    sync until after completing a client reset. To avoid this in production, 
    test client reset handling in a development :ref:`environment 
    <app-environment>`.
