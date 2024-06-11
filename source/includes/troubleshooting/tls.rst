CERTIFICATE_VERIFY_FAILED
~~~~~~~~~~~~~~~~~~~~~~~~~

An error message similar to the following means that OpenSSL couldn't verify the
server's certificate:

.. code-block:: python

   [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed

This often happens because OpenSSL can't access the system's
root certificates, or because the certificates are out of date.

If you use Linux, ensure that you have the latest root certificate updates installed
from your Linux vendor.

If you use macOS, and if you're running Python v3.7 or later that you downloaded
from python.org, run the following command to install
root certificates:

.. code-block:: python

   open "/Applications/Python <YOUR PYTHON VERSION>/Install Certificates.command"

.. tip::
   
   For more information on this issue, see
   `Python issue 29065. <https://bugs.python.org/issue29065#msg283984>`__ 

If you use portable-pypy, you might need to set an environment
variable  to tell
OpenSSL where to find root certificates.
The following code example shows how to install the
`certifi module <https://pypi.org/project/certifi/>`__ from PyPi and
export the ``SSL_CERT_FILE`` environment variable:

.. code-block:: python

   $ pypy -m pip install certifi
   $ export SSL_CERT_FILE=$(pypy -c "import certifi; print(certifi.where())")

.. tip::
   
   For more information on this issue, see
   `portable-pypy issue 15. <https://github.com/squeaky-pl/portable-pypy/issues/15>`__ 

TLSV1_ALERT_PROTOCOL_VERSION
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An error message similar to the following means that the OpenSSL
version used by Python doesn't support a new enough TLS protocol to connect
to the server:

.. code-block:: python

   [SSL: TLSV1_ALERT_PROTOCOL_VERSION] tlsv1 alert protocol version

Industry best practices recommend, and some regulations require, that older
TLS protocols be disabled in some MongoDB deployments. Some deployments might
disable TLS 1.0, while others might disable TLS 1.0 and TLS 1.1.

No application changes are required for {+driver-short+} to use the newest TLS
versions, but some operating system versions might not provide an OpenSSL version new
enough to support them.

If you use macOS v10.12 (High Sierra) or earlier, install Python from python.org,
homebrew, macports, or a similar source.

If you use Linux or another non-macOS Unix, use the following command to check your OpenSSL
version:

.. code-block:: sh

   $ openssl version

If the preceding command shows a version number less than 1.0.1,
support for TLS 1.1 or newer isn't available.
Upgrade to a newer version or contact your OS vendor for a solution.

To check the TLS version of your Python interpreter, install the ``requests`` module and
execute the following code:

.. code-block:: sh

   python -c "import requests; print(requests.get('https://www.howsmyssl.com/a/check', verify=False).json()['tls_version'])"

You should see TLS 1.1 or later.

Invalid Status Response
~~~~~~~~~~~~~~~~~~~~~~~

An error message similar to the following means that certificate
revocation checking failed:

.. code-block:: python

   [('SSL routines', 'tls_process_initial_server_flight', 'invalid status response')]

For more details, see the :ref:`OCSP <pymongo-disable-ocsp>` section of this guide.

SSLV3_ALERT_HANDSHAKE_FAILURE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When using Python v3.10 or later with MongoDB versions earlier than v4.0, you might
see errors similar to the following messages:

.. code-block:: python

   SSL handshake failed: localhost:27017: [SSL: SSLV3_ALERT_HANDSHAKE_FAILURE] sslv3 alert handshake failure (_ssl.c:997)
   SSL handshake failed: localhost:27017: EOF occurred in violation of protocol (_ssl.c:997)

The {+mdb-server+} logs might also show the following error:

.. code-block:: python

   2021-06-30T21:22:44.917+0100 E NETWORK  [conn16] SSL: error:1408A0C1:SSL routines:ssl3_get_client_hello:no shared cipher

`Changes made to the ssl module in Python v3.10
<https://docs.python.org/3/whatsnew/3.10.html#ssl>`__ might cause incompatibilities
with MongoDB versions earlier than v4.0. To resolve this issue, try one or more of the
following steps:

- Downgrade Python to v3.9 or earlier
- Upgrade {+mdb-server+} to v4.2 or later
- Install {+driver-short+} with the :ref:`OCSP <pymongo-disable-ocsp>` option, which relies on PyOpenSSL