.. important:: 

    |service| began replacing the public IPv4 addresses of {+dedicated-clusters+} deployed
    in AWS starting January 21, 2025. If you use standard connection strings
    (``mongodb://``) and have hardcoded IPs, you must update your firewall or security
    group configurations to allow the new addresses. 

    This change affects only public IP access. :ref:`VPC peering
    <atlas-sp-manage-vpc-peering>` and :ref:`Private Endpoints <manage-private-endpoint>`
    are not impacted, as they rely on private networking and not public IPs. The change
    will be applied in a rolling manner with no downtime, and |service| will provide
    guidance before updates take effect.

    If you are using SRV-based connection strings (``mongodb+srv://``), no changes are
    required as DNS will resolve the new IPs automatically.

