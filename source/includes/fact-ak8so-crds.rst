.. important:: Custom Resources No Longer Delete Objects by Default

   |ak8so| uses :ref:`custom resource <custom-resources>` configuration
   files to manage your |service| configuration, but as of |ak8so| 2.0,
   custom resources you delete in |k8s| are no longer deleted in 
   |service|. Instead, |ak8so| simply stops managing those resources.  
   For example, if you delete an :ref:`atlasproject-custom-resource`
   in |k8s|, |ak8so| no longer automatically deletes the corresponding project
   from |service|, preventing accidental or unexpected deletions. To learn more, 
   including how to :ref:`revert this behavior <revert-deletion-protection>` to 
   the default used prior to |ak8so| 2.0, see :ref:`deletion-protection`.
