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

Download Software from MongoDB
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To download the software, click the download link available on the
customer downloads page. MongoDB provides the |url| of that page to its
customers.

- If you can't access this link, visit the
  :download:`download page </download/ops-manager>`
  for a current evaluation copy of the |onprem| software. 

- If you need an earlier version of the |onprem| software, visit the
  :download:`Release Archive </download/ops-manager/releases/archive>`.

Download Software to Run in Local Mode
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you plan to run |onprem| in :ref:`Local Mode <om-use-local-mode>`,
download the MongoDB software to your versions library directory. The
required software includes:

- All versions of MongoDB :dl:`Community <community>` or
  :dl:`Enterprise <enterprise>` that you want to install
- :dbtools:`MongoDB Tools </>`. The version of MongoDB Tools must
  match the version that the :ref:`Ops Manager release notes
  <mms-changelog>` list as compatible with your |onprem| version. 
