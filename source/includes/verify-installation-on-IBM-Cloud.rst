 Verify MariaDB installation
 ---------------------------

* Go to `Resources <http://cloud.ibm.com/resources>`_. in your browser 
* Click on **Clusters**
* Click on your Cluster

.. image:: /source/images/resource-select.png

* Now you are at you clusters overview, here Click on **Actions** and **Web terminal** from the dropdown menu


.. image:: /source/images/cluster-main.png


* Click **install** - wait couple of minutes 

.. image:: /source/images/terminal-install.jpg

* Click on **Actions**
* Click **Web terminal** --> a terminal will open up

* **Type** in the terminal, please change NAMESPACE to the namespace you choose at the deployment setup:

::
$ kubectl get ns

.. image:: /source/images/get-ns.png


 ::
$ kubectl get pod -n NAMESPACE -o wide 

.. image:: /source/images/get-pods.png


::
$ kubectl get service -n NAMESPACE

.. image:: /source/images/get-service.png


* Enter your pod with bash , please replace PODNAME with your mariadb pod's name

::
$ kubectl exec --stdin --tty PODNAME -n NAMESPACE -- /bin/bash

.. image:: /source/images/bash.png

* After you are in your pod please enter your username,password and database which you set at the deployment

::
$ mongo -username user -password password -authenticationDatabase database

.. image:: /source/images/welcome.png



You have succesfully deployed MongoDB IBM Cloud! 
