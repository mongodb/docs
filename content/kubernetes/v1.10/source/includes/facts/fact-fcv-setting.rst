.. note::
   
   If you update this value to a later version of MongoDB for your 
   database resources, the feature compatibility version remains 
   at the MongoDB version you're upgrading from to give you the option to downgrade if necessary.
   If you want the feature compatibility version to match the new MongoDB version, you must manually set 
   :setting:`spec.featureCompatibilityVersion` to the new version or to ``AlwaysMatchVersion``.
   To learn more, see :setting:`spec.featureCompatibilityVersion`.