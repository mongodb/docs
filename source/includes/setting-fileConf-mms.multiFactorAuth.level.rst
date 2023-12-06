.. setting:: mms.multiFactorAuth.level

   *Type*: string

   *Default*: OFF

   
   Configures the :doc:`two-factor authentication
   </tutorial/manage-two-factor-authentication>` "level":
   
   .. list-table::
      :widths: 40 60
      :header-rows: 1
   
      * - Setting
        - Description
   
      * - ``OFF``
        - Disables two-factor authentication. |onprem| does not use
          two-factor authentication.
   
      * - ``OPTIONAL``
        - Users can choose to set up two-factor authentication for
          their |onprem| account.
   
      * - ``REQUIRED_FOR_GLOBAL_ROLES``
        - Users who possess a :ref:`global role <global-roles>` *must*
          set up two-factor authentication. Two factor authentication
          is optional for all other users.
   
      * - ``REQUIRED``
        - *All* users must set up two-factor authentication for
          their |onprem| account.
   
   Two-factor authentication is recommended for the security of your
   |onprem| deployment.
   
   .. warning::
   
      If enabling ``mms.multiFactorAuth.level`` through the
      configuration file, you must create a
      :ref:`user account <add-users>` first before updating the
      configuration file. Otherwise, you cannot login to |mms|.
   
   .. note::
   
      If you enable :ref:`Twilio integration <enable-twilio>`
      (optional), ensure that |mms| servers can access the
      ``twilio.com`` domain.
   
   Corresponds to :setting:`Multi-factor Auth Level`.
   

