For macOS systems that have installed MongoDB Community Edition using
the Homebrew installation method, the open files limit might not be
automatically set when starting MongoDB through ``brew services``.
You might need to manually configure the ``ulimit`` values.