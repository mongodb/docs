.. important::

   If SELinux is in ``enforcing`` mode, you must configure SELinux for
   MongoDB if:

   - You are **not** using the default MongoDB paths (for RHEL 7.0), and/or

   - You are **not** using :doc:`default MongoDB ports
     </reference/default-mongodb-port>`.

Non-Default MongoDB Directory Path(s)
+++++++++++++++++++++++++++++++++++++

.. container::

   #. Update the SELinux policy to allow the ``mongod`` service
      to use the new path:

      .. code-block:: sh

         semanage fcontext -a -t <type> </some/MongoDB/path.*>

      where specify one of the following types as appropriate:

      - ``mongod_var_lib_t`` for data path

      - ``mongod_log_t`` for log path

      - ``mongod_var_run_t`` for pid file path

      .. note::

         Be sure to include the ``.*`` at the end of the path.

   #. Update the SELinux user policy for the new directory:

      .. code-block:: sh

         chcon -Rv -u system_u -t <type> </some/MongoDB/path>

      where specify one of the following types as appropriate:

      - ``mongod_var_lib_t`` for data path

      - ``mongod_log_t`` for log path

      - ``mongod_var_run_t`` for pid file path

   #. Apply the updated SELinux policies to the directory:

      .. code-block:: sh

         restorecon -R -v </some/MongoDB/path>

   For examples:

   .. tip::

      - Depending on your user permission, you may need to use ``sudo``
        to perform these operations.

      - Be sure to include the ``.*`` at the end of the path for the
        ``semanage fcontext`` operations.

   - If using a non-default MongoDB data path of ``/mongodb/data``

     .. code-block:: sh

        semanage fcontext -a -t mongod_var_lib_t '/mongodb/data.*'
        chcon -Rv -u system_u -t mongod_var_lib_t '/mongodb/data'
        restorecon -R -v '/mongodb/data'

   - If using a non-default MongoDB log path of ``/mongodb/log/``

     .. code-block:: sh

        semanage fcontext -a -t mongod_log_t '/mongodb/log.*'
        chcon -Rv -u system_u -t mongod_log_t '/mongodb/log'
        restorecon -R -v '/mongodb/log' 


Non-Default MongoDB Ports
+++++++++++++++++++++++++

.. container::

  .. tip::

     Depending on your user permission, you may need to use ``sudo`` to
     perform the operation.

  .. code-block:: sh

     semanage port -a -t mongod_port_t -p tcp <portnumber>

*Optional.* Suppress ``FTDC`` Warnings
++++++++++++++++++++++++++++++++++++++

.. container::

   The current SELINUX Policy does not allow the MongoDB process to open
   and read ``/proc/net/netstat`` for :ref:`param-ftdc` (FTDC). As such,
   the audit log may include numerous messages regarding lack of access
   to this path.

   To track the proposed fix, see `<https://github.com/fedora-selinux/selinux-policy-contrib/pull/79>`__.

   Optionally, as a temporary fix, you can manually adjust the SELinux
   Policy:

   #. Create a policy file :file:`mongodb_proc_net.te`:

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

   #. Once created, compile and load the custom policy module

      .. code-block:: none

         checkmodule -M -m -o mongodb_proc_net.mod mongodb_proc_net.te
         semodule_package -o mongodb_proc_net.pp -m mongodb_proc_net.mod
         semodule -i mongodb_proc_net.pp
