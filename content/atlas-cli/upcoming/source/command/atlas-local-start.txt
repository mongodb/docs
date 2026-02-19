.. _atlas-local-start:

=================
atlas local start
=================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Start a deployment

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas local start <deployment_name> [options]

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
     - true
     - Name of the deployment to start

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
     - help for start
   * - --waitForHealthy
     - 
     - false
     - Flag that indicates whether to wait for the deployment to be healthy before returning
   * - --waitForHealthyTimeout
     - string
     - false
     - Timeout for the wait for healthy deployment. The format is a number followed by a unit. Relevant time units are ms, s, m, h When no unit is provided, the unit is assumed to be seconds

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

