Install the Hosted MMS Server
-----------------------------

Requirements
~~~~~~~~~~~~

To run the Hosted MMS server, you must use a 64-bit server, with the
following minimum requirements:

- an AWS EC2 Standard Extra Large  (m1.xlarge - 15 GB), with

- a 200 GB EBS Provisioned IOPS volume with 500 provisioned IOPS.

This infrastructure can support up to 500 hosts: if your MongoDB
deployment has more than 500 instances, for best results, your hosted
MMS instance will require SAD-backed storage.

These installation instructions assume you are deploying on an
instance running Red Hat, CentOS, Fedora or Amazon Linux.

Configure System
~~~~~~~~~~~~~~~~

#. For AWS users, prepare MongoDB Storage:

   *If you are not using AWS, skip this step and continue to the next
   step.*

   If using an AWS EBS volume for MongoDB storage, create and
   attach the volume to your EC2 instance. Once the volume is
   successfully attached, issue the following command to determine the
   name of the new EBS volume: ::

      sudo fdisk -l

   Create a file system on this volume using the name you found in the
   previous, command, using the following form:

      sudo mkfs -t ext4 /dev/xvd<letter>

   Replace ``<letter>`` with the identifier for the volume, as in the
   following example: ::

      sudo mkfs -t ext4 /dev/xvdf

   You only need to create a file system the first time you initiate
   the drive.

   Create a directory to use as the mount point: ::

      sudo mkdir /mnt/ebs-mount-dir

   Mount the volume with a command that resembles the following: ::

      sudo mount /dev/xvd<letter> /mnt/ebs-mount-dir

   Replace ``<letter>`` with the identifier for the volume, as in the
   following example: ::

      sudo mount /dev/xvdf /mnt/ebs-mount-dir

#. Set Linux Kernel parameters. All users must complete this step to
   ensure optimal performance. Begin by using the following commands
   to change the parameters of running instance: ::

      sudo /sbin/sysctl -w net.core.netdev_max_backlog=30000
      sudo /sbin/sysctl -w net.core.wmem_max=16777216
      sudo /sbin/sysctl -w net.core.rmem_max=16777216

   Edit the ``/etc/sysctl.conf`` file and append the lines below to
   ensure that these parameters are always applied following a system
   reboot: ::

      net.core.netdev_max_backlog = 30000
      net.core.wmem_max = 16777216
      net.core.rmem_max = 16777216

Install and Start MongoDB
~~~~~~~~~~~~~~~~~~~~~~~~~

This section assumes you're installing MongoDB on an instance running
Red Hat, CentOS, Fedora, or Amazon Linux: Use the `Install Mongodb on
Red Hat, CentOS, or Fedora Linux <http://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat-centos-or-fedora-linux/>`_
tutorial for more information.

#. Add MongoDB repositories to the system's package management tool.

   Create the ``/etc/yum.repos.d/10gen.repo`` file and add the
   following information about the repository::

       [10gen]
       name=10gen Repository
       baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64
       gpgcheck=0
       enabled=1

#. Install the MongoDB packages using the following operations: ::

      sudo yum install mongo-10gen mongo-10gen-server

#. Configure data and logging directories for MongoDB.

   Create directories for MongoDB's log and data. This example assumes
   that the path for all MongoDB data is beneath
   ``/mnt/ebs-mnt-dir/mongo/``. Use the following commands: ::

      sudo mkdir -p /mnt/ebs-mount-dir/mongo/data
      sudo mkdir -p /mnt/ebs-mount-dir/mongo/logs

   Issue the following command to ensure that the ``mongod`` process
   owns all paths below the ``/mnt/ebs-mnt-dir/mongo/`` path: ::

      sudo chown -R mongod:mongod /mnt/ebs-mount-dir/mongo

   Edit the ``/etc/mongod.conf`` to include the following settings: ::

      logpath=/mnt/ebs-mount-dir/mongo/logs/mongod.log
      dbpath=/mnt/ebs-mount-dir/mongo/data

   This will configure the paths for the log and data
   directories. Adjust the paths as needed.

#. Start MongoDB.

   Issue the following command: ::

      sudo /etc/init.d/mongod start

   .. note::

      If using EBS, starting MongoDB *may* take several minutes to
      pre-allocate the journal files. This is normal behavior.

Obtain and Install Hosted MMS Server
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

   Contact 10gen to obtain a download of the current stable MMS RPM.

Once you have a copy of the MMS Server on your instance, install it by
issuing a command in the following form: ::

   sudo rpm -ivh 10gen-mms-<version>.x86_64.rpm

