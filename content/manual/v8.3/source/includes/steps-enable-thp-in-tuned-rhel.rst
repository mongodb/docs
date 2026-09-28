.. procedure:: 
   :style: normal 

   .. step:: Create a new profile

      Create a new directory to store the custom ``tuned`` profile. The 
      following example inherits from the existing ``virtual-guest`` profile, 
      and uses ``virtual-guest-thp`` as the new profile:

      .. code-block:: sh 
        
         sudo mkdir /etc/tuned/virtual-guest-thp

   .. step:: Edit ``tuned.conf``

      Create and edit ``/etc/tuned/virtual-guest-thp/tuned.conf``. Add the 
      following text:

      .. code-block:: ini 

         [main] 
         include=virtual-guest
         
         [vm]
         transparent_hugepages=always
         
      This example inherits from the existing ``virtual-guest`` profile. Select 
      the appropriate profile for your system.
      
   .. step:: Enable the new profile

      Run:

      .. code-block:: sh
        
         sudo tuned-adm profile virtual-guest-thp
