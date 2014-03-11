To install the monitoring agent with Kerberos or a network proxy, these
software packages must be available or installed on the target system:

- PowerShell 2.0+
- Python 2.7
- ``pymongo`` to install the Python driver used by the monitoring agent
- ``agent.py`` to install the MongoDB monitoring agent

See the `Python Download Page`_ for the most
up to date Python distribution downloads, or use the direct link for the
`Python 2.7 64-bit Windows Installer .msi file`_.

.. _`Python Download Page`: http://www.python.org/download/

.. _`Python 2.7 64-bit Windows Installer .msi file`: http://www.python.org/ftp/python/2.7.2/python-2.7.2.amd64.msi

If you do not have a 2.x-series Python installation on your system, install the
latest version of Python 2.7.x. If your system supports 64-bit executable, use
the 64-bit version.

Ensure that you install the correct PyMongo build for your Python installation
both in terms of version number (e.g .2.6, 2.7, etc.) and system architecture
(e.g. 32 or 64-bit.)
