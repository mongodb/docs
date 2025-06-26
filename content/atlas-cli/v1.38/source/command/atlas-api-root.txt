.. _atlas-api-root:

==============
atlas api root
==============

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details that describe the MongoDB Cloud build and the access token that requests this resource.

This starts the MongoDB Cloud API.

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
     - help for root

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

* :ref:`atlas-api-root-getSystemStatus` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: This resource returns information about the MongoDB application along with API key meta data.
* :ref:`atlas-api-root-returnAllControlPlaneIpAddresses` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all control plane IP addresses.


.. toctree::
   :titlesonly:

   getSystemStatus </command/atlas-api-root-getSystemStatus>
   returnAllControlPlaneIpAddresses </command/atlas-api-root-returnAllControlPlaneIpAddresses>

