.. important::

   You must configure SELinux to allow MongoDB to start on Red Hat
   Linux-based systems (Red Hat Enterprise Linux or CentOS Linux).

To configure SELinux, administrators have three options:

.. note::

   All three options require ``root`` privileges. The first two options
   each requires a system reboot and may have larger implications for
   your deployment.

- Disable SELinux entirely by changing the ``SELINUX`` setting to
  ``disabled`` in ``/etc/selinux/config``.

  .. code-block:: sh

     SELINUX=disabled

- Set SELinux to ``permissive`` mode in ``/etc/selinux/config`` by
  changing the ``SELINUX`` setting to ``permissive`` .

  .. code-block:: sh

     SELINUX=permissive

  .. note::

     You can use ``setenforce`` to change to permissive mode; this
     method does not require a reboot but is **not** persistent.
     
- Enable access to the relevant ports (e.g. 27017) for SELinux if in
  ``enforcing`` mode. See :doc:`/reference/default-mongodb-port` for
  more information on MongoDB's default ports. For default settings,
  this can be accomplished by running

  .. code-block:: sh

     semanage port -a -t mongod_port_t -p tcp 27017

  .. include:: /includes/warning-selinux-rhel7.rst

You may alternatively choose not to install the SELinux packages when you are
installing your Linux operating system, or choose to remove the relevant
packages. This option is the most invasive and is not recommended.
