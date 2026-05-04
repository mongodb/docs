..
  NOTE TO WRITERS
  This content is based on
  https://github.com/10gen/docs-cloud-manager/blob/master/source/includes/steps-register-oidc-application.rst
  https://www.mongodb.com/docs/cloud-manager/tutorial/workforce-oidc/

.. procedure::
   :style: normal

   .. step:: Register a new application for MongoDB

      Select :guilabel:`public client/native application` as the client type.

   .. step:: Set the :guilabel:`Redirect URL` value to ``http://localhost:27097/redirect``

   .. step:: (Conditional) Add or enable a :guilabel:`groups` claim if you authenticate with groups

      For groups, this step ensures that your access tokens contain the group 
      membership information of the user authenticating. MongoDB uses the 
      values sent in a groups claim for authorization.

   .. step:: (Optional) Allow refresh tokens if you want MongoDB clients to
             refresh the tokens for a better user experience

   .. step:: (Optional) Configure the access token lifetime (``exp`` claim) to align with
             your database connection session time

After you register your application, save the ``issuer``, 
``clientId``, and ``audience`` values to use in the next stage of the
configuration.