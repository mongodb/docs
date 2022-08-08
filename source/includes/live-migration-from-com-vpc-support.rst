The following table lists the current support status for :ref:`VPC peering <vpc-peering>`
and :ref:`VPC private endpoints <private-endpoint>` for source and target
{+clusters+} that you live migrate to |service|.

.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Cloud Provider
     - VPC Peering
     - VPC Private Endpoints

   * - |azure|
     - :icon-fa5:`check` :icon-fa5:`star`
     - :icon-fa5:`minus`
  
   * - |aws|
     - :icon-fa5:`check` :icon-fa5:`star`
     - :icon-fa5:`minus`

   * - |gcp|
     - :icon-fa5:`check` :icon-fa5:`star`
     - :icon-fa5:`minus`

:icon-fa5:`star` To enable VPC with live migration on |azure|, |aws|,
or |gcp|:

- Add the migration host's IP address or an external |cidr| block to the
  |service| project's :ref:`IP access list <access-list>`.
  To learn more, see :ref:`Network Access <lm-com-network-access-rs>`.

- Configure a :ref:`VPC peering connection <vpc-peering>` between the
  migration host and the |service| {+cluster+}.
