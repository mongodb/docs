+++
title = "Deploy MongoDB with Ops Manager"

tags = [
"ops-manager",
"deploy",
"cluster" ]
+++

# Deploying MongoDB with Ops Manager

This tutorial describes how to use Ops Manager to deploy MongoDB
on the Amazon Web Services (AWS), Google Cloud Platform (GCP), and Microsoft
Azure cloud platforms. The tutorial assumes that you want want the 
Automation Agent to manage the other agents and the MongoDB deployment.
See [Automation](https://docs.opsmanager.mongodb.com/current/application/#automation)
for an overview of how Ops Manager Automation maintains MongoDB deployments.

## Prerequisites

The tutorial assumes the following:

*  You have an AWS, GCP, or Azure account and have
   launched and can use ``ssh`` to log in to the virtual servers that will
   host your MongoDB deployment.

* You have already created a group in Ops Manager to which you
  can add a deployment. See [Create a Group](https://docs.opsmanager.mongodb.com/current/tutorial/create-group/)
  for instructions.


## Procedure

The following procedure describes how to install and start the Automation
Agent on the virtual servers on your cloud platform. When you finish the
procedure, the Automation Agent will automatically install the remaining
agents and MongoDB on your virtual servers.


### Build a MongoDB Deployment

Use the following procedure to build a MongoDB deployment:

1. On the Deployment page, click **Build New**.

2. Click **Deploy In Other Remote.**

3. Click **Create Replica Set** to build a new replica set.
   Alternatively, click **Create Sharded Cluster** to build a new sharded
   cluster.

4. In **Replica Set Name**, enter a name for your replica set.

5. In **Number of Nodes**, select the number of virtual servers in your cluster.

6. (Optional) In **Data Directory Prefix**, enter the directory name
   where Ops Manager will store data on your virtual servers.  By default,
   Op Manager stores your data in`/data`.

7. Click **Continue**.

8. (Optional) Click **Yes** if you want Ops Manager to back up your data for you.
   Alternatively, click **No** to manage your own backups.

See [Manage Deployments](https://docs.opsmanager.mongodb.com/current/tutorial/nav/monitor-and-manage/)
for more information about managing MongoDB deployments with Ops Manager.


### Install and Run the Automation Agents

Use the following procedure to install and run the Automation Agent on 
each virtual server in your cluster:

1. Use ``ssh`` to log in to a virtual server in your cluster.

2. In Ops Manager, click **Install Agent** and select the operating
   system running on your virtual server.

3. Follow the steps in the Automation Agent Installation Instructions modal
   for the selected operating system.
   
4. Click **Verify Agent**.

Repeat the procedure for each virtual server in your cluster. See
[Install or Update the Automation Agent](https://docs.opsmanager.mongodb.com/current/tutorial/nav/install-automation-agent/)
for operating system specific instructions to install the Automation Agent.


### Deploy MongoDB

Once Ops Manager verifies that the Automation Agent is running on all
of your virtual servers, you can instruct the agent to install the Monitoring
Agent, the Backup Agent, and the MongoDB deployment.

1. In Ops Manager, click **Continue** after verifying that the Automation Agent is
   running on all virtual servers in your cluster.

2. (Optional) On the **Review and Deploy** page, drag and drop MongoDB
   processes between virtual servers to customize your deployment.

3. Click **Deploy**.

## Next Steps

You should secure your MongoDB deployment after you deploy it. 

* See [Enable Authentication for a Ops Manager Project](https://docs.opsmanager.mongodb.com/current/tutorial/nav/security-enable-authentication/)
  for information about enabling authentication for a group in your
  organization.

* See [Enable SSL for a Deployment](https://docs.opsmanager.mongodb.com/current/tutorial/enable-ssl-for-a-deployment/)
  for instructions on how to enable SSL connections with MongoDB deployments
  managed by Ops Manager.

