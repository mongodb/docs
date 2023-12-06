.. setting:: mms.login.ratelimit.lockedPeriodMinutes

   *Type*: number

   
   This setting specifies:
   
   - The time period (in minutes) used to determine 
     if too many login attempts have been made.
   - The duration that accounts are locked before you can 
     resume login attempts.
   
   You must configure this setting alongside 
   :setting:`Login Attempts Allowed Before Timeout`.
   
   .. important:: 
   
      The dropdown menu lists the only possible 
      values for this setting. Attempting to set a value
      in your ``conf-mms.properties`` file or 
      :manual:`local database </reference/local-database>` 
      that is not listed in the dropdown causes an error 
      when restarting the |onprem| instance.
   
   Corresponds to :setting:`Login Attempts Timeout Period`.
   

