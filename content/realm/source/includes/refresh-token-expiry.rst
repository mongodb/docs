Refresh tokens expire after a set period of time. 
When the refresh token expires, the access token can no longer be
refreshed and the user must log in again.

If the refresh token expires after the realm is open, the device will not 
be able to sync until the user logs in again.
Your sync error handler should implement logic that catches a token expired 
error when attempting to sync, then redirect users to a
login flow.

For information on configuring refresh token expiration, refer to 
:ref:`<manage-user-sessions>` in the App Services documentation.
