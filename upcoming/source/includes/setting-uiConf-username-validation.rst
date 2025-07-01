.. setting:: Username Validation

   *Type*: string

   *Default*: false

   Determines if |onprem| requires usernames to be email addresses.
   
   .. include:: /includes/list-table-api-email-validation-options.rst
   
   If set to ``strict``, |onprem| uses the following regular expression
   to validate that an email address adheres to the requirements
   described in Section 3 of :rfc:`3696`:
   
   .. code-block:: sh
      :copyable: false
   
      ^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$
   
   .. example::
   
      ``jane.smith@example.com`` is valid. ``jane.smith@ex@mple.com``
      is not.
   
   To validate usernames, you must add
   :setting:`mms.email.validation` as a custom property on the
   :guilabel:`Custom` tab of the |onprem| Config page in the
   :guilabel:`Admin` interface.
   
   Corresponds to :setting:`mms.email.validation`.
   

