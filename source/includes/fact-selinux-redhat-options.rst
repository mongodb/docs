.. important::

   If SELinux is in ``enforcing`` mode, you must customize your SELinux
   policy for MongoDB.

.. container::

   The current SELinux Policy does not allow the MongoDB process to
   access ``/sys/fs/cgroup``, which is required to determine
   the available memory on your system. If you intend to run SELinux in
   ``enforcing`` mode, you will need to make the following adjustment
   to your SELinux policy:

   #. Ensure your system has the ``checkpolicy`` package installed:

      .. code-block:: none

         sudo yum install checkpolicy

   #. Create a custom policy file :file:`mongodb_cgroup_memory.te`:

      .. code-block:: none

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

      .. code-block:: none

         checkmodule -M -m -o mongodb_cgroup_memory.mod mongodb_cgroup_memory.te
         semodule_package -o mongodb_cgroup_memory.pp -m mongodb_cgroup_memory.mod
         sudo semodule -i mongodb_cgroup_memory.pp

   The MongoDB process is now able to access the correct files with
   SELinux set to ``enforcing``.

.. important::

   You will also need to further customize your SELinux policy in the
   following two cases if SELinux is in ``enforcing`` mode:

   - You are **not** using the default MongoDB directories (for RHEL 7.0), and/or

   - You are **not** using :doc:`default MongoDB ports
     </reference/default-mongodb-port>`.

Non-Default MongoDB Directory Path(s)
+++++++++++++++++++++++++++++++++++++

.. container::

   #. Update the SELinux policy to allow the ``mongod`` service
      to use the new directory:

      .. code-block:: sh

         sudo semanage fcontext -a -t <type> </some/MongoDB/directory.*>

      where specify one of the following types as appropriate:

      - ``mongod_var_lib_t`` for data directory

      - ``mongod_log_t`` for log file directory

      - ``mongod_var_run_t`` for pid file directory

      .. note::

         Be sure to include the ``.*`` at the end of the directory.

   #. Update the SELinux user policy for the new directory:

      .. code-block:: sh

         sudo chcon -Rv -u system_u -t <type> </some/MongoDB/directory>

      where specify one of the following types as appropriate:

      - ``mongod_var_lib_t`` for data directory

      - ``mongod_log_t`` for log directory

      - ``mongod_var_run_t`` for pid file directory

   #. Apply the updated SELinux policies to the directory:

      .. code-block:: sh

         restorecon -R -v </some/MongoDB/directory>

   For example:

   .. tip::

      Be sure to include the ``.*`` at the end of the directory for the
      ``semanage fcontext`` operations.

   - If using a non-default MongoDB data path of ``/mongodb/data``:

     .. code-block:: sh

        sudo semanage fcontext -a -t mongod_var_lib_t '/mongodb/data.*'
        sudo chcon -Rv -u system_u -t mongod_var_lib_t '/mongodb/data'
        restorecon -R -v '/mongodb/data'

   - If using a non-default MongoDB log directory of ``/mongodb/log``
     (e.g. if the log file path is ``/mongodb/log/mongod.log``):

     .. code-block:: sh

        sudo semanage fcontext -a -t mongod_log_t '/mongodb/log.*'
        sudo chcon -Rv -u system_u -t mongod_log_t '/mongodb/log'
        restorecon -R -v '/mongodb/log' 


Non-Default MongoDB Ports
+++++++++++++++++++++++++

.. container::

   .. code-block:: sh

      sudo semanage port -a -t mongod_port_t -p tcp <portnumber>

*Optional.* Suppress ``FTDC`` Warnings
++++++++++++++++++++++++++++++++++++++

.. container::

   The current SELinux Policy does not allow the MongoDB process to open
   and read ``/proc/net/netstat`` for :ref:`param-ftdc` (FTDC). As such,
   the audit log may include numerous messages regarding lack of access
   to this path.

   To track the proposed fix, see `<https://github.com/fedora-selinux/selinux-policy-contrib/pull/79>`__.

   Optionally, as a temporary fix, you can manually adjust the SELinux
   Policy:

   #. Ensure your system has the ``checkpolicy`` package installed:

      .. code-block:: none

         sudo yum install checkpolicy

   #. Create a custom policy file :file:`mongodb_proc_net.te`:

      .. code-block:: none

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

      .. tip::

         Depending on your user permission, you may need to use ``sudo`` to
         perform the ``semodule`` operation.

      .. code-block:: none

         checkmodule -M -m -o mongodb_proc_net.mod mongodb_proc_net.te
         semodule_package -o mongodb_proc_net.pp -m mongodb_proc_net.mod
         semodule -i mongodb_proc_net.pp

