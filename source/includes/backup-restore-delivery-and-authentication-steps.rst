Select Destination for the Snapshot
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Select the :guilabel:`Delivery Method`:

   - Select ``Pull via Secure HTTP (HTTPS)`` to download the snapshot
     yourself. This option creates a **one-time** direct download link.

     **or**

   - Select ``Push via Secure Copy (SCP)`` to have |backup| download
     the snapshot. You can grant access by supplying MMS with a
     username and password to your server, or you can provide a
     username and grant access via SSH public key.
     
     To grant access via SSH public key,
     
     #. Go to the MMS "Settings" page, and select :guilabel:`Public Key
        for SCP Restores`.
        
     #. Input a passphrase, and click on :guilabel:`Generate a New
        Public Key`. |backup| will generate and display a
        public key.

     #. Log in to your server using the same username you will supply
        in your restore request.

     #. Add your public key to the authorized hosts file for
        that user, generally found at ``/.ssh/authorized_keys``.

     .. note::

        For security reasons, you should remove this public key from
        the authorized hosts file once you have obtained your backup
        file.

#. Click :guilabel:`Authenticate`.

Authenticate
~~~~~~~~~~~~

#. Click the :guilabel:`Send auth code` to receive the
   authentication code via text.

#. Once you receive the authentication code on the number
   specified during registration, enter the code in the
   :guilabel:`Auth code` field.

#. Click on :guilabel:`Finalize Request`.

Backup Delivery
~~~~~~~~~~~~~~~

For replica sets, you will receive one .tar.gz file containing your
data; for sharded clusters, you will receive a series of .tar.gz
files.

.. todo: document what to do with the .tar.gz files once BRS-588 is complete.

