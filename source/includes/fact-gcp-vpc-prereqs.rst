You must enable Connect via Peering Only mode for a project before you
create a GCP peering connection in that project. Only peered VPCs can
access clusters in a project with Connect via Peering Only mode enabled.
These clusters are not accessible through the public internet.

.. note::

   You can only enable Connect via Peering Only mode in an |service| project that does
   not yet have any dedicated clusters. Please file a :ref:`support ticket <faq-support>`
   if you already have a |gcp|-backed cluster in a project and want
   to set up |vpc| peering.

To enable Connect via Peering Only mode:

1. Click :guilabel:`Settings` in the navigation menu.

#. Toggle :guilabel:`Connect via Peering Only (GCP and Azure)` to :guilabel:`On`.

   .. important::

      You cannot disable Connect via Peering Only mode for a project after enabling it
      and adding a |gcp|-backed cluster or peering connection to the project.
