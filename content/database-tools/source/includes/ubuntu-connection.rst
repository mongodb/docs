Ubuntu 18.04 may use a non-standard DNS resolver. When you use a
non-standard DNS resolver, |app-name| returns an error message like:

.. code-block:: shell
   :copyable: false

   error parsing uri: lookup <HOSTNAME> on 127.0.0.53:53: cannot unmarshal DNS message

To resolve the problem, edit ``/etc/resolv.conf`` to point to a
different DNS resolver.
