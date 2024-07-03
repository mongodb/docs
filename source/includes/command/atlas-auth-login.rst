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
     - Don't try to open a browser session.

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

