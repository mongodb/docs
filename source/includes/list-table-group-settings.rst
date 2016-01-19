.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Setting

     - Description

   * - :guilabel:`Group Time Zone`

     - Sets your group's time zone.

   * - :guilabel:`Collect Logs For All Hosts`

     - Activates or deactivates the collection of log data for all
       hosts. This overwrites the statuses set on the individual hosts.

   * - :guilabel:`Collect Profiling Information for All Hosts`

     - Activates or deactivates |mms| collection of data from the MongoDB
       :manual:`database profilers </tutorial/manage-the-database-profiler>`
       running on your :program:`mongod` instances. A :program:`mongod`
       instance must have its profiler enabled in order for |mms| to
       collect data from it.

       When you change this setting, |mms| applies the change globally to
       all :program:`mongod` processes in the group. For example, if you
       disable this setting, |mms| disables the collection of profiling
       data for all the group's processes. This setting does not affect
       whether the profiler is enabled on a given :program:`mongod`
       process, only whether |mms| collects profiling data.

       To enable the collection of profiling data on a process-by-process
       basis, see :doc:`/tutorial/profile-database`.

       When profiling is enabled, |mms| collects data from MongoDB’s
       profiler to provide statistics about performance and database
       operations. Ensure exposing profile data to |mms| is
       consistent with your information security practices. Also be aware
       the profiler can consume resources which may adversely affect
       MongoDB performance. For more information, see
       :doc:`/tutorial/profile-database`.

   * - :guilabel:`Collect Database Specific Statistics`

     - Allows you to enable or disable the collection of database
       statistics. For more information, see :ref:`db-stats-warning`.

   * - :guilabel:`Reset Duplicates`

     - Allows you to reset and remove all detected duplicate hosts. This
       is useful if your server environment has drastically changed and
       you believe a host is incorrectly marked as a duplicate.

   * - :guilabel:`Preferred Hostnames`

     - Allows you to specify resolvable hostnames or IP address for your
       deployment's servers. |mms| keeps a list of the multiple way to
       which each server is referred (hostname, FQDN, IP address) and uses
       heuristics to determine the best choice. Use this setting to
       guarantee |mms| uses a resolvable method. The method you choose
       will also be the method used to display the servers in |mms|.

       To specify a preferred hostname, click :guilabel:`Add`. To specify
       a hostname pattern, use the :guilabel:`Ends With` or
       :guilabel:`Regex` buttons.

   * - :guilabel:`Suppress Mongos Automatic Discovery`

     - Suppresses automatic discovery of all :program:`mongos` processes
       in your deployment's sharded clusters.

   * - :guilabel:`Public Key for SCP Restores`

     - If you use |mms| :doc:`Backup </tutorial/nav/backup-use>`, this
       setting allows you to generate a public key for SCP backup
       restoration. If you restore a snapshot through SCP, |mms| uses the
       key to transmit the snapshot. For more information on restores, see
       :ref:`how to validate an SCP restore <backup-faq-scp-validation>`
       and other SCP FAQs.

   * - :guilabel:`PagerDuty Service Key`

     - Sets a default service key for alert notifications sent to a `PagerDuty
       <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`_
       account. |mms| enters the key by default when you add a PagerDuty
       notification to an :doc:`alert configuration
       </tutorial/manage-alert-configurations>`.

   * - :guilabel:`Flowdock Settings`

     - Sets default values for alert notifications sent to Flowdock. |mms|
       enters the values by default when you add a Flowdock notification
       to an :doc:`alert configuration
       </tutorial/manage-alert-configurations>`. Set the following:

       - :guilabel:`Org Name`: The Flowdock organization name in
         lower-case letters. This is the name that appears after
         ``www.flowdock.com/app/`` in the URL string.

       - :guilabel:`Flow Name`: The flow name in lower-case letters. The
         flow name appears after the org name in the URL string:
         ``www.flowdock.com/app/<org-name>/<flow-name>``.

         The flow name also appears in the "flow email address" setting in
         Flowdock. For example: ``<flow-name>@example.flowdock.com``.

       - :guilabel:`API Token`: Your Flowdock "personal API token" found
         on the `<https://www.flowdock.com/account/tokens>`_ page of your
         Flowdock account.

   * - :guilabel:`HipChat Settings`

     - Sets a default room and API token for alert notifications sent to a
       HipChat account. |mms| enters the values by default when you add a
       HipChat notification to an :doc:`alert configuration
       </tutorial/manage-alert-configurations>`.

   * - :guilabel:`Slack Settings`

     - Sets a default channel and token for alert notifications sent
       to a Slack account. You can use either an API token or a Bot token. To
       create an API token, see the `<https://api.slack.com/web>`_ page in
       your Slack account. For information on Bot users in Slack, see
       `<https://api.slack.com/bot-users>`_.

       |mms| will enter these values by default when you add a Slack
       notification to an :doc:`alert configuration
       </tutorial/manage-alert-configurations>`.

   * - :guilabel:`Webhook Settings`

     - Adds a :guilabel:`Webhook URL` endpoint to which |mms| can send
       alert notifications for programmatic processing. |mms| sends an
       alert notification as an HTTP POST request in which the request body
       contains a JSON document that uses the same format as the Public
       API's :doc:`Alerts resource </reference/api/alerts>`.

       |mms| adds a request header called ``X-MMS-Event`` to distinguish
       between various alert states. The possible values for this header
       are:

       - ``alert.open``: The alert was just opened.

       - ``alert.close``: The alert was resolved.

       - ``alert.update``: A previously opened alert is still open.

       - ``alert.cancel``: The alert became invalid and was canceled.

       - ``alert.inform``: Represents an informational alert, which is a
         point-in-time event, such as "Primary Elected."

       If you specify a key in the :guilabel:`Webhook Secret` field, |mms| adds the
       ``X-MMS-Signature`` request header, which contains the hex-encoded
       HMAC signature of the request body. The signature is created using
       the provided secret.

       To send alert notifications to a Webhook, select the Webhook
       notification option when creating or editing an :doc:`alert
       configuration </tutorial/manage-alert-configurations>`.
