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

Returns, adds, edits, and removes network peering containers and peering connections.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

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

* :ref:`atlas-api-networkPeering-createGroupContainer` - Creates one new network peering container in the specified project.
* :ref:`atlas-api-networkPeering-createGroupPeer` - Creates one new network peering connection in the specified project.
* :ref:`atlas-api-networkPeering-deleteGroupContainer` - Removes one network peering container in the specified project.
* :ref:`atlas-api-networkPeering-deleteGroupPeer` - Removes one network peering connection in the specified project.
* :ref:`atlas-api-networkPeering-disablePeering` - Disables Connect via Peering Only mode for the specified project.
* :ref:`atlas-api-networkPeering-getGroupContainer` - Returns details about one network peering container in one specified project.
* :ref:`atlas-api-networkPeering-getGroupPeer` - Returns details about one specified network peering connection in the specified project.
* :ref:`atlas-api-networkPeering-listGroupContainerAll` - Returns details about all network peering containers in the specified project.
* :ref:`atlas-api-networkPeering-listGroupContainers` - Returns details about all network peering containers in the specified project for the specified cloud provider.
* :ref:`atlas-api-networkPeering-listGroupPeers` - Returns details about all network peering connections in the specified project.
* :ref:`atlas-api-networkPeering-updateGroupContainer` - Updates the network details and labels of one specified network peering container in the specified project.
* :ref:`atlas-api-networkPeering-updateGroupPeer` - Updates one specified network peering connection in the specified project.
* :ref:`atlas-api-networkPeering-verifyPrivateIpMode` - Verifies if someone set the specified project to Connect via Peering Only mode.


.. toctree::
   :titlesonly:

   createGroupContainer </command/atlas-api-networkPeering-createGroupContainer>
   createGroupPeer </command/atlas-api-networkPeering-createGroupPeer>
   deleteGroupContainer </command/atlas-api-networkPeering-deleteGroupContainer>
   deleteGroupPeer </command/atlas-api-networkPeering-deleteGroupPeer>
   disablePeering </command/atlas-api-networkPeering-disablePeering>
   getGroupContainer </command/atlas-api-networkPeering-getGroupContainer>
   getGroupPeer </command/atlas-api-networkPeering-getGroupPeer>
   listGroupContainerAll </command/atlas-api-networkPeering-listGroupContainerAll>
   listGroupContainers </command/atlas-api-networkPeering-listGroupContainers>
   listGroupPeers </command/atlas-api-networkPeering-listGroupPeers>
   updateGroupContainer </command/atlas-api-networkPeering-updateGroupContainer>
   updateGroupPeer </command/atlas-api-networkPeering-updateGroupPeer>
   verifyPrivateIpMode </command/atlas-api-networkPeering-verifyPrivateIpMode>
