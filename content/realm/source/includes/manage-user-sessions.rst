App Services manages sessions with access tokens and refresh tokens.
Client SDKs supply the logic to manage tokens and provide them with requests.

Realm uses refresh tokens to automatically update a user's access token when 
it expires. However, Realm *does not* automatically refresh the refresh token. 
When the refresh token expires, the SDK can no longer get an updated access 
token and the device cannot sync until the user logs in again.

For more information on managing user sessions and tokens, see :ref:`<user-sessions>`
in the App Services documentation.