Deploying the MMS Agent
=======================

The :doc:`installation </install>` document outlines a basic setup
process for MMS and the agent. This guide provides a more in depth
review of deployment and MMS agent configuration.

Resource Requirements
---------------------

The agent does have some minimal resource requirements and should run
on separate systems to avoid impacting ``mongod` and ``mongos``
performance. To monitor a cluster with five or fewer nodes, you can
safely deploy on an AWS "micro instance."  Similarly, if you are only
monitoring a small number of databases, you may be able to deploy the
agent on the system running the ``mongos`` process.

TODO clarify and fact check resource requirements

Monitoring Architecture
-----------------------

Only one Agent will report to MMS at a time, but you can run multiple
instances of the agent to provide redundancy. Simply repeat the
installation process in the :doc:`installation guide </install>` for
each new agent. See instructions for automating the agent installation
in the next section.

TODO do non-active agents collect data or just wait to get "baton" from mms when active agent goes off line? Recovery? 

Automated Agent Installation
----------------------------

The agent you downloaded from the MMS site is automatically configured
with the credentials for your account. If you want to automate MMS
agent deployments from the command line, you will need to manually
configure the agent. Download an unconfigured agent from the following
URL: ::

      https://mms-stage.10gen.com/settings/10gen-mms-agent.zip

Unzip this archive and edit the ``setings.py`` file. Replace the
strings "``@API_KEY@``" and "``@SECRET_KEY@``" with the "API" and
"Secret Keys" for your account from "Settings" page of the MMS
console.

You can embed this process in your existing deployment scripts to
automatically install or redeploy new agents.

Control Scripts
---------------

You may wish to create some sort of control or initialization script
to control the demonized process. Consider the following resources:

- `Ubuntu Boot Up How To <https://help.ubuntu.com/community/UbuntuBootupHowto>`_
- `Debian Linux Control/Init Scripts <http://wiki.debian.org/LSBInitScripts>`_
- `Arch Linux rc.d Scripts <https://wiki.archlinux.org/index.php/Writing_rc.d_scripts>`_
- Debian and Ubuntu Systems have an example control script located at
  ``/etc/init.d/skeleton`` that you can use as a template.
- RedHat Enterprise Linux and related distributions (e.g. Fedora,
  CentOS, etc.) provide example control scripts in the
  ``/usr/share/doc/initscripts-*/sysvinitfiles/`` directory.

You may also examine the scripts in your system's ``/etc/init.d/`` or
``/etc/rc.d/`` directory. Use the ``update-rc.d`` utility on Debian
and Ubuntu and the ``chkconfig`` tool on RedHat related systems to add
these scripts to the initialization process. Be sure to test the
control script configuration. It is essential that the agent can be
started, stopped, and start following a system reboot.
