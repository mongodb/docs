.. _modify-cluster-providerSettings-diskTypeName:

Azure disk type of the server's root volume.

The following table lists the possible values for this field,
and their corresponding storage size.

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - ``diskTypeName``
     - Storage Size

   * - ``P4`` :sup:`1`
     - 32GB

   * - ``P6``
     - 64GB

   * - ``P10`` :sup:`2`
     - 128GB

   * - ``P20``
     - 512GB

   * - ``P30``
     - 1024GB

   * - ``P40``
     - 2048GB

   * - ``P50``
     - 4095GB

:sup:`1` Default for ``M20`` and ``M30`` Azure instances

:sup:`2` Default for ``M40+`` Azure clusters
