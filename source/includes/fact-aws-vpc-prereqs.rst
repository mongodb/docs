Create the following network traffic rule on your |aws| security group
attached to your resources that connect to |service|:

.. list-table::
   :header-rows: 1
   :widths: 15 15 15 55

   * - Permission
     - Direction
     - Port
     - Target

   * - Allow
     - outbound
     - 27015-27017 inclusive
     - to your |service| |cidr|
