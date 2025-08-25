Realm Backend Tutorial
======================

Hi! My name is ...., and I'm an engineer here at MongoDB. 

We've created a series of tutorials that guide you through building a Task Tracker 
app. All of the tutorials share a common Realm backend, and this walk-through, 
we'll set up that backend app. This video follows the steps in the written tutorial, 
so you can follow along as I walk through it.

There are five steps in this tutorial: we'll start by creating an Atlas account,
set up a free Atlas cluster to hold our data, install the Realm 
command line tools, set up permissions for those CLI tools, and finally upload a 
pre-configured Atlas App Services backend. 

So let's get started.

.. <time tag 1>

We're going to create a new Atlas account. If you already have an Atlas 
account, you can skip ahead to the next section.

First, open your browser and go to account.mongodb.com.

On the login page, click ``Sign Up``.  On the next page, you can 
enter in your information, or -- if you already have a Google account -- you can 
save time by logging in with that account. I'm going to go ahead and do that:

.. <time tag 2>

Now that we have an account, let's set up a cluster. An Atlas cluster is a 
MongoDB database that is hosted on one of the cloud providers -- Microsoft Azure, 
Google Cloud Platform, or Amazon Web Services. For this demo, we'll set up a free Atlas cluster in 
AWS.

In the ``Shared`` section, click ``Create``.
The default settings will create a cluster in an AWS M0 sandbox running on servers 
in Virginia. The cluster will run the latest version of MongoDB and the name of the 
cluster will be "Cluster0." You can leave everything on this page at the default 
settings and then click ``Create Cluster``. 

.. You'll note that I changed the location ... maybe I'll re-record this to keep it simple.

It takes one to three minutes to set up the cluster, after which the Atlas page 
refreshes. While the cluster is being set up, we can install the Realm CLI -- 
the command-line tools that we'll use to simplify the backend setup. 

.. <time tag 3>

First, open a terminal window.
Type in ``npm install -g mongodb-realm-cli`` and hit enter. This command uses 
``npm`` to globally install the Realm CLI, so you can run it from any location.
When the installation is complete, return to the Atlas web page.

When the cluster creation is complete, you will see "Cluster0" listed. Near the 
top of the page, find the ``Access Manager`` menu. Click on that, and then choose 
``Project Access``. 
Click on the ``API Keys`` tab, and then click on this ``Create API Key`` button.

For the Description, let's add a name that will remind us -- and others -- why 
this key was created. I'll type in ``API Key for Realm CLI``. 

For Project Permissions, we want to give the CLI tools Project Owner permissions 
and remove the read-only permissions.

Click Next to create the new API key.

This next screen shows us the new key pair that's been created -- the public key 
and private key. This is the last time we'll see the private key, so copy 
it now and save it somewhere that you can find later...but not in a public place
like a screencast that will be shared with the world.

Finally, click ``Add Access List Entry``. This opens a dialog that allows us  
to restrict access to one or more IP addresses, so even if someone got a hold of 
the private key, they wouldn't be able to access your cluster unless the computer 
they are on uses one of the allowed API keys. 

In the ``Add Access List Entry`` dialog, click the ``Use Current IP Address`` 
button, and you'll see your current IP address added. Click Save.

Note that this restricts access to the IP address you are on right now. If you 
will be working on this tutorial from multiple locations, you need to specify 
a range of IP addresses by using CIDR notation. If you need to, pause this video 
and look up CIDR notation -- there are several online tools in which 
you can enter the range of IP addresses you need to support and get the 
appropriate CIDR notation to enter here. 

Click ``Save``, and then click ``Done``. You are now ready to use the CLI tools.

.. <time tag 4>

Switch back to your terminal window, and type in the ``realm-cli login`` command. 
I've chosen to copy-and-paste the command from the tutorial. And since 
I copied my keys into a VS Code window, I'll paste those in as I enter the 
command.

If you enter everything correctly, you'll see this nice message:
.. (on screen, no need to say it)

.. <time tag 5>

The last part of this tutorial is using these CLI tools to import a pre-built 
Realm backend app, greatly simplifying the time it takes to set it up. So let's 
download that app configuration and upload it to our Realm cluster.

First, we'll use ``git`` to download the app configuration. I'm going to make 
a new directory to store these files and switch to it.

From this directory, let's clone the git directory. This command is 
in the written part of the tutorial and it might be easier to copy-and-paste it 
from there, rather than try to copy from this screencast. In the tutorial text, 
search for ``mongodb-university/realm-tutorial-backend`` to get the git command.

.. git clone https://github.com/mongodb-university/realm-tutorial-backend.git

We now have a directory named ``realm-tutorial-backend``. Let's switch to that, 
and we're ready to import this app to our cluster. 

Run the ``realm-cli push``command to create a new Realm backend app based on 
the cloned configuration files. When the push is complete, you'll see the message 
"Successfully pushed app up". 

Let's switch back to our browser. Click on the ``Realm`` tab, and you'll see we 
now have a new realm app named "tasktracker". Click on the name to open the 
management console for the app.

.. <time tag 6>

Spend some time looking around. Here are a few things you can explore to make 
sure the app imported correctly:

- The ``Schema`` section of the Realm UI displays information about the structure 
  of the data stored in our linked Atlas cluster. We're using 2 objects in 
  this tutorial -- Tasks and Users. Click on each and you can see the data 
  structure defined for each type.

- In ``Authentication``, you'll see the different ways that users can log into a 
  Realm app. For the Task Tracker app, users can only log in via 
  Email/Password authentication.

- The ``Sync`` section shows us how Sync has been configured, and what the partition
  key is. You'll learn more about this as you build the front-end.

- The ``Functions`` section contains the Task Tracker app's executable backend logic.

- The ``Triggers`` section shows one trigger, which defines certain 
    criteria that, when met, execute a function.

Take a look at the last section of the tutorial for details on what you're seeing 
in each of these sections. 

You're now ready to work on a client-specific front end! 








