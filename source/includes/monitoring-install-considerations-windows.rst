The Monitoring agent distribution download includes a ``WINDOWS.txt`` file with
instructions for using the agent on Windows platforms. Before you can use the
agent on Windows platforms, you must ensure your system meets the system
requirements.

If you do not have a 2.x-series Python installation on your system, install the
latest version of Python 2.7.x. If your system supports 64-bit executable, use
the 64-bit version.

Ensure that you install the correct PyMongo build for your Python installation
both in terms of version number (e.g .2.6, 2.7, etc.) and system architecture
(e.g. 32 or 64-bit.)

The Monitoring agent does have some resource requirements and should run on
separate systems to avoid impacting ``mongod`` and ``mongos`` performance. To
monitor five or fewer nodes, you can safely deploy on an AWS "micro instance."
Similarly, if you are only monitoring a small number of databases, you may be
able to deploy the agent on the system running the ``mongos`` process. Running
PyMongo with the native extensions, which requires ``gcc``, provides significant
performance improvements.
