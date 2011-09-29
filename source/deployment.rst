Deploying the MMS Agent
=======================

The :doc:`installation </install>` document outlines a basic
installation process for MMS and the agent. By contrast this guide
provides a more in depth review of deployment and MMS agent
configuration.

Resource Requirements
---------------------

The agent has some minimal resource requirements and should run on
separate systems to avoid impacting performance. To monitor a cluster
with five or fewer nodes, you can safely deploy on an AWS "micro
instance." Similarly, if you're only monitoring a small number of
databases, you may deploy the agent on the system running the
``mongos`` process.

TODO clarify and fact check resource requirements

Monitoring Architecture
-----------------------

Only one Agent will report to MMS at a time, but you can run multiple
instances of the agent to provide redundancy. Simply repeat the
installation process in the :doc:`installation guide </install>` for
each new agent. Instructions for automating the agent installation
follow in the next section.

TODO do non-active agents collect data or just wait to get "baton" from mms when active agent goes off line? Recovery? 

Automated Agent Installation
----------------------------

The agent you have already downloaded is automatically configured by
the MMS console with the credentials for your account. If you want to
automate the agent deployment you will need to manually configure the
agent. Download an unconfigured agent with the following URL: :: 

      https://mms-stage.10gen.com/settings/10gen-mms-agent.zip

Unzip this file, and edit the ``setings.py`` file. Replace the strings
"``@API_KEY@``" and "``@SECRET_KEY@``" with the API and Secret keys
found on the "Settings" page of the MMS console.

You can embed this process in your existing deployment scripts to
automatically install or redeploy new agents

Control Scripts
---------------

You may wish to create some sort of control or initialization script
to make it easier control the demonized process. Consider the
following resources:

- `Ubuntu Boot Up How To <https://help.ubuntu.com/community/UbuntuBootupHowto>`_
- `Control/Init Scripts for Debian <http://wiki.debian.org/LSBInitScripts>`_
- `Arch Linux rc.d Scripts <https://wiki.archlinux.org/index.php/Writing_rc.d_scripts>`_
- Debian and Ubuntu Systems have a basic file located at
  ``/etc/init.d/skeleton`` that you can use as an example.
- RedHat Enterprise Linux and related distributions (e.g. Fedora, CentOS, etc.) provide
  example init scripts and documentation in the ``/usr/share/doc/initscripts-*/sysvinitfiles/``
  directory.

You may also examine the scripts in your system's ``/etc/init.d/`` or
``/etc/rc.d/`` directory. Use the ``update-rc.d`` utility on Debian
and Ubuntu and the ``chkconfig`` tool on RedHat related systems to add
these scripts to the initialization process.

Be sure to test this configuration by starting, stopping, and
rebooting the system to ensure that the agent will always restart.
