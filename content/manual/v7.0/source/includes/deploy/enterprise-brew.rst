.. procedure::
   :style: normal

   .. step:: Add the MongoDB Homebrew tap.

      The `MongoDB Homebrew <https://github.com/mongodb/homebrew-brew>`_
      tap makes the official MongoDB and Database Tools Homebrew
      formulae available on your system.

      To add the MongoDB Homebrew tap, run the following command:

      .. code-block:: bash

         brew tap mongodb/brew

      Then, mark the tap as trusted:

      .. code-block:: bash

         brew trust mongodb/brew

      If you have already done this for a previous installation of
      MongoDB, you can skip this step.

   .. step:: Update Homebrew.

      To update Homebrew and all existing formulae, run the following
      command:

      .. code-block:: bash

         brew update

   .. step:: Install MongoDB Enterprise.

      To install MongoDB Enterprise, run the following command:

      .. code-block:: bash

         brew install mongodb-enterprise@{+version+}

.. tip::

   Alternatively, you can specify a previous version of MongoDB if
   desired. You can also maintain multiple versions of MongoDB side by
   side in this manner.

.. tip::

   If you have previously installed an older version of the formula, you
   may encounter a ``ChecksumMismatchError``. To resolve, see
   :ref:`troubleshooting-checksumerror`.

