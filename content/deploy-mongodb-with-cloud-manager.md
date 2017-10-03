+++
title = "Deploy MongoDB with Cloud Manager"

tags = [
"cloud-manager",
"deploy",
"cluster" ]
+++

# Deploying MongoDB with Cloud Manager

This tutorial describes how to use Cloud Manager to deploy MongoDB
on the Amazon Web Services (AWS), Google Cloud Platform (GCP), and Microsoft
Azure cloud platforms. The tutorial assumes that you want want the 
Automation Agent to manage the other agents and the MongoDB deplooyment.
See [Automation](https://docs.cloudmanager.mongodb.com/application/#automation)
for an overview of how Cloud Manager Automation maintains MongoDB deployments.

## Prerequisites

The tutorial assumes the following:

*  You have an AWS, GCP, or Azure account and have
   launched and can use ``ssh`` to log in to the virtual servers that will
   host your MongoDB deployment.

* You have already created an organization in Cloud Manager to which you
  can add new projects. See [Create an Organization](https://docs.cloudmanager.mongodb.com/tutorial/manage-organizations/#create-an-organization)
  for instructions.


## Procedure

The following procedure describes how to install and start the Automation
Agent on the virtual servers on your cloud platform. When you finish the
procedure, the Automation Agent will automatically install the remaining
agents and a MongoDB deployment on your virtual servers.

### Create a Project

Use the following procedure to create a project and, optionally, add
members to your new project. 

1. Log in to [Cloud Manager](https://www.mongodb.com/cloud).

2. Click your organization in **Context**, then click **+ New Project**.

3. Select **Cloud Manager** in **Select Cloud Service**.

4. Click **Next**.

5. Enter a name for your project.

6. Click **Next**.

7. (Optional) Add members to your project. Repeat the following procedure
   for each person that you want to add.

    a. Enter an email address in the **Add Members and Set Permssions**.

    b. Select the email address in **NEW USER**.

    c. Select a project role for the new member.  See [Project Roles](https://docs.cloudmanager.mongodb.com/reference/user-roles/#user-admin-role)
    for more information about Cloud Manager project roles.

8. Click **Create Project**.

See [Projects](https://docs.cloudmanager.mongodb.com/tutorial/manage-projects/)
for more information about Cloud Manager projects.


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
   where Cloud Manager will store data on your virtual servers.  By default,
   Cloud Manager stores your data in`/data`.

7. Click **Continue**.

8. (Optional) Click **Yes** if you want Cloud Manager to back up your data for you.
   Alternatively, click **No** to manage your own backups.

See [Manage Deployments](https://docs.cloudmanager.mongodb.com/tutorial/nav/monitor-and-manage/)
for more information about managing MongoDB deployments with Cloud Manager.


### Install and Run the Automation Agents

Use the following procedure to install and run the Automation Agent on 
each virtual server in your cluster:

1. Use `ssh` to log in to a virtual server in your cluster.

2. In Cloud Manager, click **Install Agent** and select the operating
   system running on your virtual server.

3. Follow the steps in the Automation Agent Installation Instructions modal
   for the selected operating system.
   
4. Click **Verify Agent**.

Repeat the procedure for each virtual server in your cluster. See
[Install or Update the Automation Agent](https://docs.cloudmanager.mongodb.com/tutorial/nav/install-automation-agent/)
for operating system specific instructions to install the Automation Agent.


### Deploy MongoDB

Once Cloud Manager verifies that the Automation Agent is running on all
of your virtual servers, you can instruct the agent to install the Monitoring
Agent, the Backup Agent, and the MongoDB deployment.

1. In Cloud Manager, click **Continue** after verifying that the Automation Agent is
   running on all virtual servers in your cluster.

2. (Optional) On the **Review and Deploy** page, drag and drop MongoDB
   processes between virtual servers to customize your deployment.

3. Click **Deploy**.

## Next Steps

You should secure your MongoDB deployment after you deploy it. 

* See [Enable Authentication for a Cloud Manager Project](https://docs.cloudmanager.mongodb.com/tutorial/nav/security-enable-authentication/)
  for information about enabling authentication for your
  MongoDB project.

* See [Enable SSL for a Deployment](https://docs.cloudmanager.mongodb.com/tutorial/nav/security-enable-authentication/)
  for instructions on how to enable SSL connections for MongoDB deployments
  managed by Cloud Manager.

