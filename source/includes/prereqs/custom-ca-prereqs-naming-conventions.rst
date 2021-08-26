.. note:: About the example filenames

   - Name these files the exact names provided, substituting the
     appropriate variables. If a filename doesn't match, deployment
     errors occur.

     - Replace ``<metadata.name>`` with the value of
       :setting:`metadata.name` in your deployment resource.

     - Replace ``<Y>`` with a 0-based number for the sharded cluster.

     - Replace ``<X>`` with the member of a shard or replica set.

   - End the files with ``-pem`` and *not* ``.pem``.
     These files shouldn't have a file extension.
