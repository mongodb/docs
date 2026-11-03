Add an {+aws-msk+} Private Link Connection through the {+atlas-ui+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To add an {+aws-msk+} Private Link connection to your {+spw+} through
the {+atlas-ui+}:

#. Configure your {+aws-msk+} cluster.
#. Create the private endpoint.
#. Create the {+service+}-side connection.

Configure Your {+aws-msk+} Cluster
``````````````````````````````````````````````````````````````````````````````````

You must configure your {+aws-msk+} cluster to accept incoming
connections from your {+service+} project.

.. important::

   {+aws-msk+} accepts incoming connections from {+aws+} only. To use
   an {+aws-msk+} Private Link connection, you must host your {+spw+}s
   on {+aws+}.

.. procedure::
   :style: normal

   .. step:: Retrieve the {+service+} {+aws+} account ID.

      You need this value for your {+aws-msk+} cluster policy.

      a. In the sidebar, click :guilabel:`Database & Network Access`
         under the :guilabel:`Security` heading.

      #. Click :guilabel:`Private Endpoint`, then click the
         :guilabel:`{+atlas-sp+}` tab.

      #. Under :guilabel:`Connection private endpoint`, click
         :guilabel:`Learn About Private Endpoints`.

      #. Select :guilabel:`AWS` as your cloud provider and set
         :guilabel:`Region` to a region in which your project has an
         {+service+} cluster.

      #. Copy the :guilabel:`Atlas AWS Account ID`.

   .. step:: Enable multi-VPC connectivity on your {+aws-msk+} cluster.

      Sign in to the {+aws+} Management Console and navigate to the
      {+aws-msk+} console. Ensure that ``multi-VPC connectivity`` is
      enabled on the cluster to which you want to connect. To learn
      more about the requirements for multi-VPC private connectivity,
      see the :aws:`AWS documentation
      </msk/latest/developerguide/aws-access-mult-vpc.html#mvpc-requirements>`.

   .. step:: Edit your {+aws-msk+} cluster policy.

      Click :guilabel:`Properties`, :guilabel:`Security Settings`, and
      :guilabel:`Edit cluster policy`.

      Use the {+aws+} account ID that you copied earlier to construct
      the principal ARN, in the form
      ``arn:aws:iam::<awsAccountId>:root``. Provide this ARN as the
      value of ``Statement.Principal.AWS`` and ensure the policy takes
      the following form:

      .. code-block:: json

         {
           "Version": "2012-10-17",
           "Statement": [
             {
               "Effect": "Allow",
               "Principal": {
                 "AWS": "arn:aws:iam::123456789012:root"
               },
               "Action": [
                 "kafka:CreateVpcConnection",
                 "kafka:GetBootstrapBrokers",
                 "kafka:DescribeCluster",
                 "kafka:DescribeClusterV2"
               ],
               "Resource": "arn:aws:kafka:us-east-1:123456789012:cluster/testing/de8982fa-8222-4e87-8b20-9bf3cdfa1521-2"
             }
           ]
         }

Create the Private Endpoint
```````````````````````````

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-network-access.rst

   .. step:: Go to the {+atlas-sp+} private endpoint interface.

      a. In the sidebar, click :guilabel:`Private Endpoint`.

      #. Click the :guilabel:`{+atlas-sp+}` tab.

      #. Under :guilabel:`Connection private endpoint`, click
         :guilabel:`Create`.

   .. step:: Select your cloud provider and vendor.

      a. Set :guilabel:`Cloud Provider` to :guilabel:`AWS`.

      #. Set :guilabel:`Vendor` to :guilabel:`MSK`.

      #. Click :guilabel:`Next, enter service details`.

   .. step:: Provide your service details.

      a. In the :guilabel:`Authentication Scheme` select, choose the
         scheme to authenticate with your {+aws-msk+} cluster:

         - :guilabel:`SASL/SCRAM`
         - :guilabel:`mTLS`
         - :guilabel:`IAM`

         To set up SASL/SCRAM authentication on your {+aws-msk+}
         cluster, see :aws:`Set up SASL/SCRAM authentication for an
         Amazon MSK cluster
         </msk/latest/developerguide/msk-password-tutorial.html>` in
         the {+aws+} documentation.

      #. In the :guilabel:`ARN Resource` field, provide your
         :aws:`AWS MSK cluster ARN
         </msk/latest/developerguide/msk-get-cluster-arn.html>`.

   .. step:: Click :guilabel:`Next, generate endpoint ID`.

{+service+} generates a private endpoint ID. To view endpoint
details, click :guilabel:`View` in the endpoint's row on the
:guilabel:`{+atlas-sp+}` tab of the :guilabel:`Network Access`
interface.

Create the {+service+}-Side Connection
````````````````````````````````

.. include:: /includes/atlas-stream-processing/create-kafka-pl-atlas-side-ui.rst
