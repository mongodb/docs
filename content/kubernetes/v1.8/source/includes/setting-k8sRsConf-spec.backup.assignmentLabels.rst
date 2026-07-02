.. setting:: spec.backup.assignmentLabels

   *Type*: array

   
   A comma-separated list of labels to assign backup daemons, oplog stores,
   blockstores, |s3| snapshot stores, and file system stores to specific
   projects or groups. Use assignment labels to identify that specific
   backup stores are associated with particular projects.
   
   If you set assignment labels using the |k8s-op-short|, the values that
   you set in the |k8s| configuration file for assignment labels override
   the values defined in the |mms| UI. Assignment labels that you don't set
   using the |k8s-op-short| continue to use the values set in the |mms| UI.
   
   .. note::
      
      If you set this parameter, the API key linked with the value of 
      :setting:`spec.credentials` must have a :authrole:`Global Owner` role.
   

