Specifies whether to force dispatch **all** operations to the host.
If you specify this option, the driver doesn't accept the
SRV connection format. You must use the standard connection URI format
instead. To learn more about the SRV connection
and the standard connection formats, see the :manual:`Connection Strings </reference/connection-string/>`
guide.

The default value is ``false``. This property must be set to ``false`` if you 
specify more than one host name.