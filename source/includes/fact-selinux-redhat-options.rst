You must configure SELinux to allow MongoDB to start on Red Hat Linux-based
systems (Red Hat Enterprise Linux or CentOS Linux). Administrators have three
options:

- enable access to the relevant ports (e.g. 27017) for SELinux. See
  :doc:`/reference/default-mongodb-port` for more information on MongoDB's
  default ports. For default settings, this can be accomplished by running

  .. code-block:: sh

     semanage port -a -t mongod_port_t -p tcp 27017

- set SELinux to ``permissive`` mode in ``/etc/selinux.conf``. The line

  .. code-block:: sh

     SELINUX=enforcing

  should be changed to

  .. code-block:: sh

     SELINUX=permissive

- disable SELinux entirely; as above but set

  .. code-block:: sh

     SELINUX=disabled

All three options require ``root`` privileges. The latter two options each
requires a system reboot and may have larger implications for your deployment.

You may alternatively choose not to install the SELinux packages when you are
installing your Linux operating system, or choose to remove the relevant
packages. This option is the most invasive and is not recommended.
