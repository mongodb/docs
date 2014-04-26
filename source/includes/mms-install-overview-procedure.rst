Overview
--------

|mms| is a service to monitor and back up a MongoDB infrastructure. This
tutorial describes the basic process to install and configure the service.

At a high level, a basic installation will look like the following.
The estimated setup time is less than an hour.

#. Install a standalone local MongoDB server backed by a fast, large storage volume.

#. Install an SMTP email server as appropriate for your environment.

#. Install the MMS server RPM package.

#. Configure the MMS server's URL and email addresses.

#. Start up MMS server.

Links to configure the MMS application and start MMS are at the bottom of
this tutorial.

Prerequisites
-------------

Contact a MongoDB representative to obtain the current stable |monitoring|
release. MMS is available in DEB packages for Debian, Ubuntu, and related
systems; RPM for Red Hat Enterprise Linux, CentOS, Fedora, and related
systems; as well as ``tar.gz`` and ``zip`` packages.

You can also download the latest On-Prem Monitoring releases from
`the downloads page <http://www.mongodb.com/commercialsupport/downloads>`_
as an RPM package.

Confirm your environment meets the :doc:`/management/requirements`.

Procedure
---------

Install and Start MongoDB System
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

See the :manual:`MongoDB Installation tutorials </installation>` for
complete instructions on this procedure.


