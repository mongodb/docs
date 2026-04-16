Add an Atlas Cluster Connection through the {+atlas-cli+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an Atlas Cluster connection to your {+spw+} through
the {+atlas-cli+}, follow these steps:

.. include:: /includes/extracts/atlas-streams-connections-create.rst

When you create a {+spw+} using the {+atlas-cli+}, you must
provide a ``.json`` configuration file to define the new
connection's parameters. The format of this file depends on
the type of connection you define.

For an {+service+} database connection, provide a configuration
file with the following syntax:

.. code-block:: json

   {
      "type": "Cluster",
      "clusterName": "<clusterName>",
      "dbRoleToExecute": {
	"role": "<roleName>",
	"type": "<roleType>"
      }
   }

.. include:: /includes/atlas-stream-processing/atlas-stage-support.rst
