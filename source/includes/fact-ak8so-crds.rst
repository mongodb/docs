.. important:: Custom Resources Definitions Take Priority

   |ak8so| uses :ref:`custom resource <custom-resources>` configuration 
   files to manage your |service| configuration. Each custom resource 
   definition overrides settings specified in other ways 
   such as in the {+atlas-ui+}. If you delete a custom resource, 
   |ak8so| deletes the object from |service| unless you use 
   :ref:`annotations <ak8so-annotations>` to skip deletion. To learn 
   more, see the :ref:`ak8so-create-update-process` and the 
   :ref:`ak8so-delete-process`.
