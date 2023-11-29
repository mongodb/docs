An external domain used to externally expose your replica set deployment.

By default, each replica set member uses the |k8s| Pod's |fqdn| 
(``*.svc.cluster.local``) as the default hostname. However, if you add an
external domain to this setting, the replica set uses a hostname that is a 
subdomain of the specified domain instead. This hostname uses the following 
format:

|hostname-format|

For example:

|hostname-example|

After you deploy the replica set with this setting, the
|k8s-op-short| uses the hostname with the external domain to override 
the ``processes[n].hostname`` field in the |onprem| :opsmgr:`automation configuration 
</reference/cluster-configuration>`. Then, the {+mdbagent+} uses this hostname to 
connect to |mongod|.

To specify other hostnames for connecting to the replica set, you can use the 
:setting:`spec.connectivity.replicaSetHorizons` setting. However, the following 
connections still use the hostname with the external domain:

- The {+mdbagent+} to connect to |mongod|.
- |mongod| to connect to other |mongod| instances.

.. warning::

    Specifying this field changes how |onprem| registers |mongod| processes.
    You can specify this field only for new replica set deployments starting in |k8s-op-short| 
    version 1.19. You can't change the value of this field or any ``processes[n].hostname`` fields 
    in the |onprem| :opsmgr:`automation configuration </reference/cluster-configuration>` for a running
    replica set deployment.
