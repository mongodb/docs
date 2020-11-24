.. _create-cluster-providerSettings-diskTypeName:

Disk type of the server's root volume for Azure instances. If
omitted, |service| uses the default disk type for the selected
``providerSettings.instanceSizeName``.

The following table lists the possible values for this field,
and their corresponding storage size.

.. list-table::
   :header-rows: 1
   :widths: 30 30

   * - ``diskTypeName``
     - Storage Size

   * - ``P2`` :sup:`1` 
     - 8GB

   * - ``P3``
     - 16GB

   * - ``P4`` :sup:`2`
     - 32GB

   * - ``P6``
     - 64GB

   * - ``P10`` :sup:`3`
     - 128GB

   * - ``P15``
     - 256GB

   * - ``P20``
     - 512GB

   * - ``P30``
     - 1024GB

   * - ``P40``
     - 2048GB

   * - ``P50``
     - 4095GB

:sup:`1` Default for ``M10`` Azure clusters

:sup:`2` Default for ``M20`` and ``M30`` Azure clusters

:sup:`3` Default for ``M40+`` Azure clusters
