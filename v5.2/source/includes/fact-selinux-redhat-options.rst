.. _selinux-installation-instructions:

.. warning::

   An improperly configured SELinux policy might be insecure or may
   stop your :binary:`mongod` instance from working.

   If SELinux is in ``enforcing`` mode, you must customize your SELinux
   policy for MongoDB to 
   
   - Permit Access to ``cgroup``
   - Permit Access to ``netstat``


Permit Access to ``cgroup``
+++++++++++++++++++++++++++

The current SELinux Policy does not allow the MongoDB process to
access ``/sys/fs/cgroup``, which is required to determine
the available memory on your system. If you intend to run SELinux in
``enforcing`` mode, you will need to make the following adjustment
to your SELinux policy:

#. Ensure your system has the ``checkpolicy`` package installed:

   .. code-block:: bash

      sudo yum install checkpolicy

#. Create a custom policy file :file:`mongodb_cgroup_memory.te`:

   .. code-block:: bash

      cat > mongodb_cgroup_memory.te <<EOF
      module mongodb_cgroup_memory 1.0;

      require {
            type cgroup_t;
            type mongod_t;
            class dir search;
            class file { getattr open read };
      }

      #============= mongod_t ==============
      allow mongod_t cgroup_t:dir search;
      allow mongod_t cgroup_t:file { getattr open read };
      EOF

#. Once created, compile and load the custom policy module by
   running these three commands:

   .. code-block:: bash

      checkmodule -M -m -o mongodb_cgroup_memory.mod mongodb_cgroup_memory.te
      semodule_package -o mongodb_cgroup_memory.pp -m mongodb_cgroup_memory.mod
      sudo semodule -i mongodb_cgroup_memory.pp

The MongoDB process is now able to access the correct files with
SELinux set to ``enforcing``.

Permit Access to ``netstat`` for FTDC
+++++++++++++++++++++++++++++++++++++

The current SELinux Policy does not allow the MongoDB process to open
and read ``/proc/net/netstat``, which is required for
:ref:`Full Time Diagnostic Data Capture (FTDC) <ftdc-stub>`.
If you intend to run SELinux in
``enforcing`` mode, you will need to make the following adjustment
to your SELinux policy:

#. Ensure your system has the ``checkpolicy`` package installed:

   .. code-block:: bash

      sudo yum install checkpolicy

#. Create a custom policy file :file:`mongodb_proc_net.te`:

   .. code-block:: bash

      cat > mongodb_proc_net.te <<EOF
      module mongodb_proc_net 1.0;

      require {
          type proc_net_t;
          type mongod_t;
          class file { open read };
      }

      #============= mongod_t ==============
      allow mongod_t proc_net_t:file { open read };
      EOF

#. Once created, compile and load the custom policy module by
   running these three commands:

   .. code-block:: bash

      checkmodule -M -m -o mongodb_proc_net.mod mongodb_proc_net.te
      semodule_package -o mongodb_proc_net.pp -m mongodb_proc_net.mod
      sudo semodule -i mongodb_proc_net.pp

.. include:: /includes/fact-selinux-redhat-customization.rst

