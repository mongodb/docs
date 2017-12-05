+++
title = "Change Your Password and Custom Data"

tags = [ "mongodb-enterprise", "administration", "beginner" ]
+++

# Change Your Password and Custom Data

Changed in version 2.6.


## Overview

Users with appropriate privileges can change their own passwords and
custom data. [``Custom data``](https://docs.mongodb.com/manual/reference/system-users-collection/#admin.system.users.customData) stores
optional user information.


## Considerations

To generate a strong password for use in this procedure, you can use the
``openssl`` utility's ``rand`` command. For example, issue ``openssl
rand`` with the following options to create a base64-encoded string of 48
pseudo-random bytes:

```sh

openssl rand -base64 48

```

<span id="change-own-password-prereq"></span>


## Prerequisites

To modify your own password and custom data, you must have privileges
that grant [``changeOwnPassword``](https://docs.mongodb.com/manual/reference/privilege-actions/#changeOwnPassword) and
[``changeOwnCustomData``](https://docs.mongodb.com/manual/reference/privilege-actions/#changeOwnCustomData) [actions](https://docs.mongodb.com/manual/reference/privilege-actions/#security-user-actions) respectively on the user's database.


### Step 1: Connect as a user with privileges to manage users and roles.

Connect to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) with privileges
to manage users and roles, such as a user with
[``userAdminAnyDatabase``](https://docs.mongodb.com/manual/reference/built-in-roles/#userAdminAnyDatabase) role. The following procedure uses the
``myUserAdmin`` created in [Enable Auth](../enable-authentication/).

```javascript

mongo --port 27017 -u myUserAdmin -p 'abc123' --authenticationDatabase 'admin'

```


### Step 2: Create a role with appropriate privileges.

In the ``admin`` database, [``create``](https://docs.mongodb.com/manual/reference/method/db.createRole/#db.createRole) a new
role with [``changeOwnPassword``](https://docs.mongodb.com/manual/reference/privilege-actions/#changeOwnPassword) and
[``changeOwnCustomData``](https://docs.mongodb.com/manual/reference/privilege-actions/#changeOwnCustomData).

```javascript

use admin
db.createRole(
   { role: "changeOwnPasswordCustomDataRole",
     privileges: [
        {
          resource: { db: "", collection: ""},
          actions: [ "changeOwnPassword", "changeOwnCustomData" ]
        }
     ],
     roles: []
   }
)

```


### Step 3: Add a user with this role.

In the ``test`` database, [``create``](https://docs.mongodb.com/manual/reference/method/db.createUser/#db.createUser) a new user with
the created ``"changeOwnPasswordCustomDataRole"`` role. For example, the following
operation creates a user with both the built-in role [``readWrite``](https://docs.mongodb.com/manual/reference/built-in-roles/#readWrite) and
the user-created ``"changeOwnPasswordCustomDataRole"``.

```javascript

use test
db.createUser(
   {
     user:"user123",
     pwd:"12345678",
     roles:[ "readWrite", { role:"changeOwnPasswordCustomDataRole", db:"admin" } ]
   }
)

```

To grant an existing user the new role, use
[``db.grantRolesToUser()``](https://docs.mongodb.com/manual/reference/method/db.grantRolesToUser/#db.grantRolesToUser).


## Procedure


### Step 1: Connect with the appropriate privileges.

Connect to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) as a user with
appropriate privileges.

For example, the following operation connects to MongoDB as
``user123`` created in the [Prerequisites](#change-own-password-prereq)
section.

```javascript

mongo --port 27017 -u user123 -p '12345678' --authenticationDatabase 'test'

```

To check that you have the privileges specified in the
[Prerequisites](#change-own-password-prereq) section as well as to see user
information, use the [``usersInfo``](https://docs.mongodb.com/manual/reference/command/usersInfo/#dbcmd.usersInfo) command with the
``showPrivileges`` option.


### Step 2: Change your password and custom data.

Use the [``db.updateUser()``](https://docs.mongodb.com/manual/reference/method/db.updateUser/#db.updateUser) method to update the password and
custom data.

For example, the following operation changes thw user's password to
``KNlZmiaNUp0B`` and custom data to ``{ title: "Senior Manager" }``:

```javascript

use test
db.updateUser(
   "user123",
   {
      pwd: "KNlZmiaNUp0B",
      customData: { title: "Senior Manager" }
   }
)

```
