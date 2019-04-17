|service| disables actions not available to any cluster
version in your project. Custom roles are defined at the
project level, and must be compatible with each MongoDB
version used by your project's clusters.

.. example::

   If you have a cluster in your project with MongoDB 3.4, you
   cannot create a custom role that uses actions introduced in
   MongoDB 3.6. |service| explicitly marks actions only
   available in MongoDB 3.6 and greater in the
   :guilabel:`Custom Role` dialog.