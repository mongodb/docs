
- |service| does not support network peering between clusters 
  deployed in a single region on different cloud providers.
  For example, you cannot set up network peering between 
  an |service| cluster hosted in a single region on |aws| and an    
  application hosted in a single region on |gcp|.
- {+Free-clusters+} (formerly known as ``M0``) and {+Flex-clusters+} do not support VPC peering. To use
  private networking, you must use a :ref:`{+dedicated-cluster+} <ref-deployment-types>`.