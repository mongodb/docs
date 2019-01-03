.. important::

   The ``mongodb`` package provided by |distro-name| is
   **not** maintained by MongoDB Inc. The |package-name| package
   is officially maintained and supported by MongoDB Inc. and
   kept up-to-date with the most recent MongoDB releases. This 
   installation procedure uses the |package-name| package.

   The |distro-name| ``mongodb`` package conflicts with the 
   MongoDB Inc. |package-name| package. Run 
   ``sudo apt list --installed | grep mongodb`` to check if the
   ``mongodb`` package is already installed on the system.
   Use ``sudo apt remove mongodb`` and ``sudo apt purge mongodb``
   to completely remove and purge the ``mongodb`` package before 
   attempting this procedure.
