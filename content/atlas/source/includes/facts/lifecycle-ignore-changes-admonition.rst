.. important::

      If you don't enable effective fields, you must manually configure a
      ``lifecycle.ignore_changes`` block to prevent resource drift when auto-scaling
      occurs.  **We do not recommend this approach** . To learn more, see `Auto-Scaling <https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs/resources/advanced_cluster#auto_scaling>`_
      in the {+terraform+} documentation.