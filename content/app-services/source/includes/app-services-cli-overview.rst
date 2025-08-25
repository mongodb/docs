.. _cli-overview:

Overview
--------

The Atlas App Services Command Line Interface (``{+cli-bin+}``) allows you
to programmatically manage your Applications.

With the {+cli+}, you can create or update Apps from a local directory
as well as export existing applications to a local directory.

.. _install-appservices-cli:

Installation
------------

.. include:: /includes/install-appservices-cli.rst

.. _cli-auth-with-api-token:

Authentication
--------------

To use the {+cli+}, you must authenticate. To authenticate, you must
generate an API Key.

Generate an API Key
~~~~~~~~~~~~~~~~~~~

.. procedure::

   .. step:: Navigate to MongoDB Cloud Access Manager

      The :mms-docs:`MongoDB Cloud Access Manager </tutorial/manage-users>`
      allows you to manage access to your project for users, teams, and API
      Keys. Use the Project Access Manager by clicking the
      :guilabel:`Project Access` tab on the :guilabel:`access manager
      dropdown` on your screen's top left-hand side.

      .. figure:: /images/click-access-manager.png
         :alt: Click Access Manager
         :lightbox:


   .. step:: Create an API Key

      Project Users can log in with a Project API Key. Create a project
      API Key by clicking the grey :guilabel:`Create API Key` button on
      the right-hand side of the Project Access Manager.

      .. figure:: /images/access-manager-create-api-key-button.png
         :alt: Click Access Manager
         :lightbox:

      Clicking this button navigates you to the "Create API Key" screen. Set a
      description for your key.

      For write access, the CLI requires an API key with "Project Owner"
      permissions. For read-only access, you can use "Project Read Only". Use the
      :guilabel:`Project Permissions` dropdown to select the appropriate permissions
      for your use case.

      Copy the public key to use later in order to log in. Click :guilabel:`next` to
      continue configuring your key details.

      .. figure:: /images/configure-api-key.png
         :alt: Click Access Manager
         :lightbox:


   .. step:: Configure Your API Access List

      Copy your Private Key to a safe location for later use. For security,
      the Private Key will not be visible again after initialization.
      Another security feature is the API Access List. Creating an API
      Access List entry ensures that API calls originate from permitted IPs.

      The IP Address of the user who will be using the API Key is required
      to use the key. Click the :guilabel:`Add Access List Entry` button.
      Type in the IP Address or click the :guilabel:`Use Current IP Address`
      buttton and click save.  Finally, click the done button on your screen's
      lower right-hand to finish setting up your API key.

      .. figure:: /images/add-access-list-entry.png
         :alt: Click Access Manager
         :lightbox:

Authenticate with an API Key
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. procedure::

   .. step:: Authenticate a CLI User

      Using your newly created public and private key, log in by running the
      command below.

      .. code-block:: shell

         {+cli-bin+} login --api-key="<my api key>" --private-api-key="<my private api key>"

      You should see the following result:

      .. code-block:: shell

         you have successfully logged in as <your public key>

.. _dot-mdb:

The ``.mdb`` Directory
----------------------

When you use the {+cli+} to push or pull configuration files, the CLI
stores information about the App you're working with in the ``.mdb``
directory of your application config. This allows the CLI to remember a
specific deployment that your configuration files are associated with
across multiple commands.

This directory is machine generated and you typically should not
manually modify it. If you delete the ``.mdb`` directory, the CLI will
no longer be able to associate your configuration files with a specific
deployment. The CLI creates a new ``.mdb`` directory when you run a
command that targets a specific deployment.

The CLI stores identifiers and configuration metadata in the
``.mdb/meta.json`` file, which has the following format:

.. code-block:: json

   {
     "config_version": 20230101,
     "app_id": "42249d526d97af5a287c1eae",
     "group_id": "4b2cf422930196872221a2d4",
     "client_app_id": "myapp-abcde"
   }

.. list-table::
   :header-rows: 1

   * - Field
     - Description

   * - | ``config_version``
       | ``number``

     - The configuration file format version that all configuration
       files in the directory conform to. This is used to ensure that
       the CLI can read the configuration files.

   * - | ``app_id``
       | ``string``
     - The App's internal ObjectId value.

   * - | ``group_id``
       | ``string``
     - The Atlas Project ID that the App is associated with.

   * - | ``client_app_id``
       | ``string``
     - The human-readable Client App ID.

.. _cli-profiles:

CLI Profiles
------------

The CLI stores information about its users in a profile. This lets you
run commands in a given context. For example, when you log in with
an Atlas Admin API Key, the CLI stores the API Key and the current
session access token. Then it reuses that token for subsequent commands
until it expires.

You can set up multiple named profiles and choose a profile to use for
any given CLI command. If you don't specify one, the CLI uses the
**default profile**, which is a profile named ``default``.

To specify a profile, add the ``--profile`` argument on any command. For
example, to log in with a new profile named ``my-profile``,
run the following:

.. code-block::

   {+cli-bin+} login --profile my-profile

Once logged in, you can run other commands with the same profile:

.. code-block::

   {+cli-bin+} pull --remote=myapp-abcde --profile my-profile

You can list all profiles on your system with a CLI command:

.. io-code-block::

   .. input::
      :language: shell

      {+cli-bin+} profiles list

   .. output::
      :language: text

      Found 2 profile(s)
        Profile     API Key
        ----------  -----------------------------------------------
        my-profile  rjxerfwi (********-****-****-****-f00b471ec015)
        default     xkwwtlmj (********-****-****-****-f03b321dae23)

The CLI stores profiles on your computer in individual configuration
files named after the profile. The location of the profile definitions
depends on your system:

.. list-table::
   :header-rows: 1

   * - Operating System
     - Profile Directory

   * - Unix / Linux
     - ``$XDG_CONFIG_HOME/<profile>.yaml`` or ``$HOME/.config/<profile>.yaml``

   * - macOS
     - ``$HOME/Library/Application\ Support/appservices-cli/<profile>.yaml``

   * - Windows
     - ``%AppData%/<profile>.yaml``
