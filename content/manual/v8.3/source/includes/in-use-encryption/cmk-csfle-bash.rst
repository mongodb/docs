.. tip:: Generate a CMK from the Command Line

   Use the following command to generate a {+cmk-abbr+}
   from a Unix shell or PowerShell:

   - Unix/macOS shell:

     .. code-block:: sh

        echo $(head -c 96 /dev/urandom | tr -d '\n')

   - PowerShell:

     .. code-block:: none

        $r=[byte[]]::new(96);$g=[System.Security.Cryptography.RandomNumberGenerator]::Create();$g.GetBytes($r);$r

   Save the output of the preceding command to a file named ``master-key.txt``.