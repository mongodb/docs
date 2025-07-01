You can set the following settings in the {+atlas-ui+}:

Project Name
~~~~~~~~~~~~

The :guilabel:`Project Name` setting sets your project's name.

You must have the :authrole:`Project Owner` role for the 
project or the :authrole:`Organization Owner` role for the 
project's organization to edit the project name.

Project Time Zone
~~~~~~~~~~~~~~~~~

The :guilabel:`Project Time Zone` setting sets your project's time zone. 
This affects the maintenance window timezone and alerts, but not the timezone 
set for individual user accounts. [#user-settings]_
      
There is also a :guilabel:`User Preferences` timezone, which 
only affects the activity feed.

Tags
~~~~

The :guilabel:`Tags` setting allows you to label and organize your projects with key-value
pairs. To learn more, see :ref:`project-tags`.

Connect via Peering Only (GCP and Azure)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :guilabel:`Connect via Peering Only (GCP and Azure)` setting allows you to enable or disable 
connections between MongoDB Atlas dedicated {+clusters+} and public |ipaddr| addresses outside
of the peered |vpc|/VNet. You can only enable or disable this setting when there are no 
active dedicated GCP or Azure {+clusters+} in your project.

:gold:`IMPORTANT:` This feature has been deprecated. Existing {+clusters+} can
continue to use this feature. Use both Standard and Private
IP for Peering connection strings to connect to your project.
These connection strings allow you to connect using both
|vpc|/VNet Peering and allowed public IP addresses. To
learn more about support for multiple connection strings, see
:dochub:`this FAQ <atlas-horizon-faq>`.

Using Custom DNS on AWS with VPC Peering
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :guilabel:`Using Custom DNS on AWS with VPC Peering` setting allows you 
to expose a second connection string for your dedicated |service| {+clusters+} 
on |aws| that resolves to private IPs.

Enable this setting if you use custom DNS that cannot take
advantage of |aws| built-in split-horizon DNS across a VPC peering
connection.

|service| displays this setting only when you
:doc:`enable network peering on AWS </security-vpc-peering>`.

Multiple Regionalized Private Endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :guilabel:`Multiple Regionalized Private Endpoints` setting allows you 
to create more than one :ref:`Private Endpoint <private-endpoint>` in more than one 
region for multi-region and global sharded {+clusters+}.

Enable this setting if you want to connect to multi-region or
global sharded {+clusters+} using private endpoints.

.. include:: /includes/admonitions/warnings/regionalized-pls-change-connection-strings.rst

.. include:: /includes/enable-regionalized-privatelink.rst

Collect Database Specific Statistics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :guilabel:`Collect Database Specific Statistics` setting allows you to enable or 
disable the collection of database statistics in :doc:`cluster metrics </monitor-cluster-metrics>`.

Set Preferred Cluster Maintenance Start Time
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :guilabel:`Set Preferred Cluster Maintenance Start Time` setting allows you to set 
which hour of the day that |service| should start weekly maintenance on your cluster.

To learn more about {+cluster+} maintenance windows, see
:ref:`configure-maintenance-window`.

Project Overview
~~~~~~~~~~~~~~~~

The :guilabel:`Project Overview` setting sets the project landing page to :guilabel:`Overview`. 
:guilabel:`Overview` is a home page for |service| that displays
modules for common |service| actions.

|service| enables the :guilabel:`Overview` page by default. To
enable or disable the :guilabel:`Overview` page, you must have the
:authrole:`Project Owner` role.

Real Time Performance Panel
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :guilabel:`Real Time Performance Panel` setting allows you to see real-time 
metrics from your MongoDB database.

Data Explorer
~~~~~~~~~~~~~

The :guilabel:`Data Explorer` setting allows you to query your database with 
an easy-to-use interface.

.. include:: /includes/fact-disable-de-limitations-nested.rst

Performance Advisor and Profiler
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :guilabel:`Performance Advisor and Profiler` setting allows you to analyze 
database logs and receive performance improvement recommendations.

Schema Advisor
~~~~~~~~~~~~~~

The :guilabel:`Schema Advisor` setting allows you to receive customized recommendations to optimize your
data model and enhance performance.

Disable this setting to disable schema suggestions in the
:ref:`Performance Advisor <performance-advisor>` and the
:ref:`{+atlas-ui+} <atlas-ui-dbs>`.

.. include:: /includes/fact-serverless-schema-advisor.rst

Managed Slow Operations
~~~~~~~~~~~~~~~~~~~~~~~

The :guilabel:`Managed Slow Operations` setting dynamically sets the
:ref:`Slow Query Threshold <pa-slow-queries>` based on execution times 
of operations across your cluster.

Disable this feature to set a fixed, user-specified slow query threshold.

Enable Extended Storage Sizes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :guilabel:`Enable Extended Storage Sizes` setting allows you to configure 
M40+ {+clusters+} with greater maximum storage than the standard limit. 
Only {+clusters+} which meet the following criteria support extended storage:

- The {+cluster+} is on |azure|, |aws|, or |gcp|
- If the {+cluster+} is on |azure|, it is configured in one of the
  following :ref:`regions that support extended storage <microsoft-azure-storage-supported-regions>`
- The {+cluster+} is either :guilabel:`General` or :guilabel:`Low-CPU` class
- The {+cluster+} is single-region.

.. include:: /includes/fact-extended-storage.rst

Delete Charts
~~~~~~~~~~~~~

.. include:: /includes/fact-delete-charts-warning-nested.rst

The :guilabel:`Delete Charts` setting allows :authrole:`Project Owners <Project Owner>` to 
delete the |charts| instance associated with your project. This setting is only visible 
if you have :charts:`created a Charts instance </launch-charts>` for your project.

.. include:: /includes/fact-recreate-charts-instance.rst

Delete Project
~~~~~~~~~~~~~~

The :guilabel:`Delete Project` setting allows you to delete a project by clicking 
the ``DELETE`` button.

.. include:: /includes/fact-project-delete-criteria.rst

.. [#user-settings]
   To modify your user settings, click on your user name in the
   upper-right-hand corner and select :guilabel:`Account`.