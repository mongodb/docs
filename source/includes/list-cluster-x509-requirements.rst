- Cluster member configuration must specify a non-empty value for 
  at least one of the attributes used for authentication. By default, MongoDB accepts:

  - the Organization (``O``)
  - the Organizational Unit (``OU``)
  - the Domain Component (``DC``)

  You can specify alternative attributes to use for authentication by
  setting :setting:`net.tls.clusterAuthX509.extensionValue`.

- Cluster member configuration must include the same
  :setting:`net.tls.clusterAuthX509.attributes` and use matching values.
  Attribute order doesn't matter. The following example sets ``O`` and
  ``OU``, but not ``DC``:

  .. code-block:: yaml

      net:
        tls:
          clusterAuthX509:
            attributes: O=MongoDB, OU=MongoDB Server

