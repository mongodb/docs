.. setting:: spec.clusterSpecList.memberConfig.priority

   *Type*: string

   Number that indicates the relative eligibility of a MongoDB replica set member to become a `primary <https://www.mongodb.com/docs/manual/reference/glossary/#std-term-primary>`__.
   
   Specify a higher value to make a member more eligible to become primary, and lower values to make the member less eligible. For example, a member with a ``spec.clusterSpecList.memberConfig.priority`` of ``"1.5"`` is more likely than ``"0.5"`` to become a primary. A priority of ``"0"`` is ineligible to become primary. For more details, see `Member Priority <https://www.mongodb.com/docs/manual/core/replica-set-elections/#voting-members>`__.
   

