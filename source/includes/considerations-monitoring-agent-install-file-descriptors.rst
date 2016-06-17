File Descriptors
++++++++++++++++

.. This consideration applies only to tar.gz installs (MacOS and other Linux)

If you install the Monitoring Agent from a tar.gz archive, you my need to
increase the number of open file descriptors allowed for the user running the
agent. You can use the ``ulimit`` command. See manual:`Ulimits
</reference/ulimit` in the MongoDB manual.
