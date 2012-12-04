Install the Hosted MMS Server
-----------------------------

Requirements
~~~~~~~~~~~~

Self-hosted MMS requires a 64-bit server. The minimum hardware is
an EC2 Standard Extra Large (m1.xlarge - 15 GB) with a 200 GB
provisioned 500 IOPS EBS volume for data storage (or
equivalents). This setup can support up to 500 hosts: for best
results, if your MongoDB deployment has more than 500 instances,
your MMS instance will require SSD storage.

Configure System
~~~~~~~~~~~~~~~~

3.) Prepare MongoDB Storage (AWS users)

If using an AWS EBS volume for MongoDB storage, proceed to create and
attach the volume to your EC2 instance; once attached, continue with
the following steps. If not using AWS then skip to step #4 below.::

    $ sudo fdisk -l # (NOTE: for finding device name of attached EBS volume. E.g., /dev/xvdf)
    $ sudo mkfs -t ext4 /dev/xvdf # (NOTE: only required if first time using volume)

Create mount point directory and mount volume::

    $ sudo mkdir /mnt/ebs-mount-dir
    $ sudo mount /dev/xvd[letter] /mnt/ebs-mount-dir
    e.g., sudo mount /dev/xvdf /mnt/ebs-mount-dir

4.) Configure MongoDB and Kernel Parameters

Create database and log directories at desired location on filesystem,
ensuring proper ownership for user ``mongod``::

    $ sudo mkdir -p /mnt/ebs-mount-dir/mongo/{data,logs}
    $ sudo chown -R mongod:mongod /mnt/ebs-mount-dir/mongo

Edit /etc/mongod.conf and set the log and db paths::

    logpath=/mnt/ebs-mount-dir/mongo/logs/mongod.log
    ...
    dbpath=/mnt/ebs-mount-dir/mongo/data

Apply kernel changes to running server::

    $ sudo /sbin/sysctl -w net.core.netdev_max_backlog=30000
    $ sudo /sbin/sysctl -w net.core.wmem_max=16777216
    $ sudo /sbin/sysctl -w net.core.rmem_max=16777216

Edit /etc/sysctl.conf and append the lines below such that these
kernel changes are automatically applied in event of server reboot::

    net.core.netdev_max_backlog = 30000
    net.core.wmem_max = 16777216
    net.core.rmem_max = 16777216

Install and Start MongoDB
~~~~~~~~~~~~~~~~~~~~~~~~~

1.) Configure Package Management System (YUM)
(http://docs.mongodb.org/manual/tutorial/install-mongodb-on-redhat-centos-or-fedora-linux/)

Create a /etc/yum.repos.d/10gen.repo file with the following information about the repository::

    [10gen]
    name=10gen Repository
    baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64
    gpgcheck=0
    enabled=1

2.) Installing Packages::

    $ sudo yum install mongo-10gen mongo-10gen-server

5.) Startup MongoDB::

    $ sudo /etc/init.d/mongod start

.. note::

   If using EBS, starting MongoDB may take up to a couple minutes for
   the journal files to be initially pre-allocated.

Obtain and Install Hosted MMS Server
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

6.) Obtain and Install MMS server

.. note::

    Contact 10gen to obtain a download of the current stable MMS RPM.

::

    $ sudo rpm -ivh 10gen-mms-[version].x86_64.rpm

    (Base directory for the installation is /opt/10gen/mms/)

Configure Hosted MMS Server
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Configure Required Properties
+++++++++++++++++++++++++++++

7.) Configure required MMS server properties::

    $ sudo vi /opt/10gen/mms/conf/conf-mms.properties
    e.g.,

    mms.centralUrl=http://mms.acmewidgets.com:8080
    ...
    mms.fromEmailAddr=MMS Alerts <mms-alerts@acmewidgets.com>
    ...
    mms.replyToEmailAddr=mms-no-reply@acmewidgets.com
    ...
    mms.adminFromEmailAddr=MMS Admin <mms-admin@acmewidgets.com>
    ...
    mms.adminEmailAddr=mms-admin@acmewidgets.com
    ...
    mms.bounceEmailAddr=bounce@acmewidgets.com

While the above properties are initially blank and must be specified
before the server can be started, the configuration options below are
optional. These define the integrations for your email provider or
SMTP server, plus other optional services.

.. note::

    Out of the box, email integration is configured for default local sendmail.

Configure Email Authentication
++++++++++++++++++++++++++++++

**Email authentication options**::

    mms.emailDaoClass=com.xgen.svc.mms.dao.email.JavaEmailDao

If using ``com.xgen.svc.mms.dao.email.JavaEmailDao``, the options
below must be set for your provider (sendmail, Gmail, Sendgrid, et
al.)::

    mms.mail.transport=[smtp/smtps] (defaults to smtp)
    mms.mail.hostname=[mail.acmewidgets.com] (defaults to localhost)
    mms.mail.port=[number] (defaults to 25)
    mms.mail.username=(Optional, defaults to no authentication)
    mms.mail.password=(Optional, defaults to no authentication)
    mms.mail.tls=[true/false] (Defaults to false)

AWS Simple Email Service Configuration
++++++++++++++++++++++++++++++++++++++

**AWS credentials**

:: 

    mms.emailDaoClass=com.xgen.svc.mms.dao.email.AwsEmailDao

If configuring email integration with Amazon's Simple Email Service
(SES), in addition to specifying
``com.xgen.svc.mms.dao.email.AwsEmailDao`` as the mms.emailDaoClass
above, you must also provide your AWS account credentials in the two
properties below::

    aws.accesskey=
    aws.secretkey=

Configure a Required reCaptcha on user registration
+++++++++++++++++++++++++++++++++++++++++++++++++++

To enable `reCaptcha anti-spam test
<http://www.google.com/recaptcha/whyrecaptcha>`_ on new user
registration, you may `sign up for a reCaptcha account
<https://www.google.com/recaptcha/admin/create>`_ and provide your API
credentials in the two properties below::

    reCaptcha.public.key=
    reCaptcha.private.key=

Configure Twilio SMS Alert support
++++++++++++++++++++++++++++++++++

To receive alert notifications via SMS, signup for a Twilio API
account at http://www.twilio.com/docs/quickstart and enter your
account ID, API token, and Twilio phone # for the properties below,
respectively::

    twilio.account.sid=
    twilio.auth.token=
    twilio.from.num=

Start the Hosted MMS Server
~~~~~~~~~~~~~~~~~~~~~~~~~~~

8.) Start up the MMS server::

    $ sudo /etc/init.d/10gen-mms start

Startup information will be logged to /var/log/10gen/mms0.log.::

    $ sudo less /var/log/10gen/mms0.log

    Successful server startup should end with a line similar to the following:
    [main] INFO  com.xgen.svc.core.ServerMain [start:244] - Started mms in: 13381 (ms)

Visit the same URL specified on mms.centralUrl to continue configuration:
E.g., http://mms.acmewidgets.com:8080

By contrast with the SaaS version of MMS `provided by 10gen
<https://mms.10gen.com>`_, user accounts are stored inside your local
MongoDB server supporting MMS.  When you sign into MMS for the first
time, the system prompts you to register and create a new "group" for
your deployment.

After completing the registration process, you will arrive at the "MMS
Hosts," page.

Because there are no MMS agents attached to your account, the first
page you see in MMS will provide instructions for downloading the MMS
agent. Click the "download agent" link to download an agent
specifically configured for your account. From here you may proceed
with the agent installation below.
