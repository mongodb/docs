To run and manage your :binary:`~bin.mongod` process, you will be using
your operating system's built-in :term:`init system`. Recent versions of
Linux tend to use **systemd** (which uses the ``systemctl`` command),
while older versions of Linux tend to use **System V init** (which uses
the ``service`` command).

If you are unsure which init system your platform uses, run the
following command:

.. code-block:: bash

   ps --no-headers -o comm 1

Then select the appropriate tab below based on the result:

- ``systemd`` - select the **systemd (systemctl)** tab below.

- ``init`` - select the **System V Init (service)** tab below.

|
