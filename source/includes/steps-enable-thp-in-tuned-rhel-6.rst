.. procedure:: 
   :style: normal 

   .. step:: Create a new profile 
    
      To create a new profile from an existing profile, copy the relevant 
      directory. The following example uses the ``virtual-guest`` profile as 
      the base, and uses ``virtual-guest-thp`` as the new profile:
      
      .. code-block:: sh
        
         sudo cp -r /etc/tune-profiles/virtual-guest /etc/tune-profiles/virtual-guest-thp

   .. step:: Edit ``ktune.sh``
    
      Edit ``/etc/tune-profiles/virtual-guest-thp/ktune.sh`` and change the 
      ``set_transparent_hugepages`` setting as follows:
    
      .. code-block:: cfg 
        
         set_transparent_hugepages always

   
   .. step:: Enable the new profile
      
      Enable the new profile:
    
      .. code-block:: sh 
         
         sudo tuned-adm profile virtual-guest-thp
