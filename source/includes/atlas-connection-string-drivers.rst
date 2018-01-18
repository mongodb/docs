1. Click the :guilabel:`Connect` button from the :guilabel:`Clusters`
   view.
2. Verify the IP address added earlier appears under the
   :guilabel:`Check the IP Whitelist` section. You may also
   add additional IP addresses via the :guilabel:`Add Entry`
   button.
3. Click :guilabel:`Connect Your Application`.
4. Specify which driver version you are using for the
   :guilabel:`Copy a connection string` section.
5. Copy the :ref:`URI Connection String<mongodb-uri>` to the
   clipboard.
6. Paste the clipboard contents into your preferred text editor and
   replace ``<PASSWORD>`` with the password for the user created
   earlier. The sample connects to the ``test`` database
   which the following examples use. If you wish to connect
   to a different database, change ``test`` to whichever
   database you wish to connect to.

   .. include:: /includes/atlas-connection-string-user.rst

7. Copy the modified connection string to the clipboard.
