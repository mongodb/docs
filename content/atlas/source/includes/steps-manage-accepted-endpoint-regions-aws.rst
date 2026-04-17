.. procedure::
   :style: normal

   .. note::

      Cross-region private endpoint connectivity is currently in
      preview. This feature allows you to configure which |aws| regions
      can connect to your private endpoint service, enabling
      applications in different regions to access your {+service+}
      clusters through private endpoints.

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Navigate to the private endpoint.

      a. In the sidebar, click :guilabel:`Private Endpoint`.
      #. Click the :guilabel:`Dedicated Cluster` tab.
      #. Locate the private endpoint service for which you want to
         manage accepted regions.

   .. step:: Manage accepted endpoint regions.

      a. Click the :guilabel:`Edit` link next to the endpoint service.
      #. In the :guilabel:`Accepted Endpoint Regions` section, select
         the |aws| regions that you want to allow connections from.
      #. To remove a region, deselect it from the list.
      #. Click :guilabel:`Save` to apply your changes.

   .. step:: Configure your endpoints in the accepted regions.

      After you add accepted endpoint regions, you must create the
      corresponding interface endpoints in those regions within your
      |aws| account. To learn more about creating interface
      endpoints, see :ref:`cluster-private-endpoint`.
