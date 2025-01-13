.. _private-endpoint-access-lists:

IP Access Lists and Network Peering Connections with Private Endpoints
----------------------------------------------------------------------

When you enable private endpoints, you can still enable access to 
your |service| {+database-deployments+} using other methods, such 
as adding public IPs to :doc:`IP access lists 
</security/ip-access-list>` and :doc:`network peering 
</security-vpc-peering>`.

Clients connecting to |service| {+database-deployments+} using 
other methods use standard connection strings. Your clients might 
have to identify when to use private endpoint-aware connection 
strings and standard connection strings.

.. _atlas_regionalized-pl:

(Optional) Regionalized Private Endpoints for Multi-Region Sharded Clusters
---------------------------------------------------------------------------

For multi-region and global sharded clusters,
you can deploy multiple private endpoints to a region if you need 
to connect to |service| using a private endpoint from networks 
that can't be peered with one another.

You can deploy any number of private endpoints to regions that you
deployed your {+database-deployment+} to. Each regional private
endpoint connects to the |mongos| instances in that region.

.. include:: /includes/admonitions/warnings/regionalized-pls-change-connection-strings.rst

.. include:: /includes/enable-regionalized-privatelink.rst

To use this feature, you must enable the regionalized private 
endpoint setting.

To enable or disable the regionalized private endpoint setting:

.. tabs::

   .. tab:: {+atlas-cli+}
      :tabid: atlascli 

      Enable Regionalized Private Endpoints
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      .. include:: /includes/extracts/atlas-privateEndpoints-regionalModes-enable.rst

      Disable Regionalized Private Endpoints
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      .. include:: /includes/extracts/atlas-privateEndpoints-regionalModes-disable.rst

      View Regionalized Private Endpoint Settings
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      .. include:: /includes/extracts/atlas-privateEndpoints-regionalModes-describe.rst

   .. tab:: {+atlas-ui+}
      :tabid: ui

      Enable Regionalized Private Endpoints
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      .. include:: /includes/steps-enable-regionalized-private-endpoints.rst

      Disable Regionalized Private Endpoints
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      .. include:: /includes/steps-disable-regionalized-private-endpoints.rst    

(Optional) Improve Connection Performance for Sharded {+Clusters+} Behind a Private Endpoint 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-optimized-connection-strings-intro.rst

|service| doesn't support optimized connection strings for 
{+clusters+} that run on |gcp| or |azure|. To learn more about optimized 
connection strings for sharded {+clusters+} behind a private 
endpoint, see :ref:`optimized-connection-strings`. 


Connecting to Multi-Region {+Clusters+} Without Regionalized Private Endpoints 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you use {+aws-pl+} and have applications that connect to multi-region {+clusters+}
that have endpoints in different regions but are not using :ref:`regionalized private endpoints
<atlas_regionalized-pl>`, ensure that those applications can reach endpoints 
in the other regions. For example, to do this with |aws|, 
you can :ref:`peer <vpc-peering>` the |vpc|\s that 
contains the endpoints on their side.
