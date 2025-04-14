Most Unix-like operating systems limit the system resources that a
process may use. These limits may negatively impact MongoDB operation,
and should be adjusted. See :doc:`/reference/ulimit` for the recommended
settings for your platform. 

.. note:: 

    Starting in MongoDB 4.4, a startup error is generated if the
    ``ulimit`` value for number of open files is under ``64000``.
