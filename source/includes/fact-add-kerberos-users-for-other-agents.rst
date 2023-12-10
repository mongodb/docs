.. important:: Recommend using One User for All Agents on Windows 

   For deployments on Windows, MongoDB recommends using the same
   :manual:`MongoDB user </core/security-users/>` for the Automation Agent, Backup Agent, and Monitoring Agent. Grant this user the
   following roles on the ``admin`` database:

   - :authrole:`clusterAdmin`
   - :authrole:`dbAdminAnyDatabase`
   - :authrole:`readWriteAnyDatabase`
   - :authrole:`restore`
   - :authrole:`userAdminAnyDatabase`

   If you require separate MongoDB users for each Agent, you must
   :manual:`create each Agent user </tutorial/create-users>` in every
   MongoDB instance in the deployment.
