.. important::

   The latest MongoDB version manifest introduces the ``isSpecialLTSVersion`` field.
   This field might impact response generation logic after a
   successful ``PUT`` request to the
   :ref:`api/public/v1.0/versionManifest <om-update-version-manifest>` endpoint
   in older Ops Manager 8.0 versions.

   If you're using Ops Manager 8.0 and running 8.0.12 or earlier, 
   we recommend one of the following actions:

   - Upgrade to the latest Ops Manager 8.0 release to ensure compatibility.
   - Modify your API requests to filter out the ``isSpecialLTSVersion`` field.

   Contact |mdb-support| for further assistance.
