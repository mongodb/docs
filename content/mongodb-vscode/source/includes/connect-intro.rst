This page outlines how to use |vsce-full| to connect to a
MongoDB host. You can connect to a standalone, replica set,
or sharded cluster host.

.. note:: MongoDB Atlas

   If you need to create a MongoDB host, consider using 
   `MongoDB Atlas <https://www.mongodb.com/cloud/atlas?tck=docs_vsce>`__.
   |service| is a cloud-hosted database-as-a-service which requires no 
   installation, offers a free tier to get started, and provides a 
   copyable URI to easily connect |vsce| to your deployment.

   To create a cluster on the |service| free tier, run the command 
   ``MongoDB: Open Overview Page`` in the |vscode-short| Command 
   Palette and then click :guilabel:`Create free cluster`.

   To create an |service| cluster using a Terraform template included
   with |vsce|, see :ref:`vsce-create-cluster-terraform`.

If you need to install |vsce|, see :ref:`vsce-install` for instructions.

Considerations
--------------

- When connecting |vsce| to a replica set, use either the
  replica set :guilabel:`SRV record` or :guilabel:`Replica Set Name`
  when filling in your connection information. It is not recommended to
  connect directly to an individual replica set member.

  - If the member to which you are connected switches from a
    :manual:`primary </core/replica-set-primary/>` member to a
    :manual:`secondary </core/replica-set-secondary/>` or vice versa as
    the result of an election, |vsce| may either forcibly close
    the connection or display stale data.

- You can't connect |vsce| directly to an :atlas:`analytics node 
  </faq/#what-are-analytics-nodes>`.

- |vsce| appends the ``appName`` connection string option with a value
  of ``mongodb-vscode <version>`` for all deployment connections.

- |vsce| automatically starts the MongoDB MCP Server
  when you connect to your MongoDB deployment. You can disable this behavior
  upon first connection, or at any time by using the :ref:`mdb.mcp.server 
  <vsce-setting-mcp-server>` setting.

  To learn more, see :ref:`vsce-mcp-server`.