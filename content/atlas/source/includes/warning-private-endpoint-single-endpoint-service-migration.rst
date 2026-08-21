.. warning::

   **Migrating from Multiple Endpoint Services to Single Endpoint Service**

   To migrate from multiple endpoint services to a single endpoint
   service that supports multiple endpoints, you must terminate the
   endpoints and endpoint services in the other regions first. This
   migration requires downtime.

   The migration process includes:

   1. Terminating endpoints in other regions
   2. Terminating endpoint services in other regions
   3. Provisioning new endpoints in your |vpc|\s or VNets to connect
      to the remaining endpoint service
   4. Updating application connection strings (which might require an
      application restart)

   Downtime occurs between terminating the other endpoints and
   updating your application to use the correct connection string.
