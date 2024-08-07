.. procedure:: 
   :style: normal 

   .. step:: Create the ``init.d`` script 
    
      Create the following file and save it at 
      ``/etc/init.d/enable-transparent-hugepages``:

      .. code-block:: sh
        
         #!/bin/bash
         ### BEGIN INIT INFO
         # Provides:          enable-transparent-hugepages
         # Required-Start:    $local_fs
         # Required-Stop:
         # X-Start-Before:    mongod mongodb-mms-automation-agent
         # Default-Start:     2 3 4 5
         # Default-Stop:      0 1 6
         # Short-Description: Enable Linux Transparent Hugepages
         # Description:       Enable Linux Transparent Hugepages, to improve
         #                    database performance.
         ### END INIT INFO

         case $1 in
           start)
             if [ -d /sys/kernel/mm/transparent_hugepage ]; then
               thp_path=/sys/kernel/mm/transparent_hugepage
             elif [ -d /sys/kernel/mm/redhat_transparent_hugepage ]; then
               thp_path=/sys/kernel/mm/redhat_transparent_hugepage
             else
               return 0
             fi

             echo 'always' | tee ${thp_path}/enabled > /dev/null && echo defer+madvise | tee ${thp_path}/defrag > /dev/null && echo 0 | tee ${thp_path}/khugepaged/max_ptes_none > /dev/null && echo 1 | tee /proc/sys/vm/overcommit_memory > /dev/null'

             unset thp_path
             ;;
         esac

   .. step:: Make the script executable
    
      Run:

      .. code-block:: sh 
        
         sudo chmod 755 /etc/init.d/enable-transparent-hugepages

   .. step:: Run the script 
    
      Run:

      .. code-block:: sh 
        
         sudo /etc/init.d/enable-transparent-hugepages start

      To verify that the relevant THP settings have changed, run the
      following command:
      
      .. code-block:: sh 
        
         cat /sys/kernel/mm/transparent_hugepage/enabled && cat /sys/kernel/mm/transparent_hugepage/defrag && cat /sys/kernel/mm/transparent_hugepage/khugepaged/max_ptes_none && cat /proc/sys/vm/overcommit_memory
         
      On Red Hat Enterprise Linux and potentially other Red Hat-based
      derivatives, you may instead need to use the following:
      
      .. code-block:: sh 
        
         cat /sys/kernel/mm/redhat_transparent_hugepage/enabled

      The output should resemble the following: 

      .. code-block:: bash
         :copyable: false 

         always 
         defer+madvise
         0
         1

   .. step:: Configure your operating system to run it on boot 
    
      To ensure that this setting is applied each time the operating sytem 
      starts, run the following command for your Linux distribution:

      .. list-table::
         :header-rows: 1
         :widths: 20 80

         * - Distribution

           - Command

         * - Ubuntu and Debian

           - .. code:: sh

                sudo update-rc.d enable-transparent-hugepages defaults

         * - SUSE

           - .. code:: sh

                sudo insserv /etc/init.d/enable-transparent-hugepages

         * - Red Hat, CentOS, Amazon Linux, and derivatives

           - .. code:: sh

                sudo chkconfig --add enable-transparent-hugepages


   .. step:: (*Optional*) Customize tuned or ktune profile 
    
      If you are using ``tuned`` or ``ktune`` profiles on 
      :abbr:`RHEL (Red Hat Enterprise Linux)`/ CentOS, you must also create 
      a custom ``tuned`` profile.
