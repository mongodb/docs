.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-processes.rst

   .. step:: Click the :guilabel:`More` drop-down list, and click :guilabel:`Custom Builds`.
      
   .. step:: Click :guilabel:`Add Custom Build`.
      
   .. step:: Complete the :guilabel:`Add Custom Build` form.
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
         :stub-columns: 1
      
         * - Parameter
           - Description
      
         * - Platform
           - The platform on which this build can be installed.
      
             Accepted values are:
      
             - ``Linux (amd64)`` (64-bit Intel architecture Linux)
             - ``Linux (ppc64le)`` (64-bit PowerPC architecture Linux)
             - ``Mac OS X (amd64)`` (64-bit Intel architecture macOS)
      
         * - Version Name
           - Your label for this build. It must begin with a valid MongoDB
             version number.
      
             For example:
      
             .. code-block:: sh

                3.6.2-myCustomBuild
      
         * - Download |url|
           - |url| from which the {+mdbagent+} can download this build.
             This |url| must:
      
             - Be accessible to from your network. It doesn't need to be Internet accessible.
             - Point to a host running an |http|\-compatible web server.
             - Point to the Custom Build binary file.
      
             :gold:`IMPORTANT:` The |application| does not check if
             this |url| exists, only that it is `a complete URL
             <https://www.w3.org/Addressing/URL/url-spec.html>`_.
      
         * - Git Version
           - The complete 40-character ``git`` SHA-1 checksum (or *hash*)
             for this build.
      
             For example:
      
             .. code-block:: sh

                f3fa18bc6d8a749b7a526d83d2ad969fae1236c7
      
         * - Modules
           - If your Custom Build included any add-on modules, enter them
             into this combo box.
      
             Accepted values are:
      
             - None
             - ``subscription``
             - ``enterprise``
      
      Click :guilabel:`Add Custom Build`.
      
      
      The new Custom Build appears on the :guilabel:`Custom Builds` page.
      
      .. note::
      
         After you create a Custom Build, you cannot edit it. You can click
         the :guilabel:`Remove` link to delete it.
      