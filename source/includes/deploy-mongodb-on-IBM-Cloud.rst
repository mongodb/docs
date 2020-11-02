Step 3 deploy MongoDB
---------------------
  
We will deploy  MongoDB on our cluster 
  
* Click the **Catalog** button on the top 
* Select **Software** from the catalog
* Search for **MongoDB** and click on it

.. image:: /source/images/search.png

* Please select IBM Kubernetes Service

.. image:: /source/images/cluster-select.png

* On the application page Click in the _dot_ next to the cluster, you wish to use

.. image:: /source/images/cluster-choose.png

* Click on  **Enter or Select Namespace** and choose the default Namespace or use a custom one 

.. image:: /source/images/details-namespace.png

* Give a unique **name** to workspace, which you can easily recognize

.. image:: /source/images/details-name.png

* Select which resource group you want to use, it's for access controll and billing purposes. For more information please visit `resource groups <https://cloud.ibm.com/docs/account?topic=account-account_setup#bp_resourcegroups>`_.

.. image:: /source/images/details-resource.png

* Give **tags** to your mongoDB, for more information visit [tags]

.. image:: /source/images/details-tags.png

* Click on **Parameters with default values**, You can set deployment values or use the default ones

.. image:: /source/images/parameters.png

* Please set the MongoDB root password in the parameters

.. image:: /source/images/root-password.png

* Please set an authenticating database in the parameters 

.. image:: /source/images/database.png

* Please set a custom user name

.. image:: /source/images/username.png

* Please set a custom password for the new user 

.. image:: /source/images/password.png

* After finishing everything, **tick** the box next to the agreements and click **install**

.. image:: /source/images/aggreement-create.png

* The MongoDB workspace will start installing, wait a couple of minutes 

.. image:: /source/images/in-progress.png

* Your  MongoDB workspace has been successfully deployed

.. image:: /source/images/done.png
