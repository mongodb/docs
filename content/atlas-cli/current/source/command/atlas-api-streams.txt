.. _atlas-api-streams:

=================
atlas api streams
=================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, edits, and removes Streams Instances.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

This resource requires your project ID.

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
     - help for streams

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

* :ref:`atlas-api-streams-acceptVpcPeeringConnection` - Requests the acceptance of an incoming VPC Peering connection.
* :ref:`atlas-api-streams-createPrivateLinkConnection` - Creates one Private Link in the specified project.
* :ref:`atlas-api-streams-createStreamConnection` - Creates one connection for a stream instance in the specified project.
* :ref:`atlas-api-streams-createStreamProcessor` - Create one Stream Processor within the specified stream instance.
* :ref:`atlas-api-streams-createStreamWorkspace` - Creates one stream instance in the specified project.
* :ref:`atlas-api-streams-deletePrivateLinkConnection` - Deletes one Private Link in the specified project.
* :ref:`atlas-api-streams-deleteStreamConnection` - Delete one connection of the specified stream instance.
* :ref:`atlas-api-streams-deleteStreamProcessor` - Delete a Stream Processor within the specified stream instance.
* :ref:`atlas-api-streams-deleteStreamWorkspace` - Delete one stream instance in the specified project.
* :ref:`atlas-api-streams-deleteVpcPeeringConnection` - Deletes an incoming VPC Peering connection.
* :ref:`atlas-api-streams-downloadAuditLogs` - Downloads the audit logs for the specified Atlas Streams Processing instance.
* :ref:`atlas-api-streams-getAccountDetails` - Returns the Account ID, and the VPC ID for the group and region specified.
* :ref:`atlas-api-streams-getPrivateLinkConnection` - Returns the details of one Private Link connection within the project.
* :ref:`atlas-api-streams-getStreamConnection` - Returns the details of one stream connection within the specified stream instance.
* :ref:`atlas-api-streams-getStreamProcessor` - Get one Stream Processor within the specified stream instance.
* :ref:`atlas-api-streams-getStreamProcessors` - Returns all Stream Processors within the specified stream instance.
* :ref:`atlas-api-streams-getStreamWorkspace` - Returns the details of one stream instance within the specified project.
* :ref:`atlas-api-streams-listActivePeeringConnections` - Returns a list of active incoming VPC Peering Connections.
* :ref:`atlas-api-streams-listPrivateLinkConnections` - Returns all Private Link connections for the specified project.
* :ref:`atlas-api-streams-listStreamConnections` - Returns all connections of the stream instance for the specified project.
* :ref:`atlas-api-streams-listStreamWorkspaces` - Returns all stream instances for the specified project.
* :ref:`atlas-api-streams-listVpcPeeringConnections` - Returns a list of incoming VPC Peering Connections.
* :ref:`atlas-api-streams-rejectVpcPeeringConnection` - Requests the rejection of an incoming VPC Peering connection.
* :ref:`atlas-api-streams-startStreamProcessor` - Start a Stream Processor within the specified stream instance.
* :ref:`atlas-api-streams-startStreamProcessorWith` - Start a Stream Processor within the specified stream instance.
* :ref:`atlas-api-streams-stopStreamProcessor` - Stop a Stream Processor within the specified stream instance.
* :ref:`atlas-api-streams-updateStreamConnection` - Update one connection for the specified stream instance in the specified project.
* :ref:`atlas-api-streams-updateStreamProcessor` - Modify one existing Stream Processor within the specified stream instance.
* :ref:`atlas-api-streams-updateStreamWorkspace` - Update one stream instance in the specified project.
* :ref:`atlas-api-streams-withStreamSampleConnections` - Creates one stream instance in the specified project with sample connections.


.. toctree::
   :titlesonly:

   acceptVpcPeeringConnection </command/atlas-api-streams-acceptVpcPeeringConnection>
   createPrivateLinkConnection </command/atlas-api-streams-createPrivateLinkConnection>
   createStreamConnection </command/atlas-api-streams-createStreamConnection>
   createStreamProcessor </command/atlas-api-streams-createStreamProcessor>
   createStreamWorkspace </command/atlas-api-streams-createStreamWorkspace>
   deletePrivateLinkConnection </command/atlas-api-streams-deletePrivateLinkConnection>
   deleteStreamConnection </command/atlas-api-streams-deleteStreamConnection>
   deleteStreamProcessor </command/atlas-api-streams-deleteStreamProcessor>
   deleteStreamWorkspace </command/atlas-api-streams-deleteStreamWorkspace>
   deleteVpcPeeringConnection </command/atlas-api-streams-deleteVpcPeeringConnection>
   downloadAuditLogs </command/atlas-api-streams-downloadAuditLogs>
   getAccountDetails </command/atlas-api-streams-getAccountDetails>
   getPrivateLinkConnection </command/atlas-api-streams-getPrivateLinkConnection>
   getStreamConnection </command/atlas-api-streams-getStreamConnection>
   getStreamProcessor </command/atlas-api-streams-getStreamProcessor>
   getStreamProcessors </command/atlas-api-streams-getStreamProcessors>
   getStreamWorkspace </command/atlas-api-streams-getStreamWorkspace>
   listActivePeeringConnections </command/atlas-api-streams-listActivePeeringConnections>
   listPrivateLinkConnections </command/atlas-api-streams-listPrivateLinkConnections>
   listStreamConnections </command/atlas-api-streams-listStreamConnections>
   listStreamWorkspaces </command/atlas-api-streams-listStreamWorkspaces>
   listVpcPeeringConnections </command/atlas-api-streams-listVpcPeeringConnections>
   rejectVpcPeeringConnection </command/atlas-api-streams-rejectVpcPeeringConnection>
   startStreamProcessor </command/atlas-api-streams-startStreamProcessor>
   startStreamProcessorWith </command/atlas-api-streams-startStreamProcessorWith>
   stopStreamProcessor </command/atlas-api-streams-stopStreamProcessor>
   updateStreamConnection </command/atlas-api-streams-updateStreamConnection>
   updateStreamProcessor </command/atlas-api-streams-updateStreamProcessor>
   updateStreamWorkspace </command/atlas-api-streams-updateStreamWorkspace>
   withStreamSampleConnections </command/atlas-api-streams-withStreamSampleConnections>
