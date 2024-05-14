Restore a Previously Removed Host
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you have not completely removed a host from |onprem| and want to
restore that host, you can :doc:`reimport the deleted MongoDB process </tutorial/nav/mongodb-agent>`.

If you have completely removed a host from |onprem|, you need to 
undelete that host first. To search for a deleted host, you
must have the :authrole:`Global Owner` role.

To locate and undelete a previously deleted host:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-deployment.rst

   .. step:: Undelete the host.

      a. From the :guilabel:`More` menu, click 
         :guilabel:`Deleted Hosts`.
         
      #. Select the :icon:`trash-alt` to undelete the host.

After the host has been undeleted, you can
:ref:`import existing process procedure <add-existing-mongodb-hosts>`.

.. note::

   If your host does not appear in the :guilabel:`Deleted Hosts` list,
   you should be able to
   :ref:`reimport the process <add-existing-mongodb-hosts>` 
   immediately.
