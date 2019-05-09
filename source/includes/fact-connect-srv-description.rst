This toggle indicates whether the provided :guilabel:`Hostname`
is an :manual:`SRV Record
</reference/connection-string/#dns-seedlist-connection-format>`.
If this toggle is enabled, you do not need to specify a port.

.. note::

   You can only use SRV connection strings to connect to deployments
   running MongoDB 3.6 and later.

SRV connection strings have a prefix of ``mongodb+srv:``.
If you are using an SRV connection string, you do not need to
include ``mongodb+srv`` in your :guilabel:`Hostname`.

.. example::

    If the following is your SRV connection string for your MongoDB instance:

    .. code-block:: shell
        :copyable: false

        mongodb+srv://<username>:<password>@gettingstarted-7q2cs.mongodb.net/test

    Then, in |compass-short|, you would specify your
    :guilabel:`Hostname` as:

    .. code-block:: shell
        :copyable: false

        gettingstarted-7q2cs.mongodb.net
