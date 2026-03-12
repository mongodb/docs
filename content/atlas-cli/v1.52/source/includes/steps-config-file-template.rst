Follow these steps to |action| with a configuration file:

.. procedure::
   :style: normal

   .. step:: Copy the sample request for |openapi-link|.

      a. Navigate to the |openapi-link|
         section of the |service| Admin API specification.
      b. Under :guilabel:`Request samples` on the right side, click
         :guilabel:`Expand all`.
      c. Click :guilabel:`Copy` to copy the sample request.

   .. step:: Create the configuration file.
    
      a. Paste the sample request into a text editor and change
         the values to reflect your desired configuration.
      b. Save the file with a ``.json`` extension.

   .. step:: Run the |atlas-cli command| command with 
      the ``--file`` option.

      Specify the path to the file you saved with the ``--file`` flag.

