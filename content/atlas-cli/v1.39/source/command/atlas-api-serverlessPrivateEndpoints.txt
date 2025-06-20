.. _atlas-api-serverlessPrivateEndpoints:

====================================
atlas api serverlessPrivateEndpoints
====================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes private endpoints for serverless instances.

To learn more, see the Atlas Administration API tab on the following tutorial.

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
     - help for serverlessPrivateEndpoints

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

Related Commands
----------------

* :ref:`atlas-api-serverlessPrivateEndpoints-createServerlessPrivateEndpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one private endpoint for one serverless instance.
* :ref:`atlas-api-serverlessPrivateEndpoints-deleteServerlessPrivateEndpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Remove one private endpoint from one serverless instance.
* :ref:`atlas-api-serverlessPrivateEndpoints-getServerlessPrivateEndpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Return one private endpoint for one serverless instance.
* :ref:`atlas-api-serverlessPrivateEndpoints-listServerlessPrivateEndpoints` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all private endpoints for one serverless instance.
* :ref:`atlas-api-serverlessPrivateEndpoints-updateServerlessPrivateEndpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one private endpoint for one serverless instance.


.. toctree::
   :titlesonly:

   createServerlessPrivateEndpoint </command/atlas-api-serverlessPrivateEndpoints-createServerlessPrivateEndpoint>
   deleteServerlessPrivateEndpoint </command/atlas-api-serverlessPrivateEndpoints-deleteServerlessPrivateEndpoint>
   getServerlessPrivateEndpoint </command/atlas-api-serverlessPrivateEndpoints-getServerlessPrivateEndpoint>
   listServerlessPrivateEndpoints </command/atlas-api-serverlessPrivateEndpoints-listServerlessPrivateEndpoints>
   updateServerlessPrivateEndpoint </command/atlas-api-serverlessPrivateEndpoints-updateServerlessPrivateEndpoint>

