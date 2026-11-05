When |service| detects that the instance type your {+cluster+}
uses is out of capacity, |service| provisions an alternate instance
type with available capacity and moves your {+cluster+} to it
temporarily so the {+cluster+} can continue running. |service| selects
the alternate instance type from the same :ref:`cluster class
<storage-class-ui>` and doesn't move your data.

|service| uses adaptive capacity only when you change a {+cluster+}'s
compute resources, such as when you:

- :ref:`Create a {+cluster+} <create-new-cluster>`
- :ref:`Scale a {+cluster+} tier <scale-cluster>`

|service| doesn't use adaptive capacity when you add nodes or shards.

The alternate instance type keeps your {+cluster+} available, and the
change causes no downtime. The alternate instance type might provide
lower performance than the original instance type, so your application
might experience higher CPU use, increased latency, or timeouts until
|service| returns your {+cluster+} to its original instance type.

|service| doesn't change your {+cluster+}'s price when it provisions an
alternate instance type because of capacity constraints.