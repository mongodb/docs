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

Returns details that describe the MongoDB Cloud build and the access token that requests this resource.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

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

* :ref:`atlas-api-root-getSystemStatus` - This resource returns information about the MongoDB application along with API key meta data.
* :ref:`atlas-api-root-listControlPlaneAddresses` - Returns all control plane IP addresses.


.. toctree::
   :titlesonly:

   getSystemStatus </command/atlas-api-root-getSystemStatus>
   listControlPlaneAddresses </command/atlas-api-root-listControlPlaneAddresses>
