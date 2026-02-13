The following table shows the default values for 
``maxNumActiveUserIndexBuilds`` based on Atlas tiers:

.. list-table:: Atlas Tier Defaults for maxNumActiveUserIndexBuilds
   :widths: 50 50
   :header-rows: 1

   * - **Atlas Tiers**
     - **maxNumActiveUserIndexBuilds Default**
   * - Small M tiers (``M10``, ``M20``, ``M30``, ``M40``)
     - ``1``
   * - Medium M tiers (``M50``, ``M60``)
     - ``2``
   * - Large M tiers (``M80`` and higher, including NMVe variants)
     - ``3``

.. note::

   These defaults also apply to the corresponding low-CPU ``R`` tiers.