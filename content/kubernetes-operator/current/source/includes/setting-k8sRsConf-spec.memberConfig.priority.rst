.. setting:: spec.memberConfig.priority

   *Type*: string

   Number that indicates the relative likelihood of a MongoDB replica set member to become the `primary <https://www.mongodb.com/docs/manual/reference/glossary/#std-term-primary>`__.
   
   * To increase the relative likelihood that a replica set member becomes the primary, specify a higher ``priority`` value.
   
   * To decrease the relative likelihood that a replica set member becomes the primary, specify a lower ``priority`` value.
   
   For example, a member with a ``memberConfig.priority`` of ``1.5`` is more likely than a member with a ``memberConfig.priority`` of ``0.5`` to become the primary. 
   
   A member with a ``memberConfig.priority`` of ``0`` is ineligible to become the primary. To learn more, see :manual:`Member Priority </core/replica-set-elections/#voting-members>`.
   

