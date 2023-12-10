.. setting:: Bypass Invitation Mode

   *Type*: boolean

   *Default*: False

   
   This checkbox appears when you set :setting:`User Authentication Method` to :guilabel:`Application Database`.
   
   .. list-table::
      :widths: 10 90
      :header-rows: 1
   
      * - Value
        - Results
   
      * - ``true``
        -
          - You can add existing users to any organization or project
            without an invitation.
          - |mms| deletes and invalidates any pending invitations.
          - *New* users continue to receive and must accept invitations.
   
      * - ``false``
        -
          - *All* users continue to receive and must accept invitations.
   
   Corresponds to :setting:`mms.user.bypassInviteForExistingUsers`.
   

