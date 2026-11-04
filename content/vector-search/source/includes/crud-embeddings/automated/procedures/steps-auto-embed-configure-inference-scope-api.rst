.. procedure::
   :style: normal

   .. step:: Retrieve your service account access token for the project.

      Use your service account to generate an access token, which
      authenticates your requests to the {+atlas-admin-api+}. To
      learn how to generate an access token, see
      :ref:`example-api-request`.

   .. step:: Send a request to view the current inference scope.

      Replace ``{ACCESS-TOKEN}`` with the output from the
      preceding step, ``{groupId}`` with your project ID, and
      ``{clusterName}`` with the name of your cluster.

      The following example returns the inference scope for your
      cluster:

      .. io-code-block::
         :copyable: true

         .. input:: /includes/index/autoembed-type/code-snippets/inference-scope/get-inference-scope-api.sh
            :language: shell

         .. output:: /includes/index/autoembed-type/code-snippets/inference-scope/get-inference-scope-output.json
            :language: json
            :visible: false

      If the ``mutable`` field is ``false``, you can't change the
      inference scope of the cluster. The ``reason`` field
      explains why. By default (``source``: ``DEFAULT``),
      inference can run in any cloud provider and geography.

   .. step:: Send a request to change the inference scope.

      The following example scopes inference for your cluster to
      Europe. To scope inference to the United States, set
      ``geography`` to ``US``.

      .. literalinclude:: /includes/index/autoembed-type/code-snippets/inference-scope/update-inference-scope-api.sh
         :language: shell
         :category: usage example
         :copyable: true

      |service| applies the change asynchronously and returns a
      ``202 Accepted`` response. To check the status of the
      change, send a ``GET`` request to the URI in the
      ``Location`` response header. Until the change completes,
      the ``effective`` field shows the previous scope.

   .. step:: (Optional) Return the cluster to the default inference scope.

      To return the cluster to the default inference scope, send a
      request to the ``reset`` method. The following example resets the
      inference scope for your cluster:

      .. literalinclude:: /includes/index/autoembed-type/code-snippets/inference-scope/reset-inference-scope-api.sh
         :language: shell
         :category: usage example
         :copyable: true
