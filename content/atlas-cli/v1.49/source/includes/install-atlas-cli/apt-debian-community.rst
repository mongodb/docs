Install the {+atlas-cli+}
-------------------------

To install the {+atlas-cli+} on Debian-based systems using Apt, follow the steps below.

Complete the Prerequisites
~~~~~~~~~~~~~~~~~~~~~~~~~~

To install the {+atlas-cli+} using Apt, you must install ``gnupg`` and ``curl``:

.. code-block:: sh
    
    sudo apt-get install gnupg curl

Procedure
~~~~~~~~~

.. procedure::
    :style: normal

    .. step:: Import the public key used by ``apt``.

    From a terminal, issue the following command to import the MongoDB
    public GPG Key from
    ``https://pgp.mongodb.com/server-{+mdbVersion+}.asc``.
    Replace ``{+mdbVersion+}`` with your
    edition of MongoDB. 

    .. code-block:: sh

        curl -fsSL https://pgp.mongodb.com/server-{+mdbVersion+}.asc | \
            sudo gpg -o /usr/share/keyrings/mongodb-server-{+mdbVersion+}.gpg \
            --dearmor

    A successful command returns an ``OK``.

    .. step:: Create a list file for the Community Edition of MongoDB.

       Create the list file 
       ``/etc/apt/sources.list.d/mongodb-org-{+mdbVersion+}.list`` 
       for your version of
       Debian. Replace ``{+mdbVersion+}`` with your
       edition of MongoDB.

       .. tabs::

          .. tab:: Debian 12 (Bookworm)
             :tabid: comm-deb-12

             .. code-block:: sh

                echo "deb http://repo.mongodb.org/apt/debian bookworm/mongodb-org/{+mdbVersion+} main" | sudo tee /etc/apt/sources.list.d/mongodb-org-{+mdbVersion+}.list

          .. tab:: Debian 11 (Bullseye)
             :tabid: comm-deb-11

             .. code-block:: sh

                echo "deb http://repo.mongodb.org/apt/debian bullseye/mongodb-org/{+mdbVersion+} main" | sudo tee /etc/apt/sources.list.d/mongodb-org-{+mdbVersion+}.list

    .. step:: Refresh the package database.

    Invoke the following ``apt`` command:

    .. code-block:: sh

        sudo apt-get update

    .. step:: Install the {+atlas-cli+} and {+mongosh+}.
    
    Invoke the following ``apt`` command to install both the 
    {+atlas-cli+} and {+mongosh+}:

    .. code-block:: sh

        sudo apt-get install -y mongodb-atlas

    If you don't want to install {+mongosh+}, invoke the
    following ``apt`` command instead to install the 
    {+atlas-cli+} only:

    .. code-block:: sh

        sudo apt-get install -y mongodb-atlas-cli

    .. include:: /includes/steps-verify-atlas-cli.rst

Update the {+atlas-cli+}
------------------------

To update the {+atlas-cli+} on Debian-based systems using Apt, follow the steps below.

.. procedure::
    :style: normal

    .. step:: Update the {+atlas-cli+}.

    If you installed the {+atlas-cli+} and {+mongosh+} together
    using the ``mongodb-atlas`` package, invoke the following
    ``apt`` command:

    .. code-block:: sh

        sudo apt-get install --only-upgrade mongodb-atlas

    If you installed the {+atlas-cli+} only using the
    ``mongodb-atlas-cli`` package, invoke the following ``apt`` command:

    .. code-block:: sh

        sudo apt-get install --only-upgrade mongodb-atlas-cli

    .. include:: /includes/steps-verify-update-atlas-cli.rst
