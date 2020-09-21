Hardware and Software Requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Your servers must meet the :doc:`/core/requirements`.

.. include:: /includes/admonitions/warning-follow-requirements.rst

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
page that MongoDB provided to you. If you do not have this link, you
can access the :dl:`download page <ops-manager>` for evaluation. You 
can download legacy binaries from the `Release Archive 
<https://www.mongodb.com/subscription/downloads/archived>`__.
