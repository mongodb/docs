.. image:: /images/live-migration-stages.png
   :alt: "To live migrate your deployment to Atlas, generate a link-token,
         provision a migration host, and start live migration."
   :width: 700px
   :align: center

The stages in the live migration workflow are:

- **Stage 1: Link with Atlas**. Perform this step in |service|,
  after you have created your |service| account, organization, and
  project; deployed your paid {+cluster+} in this project; and can
  connect to it.

  a. In the |service| organization, go to :guilabel:`Live Migration`.
  #. Select :guilabel:`Migrate from Ops Manager or Cloud Manager` and
     start the Live Migration wizard.
  #. If you are :opsmgr:`migrating </tutorial/migrate-community-to-atlas>`
     from MongoDB Community using |onprem|, accept
     the :opsmgr:`Ops Manager Migration Agreement
     </reference/legal/live-migration-atlas-licensing>`.
  #. If you are migrating from |onprem|, enter the external IP
     addresses of your |onprem| instances to the |service| access
     list. If you are migrating from |mms|, skip this step.

- **Stage 2: Provision Migration Host**.
  
  - :opsmgr:`Provision a migration host </tutorial/provision-migration-host>`
    in Ops Manager, or :cloudmgr:`provision a migration host </tutorial/provision-migration-host>`
    in |mms|. A migration host runs a dedicated MongoDB Agent
    that orchestrates the live migration process from |com| to |service|.

  - In the :guilabel:`Live Migration: Connect to Atlas` section of your
    |com| organization's :guilabel:`Settings` page, select
    :guilabel:`Connect to Atlas` and paste the the link-token
    that you created in |service|. To learn more, see
    :opsmgr:`Connect to Atlas for Live Migration
    </tutorial/connect-to-atlas-for-live-migration>` in Ops Manager, or
    :cloudmgr:`Connect to Atlas for Live Migration
    </tutorial/connect-to-atlas-for-live-migration>` in |mms|.

- **Stage 3: Start the Migration**. In |service|, follow the
  steps in the wizard to start the Live Migration process.
