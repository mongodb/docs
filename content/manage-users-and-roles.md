+++
title = "Manage Users and Roles"

[tags]
mongodb = "product"
+++

# Manage Users and Roles


## Overview

Changed in version 2.6: MongoDB 2.6 introduces a new [authorization model](https://docs.mongodb.com/manual/core/authorization/#authorization).

This tutorial provides examples for user and role management under the
MongoDB's authorization model. [Add Users](https://docs.mongodb.com/manual/tutorial/create-users) describes
how to add a new user to MongoDB.


## Prerequisites

Important: If you have [enabled access control](enable-authentication/) for your deployment, you must authenticate as a user with the required privileges specified in each section. A user administrator with the [``userAdminAnyDatabase``](https://docs.mongodb.com/manual/reference/built-in-roles/#userAdminAnyDatabase) role, or [``userAdmin``](https://docs.mongodb.com/manual/reference/built-in-roles/#userAdmin) role in the specific databases, provides the required privileges to perform the operations listed in this tutorial. See [Enable Auth](enable-authentication/) for details on adding user administrator as the first user.


## Create a User-Defined Role

Roles grant users access to MongoDB resources. MongoDB provides a
number of [built-in roles](https://docs.mongodb.com/manual/reference/built-in-roles) that
administrators can use to control access to a MongoDB system. However,
if these roles cannot describe the desired set of privileges, you can
create new roles in a particular database.

Except for roles created in the ``admin`` database, a role can only
include privileges that apply to its database and can only inherit from
other roles in its database.

A role created in the ``admin`` database can include privileges that
apply to the ``admin`` database, other databases or to the
[cluster](https://docs.mongodb.com/manual/reference/resource-document/#resource-cluster) resource, and can inherit from roles
in other databases as well as the ``admin`` database.

To create a new role, use the [``db.createRole()``](https://docs.mongodb.com/manual/reference/method/db.createRole/#db.createRole) method,
specifying the privileges in the ``privileges`` array and the inherited
roles in the ``roles`` array.

MongoDB uses the combination of the database name and the role name to
uniquely define a role. Each role is scoped to the database in which
you create the role, but MongoDB stores all role information in the
[``admin.system.roles``](https://docs.mongodb.com/manual/reference/system-collections/#admin.system.roles) collection in the ``admin`` database.


### Prerequisites

To create a role in a database, you must have:

* the [``createRole``](https://docs.mongodb.com/manual/reference/privilege-actions/#createRole) [action](https://docs.mongodb.com/manual/reference/privilege-actions/#security-user-actions) on that [database resource](https://docs.mongodb.com/manual/reference/resource-document/#resource-specific-db).

* the [``grantRole``](https://docs.mongodb.com/manual/reference/privilege-actions/#grantRole) [action](https://docs.mongodb.com/manual/reference/privilege-actions/#security-user-actions) on that database to specify privileges for the new role as well as to specify roles to inherit from.

Built-in roles [``userAdmin``](https://docs.mongodb.com/manual/reference/built-in-roles/#userAdmin) and
[``userAdminAnyDatabase``](https://docs.mongodb.com/manual/reference/built-in-roles/#userAdminAnyDatabase) provide [``createRole``](https://docs.mongodb.com/manual/reference/privilege-actions/#createRole) and
[``grantRole``](https://docs.mongodb.com/manual/reference/privilege-actions/#grantRole) actions on their respective [resources](https://docs.mongodb.com/manual/reference/resource-document).


### Create a Role to Manage Current Operations

The following example creates a role named ``manageOpRole`` which
provides only the privileges to run both [``db.currentOp()``](https://docs.mongodb.com/manual/reference/method/db.currentOp/#db.currentOp) and
[``db.killOp()``](https://docs.mongodb.com/manual/reference/method/db.killOp/#db.killOp). [1]

Note: Changed in version 3.2.9: On [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances, users do not need any specific privileges to run to view their own operations or to kill their own operations. See [``db.currentOp()``](https://docs.mongodb.com/manual/reference/method/db.currentOp/#db.currentOp) and [``db.killOp()``](https://docs.mongodb.com/manual/reference/method/db.killOp/#db.killOp) for details.


#### Step 1: Connect to MongoDB with the appropriate privileges.

Connect to [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) with the privileges
specified in the [Prerequisites](#define-roles-prereq) section.

The following procedure uses the ``myUserAdmin`` created in
[Enable Auth](enable-authentication/).

```javascript

mongo --port 27017 -u myUserAdmin -p abc123 --authenticationDatabase admin

```

The ``myUserAdmin`` has privileges to create roles in the ``admin``
as well as other databases.


#### Step 2: Create a new role to manage current operations.

``manageOpRole`` has privileges that act on multiple databases as well
as the [cluster resource](https://docs.mongodb.com/manual/reference/resource-document/#resource-cluster). As such, you must
create the role in the ``admin`` database.

```javascript

use admin
db.createRole(
   {
     role: "manageOpRole",
     privileges: [
       { resource: { cluster: true }, actions: [ "killop", "inprog" ] },
       { resource: { db: "", collection: "" }, actions: [ "killCursors" ] }
     ],
     roles: []
   }
)

```

The new role grants permissions to kill any operations.

Warning: Terminate running operations with extreme caution. Only use the [``db.killOp()``](https://docs.mongodb.com/manual/reference/method/db.killOp/#db.killOp) method or [``killOp``](https://docs.mongodb.com/manual/reference/command/killOp/#dbcmd.killOp) command to terminate operations initiated by clients and *do not* terminate internal database operations.

[1] The built-in role [``clusterMonitor``](https://docs.mongodb.com/manual/reference/built-in-roles/#clusterMonitor) also provides the privilege to run [``db.currentOp()``](https://docs.mongodb.com/manual/reference/method/db.currentOp/#db.currentOp) along with other privileges, and the built-in role [``hostManager``](https://docs.mongodb.com/manual/reference/built-in-roles/#hostManager) provides the privilege to run [``db.killOp()``](https://docs.mongodb.com/manual/reference/method/db.killOp/#db.killOp) along with other privileges.


### Create a Role to Run ``mongostat``

The following example creates a role named ``mongostatRole`` that
provides only the privileges to run [``mongostat``](https://docs.mongodb.com/manual/reference/program/mongostat/#bin.mongostat).
[2]


#### Step 1: Connect to MongoDB with the appropriate privileges.

Connect to [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) with the privileges
specified in the [Prerequisites](#define-roles-prereq) section.

The following procedure uses the ``myUserAdmin`` created in
[Enable Auth](enable-authentication/).

```javascript

mongo --port 27017 -u myUserAdmin -p abc123 --authenticationDatabase admin

```

The ``myUserAdmin`` has privileges to create roles in the ``admin``
as well as other databases.


#### Step 2: Create a new role to manage current operations.

``mongostatRole`` has privileges that act on the [cluster
resource](https://docs.mongodb.com/manual/reference/resource-document/#resource-cluster). As such, you must create the role in
the ``admin`` database.

```javascript

use admin
db.createRole(
   {
     role: "mongostatRole",
     privileges: [
       { resource: { cluster: true }, actions: [ "serverStatus" ] }
     ],
     roles: []
   }
)

```

[2] The built-in role [``clusterMonitor``](https://docs.mongodb.com/manual/reference/built-in-roles/#clusterMonitor) also provides the privilege to run [``mongostat``](https://docs.mongodb.com/manual/reference/program/mongostat/#bin.mongostat) along with other privileges.


## Modify Access for an Existing User


### Prerequisites

* You must have the [``grantRole``](https://docs.mongodb.com/manual/reference/privilege-actions/#grantRole) [action](https://docs.mongodb.com/manual/reference/privilege-actions/#security-user-actions) on a database to grant a role on that database.

* You must have the [``revokeRole``](https://docs.mongodb.com/manual/reference/privilege-actions/#revokeRole) [action](https://docs.mongodb.com/manual/reference/privilege-actions/#security-user-actions) on a database to revoke a role on that database.

* To view a role's information, you must be either explicitly granted the role or must have the [``viewRole``](https://docs.mongodb.com/manual/reference/privilege-actions/#viewRole) [action](https://docs.mongodb.com/manual/reference/privilege-actions/#security-user-actions) on the role's database.


### Procedure


#### Step 1: Connect to MongoDB with the appropriate privileges.

Connect to [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) as a user with
the privileges specified in the prerequisite section.

The following procedure uses the ``myUserAdmin`` created in
[Enable Auth](enable-authentication/).

```javascript

mongo --port 27017 -u myUserAdmin -p abc123 --authenticationDatabase admin

```


#### Step 2: Identify the user's roles and privileges.

To display the roles and privileges of the user to be modified, use the
[``db.getUser()``](https://docs.mongodb.com/manual/reference/method/db.getUser/#db.getUser) and [``db.getRole()``](https://docs.mongodb.com/manual/reference/method/db.getRole/#db.getRole) methods.

For example, to view roles for ``reportsUser`` created in
[Examples](https://docs.mongodb.com/manual/tutorial/create-users/#add-new-user), issue:

```javascript

use reporting
db.getUser("reportsUser")

```

To display the privileges granted to the user by the
``readWrite`` role on the ``"accounts"`` database, issue:

```javascript

use accounts
db.getRole( "readWrite", { showPrivileges: true } )

```


#### Step 3: Identify the privileges to grant or revoke.

If the user requires additional privileges, grant to the user the
role, or roles, with the required set of privileges. If such a role
does not exist, [create a new role](#create-user-defined-role)
with the appropriate set of privileges.

To revoke a subset of privileges provided by an existing role: revoke
the original role and grant a role that contains only the required
privileges. You may need to [create a new role](#create-user-defined-role) if a role does not exist.


#### Step 4: Modify the user's access.


##### Revoke a Role

Revoke a role with the [``db.revokeRolesFromUser()``](https://docs.mongodb.com/manual/reference/method/db.revokeRolesFromUser/#db.revokeRolesFromUser) method.
The following example operation removes the [``readWrite``](https://docs.mongodb.com/manual/reference/built-in-roles/#readWrite)
role on the ``accounts`` database from the ``reportsUser``:

```javascript

use reporting
db.revokeRolesFromUser(
    "reportsUser",
    [
      { role: "readWrite", db: "accounts" }
    ]
)

```


##### Grant a Role

Grant a role using the [``db.grantRolesToUser()``](https://docs.mongodb.com/manual/reference/method/db.grantRolesToUser/#db.grantRolesToUser)
method. For example, the following operation grants the
``reportsUser`` user the [``read``](https://docs.mongodb.com/manual/reference/built-in-roles/#read) role on the
``accounts`` database:

```javascript

use reporting
db.grantRolesToUser(
    "reportsUser",
    [
      { role: "read", db: "accounts" }
    ]
)

```

For sharded clusters, the changes to the user are instant on the
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) on which the command runs. However, for other
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instances in the cluster, the user cache may wait
up to 10 minutes to refresh. See
[``userCacheInvalidationIntervalSecs``](https://docs.mongodb.com/manual/reference/parameters/#param.userCacheInvalidationIntervalSecs).


## Modify the Password for an Existing User


### Prerequisites

To modify the password of another user on a database, you must have the
``changeAnyPassword`` [action](https://docs.mongodb.com/manual/reference/privilege-actions/#security-user-actions)
on that database.


### Procedure


#### Step 1: Connect to MongoDB with the appropriate privileges.

Connect to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) with the privileges
specified in the [Prerequisites](#change-password-prereq) section.

The following procedure uses the ``myUserAdmin`` created in
[Enable Auth](enable-authentication/).

```javascript

mongo --port 27017 -u myUserAdmin -p abc123 --authenticationDatabase admin

```


#### Step 2: Change the password.

Pass the user's username and the new password to the
[``db.changeUserPassword()``](https://docs.mongodb.com/manual/reference/method/db.changeUserPassword/#db.changeUserPassword) method.

The following operation changes the ``reporting`` user's password to
``SOh3TbYhxuLiW8ypJPxmt1oOfL``:

```javascript

db.changeUserPassword("reporting", "SOh3TbYhxuLiW8ypJPxmt1oOfL")

```

See also: [Change Your Password and Custom Data](change-own-password-and-custom-data/)


## View a User's Roles


### Prerequisites

To view another user's information, you must have the
[``viewUser``](https://docs.mongodb.com/manual/reference/privilege-actions/#viewUser) [action](https://docs.mongodb.com/manual/reference/privilege-actions/#security-user-actions) on the
other user's database.

Users can view their own information.


### Procedure


#### Step 1: Connect to MongoDB with the appropriate privileges.

Connect to [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) as a user with
the privileges specified in the prerequisite section.

The following procedure uses the ``myUserAdmin`` created in
[Enable Auth](enable-authentication/).

```javascript

mongo --port 27017 -u myUserAdmin -p abc123 --authenticationDatabase admin

```


#### Step 2: Identify the user's roles.

Use the [``usersInfo``](https://docs.mongodb.com/manual/reference/command/usersInfo/#dbcmd.usersInfo) command or [``db.getUser()``](https://docs.mongodb.com/manual/reference/method/db.getUser/#db.getUser) method to
display user information.

For example, to view roles for ``reportsUser`` created in
[Examples](https://docs.mongodb.com/manual/tutorial/create-users/#add-new-user), issue:

```javascript

use reporting
db.getUser("reportsUser")

```

In the returned document, the [``roles``](https://docs.mongodb.com/manual/reference/system-users-collection/#admin.system.users.roles)
field displays all roles for ``reportsUser``:

```javascript

...
"roles" : [
   { "role" : "readWrite", "db" : "accounts" },
   { "role" : "read", "db" : "reporting" },
   { "role" : "read", "db" : "products" },
   { "role" : "read", "db" : "sales" }
]

```


## View a Role's Privileges


### Prerequisites

To view a role's information, you must be either explicitly granted the
role or must have the [``viewRole``](https://docs.mongodb.com/manual/reference/privilege-actions/#viewRole) [action](https://docs.mongodb.com/manual/reference/privilege-actions/#security-user-actions) on the role's database.


### Procedure


#### Step 1: Connect to MongoDB with the appropriate privileges.

Connect to [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) as a user with
the privileges specified in the prerequisite section.

The following procedure uses the ``myUserAdmin`` created in
[Enable Auth](enable-authentication/).

```javascript

mongo --port 27017 -u myUserAdmin -p abc123 --authenticationDatabase admin

```


#### Step 2: Identify the privileges granted by a role.

For a given role, use the [``db.getRole()``](https://docs.mongodb.com/manual/reference/method/db.getRole/#db.getRole) method, or the
[``rolesInfo``](https://docs.mongodb.com/manual/reference/command/rolesInfo/#dbcmd.rolesInfo) command, with the ``showPrivileges`` option:

For example, to view the privileges granted by ``read`` role on
the ``products`` database, use the following operation, issue:

```javascript

use products
db.getRole( "read", { showPrivileges: true } )

```

In the returned document, the [``privileges``](https://docs.mongodb.com/manual/reference/command/rolesInfo/#rolesInfo.privileges) and
[``inheritedPrivileges``](https://docs.mongodb.com/manual/reference/command/rolesInfo/#rolesInfo.inheritedPrivileges) arrays. The
[``privileges``](https://docs.mongodb.com/manual/reference/command/rolesInfo/#rolesInfo.privileges) lists the privileges directly
specified by the role and excludes those privileges inherited
from other roles. The [``inheritedPrivileges``](https://docs.mongodb.com/manual/reference/command/rolesInfo/#rolesInfo.inheritedPrivileges)
lists all privileges granted by this role, both directly
specified and inherited. If the role does not inherit from other
roles, the two fields are the same.

```javascript

...
"privileges" : [
  {
    "resource": { "db" : "products", "collection" : "" },
    "actions": [ "collStats","dbHash","dbStats","find","killCursors","planCacheRead" ]
  },
  {
    "resource" : { "db" : "products", "collection" : "system.js" },
    "actions": [ "collStats","dbHash","dbStats","find","killCursors","planCacheRead" ]
  }
],
"inheritedPrivileges" : [
  {
    "resource": { "db" : "products", "collection" : "" },
    "actions": [ "collStats","dbHash","dbStats","find","killCursors","planCacheRead" ]
  },
  {
    "resource" : { "db" : "products", "collection" : "system.js" },
    "actions": [ "collStats","dbHash","dbStats","find","killCursors","planCacheRead" ]
  }
]

```
