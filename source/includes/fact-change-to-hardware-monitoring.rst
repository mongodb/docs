.. important::

   |mms| provides native hardware monitoring for MongoDB processes 
   managed using {+aagent+} version 2.7.0 or later.

   - Managed MongoDB processes report hardware monitoring data if  
     {+aagent+} 2.7.0+ is installed. 

   - Unmanaged MongoDB processes report hardware monitoring data 
     through ``munin-node`` if it is installed. As hardware monitoring 
     support has been added to the {+aagent+}, support for ``munin-node`` is deprecated.
