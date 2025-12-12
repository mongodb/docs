- Have either the :authrole:`Project Owner` or
  :authrole:`Organization Owner` role in |service|. 

- Have a |gcp| user account with an |iam| user policy and a
  :gcp:`Compute Network Admin </iam/docs/understanding-roles#compute.networkAdmin>`
  role that grants permissions to create, modify, and delete
  networking resources. For more information on managing
  private endpoints and connections, see the :gcp:`GCP
  documentation </vpc/docs/overview.html>`. 

- :gcp:`Install gcloud CLI </sdk/docs/install>`.

- If you have not already done so, create your |vpc| and
  Compute instances in |gcp|. See the :gcp:`GCP
  documentation </vpc/docs/using-vpc.html>` for guidance. 

- Make sure egress firewall rules permit traffic to the
  internal IP address of the {+gcp-psc+} endpoint. 
         
- (Optional) If you enforce a security perimeter with |vpc|
  service controls (VPC-SC), you must create ingress and
  egress rules to establish the connection between the
  {+gcp-psc+} endpoint and |service| {+clusters+}. See the
  :gcp:`GCP documentation
  </vpc/docs/configure-private-service-connect-services#vpc-sc>`
  for guidance. 

- Enable :gcp:`global access
  </vpc/docs/about-accessing-vpc-hosted-services-endpoints#global-access>`
  to use Private Service Connect to connect to |service|
  {+clusters+} in different regions.