- ``primary`` - to route all read requests to the replica set 
  :manual:`primary </reference/glossary/#term-primary>`
- ``primaryPreferred`` - to route all read requests the replica set 
  :manual:`primary </reference/glossary/#term-primary>` and to 
  :manual:`secondary </reference/glossary/#term-secondary>` members 
  only if ``primary`` is unavailable
- ``secondary`` - to route all read requests to the :manual:`secondary 
  </reference/glossary/#term-secondary>` members of the replica set
- ``secondaryPreferred`` - to route all read requests to the 
  :manual:`secondary </reference/glossary/#term-secondary>` members of 
  the replica set and the :manual:`primary 
  </reference/glossary/#term-primary>` on sharded clusters only if 
  ``secondary`` members are unavailable
- ``nearest`` - to route all read requests to random eligible replica   
  set member, irrespective of whether that member is a :manual:`primary 
  </reference/glossary/#term-primary>` or :manual:`secondary 
  </reference/glossary/#term-secondary>`
  