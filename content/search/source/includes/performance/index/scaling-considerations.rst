|fts| Upgrade 
~~~~~~~~~~~~~

|fts| is deployed on your |service| cluster. When a new version of 
|fts| is deployed, your |service| cluster might experience brief 
network failures in returning query results. To mitigate issues during 
deployment and minimize impact to your application, consider the 
following: 

- Implement retry logic in your application.
- Configure |service| :ref:`maintenance windows 
  <configure-maintenance-window>`.

  .. note:: 

     |fts| upgrades start only during the maintenance window and might
     continue after the maintenance window.

To learn more about the changes in each release, see :ref:`Atlas 
Search Changelog <fts-changelog>`.