.. _atlas-api-networkPeering:

========================
atlas api networkPeering
========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes network peering containers and peering connections.

When you deploy an M10+ dedicated cluster, Atlas creates a VPC for the selected provider and region or regions if no existing VPC or VPC peering connection exists for that provider and region. Atlas assigns the VPC a Classless Inter-Domain Routing (CIDR) block.

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
     - help for networkPeering

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

* :ref:`atlas-api-networkPeering-createPeeringConnection` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one new network peering connection in the specified project.
* :ref:`atlas-api-networkPeering-createPeeringContainer` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one new network peering container in the specified project.
* :ref:`atlas-api-networkPeering-deletePeeringConnection` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one network peering connection in the specified project.
* :ref:`atlas-api-networkPeering-deletePeeringContainer` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one network peering container in the specified project.
* :ref:`atlas-api-networkPeering-disablePeering` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Disables Connect via Peering Only mode for the specified project.
* :ref:`atlas-api-networkPeering-getPeeringConnection` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details about one specified network peering connection in the specified project.
* :ref:`atlas-api-networkPeering-getPeeringContainer` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details about one network peering container in one specified project.
* :ref:`atlas-api-networkPeering-listPeeringConnections` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details about all network peering connections in the specified project.
* :ref:`atlas-api-networkPeering-listPeeringContainerByCloudProvider` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details about all network peering containers in the specified project for the specified cloud provider.
* :ref:`atlas-api-networkPeering-listPeeringContainers` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details about all network peering containers in the specified project.
* :ref:`atlas-api-networkPeering-updatePeeringConnection` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one specified network peering connection in the specified project.
* :ref:`atlas-api-networkPeering-updatePeeringContainer` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the network details and labels of one specified network peering container in the specified project.
* :ref:`atlas-api-networkPeering-verifyConnectViaPeeringOnlyModeForOneProject` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Verifies if someone set the specified project to Connect via Peering Only mode.


.. toctree::
   :titlesonly:

   createPeeringConnection </command/atlas-api-networkPeering-createPeeringConnection>
   createPeeringContainer </command/atlas-api-networkPeering-createPeeringContainer>
   deletePeeringConnection </command/atlas-api-networkPeering-deletePeeringConnection>
   deletePeeringContainer </command/atlas-api-networkPeering-deletePeeringContainer>
   disablePeering </command/atlas-api-networkPeering-disablePeering>
   getPeeringConnection </command/atlas-api-networkPeering-getPeeringConnection>
   getPeeringContainer </command/atlas-api-networkPeering-getPeeringContainer>
   listPeeringConnections </command/atlas-api-networkPeering-listPeeringConnections>
   listPeeringContainerByCloudProvider </command/atlas-api-networkPeering-listPeeringContainerByCloudProvider>
   listPeeringContainers </command/atlas-api-networkPeering-listPeeringContainers>
   updatePeeringConnection </command/atlas-api-networkPeering-updatePeeringConnection>
   updatePeeringContainer </command/atlas-api-networkPeering-updatePeeringContainer>
   verifyConnectViaPeeringOnlyModeForOneProject </command/atlas-api-networkPeering-verifyConnectViaPeeringOnlyModeForOneProject>

