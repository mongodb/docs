MongoDB custom resources do not support all
:binary:`~bin.mongod` command line options. If you use an
unsupported option in your object specification file, the backing
:opsmgr:`MongoDB Agent </tutorial/nav/mongodb-agent/>`
overrides the unsupported options. For a complete list of options
supported by MongoDB custom resources, see :ref:`k8s-specification`.