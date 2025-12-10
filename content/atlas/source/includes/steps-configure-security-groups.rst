.. step:: Configure your resources' security groups to send traffic to and receive traffic from the :term:`interface endpoint`.
        
    For each resource that needs to connect to your {+fdi+} using 
    {+aws-pl+}, the resource's security group must allow outbound 
    traffic to the :term:`interface endpoint's <interface endpoint>` 
    private IP addresses on port 27017.
    
    See :aws:`Adding Rules to a Security Group </AWSEC2/latest/UserGuide/ec2-security-groups.html#adding-security-group-rule>`
    for more information.
    
.. step:: Create a security group for your interface endpoint to allow resources to access it.
    
    This security group must allow inbound traffic on port 27017 from each 
    resource that needs to connect to your {+fdi+} using {+aws-pl+}:
    
    a. In the |aws| console, navigate to the :guilabel:`VPC Dashboard`. 
    
    #. Click :guilabel:`Security Groups`, then click 
        :guilabel:`Create security group`.
    
    #. Use the wizard to create a security group. Make sure you select 
        your VPC from the :guilabel:`VPC` list.
    
    #. Select the security group you just created, then click the 
        :guilabel:`Inbound Rules` tab.
    
    #. Click :guilabel:`Edit Rules`.
    
    #. Add rules to allow all inbound traffic from each resource in your
        VPC that you want to connect to your {+fdi+}.
    
    #. Click :guilabel:`Save Rules`.
    
    #. Click :guilabel:`Endpoints`, then click the endpoint for your
        VPC.
    
    #. Click the :guilabel:`Security Groups` tab, then click 
        :guilabel:`Edit Security Groups`.
    
    #. Add the security group you just created, then click 
        :guilabel:`Save`.
    
    To learn more about :aws:`VPC security groups 
    </vpc/latest/userguide/VPC_SecurityGroups.html>`, see the |aws| 
    documentation.