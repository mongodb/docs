Hardware and Software Requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Your servers must meet the :doc:`/core/requirements`.

.. warning::

   Failure to configure servers according to the
   :doc:`/core/requirements`, including the requirement to read the
   :manual:`MongoDB Production Notes </administration/production-notes>`,
   can lead to production failure.

If your backing databases run the MMAPv1 storage engine, the upgrade
process fails. |onprem| prompts you to
:manual:`upgrade the storage engine for those backing databases to WiredTiger </tutorial/change-replica-set-wiredtiger>`.

Administrator Privileges
~~~~~~~~~~~~~~~~~~~~~~~~

You must have administrator privileges on the servers on which you
perform the upgrade.

Download Link
~~~~~~~~~~~~~

You must have the download link available on the customer downloads
page provided to you by MongoDB. If you do not have this link, you
can access the download page for evaluation at
`http://www.mongodb.com/download <http://www.mongodb.com/download>`_.
