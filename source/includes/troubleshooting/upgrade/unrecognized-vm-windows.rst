Unrecognized VM option
  The pre-flight check output or startup log should include an error
  like ``Unrecognized VM option 'UseParNewGC'``. This error may occur
  if any of the following files have been edited:

  - ``mms.conf``
  - ``conf-mms.properties``

  Remove ``-XX:+UseParNewGC`` from the config files to resolve this
  issue.

