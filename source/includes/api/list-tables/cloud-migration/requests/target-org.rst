.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - linkToken
     - string
     - Required
     - String that contains the information necessary to connect from
       |cloud| or |onprem| to |service| during a Live Migration from a
       |cloud| or |onprem| deployment to a cluster in |service|.

       When you migrate data from a |cloud| or |onprem| deployment,
       you need to do the following:

       1. Generate a link-token in |service|
       2. Enter it in your |cloud| or |onprem| organization’s settings.

       You use the same link-token to migrate each deployment in your
       |cloud| or |onprem| organization sequentially, one at a time.
       You can generate multiple link-tokens in |service|. Use one
       unique link-token for each |cloud| or |onprem| organization.
