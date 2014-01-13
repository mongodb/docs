.. per DOCS-2493 & SERVER-7489

If authentication is enabled, a user must have access to all actions
on all resources in order to run
|eval-object|. Providing such access is not recommended, but if your
organization requires a user to run |eval-object|, create a role that
grants :authaction:`anyAction` on :ref:`resource-anyresource`. Do not
assign this role to any other user.