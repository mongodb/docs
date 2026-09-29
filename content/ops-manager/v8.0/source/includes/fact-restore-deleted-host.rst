Restore a Previously Removed Host
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you have not completely removed a host from |onprem| and want to
restore that host, you can :ref:`reimport the deleted MongoDB process <add-mdb-processes>`.

If you have completely removed a host from |onprem|, restore
that host before you reimport it. To search for a deleted host, you
must have the :authrole:`Global Owner` role.

To locate and restore a deleted host:

1. Navigate to the :guilabel:`Deployment` view.
#. From the :guilabel:`More` menu, click :guilabel:`Deleted Hosts`.
#. Select the :icon:`trash-alt` to restore the host.

After you restore the host, you can
:ref:`import existing process procedure <add-existing-mongodb-hosts>`.

.. note::

   If your host does not appear in the :guilabel:`Deleted Hosts` list,
   you can
   :ref:`reimport the process <add-existing-mongodb-hosts>` 
   immediately.
