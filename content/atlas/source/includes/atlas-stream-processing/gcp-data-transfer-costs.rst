{+gcp+} Data Transfer Costs for {+atlas-sp+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Current Pricing (Until December 3, 2025)
````````````````````````````````````````

{+atlas-sp+} data transfer costs for {+gcp+} currently depend on the
destination region.

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 25 15

   * - GCP Region
     - Price per GB

   * - ``us-central1`` Iowa, USA
     - $0.090

   * - ``europe-west1`` Belgium
     - $0.090

New Pricing (Effective December 3, 2025)
````````````````````````````````````````

Beginning December 3, 2025, {+atlas-sp+} data transfer costs for |gcp|
will be based on the relationship between the origin region and the
destination.

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 40 20

   * - Data Transfer Type
     - Price per GB
       
   * - Same Region
     - $0.01

   * - Different Region: North America
     - $0.02

   * - Different Region: Oceania & Africa    
     - $0.157

   * - Different Region: Other    
     - $0.08

   * - Out to Internet: Americas & Europe
     - $0.12

   * - Out to Internet: China    
     - $0.23

   * - Out to Internet: Australia
     - $0.19

.. note::

   |gcp| charges for same region data transfer only from the region
   that's sending (egress). Under the new pricing structure, different
   region pricing varies by destination as shown above.
