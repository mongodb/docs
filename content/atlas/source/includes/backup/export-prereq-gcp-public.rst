1. :ref:`Set up Google Cloud Service access <manage-gcp-access>`.

#. Locate the ID of your |gcp| service account in |service| by following the 
   steps in :ref:`view-gcpservice-principal`. 

#. In your |gcp| console, add the service account ID from the previous step 
   as a principal to your 
   bucket's policy by following the :gcp:`Google Cloud documentation </storage/docs/access-control/using-iam-permissions#console>`.

   This grants the :gcp:`Storage Object User </storage/docs/access-control/iam-roles#storage.objectUser>` role to the service account 
   for your specific {+gcs+} bucket.
