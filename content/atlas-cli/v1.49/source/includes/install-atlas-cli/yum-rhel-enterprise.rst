Install the {+atlas-cli+}
-------------------------

To install the {+atlas-cli+} on RHEL-based systems using Yum, follow the steps below.

Procedure
~~~~~~~~~

.. procedure::
    :style: normal

    .. step:: Configure ``yum`` for your edition of MongoDB. 

       Create a
       ``/etc/yum.repos.d/mongodb-enterprise-{+mdbVersion+}.repo`` file
       so that you can install {+atlas-cli+} directly using
       ``yum``. Replace ``{+mdbVersion+}`` with your
       edition of MongoDB.

       .. code-block:: text
          :emphasize-lines: 1
    
          [mongodb-enterprise-{+mdbVersion+}]
          name=MongoDB Repository
          baseurl=https://repo.mongodb.com/yum/redhat/$releasever/mongodb-enterprise/{+mdbVersion+}/$basearch/
          gpgcheck=1
          enabled=1
          gpgkey=https://pgp.mongodb.com/server-{+mdbVersion+}.asc

    .. step:: Install the {+atlas-cli+} and {+mongosh+}.
    
    Invoke the following ``yum`` command to install both the 
    {+atlas-cli+} and {+mongosh+}:

    .. code-block:: sh

        sudo yum install -y mongodb-atlas

    If you don't want to install {+mongosh+}, invoke the
    following ``yum`` command instead to install the 
    {+atlas-cli+} only:

    .. code-block:: sh

        sudo yum install -y mongodb-atlas-cli

    .. include:: /includes/steps-verify-atlas-cli.rst

Update the {+atlas-cli+}
------------------------

To update the {+atlas-cli+} with Yum, follow the steps below.

.. procedure::
    :style: normal

    .. step:: Update the {+atlas-cli+}.

    If you installed the {+atlas-cli+} and {+mongosh+} together using the ``mongodb-atlas`` package, invoke the following ``yum`` command:

    .. code-block:: sh

        yum update mongodb-atlas

    If you installed the {+atlas-cli+} only using the
    ``mongodb-atlas-cli`` package, invoke the following ``yum``
    command:

    .. code-block:: sh

        yum update mongodb-atlas-cli

    .. include:: /includes/steps-verify-update-atlas-cli.rst
