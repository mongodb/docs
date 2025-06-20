.. _custom-jwt-authentication-okta:

====================================
Okta JWT Authentication (Custom JWT)
====================================

.. contents:: On this page
   :depth: 1

You can configure the :ref:`Custom JWT authentication provider
<custom-jwt-authentication>` to authenticate users that you manage with
`Okta <https://www.okta.com/>`__.

Before You Begin
----------------

You will need the following to use Okta:

- An Okta project. To learn more, refer to the `Okta documentation
  <https://developer.okta.com/>`__.

- An App Services App that does not already use Custom JWT
  authentication. To learn how to create a new App Services App, see
  :ref:`Create an App <create-app>`.

- If you're using the command line interface, you need :ref:`realm-cli
  <realm-cli>` to be installed and authenticated on your local system.

- If you're using the Admin API, you need a MongoDB Atlas Admin API
  :atlas:`public/private key pair
  </configure-api-access/#std-label-atlas-prog-api-key>`. The API key
  must have :ref:`Project Owner <project-roles>` permissions.

Create an Okta App & Authorization Server
-----------------------------------------

Create an application in Okta that represents your client application.
The type of application you create depends on your use case. For
example, if you're building a web browser app, you might create a
Single-Page Application (SPA) or Web application in Okta.

Once you've configured the application, create an authorization server
in Okta that represents your App Services App. You can use any name and
description. Set the server :guilabel:`Audience` to your App Services
App's Client App ID. For example, ``myapp-abcde``.

To learn more about how to set up an Okta application and authorization
server, refer to `Create an authorization server
<https://developer.okta.com/docs/guides/customize-authz-server/main/>`__
in the Okta documentation.

Configure the Custom JWT authentication provider
------------------------------------------------

You can configure Custom JWT authentication from the UI or by modifying
the underlying configuration files directly with the CLI or Admin API.
Choose your preferred method below.

.. tabs-realm-admin-interfaces::

   .. tab:: App Services UI
      :tabid: ui

      In the left navigation menu, click :guilabel:`Authentication`.
      Then click the :guilabel:`Authentication Providers` tab and select
      the :guilabel:`Custom JWT` provider.

      Now you can configure the Custom JWT authentication provider to
      work with your Okta project.

      1. Click the toggle to enable the provider.

      #. Set :guilabel:`Verification Method` to :guilabel:`Use a JWK
         URI`. Specify your Okta Authorization Server's JWK URI in the
         :guilabel:`JWK URI` field.

         Your Okta JWK URI should resemble the following:

         .. code-block::

            https://<Your Okta Domain>/oauth2/<Your Authorization Server ID>/v1/keys

         .. note::

            You can get your exact JWK URI from the Okta UI by following
            the :guilabel:`Metadata URI` link for your Authorization
            server. Use the value listed in the ``jwks_uri`` field.

      #. Define :guilabel:`Metadata Fields` to map data from the Okta
         JWT to the corresponding App Services user account.

         You do not have to map metadata fields from the Okta JWT.
         However, you might find them useful for getting user
         information from Okta into your App. To learn more about
         metadata fields and how to configure them, see :ref:`Custom JWT
         metadata fields
         <custom-jwt-authentication-configuration-metadata-fields>` .

      #. Leave the value of :guilabel:`Audience` blank.

      #. Click :guilabel:`Save` and deploy your changes

   .. tab:: App Services CLI
      :tabid: cli

      Run the following command, replacing the value of ``--remote``
      with your App's Client App ID. This downloads a local copy of your
      App's latest configuration files and navigates to the
      configuration file directory, which uses the same name as your
      App.

      .. code-block:: bash

         realm-cli pull --remote "myapp-abcde"
         cd myapp

      Add a new Custom JWT authentication provider to your App's
      ``/auth/providers.json`` file. Use the following configuration as
      a template. Make sure to:

      - Replace the ``jwkURI`` value with your Okta Authorization
        Server's JWK URI.

      - Define :ref:`Custom JWT metadata fields
        <custom-jwt-authentication-configuration-metadata-fields>` to
        map data from the Okta JWT. This is optional, however, you might
        find the field mapping useful for getting user information from
        Okta into your App.


        .. code-block:: json

          {
            "custom-token": {
              "name": "custom-token",
              "type": "custom-token",
              "disabled": false,
              "config": {
                "audience": [],
                "jwkURI": "https://<Your Okta Domain>/oauth2/<Your Authorization Server ID>/v1/keys",
                "useJWKURI": true
              },
              "secret_config": {
                "signingKeys": []
              },
              "metadata_fields": []
            }
          }

      Save your changes to ``/auth/providers.json``. Then, push the
      updated configuration file to deploy your App:

      .. code-block:: bash

         realm-cli push

   .. tab:: Admin API
      :tabid: api

      Add a new Custom JWT authentication provider to your App using the
      :admin-api-endpoint:`Create an authentication provider
      <tag/adminCreateAuthProvider>` endpoint.

      Use the following configuration as a template. Make sure to:

      - Specify your App's ``$PROJECT_ID`` and ``$APP_ID``

      - Include an Admin API access token in the ``Authorization``
        header.

      - Replace the ``jwkURI`` value in the request body with your Okta
        Authorization Server's JWK URI.

      - Define :ref:`Custom JWT metadata fields
        <custom-jwt-authentication-configuration-metadata-fields>` to
        map data from the Okta JWT. This is optional, however, you might
        find the field mapping useful for getting user information from
        Okta into your App.

        .. code-block:: bash

           curl "https://realm.mongodb.com/api/admin/v3.0/groups/$PROJECT_ID/apps/$APP_ID/auth_providers" \
             -X "POST" \
             -H "Authorization: Bearer $ACCESS_TOKEN" \
             -H "Content-Type: application/json" \
             -d '{
               "name": "custom-token",
               "type": "custom-token",
               "disabled": false,
               "config": {
                 "audience": [],
                 "jwkURI": "https://<Your Okta Domain>/oauth2/<Your Authorization Server ID>/v1/keys",
                 "useJWKURI": true
               },
               "secret_config": {
                 "signingKeys": []
               },
               "metadata_fields": []
             }'


Log in with an Okta JWT
-----------------------

Once you've configured the Custom JWT authentication provider to use
Okta, you can log in to your App Services App with an Okta JWT access
token.

#. Log the user into Okta. To learn how, see the relevant `Okta SDK
   documentation <https://developer.okta.com/code/>`__ for your platform
   and programming language.

#. Get the user's Okta access token from the login response.

#. Use the Okta access token to authenticate with Atlas App Services.
   You can :ref:`start a session over HTTP <manage-user-sessions>` or
   log in with an SDK. To learn how, see the docs for your SDK:

   - :ref:`Custom JWT Authentication - Flutter SDK <flutter-login-custom-jwt>`
   - :ref:`Custom JWT Authentication - Java SDK <java-login-custom-jwt>`
   - :ref:`Custom JWT Authentication - Kotlin SDK <kotlin-login-jwt>`
   - :ref:`Custom JWT Authentication - .NET SDK <dotnet-login-custom-jwt>`
   - :ref:`Custom JWT Authentication - Node.js SDK <node-login-custom-jwt>`
   - :ref:`Custom JWT Authentication - React Native SDK <react-native-login-custom-jwt>`
   - :ref:`Custom JWT Authentication - Swift SDK <ios-login-custom-jwt>`
   - :ref:`Custom JWT Authentication - Web SDK <web-login-custom-jwt>`
