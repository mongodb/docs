New files created in Windows inherit permissions from the
parent folder. Run the following commands to reset
permissions and set read-only permissions for the local
group ``docker-users``: 

.. code-block:: shell

   SET pwpath=.\pwfile

   # Reset permissions to remove explicit permissions
   icacls.exe %pwpath% /reset
   # Grant read-only permissions to docker users group
   icacls.exe %pwpath% /GRANT:R "docker-users:(R)"
   # Disable inheritance and remove inherited permissions
   icacls.exe %pwpath% /inheritance:r  