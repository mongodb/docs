.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 50 40

   * - Method
     - Endpoint
     - Description

   * - GET
     - :doc:`/orgs </reference/api/organizations/organization-get-all>`
     - Return the list of all organizations to which the authenticated
       user belongs.

   * - GET
     - :doc:`/orgs/{ORG-ID} </reference/api/organizations/organization-get-one>`
     - Return information about the organization associated with
       ``{ORG-ID}``.

   * - GET
     - :doc:`/orgs/{ORG-ID}/groups </reference/api/organizations/organization-get-all-projects>`
     - Return all projects in the organization associated with
       ``{ORG-ID}``.

   * - GET
     - :doc:`/orgs/{ORG-ID}/users </reference/api/organizations/organization-get-all-users>`
     - Return all users in the specified organization.

   * - PATCH
     - :doc:`/orgs/{ORG-ID} </reference/api/organizations/organization-rename>`
     - Update one organization.

   * - DELETE
     - :doc:`/orgs/{ORG-ID} </reference/api/organizations/organization-delete-one>`
     - Remove the organization associated with ``{ORG-ID}``.

   * - POST
     - :doc:`/orgs/{ORG-ID}/invites/{INVITATION-ID} </reference/api/invitations/organizations/create-one-invitation>`
     - Create one invitation.

   * - DELETE
     - :doc:`/orgs/{ORG-ID}/invites/{INVITATION-ID} </reference/api/invitations/organizations/delete-one-invitation>`
     - Remove one invitation.

   * - GET
     - :doc:`/orgs/{ORG-ID}/invites </reference/api/invitations/organizations/get-all-invitations>`
     - Return the list of all invitations.

   * - GET
     - :doc:`/orgs/{ORG-ID}/invites/{INVITATION-ID} </reference/api/invitations/organizations/get-one-invitation>`
     - Return one invitation.

   * - PATCH
     - :doc:`/orgs/{ORG-ID}/invites/{INVITATION-ID} </reference/api/invitations/organizations/update-one-invitation-by-id>`
     - Update one invitation by ID.

   * - PATCH
     - :doc:`/orgs/{ORG-ID}/invites </reference/api/invitations/organizations/update-one-invitation>`
     - Update one invitation.
