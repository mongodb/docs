.. important::

   Some |service| clusters on |azure| created before 10/16/2020 use
   |azure| networking hardware that is incompatible with {+az-pl+}. You
   can still configure {+az-pl+} for |service| projects with these
   clusters to use with supported clusters in the project, but you will
   not be able to connect to the incompatible ones through {+az-pl+}. 

   All new |service| clusters are compatible with {+az-pl+}. If you must
   connect to your cluster using only {+az-pl+}, you can create a new
   cluster in the same |service| project and :doc:`migrate your data </import/live-import>`.
