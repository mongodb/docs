.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - Service Account
     - API Keys
     
   * - New method of authenticating to |service| using the 
       industry standard {+oauth-2+} protocol with the `Client Credentials flow <https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/>`__. 
     - Legacy method of authenticating to |service| that uses 
       {+http-digest+}.

   * - A service account lets you manage permissions and create access tokens. A      
       service account has a client ID and a secret that function as a username 
       and a password for creating access tokens. An access token lets you 
       :ref:`make API requests <example-api-request>` to |service|.
     - |api| keys have two parts: a Public Key and a Private Key. These 
       two parts serve the same function as a username and a password when you 
       :ref:`make API requests <example-api-request>` to |service|.

   * - After you create a service account, you'll use its client ID and secret to 
       generate an access token, which authenticates your |api| requests.
       Access tokens are only valid for 1 hour (3600 seconds) per the 
       {+oauth-2+} specification. Expiration of access tokens prevents 
       replay attacks, where a leaked access token could be used without a time restriction.
     - |service| hashes the Public Key and Private Key using a unique value called 
       a **nonce**.  
       The nonce is only valid for a short amount of time as per the 
       {+http-digest+} specification. This is to prevent replay 
       attacks, so you can't cache a nonce and use it forever.

   * - |service| :ref:`roles <user-roles>` limit which operations a service account 
       can perform with its access token. You must grant roles to service accounts 
       as you would for users to ensure the access token can call |api| endpoints 
       without errors. 
     - |service| :ref:`roles <user-roles>` limit which operations |api| keys can perform. 
       You must grant roles to 
       |api| keys as you would for users to ensure the |api| keys can call |api| 
       endpoints without errors.
     
   * - |service| binds many resources to a project. Many |api| resource
       |url|\s follow the format of ``/api/atlas/<version>/groups/<GROUP-ID>/``, 
       where ``<GROUP-ID>`` is your :ref:`project ID <project-id>`.
       For these resources, the service account must be a member of the
       organization that hosts the project. Otherwise, |service|
       responds with a `401 <https://httpstatuses.com/401>`__ error. To give  
       the organization-level service account access to a project, see :ref:`invite-org-app-api-keys`.
     - |service| binds many resources to a project. Many |api| resource
       |url|\s follow the format of ``/api/atlas/<version>/groups/<GROUP-ID>/``, 
       where ``<GROUP-ID>`` is your :ref:`project ID <project-id>`.
       For these resources, the |api| keys must be a member of the
       organization that hosts the project. Otherwise, |service|
       responds with a `401 <https://httpstatuses.com/401>`__ error. To give  
       the organization-level |api| keys access to a project, see :ref:`invite-org-app-api-keys`.

   * - Each service account belongs to only one organization, but you can grant 
       a service account access to any number of projects in that organization.
     - Each |api| key belongs to only one organization, but you can grant 
       |api| keys access to any number of projects in that 
       organization.

   * - You can't use a service account or its access token to log into |service| 
       through the {+atlas-ui+}.
     - You can't use |api| keys to log into |service| through the {+atlas-ui+}.