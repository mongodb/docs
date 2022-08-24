- To connect to |service| {+database-deployments+} using 
  {+aws-pl+} from regions in which you haven't deployed a private
  endpoint connection, you must peer |vpc|\s in those regions to 
  |vpc|\s in a region in which you have deployed a private
  endpoint connection.

  To learn about inter-region |vpc| peering, see the `AWS documentation
  <https://aws.amazon.com/answers/networking/aws-multiple-region-multi-vpc-connectivity/>`__.
