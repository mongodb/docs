.. admonition:: Value must use namespace and name of Secret
   :class: note

   This value *must* match the namespace in which you created the 
   secret and the ``name`` value you provided for your |mms| 
   |k8s| :ref:`Secret <create-k8s-credentials>`.

   If this |k8s-obj| is in a different |k8s-ns| than the
   Secret, you should set this value to the namespace *and*
   name of the Secret in this format:
   ``<namespace>/<name>``
