- Creates 50 load balancers and service attachments for that region. Then,
  |service| places existing {+clusters+} within the region behind load balancers
  in the |service| |vpc|. {+gcp-psc+} requires a separate load balancer
  for each node within every {+cluster+}.
- Reserves any remaining load balancers and service attachments for future
  {+clusters+} within that region.