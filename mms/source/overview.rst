MMS (MongoDB Monitoring Service)  documentation.
===============================================

MMS (MongoDB Monitoring Service) is a service created by 10gen
for monitoring MongoDB deployments. The service collects
statistics on all key server and hardware indicators and then
presents the data through an intuitive web interface.
The information can be used to optimize applications during
development and rapidly diagnose problems in production. For sharded
clusters consisting of dozens of nodes, MMS is particularly useful, since
it provides a picture of the system as a whole, allowing administrators
to quickly asses the health of the cluster. Secure, easy to install, and
maintenance-free, MMS is now available to the MongoDB user community at large.

How MMS works
-------------

MMS is enabled by installing a lightweight agent in the server environment.
From there, the MMS agent automatically discovers all MongoDB nodes in the
cluster and then reports on metrics such as memory
usage, ops per second, open connections, CPU load, and I/O activity.
The web interface displays the status of each MongoDB instance, as
well as historical graphs for all metrics. You can create
custom dashboards, perform side-by-side data comparisons, and
review cluster behavior at a wide variety of timescales.

Security
--------

All metrics are transmitted by the agent to the MMS servers over SSL (128-bit
encryption), and agent traffic is exclusively outbound. The monitoring agent is
a Python script, and you're free to examine its source code.
By default, only server metrics are recorded, and collection of hardware and
application data is entirely optional. Naturally, the web interface is secured
over SSL, and extensive data access controls and audits are in place to
ensure the safety of your data.

Installation
------------

MMS can be used with all varieties of MongoDB deployments, hosted on physical
hardware or in the cloud. Install the monitoring agent is quick and simple,
and meaningful results are available through the web interface in minutes. A monitoring
solution you're sure find useful, you can sign up for MMS now at mms.10gen.com.
