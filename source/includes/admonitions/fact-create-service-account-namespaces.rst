.. important::

  You must create a service account 
  ``mongodb-enterprise-database-pods`` in each namespace the 
  |k8s-op-short| watches other than the default to create 
  |k8s-mdbrsc| in these namespaces:

  .. code-block:: sh
      
      kubectl create serviceaccount mongodb-enterprise-database-pods -n <namespace>