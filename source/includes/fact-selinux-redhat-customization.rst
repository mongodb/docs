
.. _selinux-custom-policy-howto:

Using a Custom MongoDB Directory Path
+++++++++++++++++++++++++++++++++++++

#. Update the SELinux policy to allow the ``mongod`` service
   to use the new directory:

   .. code-block:: bash

      sudo semanage fcontext -a -t <type> </some/MongoDB/directory.*>

   Specify one of the following types as appropriate:

   - ``mongod_var_lib_t`` for data directory

   - ``mongod_log_t`` for log file directory

   - ``mongod_var_run_t`` for pid file directory

   .. note::

      Be sure to include the ``.*`` at the end of the directory.

#. Update the SELinux user policy for the new directory:

   .. code-block:: bash

      sudo chcon -Rv -u system_u -t <type> </some/MongoDB/directory>

   Specify one of the following types as appropriate:

   - ``mongod_var_lib_t`` for data directory

   - ``mongod_log_t`` for log directory

   - ``mongod_var_run_t`` for pid file directory

#. Apply the updated SELinux policies to the directory:

   .. code-block:: bash

      sudo restorecon -R -v </some/MongoDB/directory>

For example:

.. tip::

   Be sure to include the ``.*`` at the end of the directory for the
   ``semanage fcontext`` operations.

- If using a non-default MongoDB data path of ``/mongodb/data``:

  .. code-block:: bash

     sudo semanage fcontext -a -t mongod_var_lib_t '/mongodb/data.*'
     sudo chcon -Rv -u system_u -t mongod_var_lib_t '/mongodb/data'
     sudo restorecon -R -v '/mongodb/data'

- If using a non-default MongoDB log directory of ``/mongodb/log``
  (e.g. if the log file path is ``/mongodb/log/mongod.log``):

  .. code-block:: bash

     sudo semanage fcontext -a -t mongod_log_t '/mongodb/log.*'
     sudo chcon -Rv -u system_u -t mongod_log_t '/mongodb/log'
     sudo restorecon -R -v '/mongodb/log' 


Using a Custom MongoDB Port
+++++++++++++++++++++++++++

.. code-block:: bash

   sudo semanage port -a -t mongod_port_t -p tcp <portnumber>

