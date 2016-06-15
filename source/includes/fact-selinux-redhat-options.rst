.. important::

   If you are using SELinux, you must configure SELinux to allow
   MongoDB to start on Red Hat Linux-based systems (Red Hat Enterprise
   Linux or CentOS Linux).

To configure SELinux, administrators have three options:

- If SELinux is in ``enforcing`` mode,
  enable access to the relevant ports that the MongoDB deployment will use
  (e.g. ``27017``). See :doc:`/reference/default-mongodb-port` for
  more information on MongoDB's default ports. For default settings,
  this can be accomplished by running

  .. code-block:: sh

     semanage port -a -t mongod_port_t -p tcp 27017

- Disable SELinux by setting the ``SELINUX`` setting to
  ``disabled`` in ``/etc/selinux/config``.

  .. code-block:: sh

     SELINUX=disabled
  
  You must reboot the system for the changes to take effect.

- Set SELinux to ``permissive`` mode in ``/etc/selinux/config`` by
  setting the ``SELINUX`` setting to ``permissive``.

  .. code-block:: sh

     SELINUX=permissive

  You must reboot the system for the changes to take effect.

  You can instead use ``setenforce`` to change to ``permissive`` mode.
  ``setenforce`` does not require a reboot but is **not** persistent.

Alternatively, you can choose not to install the SELinux packages when you are
installing your Linux operating system, or choose to remove the relevant
packages. This option is the most invasive and is not recommended.
