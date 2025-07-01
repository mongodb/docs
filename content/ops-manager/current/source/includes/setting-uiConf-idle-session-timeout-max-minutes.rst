.. setting:: Idle Session Timeout Max Minutes

   *Type*: int

   *Default*: None

   The maximum time, in minutes, a session remains open with no user
   activity. After this time elapses without user activity, |mms| logs
   the user out.

   You must set :setting:`Idle Session Timeout Mode` in order to use
   this setting.
   
   Corresponds to :setting:`mms.session.idleTimeoutMinutes`.
