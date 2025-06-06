.. ATTENTION WRITERS: Please do not edit this page without approval from legal
.. This page is hidden from the TOC and search indexing.

:noprevnext:
:orphan:

.. meta::
   :robots: noindex, nosnippet

.. _atlas-data-processing:

===========================
{+service+} Data Processing
===========================

|service-fullname| offers customers the option to localize data
processing by certain {+service+} features to a particular region. The
following sections provide additional details. 

When creating a |service-fullname| {+cluster+} in an {+service+}
project, a customer must select a cloud provider and regions to deploy that {+cluster+}. The underlying cloud provider and region selected by
a customer are referred to as *Cluster Regions*. The data that a
customer stores in their {+service+} {+clusters+} will be stored at
rest in the specified region(s). This data includes any data records stored in the database as JSON documents and any data stored in database or audit logs. The data stored in {+clusters+} may also
include {+service+} database names, collection names, shard keys, index
names, index definitions, {+service+} database user names, and 
{+service+} database roles.

|service-fullname| offers numerous features that provide increased
observability into your database and proactive optimization
suggestions, such as :ref:`Performance Advisor <performance-advisor>`,
:ref:`Query Profiler <profile-database>` and :ref:`Schema Advisor
<schema-suggestions>`, and the
:ref:`Real Time Performance Panel <real-time-metrics-status-tab>`. These features make use of database logs, which may contain snippets of
data that customers store in |service-fullname|. Additionally, 
|service-fullname| offers :ref:`Data Explorer <atlas-ui>`, which allows
a customer to query their data in {+service+} clusters. 

By default, each of these features run within the |service-fullname|
control plane in the United States. Upon request and for a limited set
of geographies, these features can also be configured to run in a
specific region. The cloud provider regions where these services run
are referred to as *Project Services Regions*. 

Q: How are *Project Services Regions* Enabled?

The default *Project Services Region* is the |service-fullname| control
plane in the United States.

Q: Can {+service+} customers select the *Project Services Regions*?

No. Unlike {+cluster+} regions, the *Project Services Regions* are
automatically selected by |service-fullname|. The automatic selection
depends upon whether a customer has requested to enable non-US *Project
Services Regions*.

Q: Which {+service+} features support non-US *Project Services Regions*?

The following {+service+} features support non-US *Project Services Regions*:

- :ref:`Performance Advisor <performance-advisor>`
- :ref:`Query Profiler <profile-database>`
- :ref:`Schema Advisor <schema-suggestions>`
- :ref:`Data Explorer <atlas-ui>`
- :ref:`Real Time Performance Panel <real-time-metrics-status-tab>`

When the option is enabled, {+service+} will limit processing of document field
values and database logs that are processed through Performance
Advisor, Query Profiler, Schema Advisor, Data Explorer, and Real Time
Performance Panel so that those field values and database logs are
processed in a specific *Project Services Region*. 

Q: How does {+service+} select the *Project Services Region*?

When a non-US *Project Services Region* is enabled, {+service+} will set
the data processing region for the {+service+} project-- with respect to the features and data described above-- based on the first Dedicated Tier {+cluster+} created in the {+service+} project, as follows: 

- If the first Dedicated Tier {+cluster+} is a single-region replica
  set or sharded cluster, {+service+} will set the *Project Services
  Region* based on that single region;  
- If the first Dedicated Tier {+cluster+} is a :ref:`multi-region
  <create-cluster-multi-region>` replica set
  or sharded {+cluster+}, {+service+} will set the *Project Services
  Region* based on the region that you designate as that cluster's
  highest priority region;
- If the first Dedicated Tier {+cluster+} is a :ref:`Global Writes 
  <ref-deployment-types>` sharded
  cluster, {+service+} will set the *Project Services Region* based on the
  region that you designated as the first Zone's highest priority
  region.

All {+clusters+} within the same {+service+} project will inherit the
same data processing region as the first Dedicated Tier {+cluster+}. If all
Dedicated Tier {+clusters+} are deleted in the {+service+} project,
{+service+} will reset the *Project Service Region* of that {+service+} project. 

Q: What are the currently available *Project Services Regions*?

Using the above criteria, {+service+} will map the first Dedicated Tier {+cluster+}\'s region or priority region to a specific 
*Project Services Region* as follows:

.. list-table::
   :header-rows: 1 
   :widths: 50 50

   * - First {+cluster+}'s region
     - Project Services Region

   * - AWS / Azure / GCP regions in France
     - AWS Paris (``eu-west-3``)

   * - AWS / Azure / GCP regions in the UK
     - AWS London (``eu-west-2``)

   * - AWS / Azure / GCP regions in the EU (except France) & Middle East & South Africa
     - AWS Ireland (``eu-west-1``)

Q: Which {+service+} services and data cannot be configured to use a
non-US *Project Services Region*?

MongoDB does not regionalize processing for all {+service+} services or all data processed by |service-fullname|. MongoDB will continue to transfer data to meet cloud service operational requirements and
customer support needs for any {+service+} services, features, and data
types not included in the above list, as well as in response to any
customer initiated data transfers.

Examples of services and features for which Atlas does not regionalize data processing include:

- :charts:`Atlas Charts </>`
- Queries for 
  `Atlas Data Lake <https://www.mongodb.com/docs/datalake/>`__, 
  :ref:`{+Online-Archive+} <online-archive-overview>`, and 
  :ref:`{+adf+} <data-federation-overview>`
- Database log & audit log downloads if downloaded via the
  :ref:`{+atlas-admin-api+} <atlas-admin-api>`

  - If the :ref:`Push Logs to AWS S3 bucket <mongodb-logs-push>`
    feature is configured, logs are pushed directly from {+service+}
    {+clusters+} to the customer's S3 bucket without traversing the {+service+} control plane

- Data Explorer and Performance Advisor for :ref:`{+Serverless-instances+} <ref-deployment-types>`


Examples of data that are **not** covered by a non-US 
*Project Services Region*, i.e., that cannot be regionalized, include: 

- {+service+} database names, collection names, shard keys, and indexes
- {+service+} login data used to log into the {+service+} console
- {+service+} database access and network access metadata
- {+service+} support portal data used in customer support cases
- Metadata from {+service+} {+clusters+} (e.g., monitoring data)
- {+service+} application logs

MongoDB ensures that any data transfers are protected by appropriate
security and legal safeguards detailed in our services agreements.

Q: What kinds of data may be in database logs?

The following gives an example of a JSON document and the data stored
in the logs. The keys can be thought of as schema data while
the values are the actual data.

.. code-block:: json

   {
     "key1_string": "value1",
     "key2_number": 1234,
     "key3_array": ["a", "b" ],
     "key4_dict": { subkey1: "subkeyvalue" }
   }

Database log data. The log data contains both schema and actual data / literals:


.. code-block:: json
   :copyable: false

   2023-03-09T13:35:23.446-04:00 I COMMAND  [conn1] command internal.clients
     appName: "MongoDB Shell"
     command: insert {
        insert: "clients",
        documents: [ {
              _id: ObjectId('593adc5b99001b7d119d0c97'),
               "key1_string": "value1",
               "key2_number": 1234,
               "key3_array": ["a", "b" ],
               "key4_dict": { subkey1: "subkeyvalue" }
           } ],
        ordered: true
     }
     ...
