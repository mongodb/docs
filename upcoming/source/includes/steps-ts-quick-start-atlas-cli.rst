.. content copied from cloud-docs/source/includes/steps-avs-quick-start-create-index-local.rst

.. procedure::
   :style: normal

   .. step:: Install the dependencies.

      For detailed instructions, see :atlascli:`Prerequisites
      </atlas-cli-deploy-local/#complete-the-prerequisites>`.

      a. Install the :atlascli:`{+atlas-cli+} </install-atlas-cli/>`.

         If you use `Homebrew <https://brew.sh/#install>`__, you can
         run the following command in your terminal:

         .. code-block::

            brew install mongodb-atlas-cli

         For installation instructions on other operating systems,
         see :atlascli:`Install the {+atlas-cli+} </install-atlas-cli/>`

      #. Install `Docker <https://www.docker.com/>`__.

         Docker requires a network connection for pulling and caching
         MongoDB images.

         - For MacOS or Windows, install `Docker Desktop v4.31+ <https://docs.docker.com/desktop/release-notes/#4310>`__.
         - For Linux, install `Docker Engine v27.0+ <https://docs.docker.com/engine/release-notes/27.0/>`__.
         - For RHEL, you can also use `Podman v5.0+ <https://podman.io>`__.

   .. step:: Set up your local |service| {+deployment+}.

      a. If you don't have an existing |service| account, run ``atlas setup`` in your terminal
         or `create a new account <https://account.mongodb.com/account/register?tck=docs_atlas>`__.

      #. Run ``atlas deployments setup`` and follow the prompts to create a
         local deployment. When prompted to connect to the deployment,
         select ``skip``.

         For detailed instructions, see :atlascli:`Create a Local Atlas Deployment
         </atlas-cli-deploy-local/#create-a-local-atlas-deployment-1>`.

   .. step:: Install :binary:`mongosh`.

   .. include:: /includes/steps-ts-quick-start-mongosh.rst