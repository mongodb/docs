.. note::

   If you enable a :ref:`peering connection <vpc-peering>` and restrict
   certain regions for |gcp|, you can copy snapshots to only those regions.

   Snapshots taken in AWS and Azure regions are incremental. Snapshots
   taken for GCP are not incremental, resulting in higher data storage 
   and transfer costs.
