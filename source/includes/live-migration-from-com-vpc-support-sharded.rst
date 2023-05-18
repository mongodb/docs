The following table lists the current support status for :ref:`VPC peering <vpc-peering>`
and :ref:`private endpoints <private-endpoint>` for source and destination
sharded {+clusters+} that you live migrate to |service|.

.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Cloud Provider
     - VPC Peering
     - Private Endpoints

   * - |azure|
     - :icon-fa5:`check`
     - :icon-fa5:`minus`
  
   * - |aws|
     - :icon-fa5:`check`
     - :icon-fa5:`minus`

   * - |gcp|
     - :icon-fa5:`check`
     - :icon-fa5:`minus`

.. note::

   .. include:: /includes/fact-private-endpoint-limitations-push-live-migration.rst

To enable VPC peering with live migration on |azure|, |aws|, or |gcp|:

- Configure a :ref:`VPC peering connection <vpc-peering>` between the
  migration host and the destination |service| {+cluster+}.
