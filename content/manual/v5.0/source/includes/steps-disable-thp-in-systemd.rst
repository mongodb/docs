.. procedure:: 
   :style: normal

   .. step:: Create the ``systemd`` unit file

      Create the following file and save it at 
      ``/etc/systemd/system/disable-transparent-huge-pages.service``:

      .. code-block:: sh

         [Unit]
         Description=Disable Transparent Hugepages (THP)
         DefaultDependencies=no
         After=sysinit.target local-fs.target
         Before=mongod.service
         
         [Service]
         Type=oneshot
         ExecStart=/bin/sh -c 'echo never | tee /sys/kernel/mm/transparent_hugepage/enabled > /dev/null && echo never | tee /sys/kernel/mm/transparent_hugepage/defrag > /dev/null'
         
         [Install]
         WantedBy=basic.target
      
      .. note:: 
        
         Some versions of Red Hat Enterprise Linux, and potentially other Red 
         Hat-based derivatives, use a different path for the THP ``enabled`` 
         file:

         .. code-block:: bash

            /sys/kernel/mm/redhat_transparent_hugepage/enabled 
            
         Verify which path is in use on your system and update the 
         ``disable-transparent-huge-pages.service`` file accordingly.
      
   .. step:: Reload ``systemd`` unit files 
    
      To reload the ``systemd`` unit files and make 
      ``disable-transparent-huge-pages.service`` available for use, run the 
      following command :

      .. code-block:: sh 

         sudo systemctl daemon-reload

   .. step:: Start the service 
    
      Run:

      .. code-block:: sh 
          
         sudo systemctl start disable-transparent-huge-pages
         
      To verify that the relevant THP settings have changed, run the
      following command:

      .. code-block:: sh 
         :copyable: true

         cat /sys/kernel/mm/transparent_hugepage/enabled && cat /sys/kernel/mm/transparent_hugepage/defrag

      On Red Hat Enterprise Linux and potentially other Red Hat-based 
      derivatives, you may instead need to use the following:

      .. code-block:: sh
        
         cat /sys/kernel/mm/redhat_transparent_hugepage/enabled && cat /sys/kernel/mm/redhat_transparent_hugepage/defrag 

      The output should resemble the following: 

      .. code-block:: bash
         :copyable: false 

         never
         never

   .. step:: Configure your operating system to run it on boot
    
      To ensure that this setting is applied each time the operating system 
      starts, run the following command:

      .. code-block:: sh
        
         sudo systemctl enable disable-transparent-huge-pages

   .. step:: (*Optional*) Customize tuned or ktune profile 
  
      If you use ``tuned`` or ``ktune`` profiles on 
      :abbr:`RHEL (Red Hat Enterprise Linux)`/ CentOS, you must also create 
      a custom ``tuned`` profile.
