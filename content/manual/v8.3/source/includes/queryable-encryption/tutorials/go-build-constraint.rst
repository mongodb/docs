.. important::

   When building or running the Golang code in this guide using
   ``go build`` or ``go run``, always include the ``cse`` build
   constraint to enable {+qe+}. See the following shell
   command for an example of including the build constraint:

   .. code-block:: bash

      go run -tags cse make-data-key.go
