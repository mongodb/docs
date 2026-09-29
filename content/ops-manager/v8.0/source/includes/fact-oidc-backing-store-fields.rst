Select :guilabel:`Enable OIDC` to authenticate to this store using
|oidc| instead of a username and password. When you select
:guilabel:`Enable OIDC`, the Admin interface hides the
:guilabel:`Username` and :guilabel:`Password` fields for this store.
Then select a :guilabel:`Method`:

- :guilabel:`Custom Callback`: Type the :guilabel:`Token URI`,
  :guilabel:`Client ID`, :guilabel:`Client Secret`, and
  :guilabel:`Scope` for your |idp|.
- :guilabel:`Azure` or :guilabel:`GCP`: Type the
  :guilabel:`Token Resource` for the built-in workload identity. A
  client secret isn't required.
- :guilabel:`Kubernetes`: |onprem| obtains a workload identity token
  from the environment automatically. No additional fields are
  required.

When you save the configuration, |onprem| validates the connection
using the |oidc| settings that you provided. If you edit an existing
store and leave :guilabel:`Client Secret` unchanged, |onprem|
preserves the existing secret. Saving |oidc| configuration changes
for this store requires restarting |onprem| and the Backup Daemon.
