.. note:: Generate a CMK from the Command Line

   Use the following command to generate a {+cmk-abbr+}
   from a Unix shell or PowerShell:

   - Unix shell: ``echo $(head -c 96 /dev/urandom | base64 | tr -d '\n')``
   - PowerShell: ``$r=[byte[]]::new(64);$g=[System.Security.Cryptography.RandomNumberGenerator]::Create();$g.GetBytes($r);[Convert]::ToBase64String($r)``

   Save the output of the preceding command to a file named
   ``master-key.txt``.
