The following Kerberos configuration files are required on any host
running {+magent+} or {+bagent+}:

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

     * - Windows

       - ``%WINDIR%\krb5.ini``

       - This is the default path for non-Active Directory-based
         Kerberos implementations. See the documentation for your
         Kerberos implementation to locate the Kerberos configuration
         file for your version of Windows.
       

- On Linux systems, ensure the
  `kinit <http://web.mit.edu/KERBEROS/krb5-devel/doc/user/user_commands/kinit.html>`_
  binary is located at ``/usr/bin/kinit``. ``kinit`` obtains or
  renews a Kerberos ticket-granting ticket, which authenticates
  the Agent using Kerberos.
