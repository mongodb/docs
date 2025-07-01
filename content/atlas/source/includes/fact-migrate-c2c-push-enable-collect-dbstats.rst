During the live migration process, |service| validates that it can collect
MongoDB database statistics using :manual:`dbStats </reference/command/dbStats/>`.
Before you live migrate to an |service| {+cluster+},
:mms-docs:`review the project settings </tutorial/manage-project-settings/>`
for the source {+cluster+} in |mms| and ensure that the option
:guilabel:`Collect Database Specific Statistics` is enabled. This option
is enabled by default in |mms|, and it should remain enabled so that the
migration process passes validation.