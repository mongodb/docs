Select Destination for the Snapshot
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Select the :guilabel:`Delivery Method`:

   - Select ``Pull via Secure HTTP (HTTPS)`` to download the snapshot
     yourself. This option creates a **one-time** direct download link.

     **or**

   - Select ``Push via Secure Copy (SCP)`` to have the Service download
     the snapshot. You can grant access by supplying 10gen with a
     username and password to your server, or you can provide a
     username and grant access via SSH public key.
     
     To grant access via SSH public key,
     
     1. Go to the MMS "Settings" page, and select "Backup and
        Restore Public Key."

     2. Input a passphrase, and click on "Generate a New Public Key". 
        Your public key will be generated, and displayed onscreen.

     3. Log in to your server using the same username you will supply
        in your restore request.

     4. Add your public key to the authorized hosts file for
        that user, generally found at ``/.ssh/authorized_keys``.

     .. note::

        For security reasons, you should remove this public key from
        the user's authorized hosts file once the snapshot has been
        transmitted.


#. Click :guilabel:`Authenticate`.

Authenticate
~~~~~~~~~~~~

#. Click the :guilabel:`Send auth code` to receive the
   authentication code via text.

#. Once you receive the authentication code on the number
   specified during registration, enter the code in the
   :guilabel:`Auth code` field.

#. Click on :guilabel:`Finalize Request`.