Replace ``<version>`` with the version of the ``.rpm`` you
obtained. When installed the base directory for the MMS software is
``/opt/10gen/mms/``.

Configure Hosted MMS Server
~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section describes the configuration of the MMS server. The first
section describes the only required configuration. All other
configurations are optional and describe integration with email
providers and other optional services.

Configure Required Properties
+++++++++++++++++++++++++++++

.. note::

   By default, MMS configures integration for email using local
   sendmail.

Configure MMS properties, by editing the
``/opt/10gen/mms/conf/conf-mms.properties`` file. Edit the following
properties according to the needs of your deployment, as in the
following example: ::

    mms.centralUrl=http://mms.example.com:8080
    mms.fromEmailAddr=MMS Alerts <mms-alerts@example.com>
    mms.replyToEmailAddr=mms-no-reply@example.com
    mms.adminFromEmailAddr=MMS Admin <mms-admin@example.com>
    mms.adminEmailAddr=mms-admin@example.com
    mms.bounceEmailAddr=bounce@example.com

These properties are blank initially, and you **must** define them
before the MMS instance will start.

Optional: Configure Email Authentication
++++++++++++++++++++++++++++++++++++++++

Configure authentication if you want to send mail using existing email
infrastructure (i.e. SMTP,) or a service such as ``Gmail`` or ``Sendgrid`` .

Set the following value in the
``/opt/10gen/mms/conf/conf-mms.properties`` file:

    mms.emailDaoClass=com.xgen.svc.mms.dao.email.JavaEmailDao

Then, to the same file, set the following values as defined by your
provider. Defaults specified inline: ::

    mms.mail.transport=<smtp/smtps> # (defaults to smtp)
    mms.mail.hostname=<mail.example.com> # (defaults to localhost)
    mms.mail.port=<number> # (defaults to 25)
    mms.mail.tls=<true/false> # (Defaults to false)

The following two values are optional, and unless set default to
disabled authentication: ::

    mms.mail.username=
    mms.mail.password=

Optional: AWS Simple Email Service Configuration
++++++++++++++++++++++++++++++++++++++++++++++++

Set the following value in ``/opt/10gen/mms/conf/conf-mms.properties``
to configure integration with AWS's Simple Email Service (SES:) ::

    mms.emailDaoClass=com.xgen.svc.mms.dao.email.AwsEmailDao

To configure this integration you must also provide your AWS account
credentials in the following two properties: ::

    aws.accesskey=
    aws.secretkey=

Optional: Configure a Required reCaptcha for user Registration
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

To enable `reCaptcha anti-spam test
<http://www.google.com/recaptcha/whyrecaptcha>`_ on new user
registration, you may `sign up for a reCaptcha account
<https://www.google.com/recaptcha/admin/create>`_ and provide your API
credentials in the following two properties: ::

    reCaptcha.public.key=
    reCaptcha.private.key=

Optional: Configure Twilio SMS Alert Support
++++++++++++++++++++++++++++++++++++++++++++

To receive alert notifications via SMS, signup for a Twilio account at
<http://www.twilio.com/docs/quickstart> and enter your account ID, API
token, and Twilio phone number into the following properties: ::

    twilio.account.sid=
    twilio.auth.token=
    twilio.from.num=

Start the Hosted MMS Server
~~~~~~~~~~~~~~~~~~~~~~~~~~~

After configuring your Hosted MMS deployment, you can start the MMS
server with the following command: ::

    sudo /etc/init.d/10gen-mms start

The MMS server logs its output to ``/var/log/10gen/mms0.log``. You can
view this log information, with the following command: ::

    sudo less /var/log/10gen/mms0.log

If the server starts successfully, you will see content in this file
that resembles the following: ::

    [main] INFO  com.xgen.svc.core.ServerMain [start:244] - Started mms in: 13381 (ms)

You can now use the MMS instance by visiting the URL specified in the
``mms.centralUrl`` parameter (e.g. http://mms.example.com:8080) to
continue configuration:

Unlike the SaaS version of MMS `provided by 10gen
<https://mms.10gen.com>`_, Hosted MMS stores user accounts in the
local MongoDB instance that supports the MMS instance.  When you sign
into the Hosted MMS instance for the first time, the system will
prompt you to register and create a new "group" for your deployment.

After completing the registration process, you will arrive at the "MMS
Hosts," page.

Because there are no MMS agents attached to your account, the first
page you see in MMS will provide instructions for downloading the MMS
agent. Click the "download agent" link to download a pre-configured
agent for your account. Continue reading this document for
installation and configuration instructions for the MMS agent.
