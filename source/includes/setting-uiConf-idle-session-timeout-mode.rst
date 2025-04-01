.. setting:: Idle Session Timeout Mode

   *Type*: string

   *Default*: None

   Mode of the idle session timeout feature.

   Set to `"idle"` to allow |mms| to log out users after a period of
   inactivity.

   The duration of this period of inactivity is determined by the
   :setting:`Idle Session Timeout Max Minutes`.
   
   Corresponds to :setting:`mms.session.mode`.
