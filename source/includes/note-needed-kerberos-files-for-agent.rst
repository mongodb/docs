Two Kerberos-related files must be installed on any host running the
Monitoring or Backup Agent: 

- Create or configure the 
  `krb5.conf <https://web.mit.edu/kerberos/krb5-1.12/doc/admin/conf_files/krb5_conf.html>`_ 
  Kerberos configuration file.

  .. list-table::
     :widths: 20 30 50
     :header-rows: 1

     * - Platform

       - Default Path
         
       - Notes

     * - Linux
       
       - ``/etc/krb5.conf``
       
       - 

     * - Mac OS X
       
       - ``/etc/krb5.conf`` (10.7+)
        
       - The configuration file has varied with previous versions of
         Mac OS X. Refer to the documentation for your Kerberos
         implemention for your version of Mac OS X to find out where
         the Kerberos configuration file is stored.

     * - Windows
       
       - ``%WINDIR%\krb5.ini``
       
       - This is the default path for non-Active Directory-based
         Kerberos implementations. Refer to the documentation for your
         Kerberos implemention for your version of Windows to find out
         where the Kerberos configuration file is stored.
       

- Make sure `kinit <http://web.mit.edu/KERBEROS/krb5-devel/doc/user/user_commands/kinit.html>`_ 
  binary is located at ``/usr/bin/kinit``. ``kinit``
  obtains or renews a Kerberos ticket-granting ticket, which
  authenticates the agent using Kerberos.

  .. note::
     This file and location may be different on Windows or Mac OS X
     clients. Refer to the documentation for your Kerberos implemention
     to find out where the Kerberos ticket management binary is stored.