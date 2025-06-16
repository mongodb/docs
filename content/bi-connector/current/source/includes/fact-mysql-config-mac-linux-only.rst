.. note::

   This example assumes that the authentication plugin file
   ``mongosql_auth.so`` is located in the default MySQL plugin folder.
   The location of the plugin folder varies by platform, but you can
   locate it by running the following command:

   
   .. code-block:: sh

      mysql_config --plugindir

   ``mysql_config.pl`` can find the plugin directory only on macOS and 
   Linux hosts.