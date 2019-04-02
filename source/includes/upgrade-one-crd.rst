1. After you upgrade the |k8s-op-short|, verify you have four CRDs by
   running the following command:
   
   .. code-block:: sh

      kubectl get crds

   The following output contains the new ``mongodb.mongodb.com`` CRD and
   the version 0.9 CRDs:

   .. code-block:: sh
      :copyable: false

      NAME                                 CREATED AT
      mongodb.mongodb.com                  2019-03-27T19:30:09Z
      mongodbreplicasets.mongodb.com       2018-12-07T18:25:42Z
      mongodbshardedclusters.mongodb.com   2018-12-07T18:25:42Z
      mongodbstandalones.mongodb.com       2018-12-07T18:25:42Z

#. Remove the old resources from Kubernetes.

   .. important::

      Removing MongoDB resources will remove the database server pods
      and drop any client connections to the database. Connections are
      reestablished when the new MongoDB resources are created in
      Kubernetes.

   Run each of the following commands to remove all MongoDB resources:
      
   .. code-block:: sh

      kubectl delete mst --all

   .. code-block:: sh

      kubectl delete mrs --all

   .. code-block:: sh

      kubectl delete msc --all

   .. note::

     MongoDB resources that have ``persistent: true`` set in their
     ``.yaml`` configuration file will not lose data as it is stored in
     persistent volumes. The previous command only deletes pods
     containing MongoDB and not the persistent volumes containing the
     data. Persistent volume claims referencing persistent volumes stay
     alive and are reused by the new MongoDB resources.

#. Create the MongoDB resources again.

   Use the ``.yaml`` resource configuration file to recreate each
   resource:

   .. code-block:: sh

      kubectl apply -f <resource-conf>.yaml

   .. note::

      If the old resources had ``persistent: true`` set and the
      ``metadata.name`` haven't changed, the new MongoDB pods will
      reuse the data from the old pods.

   Run the following command to check the status of each resource and
   verify that the ``phase`` reaches the ``Running`` status:

   .. code-block:: sh

      kubectl get mdb <resource-name> -n <namespace> -o yaml -w

   For an example of this command's output, see
   :ref:`get-resource-status`.

| \ 

4. Delete the old CRDs.

   Once all the resources are up and running, delete all of the v0.9
   CRDs as the |k8s-op-short| no longer watches them:

   .. code-block:: sh

      kubectl delete crd mongodbreplicasets.mongodb.com

   .. code-block:: sh

      kubectl delete crd mongodbshardedclusters.mongodb.com

   .. code-block:: sh

      kubectl delete crd mongodbstandalones.mongodb.com
      
   Run the following command to verify the old CRDs were removed:
   
   .. code-block:: sh

      kubectl get crds
  
   The output of the command above should look similar to the following:

   .. code-block:: sh
      :copyable: false

      NAME                  CREATED AT
      mongodb.mongodb.com   2019-03-27T19:30:09Z
