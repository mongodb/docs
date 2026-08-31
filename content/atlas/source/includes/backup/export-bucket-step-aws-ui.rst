.. step:: Create an export bucket configuration in {+service+}.

   .. note::

      Before you can configure an export bucket in {+service+},
      complete the :ref:`prerequisites
      <cloud-backup-export-prereqs-aws>` to set up |service| access to
      your |aws| |s3| bucket.

   To enable {+service+} to export {+Cloud-Backup+} snapshots to
   |aws| |s3|, create an export bucket configuration in {+service+}
   that references an existing |aws| |s3| bucket.

   a. In the :guilabel:`Backup Policy` tab, go to the
      :guilabel:`Snapshot Export Policy` section and click
      :guilabel:`+ Add Storage Destination`.

      This displays a dialog box with the cloud provider options for
      your export bucket configuration.

   #. Select :guilabel:`AWS` as the cloud provider and click
      :guilabel:`Next`.

   #. Enter the following information and click :guilabel:`Next`:

      .. list-table::
         :header-rows: 1
         :widths: 25 60 15

         * - Field
           - Value
           - Necessity
         * - Atlas AWS IAM role ARN
           - The ARN of the |aws| IAM role that you created in the
             :ref:`prerequisites <cloud-backup-export-prereqs-aws>`.
           - Required
         * - AWS Bucket Name
           - Name of the |aws| |s3| bucket that is authorized to receive
             |service| {+Cloud-Backup+} snapshots. To set up |service|
             access to this bucket, see the :ref:`Prerequisites
             <cloud-backup-export-prereqs-aws>` section.
           - Required
         * - Use private endpoint for exports to this bucket
           - Select this option to export snapshots to this bucket over
             |aws| PrivateLink. Before you select this option, you must
             create a {+Cloud-Backup+} private endpoint as described in the
             :ref:`prerequisites <cloud-backup-export-prereqs-aws>` section.
           - Optional

   #. On the :guilabel:`Attach Policy` step, confirm that the role
      policy is attached to your |aws| IAM role.

      You attached this policy when you completed the
      :ref:`prerequisites <cloud-backup-export-prereqs-aws>`. Compare
      the policy that :guilabel:`Save role policy` displays to the
      policy attached to your role. If the permissions differ, edit the
      policy to match. To learn more, see the :aws:`AWS Edit IAM
      Policies documentation
      </IAM/latest/UserGuide/access_policies_manage-edit.html>`.

   #. Select :guilabel:`I confirm I completed the required steps` and
      click :guilabel:`Add bucket`.

      This adds the export bucket configuration to your {+service+} project.
