.. note::

   .. include:: /includes/fact-install-atlas-cli-before-run-commands.rst

Create or Delete a Link-Token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/extracts/atlas-liveMigrations-link-create-and-link-delete.rst

If you are migrating from Ops Manager, request an external IP address
and specify it in the link-token. To learn more, see 
:opsmgr:`Request an External IP Address 
</tutorial/migrate-to-atlas/#request-an-external-ip-address>` in the 
Ops Manager documentation.

Create and View a Validation Job
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/extracts/atlas-liveMigrations-validation-create-and-describe.rst

To learn what |service| validates, see the :guilabel:`Validate` bullet
in the :guilabel:`Migrate Your Cluster` section on this page.

Create and View a Migration Job
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/extracts/atlas-liveMigrations-create-and-describe.rst

Perform the Cutover
~~~~~~~~~~~~~~~~~~~

.. include:: /includes/extracts/atlas-liveMigrations-cutover.rst

When the cutover completes, |service| completes the live migration process and stops synchronizing with the source {+cluster+}. To learn
more, see the :guilabel:`Migrate Your Cluster` section on this page.