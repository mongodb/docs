For supported Linux Operating Systems, install the Server package by following the
:ref:`install on Linux tutorial <install-enterprise-linux>`
, follow the documented installation instructions and install the
``mongodb-enterprise`` server package. Alternatively, specify
``mongodb-enterprise-cryptd`` instead to install only the
``mongocryptd`` binary. The package manager installs
the binaries to a location in the system PATH (e.g. ``/usr/bin/``)

For OSX, install the Server package by following the
:ref:`install on MacOS tutorial <install-enterprise-macos>`.
The package manager installs binaries to a location in the system
PATH.

For Windows, install the Server package by following the
:ref:`install on Windows tutorial <install-enterprise-windows>`.
You must add the ``mongocryptd`` package to your system PATH after
installation. Defer to documented best practices for your Windows
installation for instructions on adding the ``mongocryptd`` binary to
the system PATH.

For installations via an official tarball or ZIP archive,
follow the documented best practices for your operating system to add
the ``mongocryptd`` binary to your system PATH.