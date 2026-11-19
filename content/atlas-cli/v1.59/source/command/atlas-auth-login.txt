.. _atlas-auth-login:

================
atlas auth login
================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Authenticate with MongoDB Atlas.

This command allows you to authenticate with MongoDB Atlas using User Account, Service Account, or API Key authentication methods.

Note: If you have credentials set in environment variables, they take precedence over the values you provide during authentication. To learn more, see https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-env-variables/#precedence.

To log in non-interactively, set --authType, --output, and the credential flags that type requires (--clientId and --clientSecret for ServiceAccount, or --publicApiKey and --privateApiKey for APIKeys). Using any one of these flags without the others needed to complete the flow returns an error instead of prompting.

Without --orgId or --projectId, a default is saved only if the credentials can access exactly one organization or project.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas auth login [options]

.. Code end marker, please don't delete this comment

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --authType
     - string
     - false
     - Authentication type to use. Valid values are UserAccount, ServiceAccount, or APIKeys. If set, skips the authentication type prompt.
   * - --clientId
     - string
     - false
     - Service Account client ID. Must be set together with --clientSecret, --authType, and --output. If all are set, skips the credential prompt.
   * - --clientSecret
     - string
     - false
     - Service Account client secret. Must be set together with --clientId, --authType, and --output. If all are set, skips the credential prompt.
   * - --gov
     -
     - false
     - Log in to Atlas for Government.
   * - -h, --help
     -
     - false
     - help for login
   * - --noBrowser
     -
     - false
     - Don't automatically open a browser session.
   * - --orgId
     - string
     - false
     - Organization ID to save as the profile default. If set, skips the organization prompt.
   * - -o, --output
     - string
     - false
     - Default output format to save to the profile. Valid values are plaintext or json. If set, skips the output format prompt.
   * - --privateApiKey
     - string
     - false
     - Private API key. Must be set together with --publicApiKey, --authType, and --output. If all are set, skips the credential prompt.
   * - --projectId
     - string
     - false
     - Project ID to save as the profile default. If set, skips the project prompt.
   * - --publicApiKey
     - string
     - false
     - Public API key. Must be set together with --privateApiKey, --authType, and --output. If all are set, skips the credential prompt.

Inherited Options
-----------------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -P, --profile
     - string
     - false
     - Name of the profile to use from your configuration file. To learn about profiles for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-save-connection-settings.

Examples
--------

.. code-block::
   :copyable: false

   # Log in to your MongoDB Atlas account in interactive mode:
   atlas auth login


.. code-block::
   :copyable: false

   # Log in non-interactively with a Service Account:
   atlas auth login --authType ServiceAccount --clientId <clientId> --clientSecret <clientSecret> --output plaintext


.. code-block::
   :copyable: false

   # Log in non-interactively with a Service Account and store the default organization and project:
   atlas auth login --authType ServiceAccount --clientId <clientId> --clientSecret <clientSecret> --output plaintext --orgId <orgId> --projectId <projectId>


.. code-block::
   :copyable: false

   # Log in non-interactively with API Keys:
   atlas auth login --authType APIKeys --publicApiKey <publicApiKey> --privateApiKey <privateApiKey> --output plaintext
