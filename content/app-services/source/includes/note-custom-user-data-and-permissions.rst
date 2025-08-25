.. note::

   When using custom user data for permissions, never allow the client to write
   the custom user data object. Doing so would allow any user to grant
   themselves any permission. Instead, use :ref:`system functions
   <system-functions>` on the server side to update the custom user data object.
