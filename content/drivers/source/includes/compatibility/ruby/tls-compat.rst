The Ruby driver uses the protocols supported by the underlying Ruby
``openssl`` extension. The ``openssl`` extension generally exposes
the functionality available in the operating system's OpenSSL library.

Industry best practices, and some regulations, require the use of TLS 1.1
or later. Some operating systems or versions might not provide an OpenSSL version
that supports these TLS versions.

If you use a macOS version earlier than 10.13 (High Sierra), you need to install Ruby from
`rvm`_, `homebrew`_, `macports`_, or another similar source. See
`Installing Ruby`_ for more options.

If you use Linux or other non-macOS Unix systems, you can check your OpenSSL version
as follows:

.. code-block:: sh

   openssl version

If the version number is earlier than 1.0.1, support for TLS 1.1 or later is
not available. Contact your operating system vendor for a solution or upgrade
to a newer distribution.

You can check your TLS version by running the following command:

.. code-block:: sh

   ruby -e "require 'net/http'; require 'json'; puts JSON.parse(Net::HTTP.get(URI('https://www.howsmyssl.com/a/check')))['tls_version']"

After running the command, you must see ``TLS 1.X`` where ``X`` is greater than
or equal to ``1``.

To learn more about TLS versions and their security implications, see the `Transport Layer Security Cheat Sheet
<https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html>`_.

.. _rvm: https://rvm.io/
.. _homebrew: https://brew.sh/
.. _macports: https://www.macports.org/
.. _Installing Ruby: https://www.ruby-lang.org/en/documentation/installation