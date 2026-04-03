.. setting:: spec.featureCompatibilityVersion

   *Type*: string

   *Defaults to the prior major MongoDB version after MongoDB upgrade.*
   
   Limits changes to data that occur with an upgrade to a
   new major version. For example, if you upgrade from MongoDB 5.0 to MongoDB 6.0, 
   the feature compatibility version remains 
   at 5.0 to give you the option to downgrade if necessary.
   
   If you want the feature compatibility version to match the new MongoDB version, you must manually set ``featureCompatibilityVersion``
   to the new version. 
   For example, ``featureCompatibilityVersion: 6.0``.
   
   Alternatively, you can enable the ``AlwaysMatchVersion`` option to automatically 
   update the feature compatibility version to match the MongoDB version during upgrades. 
   For example, ``featureCompatibilityVersion: AlwaysMatchVersion``.

   To learn more about feature compatibility, see
   :dbcommand:`setFeatureCompatibilityVersion` in the MongoDB Manual.
   