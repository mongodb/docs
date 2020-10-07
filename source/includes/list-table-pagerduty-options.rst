.. list-table::
   :header-rows: 1
   :widths: 20 10 60 10

   * - Option 
     - Type 
     - Description 
     - Required? 

   * - ``--output``, ``-o``
     - string 
     - .. include:: /includes/extracts/fact-basic-options-output.rst
     - no

   * - ``--profile``, ``-P``
     - string
     - .. include:: /includes/extracts/fact-basic-options-profile.rst
     - no

   * - ``--projectId``
     - string
     - .. include:: /includes/extracts/fact-basic-options-project-id.rst
     - no

   * - ``--serviceKey`` 
     - string 
     - `Service key <https://support.pagerduty.com/docs/generating-api-keys>`__ 
       for PagerDuty.

       .. note:: 
          
          `PagerDuty <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`_ 
          `decommissioned <https://developer.pagerduty.com/docs/rest-api-v1/v1-rest-api-decommissioning-faq/>`__ 
          their v1 |api| key in October 2018. If you have a v1 key, you can 
          continue to use that key with |service|. All new PagerDuty keys use 
          their v2 |api|, but |service| does not support their v2 key. If you 
          don't have their v1 key, use Webhook instead of PagerDuty.

     - yes
