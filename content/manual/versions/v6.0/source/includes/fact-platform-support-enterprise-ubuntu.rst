.. note:: EOL Notice

   - MongoDB 5.0 Enterprise Edition removes support for
     Ubuntu 16.04 on :ref:`x86_64 <prod-notes-supported-platforms-x86_64>`

   - MongoDB 5.0 Enterprise Edition removes support for
     Ubuntu 18.04 on :ref:`s390x <prod-notes-supported-platforms-s390x>`

   - MongoDB 5.0 Enterprise Edition removes support for
     Ubuntu 18.04 on :ref:`PPC64LE
     <prod-notes-supported-platforms-PPC64LE>`

MongoDB {+version+} Enterprise Edition supports the following
:red:`64-bit` Ubuntu LTS (long-term support) releases on 
:ref:`x86_64 <prod-notes-supported-platforms-x86_64>` architecture:

- 22.04 :abbr:`LTS (Long Term Support)` ("Jammy") (Starting in MongoDB 6.0.4)

- 20.04 :abbr:`LTS (Long Term Support)` ("Focal")

- 18.04 :abbr:`LTS (Long Term Support)` ("Bionic")

MongoDB only supports the 64-bit versions of these platforms. To
determine which Ubuntu release your host is running, run the following
command on the host's terminal:

.. code-block:: bash
    
   cat /etc/lsb-release

MongoDB {+version+} Enterprise Edition on Ubuntu also supports the
:ref:`ARM64 <prod-notes-supported-platforms-ARM64>` architecture on
select platforms.

See :ref:`prod-notes-supported-platforms` for more information.
