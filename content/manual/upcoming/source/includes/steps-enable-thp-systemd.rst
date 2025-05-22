.. procedure:: 
   :style: normal

   .. step:: Create the ``systemd`` unit file

      Create the following file and save it at 
      ``/etc/systemd/system/enable-transparent-huge-pages.service``:

      .. code-block:: sh

         [Unit]
         Description=Enable Transparent Hugepages (THP)
         DefaultDependencies=no
         After=sysinit.target local-fs.target
         Before=mongod.service
         
         [Service]
         Type=oneshot
         ExecStart=/bin/sh -c 'echo always | tee /sys/kernel/mm/transparent_hugepage/enabled > /dev/null && echo defer+madvise | tee /sys/kernel/mm/transparent_hugepage/defrag > /dev/null && echo 0 | tee /sys/kernel/mm/transparent_hugepage/khugepaged/max_ptes_none > /dev/null && echo 1 | tee /proc/sys/vm/overcommit_memory > /dev/null'
         
         [Install]
         WantedBy=basic.target
      
      .. note:: 
        
         Some versions of Red Hat Enterprise Linux, and potentially other Red 
         Hat-based derivatives, use a different path for the THP ``enabled`` 
         file:

         .. code-block:: bash

            /sys/kernel/mm/redhat_transparent_hugepage/enabled 
            
         Verify which path is in use on your system and update the 
         ``enable-transparent-huge-pages.service`` file accordingly.
      
   .. step:: Reload ``systemd`` unit files 
    
      To reload the ``systemd`` unit files and make 
      ``enable-transparent-huge-pages.service`` available for use, run the 
      following command :

      .. code-block:: sh 

         sudo systemctl daemon-reload

   .. step:: Start the service 
    
      Run:

      .. code-block:: sh 
          
         sudo systemctl start enable-transparent-huge-pages
         
      To verify that the relevant THP settings have changed, run the
      following command:

      .. code-block:: sh 
         :copyable: true

         cat /sys/kernel/mm/transparent_hugepage/enabled && cat /sys/kernel/mm/transparent_hugepage/defrag && cat /sys/kernel/mm/transparent_hugepage/khugepaged/max_ptes_none && cat /proc/sys/vm/overcommit_memory

      On Red Hat Enterprise Linux and potentially other Red Hat-based 
      derivatives, you may instead need to use the following:

      .. code-block:: sh
        
         cat /sys/kernel/mm/redhat_transparent_hugepage/enabled && cat /sys/kernel/mm/redhat_transparent_hugepage/defrag && cat /sys/kernel/mm/redhat_transparent_hugepage/khugepaged/max_ptes_none && cat /proc/sys/vm/overcommit_memory

      The output should resemble the following: 

      .. code-block:: bash
         :copyable: false 

         always 
         defer+madvise
         0
         1

   .. step:: Configure your operating system to run it on boot.
    
      To ensure that this setting is applied each time the operating system 
      starts, run the following command:

      .. code-block:: sh
        
         sudo systemctl enable enable-transparent-huge-pages

   .. step:: (*Optional*) Customize tuned or ktune profile 
  
      If you use ``tuned`` or ``ktune`` proffiles on 
      :abbr:`RHEL (Red Hat Enterprise Linux)`/ CentOS, you must also create 
      a custom ``tuned`` profile.
