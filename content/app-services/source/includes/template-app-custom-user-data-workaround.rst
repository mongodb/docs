**Custom User Data Configuration Bug Workaround:** Sometimes, the template
generator does not copy the custom user data configuration to the new app
correctly. You can fix this as follows: the ``{+cli-bin+} apps create`` command
should have output some JSON about the app you just created. From this JSON,
copy the "url" value (something like ``https://services.cloud.mongodb.com/groups/...``)
and visit that URL in your browser. Log in if prompted. From the app dashboard,
in the left-hand panel, click :guilabel:`App Users`. Click :guilabel:`Custom
User Data`. Ensure :guilabel:`Enable Custom User Data` is ``ON``. If it was not
on, turn it on and enter "mongodb-atlas", "Item", and "User" for
:guilabel:`Cluster Name`, :guilabel:`Database Name`, and :guilabel:`Collection
Name`, respectively. For :guilabel:`User ID Field`, enter ``_id``. Hit
:guilabel:`Save` (or :guilabel:`Save Draft`, then :ref:`deploy <deploy-ui>`).
