.. important:: Custom Resources No Longer Delete Objects by Default

   * |ak8so| uses :ref:`custom resource <custom-resources>` configuration
     files to manage your |service| configuration, but as of |ak8so| 2.0,
     custom resources you delete in |k8s| are no longer (by default) deleted in 
     |service|. Instead, |ak8so| simply stops managing those resources  in |service|.  
     For example, if you delete an :ref:`atlasproject-custom-resource`
     in |k8s|, by default the |ak8so| no longer automatically deletes the 
     corresponding project from |service|. This change in behavior is intended 
     to help prevent accidental or unexpected deletions. To learn more, 
     including how to :ref:`revert this behavior <revert-deletion-protection>` 
     to the default used prior to |ak8so| 2.0, see :ref:`deletion-protection`.
     
     Similarly, |ak8so| does not delete teams from |service| if you remove them from an
     |service| project in |k8s| with the |ak8so|. 

   * Explicitly define your desired configuration details in order to avoid implicitly 
     using default |service| configuration values. In some cases, inheriting |service| 
     defaults may result in a reconciliation loop which can prevent your 
     custom resource from achieving a ``READY`` state. For example, 
     explicitly defining your desired autoscaling behavior in your ``AtlasDeployment`` 
     custom resource, as shown in the included example, ensures that 
     a static instance size in your custom resource is not being repeatedly 
     applied to an |service| deployment which has autoscaling enabled.

     .. code-block:: yaml

        autoScaling:
          diskGB:
            enabled: true
          compute:
            enabled: true
            scaleDownEnabled: true
            minInstanceSize: M30
            maxInstanceSize: M40
