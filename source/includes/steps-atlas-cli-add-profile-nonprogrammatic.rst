.. step:: Sign into |service|.

   If you aren't signed in already, sign into your |service| account in the browser.

.. step:: Enter the authorization code.

          Paste your activation code into the browser and click 
          :guilabel:`Confirm Authorization`.

.. step:: Return to the {+atlas-cli+}.

          Return to the terminal. If you connect successfully, you see a message:

          ``Successfully logged in as {Your Email Address}.``

.. step:: Select your default organization.

          Press the :kbd:`Down Arrow` and :kbd:`Up Arrow`  
          keys to highlight the desired organization and press
          :guilabel:`Enter`.
                  
          .. code-block:: sh
             :copyable: false

             ? Choose a default organization:  [Use arrows to move, type to filter]
             > Org1 (5e39bf1212121e685774c81c)

.. step:: Select your default project.

          Press the :kbd:`Down Arrow` and :kbd:`Up Arrow`  
          keys to highlight the desired project and press
          :guilabel:`Enter`.
                  
          .. code-block:: sh
             :copyable: false

             ? Choose a default project:  [Use arrows to move, type to filter]
               Project1 (5e5ebffd0c04a97009061234)
               Project2 (5cfacee6014b761b07f15678)
             > Project3 (5e39bf4979358e6857741212)
               Project4 (5c815cc7014b768fb67e3434)

.. step:: Select your default output format.

          Press the :kbd:`Down Arrow` and :kbd:`Up Arrow`  
          keys to highlight the desired output format and press
          :guilabel:`Enter`.

          .. code-block:: sh
            :copyable: false

            ? Default Output Format:  [Use arrows to move, type to filter]
            > plaintext
              json

          .. list-table::
              :header-rows: 1
              :widths: 30 70

              * - Option
                - Description
   
              * - ``plaintext``
                - Human-readable output that includes all fields that 
                   the {+atlas-cli+} returns.

              * - ``json``
                - JSON output that includes all fields that {+mcli+} returns.

.. step:: Specify the path to the MongoDB Shell, {+mongosh+}, on your system.

   The {+atlas-cli+} uses the specified {+mongosh+} path so that you can 
   access your deployments. The default value is 
   ``/usr/local/bin/mongosh``. Press :kbd:`Enter` to accept the default 
   or specify the path to {+mongosh+} on your system and press :kbd:`Enter`.

   .. code-block:: sh 
      :copyable: false 

      ? Default MongoDB Shell Path: [? for help] (/usr/local/bin/mongosh)

.. step:: Verify your profile settings.

   View the configuration file or run the ``atlas config describe`` command to
   verify your profile. For the default profile, the ``<profileName>`` is ``default``.

   .. code-block:: sh
      :copyable: false

      atlas config describe <profileName>

   The command returns following settings. The {+atlas-cli+} redacts the access
   token and refresh token values for security.

   .. code-block:: sh
      :copyable: false
              
      SETTING           VALUE
      "access_token":   "redacted",
      "mongosh_path":   "/usr/local/bin/mongosh",
      "org_id":         "60c9877baf349d6fc4fd9744",
      "output":         "json",
      "project_id":     "60c94857241ae99848af45ad",
      "refresh_token":  "redacted",
      "service":        "cloud"

