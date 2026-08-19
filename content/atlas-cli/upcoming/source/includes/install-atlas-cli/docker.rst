Install the {+atlas-cli+}
-------------------------

To install the {+atlas-cli+} using Docker, follow the steps below.

Complete the Prerequisites
~~~~~~~~~~~~~~~~~~~~~~~~~~~

To install the {+atlas-cli+} using Docker, install the
`Docker engine <https://docs.docker.com/engine/install/>`__ or
`Docker desktop <https://docs.docker.com/desktop/>`__.

Procedure
~~~~~~~~~

To pull the latest `{+atlas-cli+} Docker image
<https://hub.docker.com/repository/docker/mongodb/atlas/general>`__, run the following
command:

.. code-block::

   docker pull mongodb/atlas

If you run ``docker pull mongodb/atlas`` without specifying
a version tag, Docker automatically pulls the latest version
of the Docker image (``mongodb/atlas:latest``).

To pull a specific version of the Docker image, run the following
command, replacing ``<tag>`` with the version tag:

.. code-block::

   docker pull mongodb/atlas:<tag>

To learn how to run {+atlas-cli+} commands with Docker after you
pull the Docker image, see :ref:`atlas-cli-docker`.

Authenticate with |service|
~~~~~~~~~~~~~~~~~~~~~~~~~~~

After pulling the Docker image, authenticate to start using the
{+atlas-cli+}:

.. code-block:: sh

   docker run -it mongodb/atlas auth login

The command opens a browser window and returns a one-time
activation code. This code expires after 10 minutes.

For more authentication options, see :ref:`connect-atlas-cli`.
