Copy all configuration files from your original App, except for
``root_config.json``, to the new App's configuration directory. You
should use the new App's ``root_config.json`` and overwrite any other
configuration files.

.. example::

   .. code-block:: bash

      # Copy all configuration files except for root_config.json
      cp -r myapp myapp-temp
      rm myapp-temp/root_config.json
      cp -r myapp-temp/* myapp-copy
      rm -rf myapp-temp
