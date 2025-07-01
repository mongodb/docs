- If the ``DefaultRWConcern`` value on the source snapshot differs
  from the ``DefaultRWConcern`` value on the target 
  {+database-deployment+}, |service| overrides the value on the source 
  snapshot with the value on the target {+database-deployment+}. If 
  there is no value configured for the ``DefaultRWConcern`` on the 
  target {+database-deployment+}, |service| keeps the value of 
  ``DefaultRWConcern`` from the snapshot without explicit 
  configuration. This may differ from the default value for that 
  MongoDB version.