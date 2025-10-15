.. image:: /images/live-migration-c2c-stages.png
   :alt: "To live migrate your deployment to Atlas, generate a link-token,
         provision a migration host, and start live migration."
   :width: 700px
   :align: center

The stages in the live migration workflow are:

- **Stage 1: Link with Atlas**. Perform this step in |service|,
  after you have created your |service| account, organization, and
  project; deployed your dedicated {+cluster+} in this project; and can
  connect to it.

  a. ... include:: /includes/nav/list-migration-page.rst
    
  #. Select :guilabel:`Migrate from a Self-Managed MongoDB Database` and
     start the live migration wizard.

- **Stage 2: Provision Migration Host**.
  
  - :cloudmgr:`provision a migration host </tutorial/provision-migration-host>`
    in |mms|. A migration host runs a dedicated MongoDB Agent
    that orchestrates the live migration process from |mms| to |service|.

    .. note::

       If you are migrating a source MongoDB deployment that hasn't used
       |mms| before, :cloudmgr:`add existing MongoDB processes to Cloud Manager </tutorial/add-existing-mongodb-processes/>`.

  - In the :guilabel:`Live Migration: Connect to Atlas` section of your
    |mms| organization's :guilabel:`Settings` page, select
    :guilabel:`Connect to Atlas` and paste the link-token
    that you created in |service|. To learn more, see
    :cloudmgr:`Connect to Atlas for Live Migration
    </tutorial/connect-to-atlas-live-migration>` in |mms|.

- **Stage 3: Start the Migration**. In |service|, follow the
  steps in the wizard to start the live migration process.
