.. procedure::
   :style: normal

   .. step:: Connect to |service| from the {+atlas-cli+}.

      Use a profile that has access to your project. To learn more, see
      :atlascli:`Connect from the Atlas CLI </connect-atlas-cli/>`.

   .. step:: View the current inference scope.

      Replace ``{groupId}`` with your project ID and ``{clusterName}``
      with the name of your cluster. The following command returns the
      inference scope for your cluster:

      .. io-code-block::
         :copyable: true

         .. input:: /includes/index/autoembed-type/code-snippets/inference-scope/get-inference-scope-cli.sh
            :language: shell

         .. output:: /includes/index/autoembed-type/code-snippets/inference-scope/get-inference-scope-output.json
            :language: json
            :visible: false

      If the ``mutable`` field is ``false``, you can't change the
      inference scope of the cluster. The ``reason`` field explains why.
      By default (``source``: ``DEFAULT``), inference can run in any cloud
      provider and geography.

   .. step:: Change the inference scope.

      Create a file named ``inference-scope.json`` that specifies the
      scope that you want to set. The following example scopes inference
      for your cluster to Europe. To scope inference to the United
      States, set ``geography`` to ``US``:

      .. literalinclude:: /includes/index/autoembed-type/code-snippets/inference-scope/update-inference-scope-cli.json
         :language: json
         :category: usage example
         :copyable: true

      Replace ``{groupId}`` with your project ID and ``{clusterName}``
      with the name of your cluster, and then run the following command
      from the directory that contains the file:

      .. literalinclude:: /includes/index/autoembed-type/code-snippets/inference-scope/update-inference-scope-cli.sh
         :language: shell
         :category: usage example
         :copyable: true

      |service| applies the change asynchronously. Until the change
      completes, the ``effective`` field shows the previous scope.

   .. step:: (Optional) Return the cluster to the default inference scope.

      The following command resets the inference scope for your cluster:

      .. literalinclude:: /includes/index/autoembed-type/code-snippets/inference-scope/reset-inference-scope-cli.sh
         :language: shell
         :category: usage example
         :copyable: true
