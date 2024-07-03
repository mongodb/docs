.. _atlas-deployments-delete:

========================
atlas deployments delete
========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Delete a deployment.

The command prompts you to confirm the operation when you run the command without the --force option. 
		
Deleting an Atlas deployment also deletes any backup snapshots for that cluster.
Deleting a Local deployment also deletes any local data volumes.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas deployments delete [deploymentName] [options]

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
   * - deploymentName
     - string
     - false
     - Name of the deployment that you want to delete.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --force
     - 
     - false
     - Flag that indicates whether to skip the confirmation prompt before proceeding with the requested action.
   * - -h, --help
     - 
     - false
     - help for delete
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --type
     - string
     - false
     - Type of deployment. Valid values are ATLAS or LOCAL.
   * - -w, --watch
     - 
     - false
     - Flag that indicates whether to watch the command until it completes its execution or the watch times out. To set the time that the watch times out, use the --watchTimeout option.
   * - --watchTimeout
     - uint
     - false
     - Time in seconds until a watch times out. After a watch times out, the CLI no longer watches the command.

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

   Deployment '<Name>' deleted
   

Examples
--------

.. code-block::
   :copyable: false

   # Remove an Atlas deployment named myDeployment after prompting for a confirmation:
   atlas deployments delete myDeployment --type ATLAS
   
   
.. code-block::
   :copyable: false

   # Remove an Atlas deployment named myDeployment without requiring confirmation:
   atlas deployments delete myDeployment --type ATLAS --force

   
.. code-block::
   :copyable: false

   # Remove an Local deployment named myDeployment without requiring confirmation:
   atlas deployments delete myDeployment --type LOCAL --force
