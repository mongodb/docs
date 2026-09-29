.. important::

   The latest MongoDB version manifest introduces the ``isSpecialLTSVersion`` field.
   In Ops Manager 8.0 releases prior to 8.0.12, this field might impact response 
   generation logic after a successful ``PUT`` request to the
   :ref:`api/public/v1.0/versionManifest <om-update-version-manifest>` endpoint.

   This issue is resolved in Ops Manager 8.0.12. If you are running an earlier 
   8.0 release, we recommend one of the following actions:

   - Upgrade to Ops Manager 8.0.12 or later to ensure compatibility.
   - If you cannot upgrade immediately, modify your API requests to filter out the ``isSpecialLTSVersion`` field.

   Contact |mdb-support| for further assistance.
