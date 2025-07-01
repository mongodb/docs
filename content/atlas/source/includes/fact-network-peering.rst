|service| supports network peering
connections for {+dedicated-clusters+} hosted on |aws|, |gcp|, and 
|azure|, and on multi-cloud sharded {+clusters+}.

Network peering establishes a private
connection between your |service| |vpc| and your cloud provider's 
|vpc|. The connection isolates traffic from public networks for added
security. {+atlas-sp+} supports two types of network peering
connection:

- *Outbound*: A |vpc| connection in which your {+spi+} sends the
  peering request to your cloud provider |vpc|. This connection type
  is suitable for scenarios in which you have full administrative
  access to the external |vpc| and can approve connection requests on
  it.

- *Inbound*: A |vpc| connection in which your cloud provider |vpc|
  sends the peering request to your {+spi+}. This connection type is
  suitable for scenarios in which you don't have full administrative
  access to your cloud provider |vpc|, as it requires approval only
  within your |service| |vpc|.
