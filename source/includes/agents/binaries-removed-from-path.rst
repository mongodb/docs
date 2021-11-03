.. important::

   .. cond:: onprem

      Starting with :ref:`version 11.0.5.6967-1
      <mongodb-11.0.5.6967-1>`, when you install the MongoDB Agent 
      using ``deb`` or ``rpm`` packages, the package doesn't add
      MongoDB binaries to the ``PATH`` environment variable.

      If your deployment depends on the presence of MongoDB binaries in 
      the ``PATH``, you must manually add the paths to MongoDB
      binaries to the ``PATH``. To learn how to update environment
      variables, refer to your operating system's documentation.

   .. cond:: cloud

      Starting with :ref:`version 10.24.0.6714-1
      <10.24.0.6714-1>`, when you install the MongoDB Agent 
      using ``deb`` or ``rpm`` packages, the package doesn't add
      MongoDB binaries to the ``PATH`` environment variable.

      If your deployment depends on the presence of MongoDB binaries in 
      the ``PATH``, you must manually add the paths to MongoDB
      binaries to the ``PATH``. To learn how to update environment
      variables, refer to your operating system's documentation.
