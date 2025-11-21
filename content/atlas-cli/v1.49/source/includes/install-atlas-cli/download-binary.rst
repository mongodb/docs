Install the {+atlas-cli+}
-------------------------

To install the {+atlas-cli+} by downloading the binary, follow the steps below.

Procedure
~~~~~~~~~

.. procedure::
    :style: normal

    .. step:: Install the {+atlas-cli+}.
    
    a. Download and extract the correct binary for your operating system:

       .. include:: /includes/list-table-atlas-cli-binary-download.rst

       .. note::

          Replace or remove any existing {+mcli+} binaries to prevent
          conflicts between versions.
    
    b. Run the executable file.

       .. step:: (Optional) Add {+atlas-cli+} to your ``PATH``.

          You can run the binary from any directory if you do one of the following:

          1. Add the location of the executable to your ``PATH``.
          #. Move the executable to a directory in your ``PATH``.

          You can accomplish this in several ways, depending on your personal
          settings and environment. Consult the documentation for your shell and
          operating system for more examples.

          .. example::

             In the following example, the user downloads and extracts a
             binary for the {+mcli+} to the 
             ``/atlascli_{+atlas-cli-version+}-macOS_x86_64`` directory. 

             The user then moves the executable file to a directory already in
             their ``PATH``: 

             .. code-block:: sh

                cd atlascli_{+atlas-cli-version+}-macOS_x86_64
                mv atlas /usr/local/bin

    .. include:: /includes/steps-verify-atlas-cli.rst

Update the {+atlas-cli+}
------------------------

Follow These Steps
~~~~~~~~~~~~~~~~~~

.. procedure::
   :style: normal

   .. step:: Update the {+atlas-cli+}.

      a. Remove any existing {+atlas-cli+} binaries to prevent version
         conflicts.
      
      b. Download and extract the correct binary for your operating
         system:
      
         .. include:: /includes/list-table-atlas-cli-binary-download.rst

      c. Run the executable file.

   .. include:: /includes/steps-verify-update-atlas-cli.rst
