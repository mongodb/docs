Conditional. Install the |k8s-op|.

The |k8s-op-short| watches ``MongoDB``, ``MongoDBOpsManager``, and
``MongoDBSearch`` custom resources and manages the lifecycle of
your MongoDB deployments. If you already installed the |k8s-op|,
skip this step. Otherwise, install the |k8s-op| using |helm|.

To install the |k8s-op| in the ``mongodb`` namespace, copy, paste,
and run the following:

.. io-code-block::
    :copyable: true

    .. input:: /includes/code-examples/search/02-search-enterprise-deploy/code_snippets/02_0100_install_operator.sh
       :language: shell
       :linenos:

    .. output:: /includes/code-examples/outputs/test_kind_search_enterprise_snippets/02_0100_install_operator.out
       :language: shell
       :linenos:
       :visible: false

The preceding command installs |k8s-op-short| in the ``mongodb``
namespace, which it creates if it doesn't already exist. After
installation, the |k8s-op-short| watches for ``MongoDBSearch``
custom resources and manages the lifecycle of your |text-search| and
|vector-search| deployments.