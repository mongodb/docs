.. _atlas-local-setup:

=================
atlas local setup
=================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Create a local deployment.

To learn more about local atlas deployments, see https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-local/

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas local setup [deployment_name] [options]

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
   * - deployment_name
     - string
     - false
     - Name of the deployment that you want to set up

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
     - help for setup
   * - --bindIpAll
     - 
     - false
     - Flag that indicates whether the LOCAL deployment port binding should happen for all IPs or only for the localhost interface 127.0.0.1.

The default is false.
   * - --connectWith
     - string
     - false
     - Method for connecting to the deployment after setup.

If not provided, the user will be prompted to select a connection method.
   * - --force
     - 
     - false
     - Flag that indicates whether to skip the confirmation prompt before proceeding with the requested action.

The default is false.
   * - --image
     - string
     - false
     - Alternative docker image to use for the deployment.

The default is the official MongoDB Atlas Local image. To learn more about the official MongoDB Atlas Local image, see https://hub.docker.com/r/mongodb/mongodb-atlas-local
   * - --initdb
     - string
     - false
     - Flag that uses a folder to be mapped into LOCAL deployment for initialization

The folder must exist and be a directory.
   * - --loadSampleData
     - 
     - false
     - Flag that indicates whether to load sample data into the deployment.

The default is false.
   * - --mdbVersion
     - string
     - false
     - MongoDB version to use for the deployment.

Expected format: <major>[.<minor>[.<patch>]] or 'latest'. Some examples: 8, 8.2, 8.2.1, latest
   * - --password
     - string
     - false
     - Password for the user
   * - --port
     - int
     - false
     - Port that the MongoDB server listens to for client connections.

The port must be between 1 and 65535.
   * - --skipPullImage
     - 
     - false
     - Flag that indicates whether to skip the pull image step.

This will prevent the CLI from pulling the latest MongoDB Atlas Local image. Use with caution as you might end up with an outdated image.

The default is false.
   * - --username
     - string
     - false
     - Username for authenticating to MongoDB

Inherited Options
-----------------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -o, --output
     - string
     - false
     - Output format
   * - -P, --profile
     - string
     - false
     - Name of the profile to use from your configuration file. To learn about profiles for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-save-connection-settings

