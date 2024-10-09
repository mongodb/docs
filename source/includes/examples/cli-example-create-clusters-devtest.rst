.. code-block::
   :copyable: true

   atlas clusters create CustomerPortalDev \
     --projectId 56fd11f25f23b33ef4c2a331 \
     --region EASTERN_US \
     --members 3 \
     --tier M30 \
     --provider GCP \
     --mdbVersion 8.0 \
     --diskSizeGB 30 \
     --watch


