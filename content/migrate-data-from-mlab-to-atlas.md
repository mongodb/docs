+++
title = "Migrate an mLab MongoDB Cluster to Atlas"

tags = [
"mongodb-atlas",
"administration",
"migration",
"intermediate" ]
+++

# Migrate an mLab MongoDB Cluster to Atlas

[MongoDB Atlas](https://cloud.mongodb.com/?jmp=docs) is a cloud service for
running, monitoring, and maintaining MongoDB Deployments, including the
provisioning of dedicated servers for MongoDB instances.

The following procedure migrates a MongoDB cluster hosted on mLab to
Atlas. Because the procedure uses the Atlas [Live
Migration](https://docs.atlas.mongodb.com/import/live-import/) tool, the
procedure only requires downtime while updating your applications to connect
to the Atlas cluster.

The Atlas Live Migration tool requires that the source cluster runs MongoDB
3.0 or later. See [Live Import Upgrade
Path](https://docs.atlas.mongodb.com/import/live-import/#upgrade-path) for
more information.

**Important**: This procedure only applies to **Dedicated** mLab clusters.
**Shared** or **Sandbox** mLab clusters are missing command and operational
capabilities that the Live Migration tool requires to function.

<span id="configure-mlab-cluster"></span>

## Configure the Source mLab Cluster for Migration

Log into your mLab account and click on the MongoDB cluster you want to
migrate. Keep this page open, as you will need the information presented on it
for use with this procedure.

<span id="configure-mlab-cluster-admin-user"></span>

### Create an Administrative User for Migration

To create an administrative user:

1. Select the source MongoDB cluster in the mLab user interface.
2. From the **Databases** view, click the ``admin`` database.
3. Click **Users**.
4. Click **Add admin user**. Take note of the username and password you assign. This user may be read-only.
5. Click **Create** to create the user.

<span id="configure-atlas-cluster-whitelist"></span>

### Whitelist the Atlas Migration Servers

1. From the cluster view, click **Networking**.
2. Click **Add IP address range rule(s)**. 
3. Add the following IP addresses:
   
   - ``4.35.16.128/25``
   - ``4.71.186.128/25``
4. Click **Apply security changes**. When prompted, click **Yes** to confirm.

<span id="configure-atlas-cluster"></span>

## Configure the Destination Atlas Cluster for Migration

Log into your Atlas account and click **Clusters** in the left-hand navigation
panel. Ensure you are in your preferred Atlas group by checking the 
**Group** dropdown in the top-left corner of the Atlas UI.

If you have not yet created an Atlas cluster as the destination for the
migration procedure, 
[create one now](https://docs.atlas.mongodb.com/create-new-cluster/).

When selecting a destination cluster, consider the following:
  
- The live migration process may not be able to keep up with a source cluster 
  whose write workload is greater than what can be transferred and applied to
  the destination cluster. You may need to scale the destination cluster up to
  an instance with more processing power, bandwidth, or disk IO.
  
- The destination Atlas cluster must be a replica set. You can [scale the cluster](https://docs.atlas.mongodb.com/scale-cluster/)
  to a sharded cluster after migration. 

- You cannot select an M0 (Free Tier) cluster as the destination for live migration.

- The destination cluster should be empty, excluding data on the ``admin`` and
  ``local`` databases, to prevent namespace collisions. A namespace is the
  full path to a collection in ``<database>.<collection>`` format. For
  example, if both the source and the destination cluster contain data in the
  ``foo.bar`` namespace, the procedure will fail.

### Configure MongoDB Users

The Atlas Live Migration tool *does not* migrate user and role data. You must
[configure the necessary MongoDB users](https://docs.atlas.mongodb.com/security-add-mongodb-users/),
such that your applications have the same level of data and operational access as provided
on the mLab cluster. 

### Whitelist Applications That Must Connect to the Cluster

Atlas defaults to blocking all incoming connections not on the IP whitelist.
The Live Migration tool automatically adds a temporary whitelist entry for the
source mLab cluster. 
You must [whitelist any other applications or services](https://docs.atlas.mongodb.com/security-whitelist/) 
that need to connect to the Atlas cluster.

### VPC Peering  (AWS Only) 

The Atlas Live Migration tool does *not* leverage any VPC peering connections
configured for the destination cluster. If you require that the live migration
procedure leverage a VPC peering connection, please contact [MongoDB
Support](https://www.mongodb.com/support/get-started).

## Configure your Application Server for Migration

Ensure your applications meet the following requirements before starting the
migration process:

- The application server must have support for TLS/SSL to connect to an Atlas
  cluster.

- If the application server uses a MongoDB driver to connect and perform
  operations on the MongoDB cluster, you must update to a driver version that
  is recommended for the MongoDB version of the destination cluster.
  See [the driver compatibility table](https://docs.mongodb.com/ecosystem/drivers/driver-compatibility-reference/)
  for complete documentation.
  
- If the application server uses a MongoDB component, such as the
  [mongo](https://docs.mongodb.com/manual/reference/program/mongo/) shell, to
  connect and perform operations on the MongoDB cluster, you must update these
  components to match the MongoDB version of the destination cluster.
  [Download the appropriate version of the MongoDB server
  package](https://www.mongodb.com/download-center?jmp=docs#community). The
  server package includes the ``mongo`` shell and other components such as
  [mongodump](https://docs.mongodb.com/manual/reference/program/mongodump/)
  and [mongorestore](https://docs.mongodb.com/manual/reference/program/mongorestore/).

## Migrate an mLab Cluster to Atlas

**Important**: The Live Migration tool requires a period of downtime where you
cut over your applications to the Atlas cluster. Atlas provides a 
72-hour extendable cutover period during which you can schedule the downtime.

Before proceeding, ensure you have [configured the mLab source cluster](#configure-mlab-cluster)
and [configured the Atlas destination cluster](#configure-atlas-cluster).

### Step 1: Open the Live Migration Configuration Dialog

In the Altas UI, from **Clusters** view click the **...** button for the
destination cluster and select **Migrate Data To This Cluster**.

Atlas provides a summary of the Live Migration procedure. Once you have
read through it, click **I'm Ready To Migrate** to open the configuration
dialog.

### Step 2: Enter the Source Cluster Connection Information

The Live Migration configuration dialog requires the following information 
from the mLab cluster view:

- The ``Hostname`` and ``Port`` of the primary replica set member in the mLab cluster,
- The ``Username`` for administrative user created in an [earlier step](#configure-mlab-cluster-admin-user), and
- The ``Password`` for the administrative user created in an [earlier step](#configure-mlab-cluster-admin-user).

The mLab cluster view displays the hostname and port of the primary replica set member
as a part of the [mongo](https://docs.mongodb.com/manual/reference/program/mongo/)
shell connection dialog:

```shell

mongo example.mlab.com:59622/<database> -u <dbuser> -p <dbpassword>

```

The primary replica set member's hostname and port is ``example.mlab.com:59622``.

Copy the hostname, username, and password into the Live Migration
configuration dialog.

If your mLab cluster requires SSL for connectivity, you must retrieve the 
mLab's root certificate. [Follow mLab's documentation](http://docs.mlab.com/ssl-db-connections/#downloading-and-using-mlabs-root-certificate)
to retrieve the SSL certificate text. In general, you must:

1. Download the root mLab certificate.
2. mLab provides the root certificate in the DER binary format. You must convert this to a PEM ASCII-based format.

   The following example uses the ``openssl`` tool to convert the root mLab
   certificate to PEM:
   
   ```shell
   
   openssl x509 -inform der -in <path-to-DER-certificate> -out <path-to-PEM-certificate>
   
   ```
   
3. Copy the *entire* certificate, including the ``BEGIN CERTIFICATE`` and
   ``END CERTIFICATE`` lines.
4. In the Atlas Live Migration configuration dialog, toggle **Is SSL Enabled** to
   ``Yes`` to display a text box for entering the certificate. 
5. Paste the *entire* the certificate into the Atlas Live Migration
   configuration dialog.

### Step 3: Validate the Live Migration Settings

Click **Validate** to prompt Atlas to confirm it can successfully connect to the
mLab cluster. If the connection fails to validate, ensure you have
entered all information correctly *and* that you have 
[configured the mLab cluster whitelist](configure-atlas-cluster-whitelist).

If errors persist, open a support ticket in Atlas UI by clicking
`**Support** in the left-hand navigation and filling out the requested information.

### Step 4: Begin the Live Migration Procedure

Once your connection is validated, click **Start Migration**. Atlas begins
the migration procedure and displays a counter in the UI that represents
the time remaining for the Atlas cluster to catch up to the Compose.io cluster.

When the timer turns green, click the **Start Cut Over** button. Atlas
displays a walk-through with instructions on how to proceed with the cut over.
Once you click the **Start Cut Over** button, Atlas starts an extendable 72
hour timer to begin the cut over procedure. If the 72 hour period passes,
Atlas stops synchronizing with the source cluster. You can extend the time
remaining by 24 hours by clicking the **Extend time** hyperlink below the
**<time> left to cut over** timer.

- Stop all applications from reading or writing to the Compose.io cluster.
- Wait for the timer to hit ``0:00``. 
- Update applications with the Atlas cluster connection URI as displayed in Atlas.
- Update applications to use Atlas MongoDB users, such that they retain the same level of data and operational access.
- Restart your applications and confirm they are reading from and writing to the Atlas cluster.

Once your applications are up, you can confirm they have connected successfully to
the Atlas cluster and are writing normally. When you have validated that your
applications are working as expected, you can click **I'm done** to complete the
migration procedure and stop reading data from the mLab cluster. 
