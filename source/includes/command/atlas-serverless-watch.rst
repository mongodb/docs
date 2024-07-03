.. _atlas-serverless-watch:

======================
atlas serverless watch
======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Monitor the status of serverless instance.

This command checks the serverless instance's state periodically until the instance reaches an IDLE state. 
Once the instance reaches the expected state, the command prints "Instance available."
If you run the command in the terminal, it blocks the terminal session until the resource becomes idle.
You can interrupt the command's polling at any time with CTRL-C.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas serverless watch <instanceName> [options]

.. Code end marker, please don't delete this comment

Arguments
---------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - instanceName
     - string
     - true
     - Name of the instance to watch.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -h, --help
     - 
     - false
     - help for watch
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.

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

Output
------

If the command succeeds, the CLI returns output similar to the following sample. Values in brackets represent your values.

.. code-block::

   
   Instance available.
   

Examples
--------

.. code-block::
   :copyable: false

   atlas serverless watch instanceNameSample
